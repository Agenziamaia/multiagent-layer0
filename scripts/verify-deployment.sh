#!/bin/bash

# ============================================================================
# MAIA OPS - Deployment Setup Verification
# ============================================================================
# Purpose: Verify all deployment files and configurations are in place
# Usage: ./scripts/verify-deployment.sh
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
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    local description="$1"
    local command="$2"

    echo -n "Checking: $description... "

    if eval "$command" > /dev/null 2>&1; then
        log_success "PASSED"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        return 0
    else
        log_error "FAILED"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        return 1
    fi
}

echo "=========================================================================="
echo "  MAIA OPS - Deployment Setup Verification"
echo "=========================================================================="
echo ""

# ============================================================================
# FILE EXISTENCE CHECKS
# ============================================================================
log_info "📁 Checking deployment files..."
echo ""

check "vercel.json exists" "test -f vercel.json"
check ".env.example exists" "test -f .env.example"
check ".github/workflows/deploy.yml exists" "test -f .github/workflows/deploy.yml"
check "scripts/deploy.sh exists" "test -f scripts/deploy.sh"
check "scripts/add-custom-domain.sh exists" "test -f scripts/add-custom-domain.sh"
check "DEPLOYMENT.md exists" "test -f DEPLOYMENT.md"
check "DEPLOYMENT_QUICKSTART.md exists" "test -f DEPLOYMENT_QUICKSTART.md"

echo ""
log_info "🔐 Checking file permissions..."
echo ""

check "deploy.sh is executable" "test -x scripts/deploy.sh"
check "add-custom-domain.sh is executable" "test -x scripts/add-custom-domain.sh"

echo ""
log_info "📋 Checking configuration files..."
echo ""

check "vercel.json is valid JSON" "cat vercel.json | jq . > /dev/null 2>&1"
check ".env.example contains VERCEL_TOKEN" "grep -q 'VERCEL_TOKEN=' .env.example"
check ".env.example contains VERCEL_PROJECT_ID" "grep -q 'VERCEL_PROJECT_ID=' .env.example"

echo ""
log_info "🔍 Checking vercel.json configuration..."
echo ""

check "vercel.json has buildCommand" "cat vercel.json | jq -e '.buildCommand' > /dev/null"
check "vercel.json has outputDirectory" "cat vercel.json | jq -e '.outputDirectory' > /dev/null"
check "vercel.json has installCommand" "cat vercel.json | jq -e '.installCommand' > /dev/null"
check "vercel.json has framework" "cat vercel.json | jq -e '.framework' > /dev/null"

echo ""
log_info "🚀 Checking deployment scripts..."
echo ""

check "deploy.sh has error handling" "grep -q 'set -e' scripts/deploy.sh"
check "deploy.sh has logging functions" "grep -q 'log_success' scripts/deploy.sh"
check "deploy.sh has environment validation" "grep -q 'VERCEL_TOKEN' scripts/deploy.sh"
check "add-custom-domain.sh has DNS instructions" "grep -q 'DNS Configuration' scripts/add-custom-domain.sh"

echo ""
log_info "🔄 Checking CI/CD workflow..."
echo ""

check "deploy.yml has test job" "grep -q '  test:' .github/workflows/deploy.yml"
check "deploy.yml has build job" "grep -q '  build:' .github/workflows/deploy.yml"
check "deploy.yml has deploy-preview job" "grep -q '  deploy-preview:' .github/workflows/deploy.yml"
check "deploy.yml has deploy-production job" "grep -q '  deploy-production:' .github/workflows/deploy.yml"
check "deploy.yml has health-check job" "grep -q '  health-check:' .github/workflows/deploy.yml"
check "deploy.yml has rollback job" "grep -q '  rollback:' .github/workflows/deploy.yml"

echo ""
log_info "📦 Checking package.json scripts..."
echo ""

check "package.json has deploy:preview script" "cat package.json | jq -e '.scripts[\"deploy:preview\"]' > /dev/null"
check "package.json has deploy:production script" "cat package.json | jq -e '.scripts[\"deploy:production\"]' > /dev/null"
check "package.json has deploy:release script" "cat package.json | jq -e '.scripts[\"deploy:release\"]' > /dev/null"
check "package.json has domain:add script" "cat package.json | jq -e '.scripts[\"domain:add\"]' > /dev/null"

echo ""
log_info "🌐 Checking environment file..."
echo ""

if [ -f .env ]; then
    check ".env file exists" "true"
    check ".env contains VERCEL_TOKEN" "grep -q 'VERCEL_TOKEN=' .env"
    check ".env contains VERCEL_PROJECT_ID" "grep -q 'VERCEL_PROJECT_ID=' .env"
else
    log_warning ".env file not found (this is OK for first-time setup)"
    log_info "  Run: cp .env.example .env and configure it"
fi

echo ""
log_info "🛠️ Checking required tools..."
echo ""

check "Node.js is installed" "command -v node"
check "npm is installed" "command -v npm"
check "git is installed" "command -v git"
check "curl is installed" "command -v curl"

# ============================================================================
# OPTIONAL CHECKS
# ============================================================================
echo ""
log_info "📊 Optional checks..."
echo ""

if command -v jq &> /dev/null; then
    log_success "jq is installed (recommended for JSON parsing)"
else
    log_warning "jq is not installed (optional but recommended)"
    log_info "  Install with: brew install jq (macOS) or apt-get install jq (Linux)"
fi

if command -v vercel &> /dev/null; then
    log_success "Vercel CLI is installed"
else
    log_warning "Vercel CLI is not installed (will be auto-installed by scripts)"
fi

if command -v dig &> /dev/null; then
    log_success "dig is installed (for DNS verification)"
else
    log_warning "dig is not installed (optional for DNS verification)"
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
echo "=========================================================================="
echo "  VERIFICATION SUMMARY"
echo "=========================================================================="
echo ""
log_info "Total Checks: ${TOTAL_CHECKS}"
log_success "Passed: ${PASSED_CHECKS}"
if [ $FAILED_CHECKS -gt 0 ]; then
    log_error "Failed: ${FAILED_CHECKS}"
else
    log_success "Failed: ${FAILED_CHECKS}"
fi
echo ""

if [ $FAILED_CHECKS -eq 0 ]; then
    log_success "✨ All checks passed! Deployment system is ready."
    echo ""
    log_info "Next steps:"
    log_info "  1. Configure .env file with your credentials"
    log_info "  2. Run: npm run deploy:preview"
    echo ""
    log_info "For detailed instructions, see:"
    log_info "  - Quick Start: DEPLOYMENT_QUICKSTART.md"
    log_info "  - Full Docs:   DEPLOYMENT.md"
    echo ""
    exit 0
else
    log_warning "⚠️  Some checks failed. Please review and fix."
    echo ""
    log_info "Common issues:"
    log_info "  - Missing .env file → cp .env.example .env"
    log_info "  - Scripts not executable → chmod +x scripts/*.sh"
    log_info "  - Missing tools → Install Node.js, npm, git, curl"
    echo ""
    exit 1
fi
