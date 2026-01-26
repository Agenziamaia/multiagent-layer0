#!/bin/bash

# ============================================================================
# MAIA OPS - Vercel Deployment Script
# ============================================================================
# Purpose: Automated deployment to Vercel with full testing and validation
# Usage: ./scripts/deploy.sh [--preview|--production] [--skip-tests]
# ============================================================================

set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

# ============================================================================
# CONFIGURATION
# ============================================================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Default values
DEPLOY_ENV="preview"
SKIP_TESTS=false
SKIP_BUILD=false
CREATE_RELEASE=false
RELEASE_TYPE="patch"

# ============================================================================
# PARSE ARGUMENTS
# ============================================================================
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
            SKIP_TESTS=true
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --release)
            CREATE_RELEASE=true
            shift
            ;;
        --release-type)
            RELEASE_TYPE="$2"
            shift 2
            ;;
        -h|--help)
            cat << EOF
Usage: $0 [OPTIONS]

Options:
  --preview              Deploy to preview environment (default)
  --production, --prod   Deploy to production environment
  --skip-tests           Skip test execution
  --skip-build           Skip build process
  --release              Create a GitHub release tag
  --release-type TYPE    Release type: major, minor, patch (default: patch)
  -h, --help             Show this help message

Examples:
  $0 --preview                    # Deploy to preview
  $0 --production                 # Deploy to production
  $0 --production --release       # Deploy and create release
  $0 --preview --skip-tests       # Quick deploy without tests

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

# ============================================================================
# VALIDATE ENVIRONMENT
# ============================================================================
log_info "🔍 Validating environment..."

# Check if .env file exists
if [ ! -f "${PROJECT_ROOT}/.env" ]; then
    log_error ".env file not found. Please create it from .env.example"
    exit 1
fi

# Source environment variables
source "${PROJECT_ROOT}/.env"

# Validate required environment variables
if [ -z "${VERCEL_TOKEN:-}" ]; then
    log_error "VERCEL_TOKEN not set in .env file"
    exit 1
fi

if [ -z "${VERCEL_PROJECT_ID:-}" ]; then
    log_error "VERCEL_PROJECT_ID not set in .env file"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    log_info "Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if git repository
if [ ! -d "${PROJECT_ROOT}/.git" ]; then
    log_error "Not a git repository"
    exit 1
fi

# Get git branch
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
log_info "Git branch: ${GIT_BRANCH}"

# Get current commit
GIT_COMMIT=$(git rev-parse --short HEAD)
log_info "Current commit: ${GIT_COMMIT}"

# ============================================================================
# RUN TESTS
# ============================================================================
if [ "$SKIP_TESTS" = false ]; then
    log_info "🧪 Running tests..."
    cd "${PROJECT_ROOT}"

    if npm run test 2>&1; then
        log_success "All tests passed"
    else
        log_error "Tests failed"
        exit 1
    fi
else
    log_warning "Skipping tests (--skip-tests flag set)"
fi

# ============================================================================
# RUN LINTING
# ============================================================================
log_info "🔍 Running linter..."
cd "${PROJECT_ROOT}"

if npm run lint 2>&1; then
    log_success "Linting passed"
else
    log_error "Linting failed"
    exit 1
fi

# ============================================================================
# TYPE CHECK
# ============================================================================
log_info "🔍 Running type check..."
cd "${PROJECT_ROOT}"

if npm run typecheck 2>&1; then
    log_success "Type check passed"
else
    log_error "Type check failed"
    exit 1
fi

# ============================================================================
# BUILD PROJECT
# ============================================================================
if [ "$SKIP_BUILD" = false ]; then
    log_info "🏗️  Building project..."
    cd "${PROJECT_ROOT}"

    # Clean previous build
    rm -rf dist

    if npm run build 2>&1; then
        log_success "Build completed successfully"
    else
        log_error "Build failed"
        exit 1
    fi
else
    log_warning "Skipping build (--skip-build flag set)"
fi

# ============================================================================
# DEPLOY TO VERCEL
# ============================================================================
log_info "🚀 Deploying to Vercel (environment: ${DEPLOY_ENV})..."
cd "${PROJECT_ROOT}"

# Determine deployment parameters
if [ "$DEPLOY_ENV" = "production" ]; then
    DEPLOY_ARGS="--prod"
else
    DEPLOY_ARGS="--prebuilt"
fi

# Deploy
DEPLOYMENT_OUTPUT=$(vercel deploy ${DEPLOY_ARGS} --token="${VERCEL_TOKEN}" 2>&1)

if [ $? -eq 0 ]; then
    DEPLOYMENT_URL=$(echo "$DEPLOYMENT_OUTPUT" | grep -o 'https://[^ ]*' | head -1)
    log_success "Deployment successful!"
    log_info "🌐 Deployment URL: ${DEPLOYMENT_URL}"

    # Wait for deployment to be ready
    log_info "⏳ Waiting for deployment to be ready..."
    sleep 5

    # Verify deployment
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${DEPLOYMENT_URL}" || echo "000")
    if [ "$HTTP_STATUS" = "200" ]; then
        log_success "Deployment verified (HTTP 200)"
    else
        log_warning "Deployment returned HTTP ${HTTP_STATUS}"
    fi
else
    log_error "Deployment failed"
    log_error "$DEPLOYMENT_OUTPUT"
    exit 1
fi

# ============================================================================
# ADD CUSTOM DOMAIN (if specified)
# ============================================================================
if [ -n "${CUSTOM_DOMAIN:-}" ] && [ "$DEPLOY_ENV" = "production" ]; then
    log_info "🌍 Adding custom domain: ${CUSTOM_DOMAIN}"

    # Add domain via Vercel API
    DOMAIN_RESPONSE=$(curl -s -X POST \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"${CUSTOM_DOMAIN}\"}" \
        "https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains" 2>&1)

    log_info "Domain configuration response: ${DOMAIN_RESPONSE}"

    # Provide DNS instructions
    log_success "Custom domain configured!"
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

# ============================================================================
# CREATE GITHUB RELEASE (if requested)
# ============================================================================
if [ "$CREATE_RELEASE" = true ]; then
    log_info "🏷️  Creating GitHub release..."

    # Get current version from package.json
    CURRENT_VERSION=$(node -p "require('${PROJECT_ROOT}/package.json').version")
    log_info "Current version: ${CURRENT_VERSION}"

    # Create new version tag
    NEW_VERSION=$(npm version "${RELEASE_TYPE}" --no-git-tag-version 2>&1 | tr -d 'v')
    log_info "New version: ${NEW_VERSION}"

    # Commit version bump
    git add package.json
    git commit -m "chore: bump version to ${NEW_VERSION}"

    # Create tag
    TAG_NAME="v${NEW_VERSION}"
    git tag -a "${TAG_NAME}" -m "Release ${TAG_NAME}"

    # Push tag
    log_info "Pushing tag to GitHub..."
    git push origin "${GIT_BRANCH}"
    git push origin "${TAG_NAME}"

    log_success "Release ${TAG_NAME} created and pushed"
fi

# ============================================================================
# SEND NOTIFICATIONS (if configured)
# ============================================================================
if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
    log_info "📢 Sending Slack notification..."

    SLACK_MESSAGE="{
        \"text\": \"🚀 Deployment Successful\",
        \"blocks\": [
            {
                \"type\": \"section\",
                \"text\": {
                    \"type\": \"mrkdwn\",
                    \"text\": \"*Deployment Successful*\n\n*Environment:* ${DEPLOY_ENV}\n*URL:* ${DEPLOYMENT_URL}\n*Branch:* ${GIT_BRANCH}\n*Commit:* ${GIT_COMMIT}\"
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
                \"title\": \"🚀 Deployment Successful\",
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
                        \"name\": \"Branch\",
                        \"value\": \"${GIT_BRANCH}\",
                        \"inline\": true
                    },
                    {
                        \"name\": \"Commit\",
                        \"value\": \"${GIT_COMMIT}\",
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

# ============================================================================
# SUMMARY
# ============================================================================
log_success "✨ Deployment completed successfully!"
echo ""
log_info "📋 Deployment Summary:"
log_info "  Environment: ${DEPLOY_ENV}"
log_info "  URL: ${DEPLOYMENT_URL}"
log_info "  Branch: ${GIT_BRANCH}"
log_info "  Commit: ${GIT_COMMIT}"
if [ "$CREATE_RELEASE" = true ]; then
    log_info "  Release: ${TAG_NAME}"
fi
echo ""
log_info "Next steps:"
if [ "$DEPLOY_ENV" = "production" ]; then
    log_info "  1. Visit ${DEPLOYMENT_URL} to verify deployment"
    if [ -n "${CUSTOM_DOMAIN:-}" ]; then
        log_info "  2. Configure DNS for ${CUSTOM_DOMAIN}"
    fi
else
    log_info "  1. Share preview URL: ${DEPLOYMENT_URL}"
    log_info "  2. Test the deployment"
fi

exit 0
