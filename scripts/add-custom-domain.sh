#!/bin/bash

# ============================================================================
# MAIA OPS - Custom Domain Configuration Script
# ============================================================================
# Purpose: Add custom domain to Vercel project via API
# Usage: ./scripts/add-custom-domain.sh <domain> [--production|--preview]
# ============================================================================

set -e
set -u
set -o pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Default values
DEPLOY_ENV="production"

# Parse arguments
if [ $# -lt 1 ]; then
    cat << EOF
Usage: $0 <domain> [OPTIONS]

Arguments:
  domain             Custom domain to add (e.g., yourdomain.com)

Options:
  --production       Add to production environment (default)
  --preview          Add to preview environment
  -h, --help         Show this help message

Environment Variables:
  VERCEL_TOKEN       Required: Vercel API token
  VERCEL_PROJECT_ID  Required: Vercel project ID

Examples:
  $0 yourdomain.com
  $0 app.yourdomain.com --preview
  $0 www.yourdomain.com --production

EOF
    exit 1
fi

DOMAIN="$1"
shift

while [[ $# -gt 0 ]]; do
    case $1 in
        --production)
            DEPLOY_ENV="production"
            shift
            ;;
        --preview)
            DEPLOY_ENV="preview"
            shift
            ;;
        -h|--help)
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Source .env file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [ ! -f "${PROJECT_ROOT}/.env" ]; then
    log_error ".env file not found"
    exit 1
fi

source "${PROJECT_ROOT}/.env"

# Validate environment variables
if [ -z "${VERCEL_TOKEN:-}" ]; then
    log_error "VERCEL_TOKEN not set in .env file"
    exit 1
fi

if [ -z "${VERCEL_PROJECT_ID:-}" ]; then
    log_error "VERCEL_PROJECT_ID not set in .env file"
    exit 1
fi

# ============================================================================
# VALIDATE DOMAIN FORMAT
# ============================================================================
log_info "🔍 Validating domain format..."

if [[ ! "$DOMAIN" =~ ^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ ]]; then
    log_error "Invalid domain format: ${DOMAIN}"
    exit 1
fi

log_success "Domain format is valid"

# ============================================================================
# CHECK IF DOMAIN ALREADY EXISTS
# ============================================================================
log_info "🔍 Checking if domain already exists..."

EXISTING_DOMAINS=$(curl -s -X GET \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    "https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains" 2>&1)

if echo "$EXISTING_DOMAINS" | grep -q "\"name\":\"${DOMAIN}\""; then
    log_warning "Domain ${DOMAIN} already exists in project"
    log_info "Current configuration:"
    echo "$EXISTING_DOMAINS" | jq -r ".domains[] | select(.name==\"${DOMAIN}\")" 2>/dev/null || echo "$EXISTING_DOMAINS"
    exit 0
fi

# ============================================================================
# ADD DOMAIN TO PROJECT
# ============================================================================
log_info "🌍 Adding domain ${DOMAIN} to project..."

ADD_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"name\": \"${DOMAIN}\",
        \"redirect\": null
    }" \
    "https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains" 2>&1)

# Check for errors
if echo "$ADD_RESPONSE" | grep -q "error"; then
    log_error "Failed to add domain"
    log_error "Response: ${ADD_RESPONSE}"
    exit 1
fi

log_success "Domain added successfully"

# ============================================================================
# GET DNS CONFIGURATION
# ============================================================================
log_info "📋 Getting DNS configuration..."

DNS_CONFIG=$(curl -s -X GET \
    -H "Authorization: Bearer ${VERCEL_TOKEN}" \
    "https://api.vercel.com/v4/domains/${DOMAIN}/config" 2>&1)

# Extract DNS records
RECORD_TYPE=$(echo "$DNS_CONFIG" | jq -r '.configuredBy.srv.targetType' 2>/dev/null || echo "CNAME")

echo ""
log_success "✨ Domain configuration complete!"
echo ""

# ============================================================================
# DNS INSTRUCTIONS
# ============================================================================
log_info "⚠️  DNS Configuration Required"
echo ""
echo "Add the following DNS records to your domain registrar:"
echo ""

if [ "$RECORD_TYPE" = "CNAME" ]; then
    echo "  Type: CNAME"
    echo "  Name: ${DOMAIN}"
    echo "  Value: cname.vercel-dns.com"
    echo ""
    echo "  For subdomains (e.g., www):"
    echo "  Type: CNAME"
    echo "  Name: www"
    echo "  Value: cname.vercel-dns.com"
else
    echo "  Type: A"
    echo "  Name: ${DOMAIN}"
    echo "  Value: 76.76.21.21"
    echo ""
    echo "  Alternative A Records:"
    echo "  Type: A"
    echo "  Name: ${DOMAIN}"
    echo "  Value: 76.76.19.21"
    echo ""
    echo "  Type: A"
    echo "  Name: ${DOMAIN}"
    echo "  Value: 76.76.21.61"
fi

echo ""
log_info "ℹ️  SSL Certificate"
echo "  Vercel will automatically generate and configure SSL certificates"
echo "  once DNS propagation is complete (usually takes 5-60 minutes)"
echo ""

# ============================================================================
# VERIFY DNS PROPAGATION
# ============================================================================
log_info "⏳ Checking DNS propagation (this may take a while)..."

MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    # Try to resolve the domain
    if command -v dig &> /dev/null; then
        DNS_LOOKUP=$(dig +short "${DOMAIN}" 2>&1)
        if [ -n "$DNS_LOOKUP" ]; then
            log_success "DNS propagated successfully!"
            log_info "  Domain resolves to: ${DNS_LOOKUP}"
            break
        fi
    elif command -v nslookup &> /dev/null; then
        DNS_LOOKUP=$(nslookup -timeout=2 "${DOMAIN}" 2>&1 | grep -A 1 "Name:" | tail -1 | awk '{print $2}')
        if [ -n "$DNS_LOOKUP" ] && [ "$DNS_LOOKUP" != "can't" ]; then
            log_success "DNS propagated successfully!"
            log_info "  Domain resolves to: ${DNS_LOOKUP}"
            break
        fi
    fi

    ATTEMPT=$((ATTEMPT + 1))
    log_info "  Attempt ${ATTEMPT}/${MAX_ATTEMPTS}..."
    sleep 10
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    log_warning "DNS propagation not yet complete"
    log_info "This is normal for new domains. Please check again in a few hours."
    log_info "You can verify DNS propagation at: https://dnschecker.org/"
fi

# ============================================================================
# VERIFY SSL CERTIFICATE
# ============================================================================
log_info "🔒 Checking SSL certificate..."

SSL_STATUS=$(curl -s -I "https://${DOMAIN}" 2>&1 | grep -i "SSL" || echo "")

if [ -n "$SSL_STATUS" ]; then
    log_success "SSL certificate is active!"
else
    log_warning "SSL certificate not yet available"
    log_info "Vercel will automatically provision SSL once DNS is fully propagated"
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
log_success "✨ Custom domain setup completed!"
echo ""
log_info "📋 Summary:"
log_info "  Domain: ${DOMAIN}"
log_info "  Environment: ${DEPLOY_ENV}"
log_info "  Project ID: ${VERCEL_PROJECT_ID}"
echo ""
log_info "🔗 Next Steps:"
log_info "  1. Configure DNS records as shown above"
log_info "  2. Wait for DNS propagation (5-60 minutes)"
log_info "  3. Verify at: https://${DOMAIN}"
log_info "  4. Monitor SSL status in Vercel dashboard"
echo ""
log_info "📚 Resources:"
log_info "  - Vercel Domains: https://vercel.com/dashboard/domains"
log_info "  - DNS Checker: https://dnschecker.org/"
log_info "  - SSL Labs: https://www.ssllabs.com/ssltest/"

exit 0
