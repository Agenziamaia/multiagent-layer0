#!/bin/bash

# ==============================================================================
# DEPLOY LANDING PAGE TO VERCEL
# ==============================================================================
# Purpose: Automated deployment of AI Website Builder landing page to production
# Usage: ./scripts/deploy-landing.sh [--production|--preview]
# ==============================================================================

set -e
set -u
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

DEPLOY_ENV="preview"
RUN_TESTS=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --preview)
            DEPLOY_ENV="preview"
            shift
            ;;
        --production|--prod)
            DEPLOY_ENV="production"
            shift
            ;;
        --skip-tests)
            RUN_TESTS=false
            shift
            ;;
        -h|--help)
            cat << EOF
Usage: $0 [OPTIONS]

Options:
  --preview              Deploy to preview environment (default)
  --production, --prod   Deploy to production environment
  --skip-tests           Skip test execution

Examples:
  $0 --preview                    # Deploy to preview
  $0 --production                 # Deploy to production
  $0 --production --skip-tests       # Quick deploy without tests

Environment Variables:
  VERCEL_TOKEN          Required: Vercel API token
  VERCEL_PROJECT_ID     Required: Vercel project ID
  CUSTOM_DOMAIN         Optional: Custom domain name
EOF
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

log_info "🚀 Landing Page Deployment Script"
log_info "Environment: ${DEPLOY_ENV}"

if [ "$RUN_TESTS" = true ]; then
    log_info "🧪 Running tests..."
    cd "${PROJECT_ROOT}"

    if npm run test 2>&1 | tail -20; then
        log_success "Tests passed"
    else
        log_error "Tests failed - aborting deployment"
        exit 1
    fi
else
    log_warning "Skipping tests (--skip-tests flag set)"
fi

log_info "🔍 Running linter..."
cd "${PROJECT_ROOT}"

if npm run lint 2>&1 | tail -20; then
    log_success "Linting passed"
else
    log_error "Linting failed - aborting deployment"
    exit 1
fi

log_info "🔍 Running type check..."
cd "${PROJECT_ROOT}"

if npm run typecheck 2>&1 | tail -20; then
    log_success "Type check passed"
else
    log_error "Type check failed - aborting deployment"
    exit 1
fi

log_info "🏗️  Building project..."
cd "${PROJECT_ROOT}"

rm -rf dist

if npm run build 2>&1; then
    log_success "Build completed successfully"
else
    log_error "Build failed - aborting deployment"
    exit 1
fi

if [ ! -d "dist" ]; then
    log_error "Build output directory 'dist' not found"
    exit 1
fi

log_info "📦 Checking deployment artifacts..."
BUILD_SIZE=$(du -sh dist | cut -f1)
log_info "Build size: ${BUILD_SIZE}"

if [ -z "${VERCEL_TOKEN:-}" ]; then
    log_error "VERCEL_TOKEN not set in .env file"
    exit 1
fi

if [ -z "${VERCEL_PROJECT_ID:-}" ]; then
    log_error "VERCEL_PROJECT_ID not set in .env file"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    log_info "Installing Vercel CLI..."
    npm install -g vercel
fi

log_info "🚀 Deploying to Vercel (environment: ${DEPLOY_ENV})..."
cd "${PROJECT_ROOT}"

if [ "$DEPLOY_ENV" = "production" ]; then
    DEPLOY_ARGS="--prod"
    log_warning "⚠️  PRODUCTION DEPLOYMENT - VERIFY CAREFULLY"
else
    DEPLOY_ARGS="--prebuilt"
    log_info "Preview deployment"
fi

DEPLOYMENT_OUTPUT=$(vercel deploy ${DEPLOY_ARGS} --token="${VERCEL_TOKEN}" 2>&1)

if [ $? -eq 0 ]; then
    DEPLOYMENT_URL=$(echo "$DEPLOYMENT_OUTPUT" | grep -o 'https://[^ ]*' | head -1)
    log_success "Deployment successful!"
    log_info "🌐 Deployment URL: ${DEPLOYMENT_URL}"

    sleep 5

    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${DEPLOYMENT_URL}" || echo "000")

    if [ "$HTTP_STATUS" = "200" ]; then
        log_success "✅ Deployment verified (HTTP 200)"
    else
        log_warning "⚠️  Deployment returned HTTP ${HTTP_STATUS}"
        log_info "Please check: ${DEPLOYMENT_URL}"
    fi

    HTTPS_STATUS=$(curl -s -o /dev/null -w "%{ssl_verify_result}" "${DEPLOYMENT_URL}" 2>&1 || echo "unknown")

    if [ "$HTTPS_STATUS" = "0" ]; then
        log_success "✅ HTTPS certificate valid"
    else
        log_warning "⚠️  HTTPS verification: ${HTTPS_STATUS}"
        log_info "SSL certificate may be provisioning (takes up to 24h)"
    fi

    if [ "$DEPLOY_ENV" = "production" ] && [ -n "${CUSTOM_DOMAIN:-}" ]; then
        log_info "🌍 Custom domain: ${CUSTOM_DOMAIN}"

        DOMAIN_RESPONSE=$(curl -s -X POST \
            -H "Authorization: Bearer ${VERCEL_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "{\"name\":\"${CUSTOM_DOMAIN}\"}" \
            "https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains" 2>&1)

        log_info "Domain configuration: ${DOMAIN_RESPONSE}"

        log_warning "⚠️  DNS Configuration Required:"
        log_info "Add the following DNS records:"
        log_info "  Type: CNAME"
        log_info "  Name: ${CUSTOM_DOMAIN}"
        log_info "  Value: cname.vercel-dns.com"
        log_info ""
        log_info "Or for A records:"
        log_info "  Type: A"
        log_info "  Name: ${CUSTOM_DOMAIN}"
        log_info "  Value: 76.76.21.21"
        log_info ""
        log_info "SSL certificate will be automatically generated by Vercel"
    fi

    if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
        log_info "📢 Sending Slack notification..."

        SLACK_MESSAGE="{
            \"text\": \"🚀 Landing Page Deployment Successful\",
            \"blocks\": [
                {
                    \"type\": \"section\",
                    \"text\": {
                        \"type\": \"mrkdwn\",
                        \"text\": \"*Deployment Successful*\n\n*Environment:* ${DEPLOY_ENV}\n*URL:* ${DEPLOYMENT_URL}\n*Build Size:* ${BUILD_SIZE}\"
                    }
                }
            ]
        }"

        curl -s -X POST "${SLACK_WEBHOOK_URL}" \
            -H "Content-Type: application/json" \
            -d "${SLACK_MESSAGE}" > /dev/null 2>&1

        log_success "Slack notification sent"
    fi

    if [ -n "${DISCORD_WEBHOOK_URL:-}" ]; then
        log_info "📢 Sending Discord notification..."

        DISCORD_MESSAGE="{
            \"embeds\": [
                {
                    \"title\": \"🚀 Landing Page Deployment Successful\",
                    \"fields\": [
                        {
                            \"name\": \"Environment\",
                            \"value\": \"${DEPLOY_ENV}\",
                            \"inline\": true
                        },
                        {
                            \"name\": \"URL\",
                            \"value\": \"${DEPLOYMENT_URL}\",
                            \"inline\": true
                        },
                        {
                            \"name\": \"Build Size\",
                            \"value\": \"${BUILD_SIZE}\",
                            \"inline\": true
                        }
                    ],
                    \"color\": 3066993
                }
            ]
        }"

        curl -s -X POST "${DISCORD_WEBHOOK_URL}" \
            -H "Content-Type: application/json" \
            -d "${DISCORD_MESSAGE}" > /dev/null 2>&1

        log_success "Discord notification sent"
    fi

    log_success "✨ Landing page deployment completed successfully!"
    echo ""
    log_info "📋 Deployment Summary:"
    log_info "  Environment: ${DEPLOY_ENV}"
    log_info "  URL: ${DEPLOYMENT_URL}"
    log_info "  Build Size: ${BUILD_SIZE}"
    log_info "  HTTPS: ✅ Verified"
    echo ""
    log_info "Next steps:"
    if [ "$DEPLOY_ENV" = "production" ]; then
        log_info "  1. Visit ${DEPLOYMENT_URL} to verify deployment"
        log_info "  2. Test Stripe checkout flow"
        log_info "  3. Monitor production logs"
    else
        log_info "  1. Share preview URL: ${DEPLOYMENT_URL}"
        log_info "  2. Test the deployment"
        log_info "  3. Get feedback before production deployment"
    fi

    exit 0
else
    log_error "Deployment failed"
    log_error "$DEPLOYMENT_OUTPUT"
    exit 1
fi
