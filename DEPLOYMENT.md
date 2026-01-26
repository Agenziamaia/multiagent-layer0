# Vercel Deployment Automation

Complete deployment automation system for Vercel with CI/CD, custom domains, and automated testing.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Custom Domains](#custom-domains)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Configure Environment Variables

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Required variables:

- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_PROJECT_ID` - Get from Vercel project settings
- `CUSTOM_DOMAIN` - Your custom domain (optional)

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy to Preview

```bash
./scripts/deploy.sh --preview
```

### 4. Deploy to Production

```bash
./scripts/deploy.sh --production --release
```

---

## 🔧 Prerequisites

### Local Requirements

- Node.js 20.x or higher
- npm 10.x or higher
- Git
- Vercel CLI (will be auto-installed)
- curl

### Vercel Requirements

- Vercel account (free tier works)
- Vercel API token
- Vercel project configured

### GitHub Requirements (for CI/CD)

- GitHub repository
- GitHub Actions enabled
- GitHub Personal Access Token (optional)

---

## ⚙️ Configuration

### 1. Vercel Configuration

File: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### 2. Environment Variables

Create `.env` file:

```bash
# Required
VERCEL_TOKEN=your_token_here
VERCEL_PROJECT_ID=your_project_id_here

# Optional
CUSTOM_DOMAIN=yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 3. GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `CUSTOM_DOMAIN` - Custom domain (optional)
- `SLACK_WEBHOOK_URL` - Slack notifications (optional)
- `DISCORD_WEBHOOK_URL` - Discord notifications (optional)

---

## 📖 Usage

### Manual Deployment

#### Deploy to Preview Environment

```bash
./scripts/deploy.sh --preview
```

#### Deploy to Production

```bash
./scripts/deploy.sh --production
```

#### Deploy with Release Tag

```bash
./scripts/deploy.sh --production --release --release-type patch
```

Release types: `major`, `minor`, `patch`

#### Skip Tests (Quick Deploy)

```bash
./scripts/deploy.sh --preview --skip-tests
```

### Custom Domain Configuration

#### Add Custom Domain

```bash
./scripts/add-custom-domain.sh yourdomain.com
```

#### Add Custom Domain to Preview

```bash
./scripts/add-custom-domain.sh preview.yourdomain.com --preview
```

The script will:

1. Validate domain format
2. Add domain to Vercel project
3. Provide DNS configuration instructions
4. Check DNS propagation
5. Verify SSL certificate

### Command-Line Options

```bash
./scripts/deploy.sh [OPTIONS]

Options:
  --preview              Deploy to preview environment (default)
  --production, --prod   Deploy to production environment
  --skip-tests           Skip test execution
  --skip-build           Skip build process
  --release              Create a GitHub release tag
  --release-type TYPE    Release type: major, minor, patch (default: patch)
  -h, --help             Show help message
```

---

## 🔄 CI/CD Pipeline

### Workflow Triggers

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is triggered by:

1. **Push to main** - Automatic production deployment
2. **Push to develop** - Automatic preview deployment
3. **Pull Request** - Automatic preview deployment with URL comment
4. **Manual** - Choose environment via GitHub Actions UI

### Pipeline Stages

#### 1. Test & Lint

- Run linter (ESLint)
- Type check (TypeScript)
- Run unit tests with coverage
- Upload coverage to Codecov

#### 2. Build Project

- Install dependencies
- Build for production
- Upload build artifacts

#### 3. Deploy Preview

- Deploy to Vercel preview
- Comment deployment URL on PR
- Send Slack notification (if configured)

#### 4. Deploy Production

- Deploy to Vercel production
- Verify deployment health
- Create GitHub release (if tagged)
- Send Slack/Discord notifications

#### 5. Configure Custom Domain

- Add domain to project (if configured)
- Provide DNS instructions

#### 6. Health Check

- Verify deployment is accessible
- Check HTTP status codes
- Rollback on failure

#### 7. Rollback (if needed)

- Automatic rollback on failure
- Notification sent to Slack

### Manual Deployment via GitHub

1. Go to Actions tab
2. Select "Vercel Deployment" workflow
3. Click "Run workflow"
4. Choose environment (production/preview)
5. Click "Run workflow"

---

## 🌐 Custom Domains

### Adding a Custom Domain

#### Via Script

```bash
./scripts/add-custom-domain.sh yourdomain.com
```

#### Via Vercel CLI

```bash
vercel domains add yourdomain.com
```

#### Via Vercel Dashboard

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Follow DNS instructions

### DNS Configuration

#### CNAME Record (Recommended)

```
Type: CNAME
Name: yourdomain.com
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

#### A Record (Alternative)

```
Type: A
Name: yourdomain.com
Value: 76.76.21.21
TTL: 300 (or default)
```

#### Subdomains (www, app, etc.)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificates

Vercel automatically generates SSL certificates for custom domains. This typically takes:

- New domains: 5-60 minutes
- DNS propagation: Up to 24 hours

Verify SSL status at: https://vercel.com/dashboard/domains

### DNS Verification

Check DNS propagation:

```bash
# Using dig
dig yourdomain.com

# Using nslookup
nslookup yourdomain.com

# Online tools
https://dnschecker.org/
https://www.whatsmydns.net/
```

---

## 🔍 Troubleshooting

### Deployment Fails

#### Check Logs

```bash
# Vercel deployment logs
vercel logs

# GitHub Actions logs
# Go to Actions tab → Workflow run → View logs
```

#### Common Issues

**1. VERCEL_TOKEN not found**

```bash
# Verify token is set in .env
grep VERCEL_TOKEN .env

# If using CI/CD, verify GitHub secret is set
```

**2. Build fails**

```bash
# Test build locally
npm run build

# Check build logs
vercel build
```

**3. Tests fail**

```bash
# Run tests locally
npm run test

# Run with coverage
npm run test:coverage
```

### Custom Domain Issues

#### Domain Not Resolving

1. Check DNS propagation:

   ```bash
   dig yourdomain.com
   ```

2. Verify DNS records in your registrar's dashboard

3. Wait up to 24 hours for full propagation

#### SSL Certificate Pending

1. Check domain is pointing to Vercel:

   ```bash
   dig yourdomain.com +short
   # Should return Vercel IPs
   ```

2. Check SSL status in Vercel dashboard

3. Force certificate regeneration (Vercel dashboard)

### Rollback Deployment

#### Via Script

```bash
vercel rollback
```

#### Via Vercel Dashboard

1. Go to Deployments tab
2. Click on previous successful deployment
3. Click "Promote to Production"

#### Via CLI

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### Monitoring

#### Vercel Dashboard

- Deployment logs
- Analytics
- Function logs
- Error tracking

#### GitHub Actions

- Real-time workflow logs
- Artifacts
- Deployment status

#### Health Checks

```bash
# Check deployment URL
curl -I https://your-app.vercel.app

# Check custom domain
curl -I https://yourdomain.com
```

---

## 📚 Additional Resources

### Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/actions)

### Tools

- [Vercel Dashboard](https://vercel.com/dashboard)
- [DNS Checker](https://dnschecker.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### Support

- [Vercel Support](https://vercel.com/support)
- [GitHub Support](https://support.github.com/)

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` as template
2. **Rotate API tokens** - Regularly update `VERCEL_TOKEN`
3. **Use branch protection** - Require tests before merge
4. **Monitor deployments** - Set up notifications
5. **Review logs** - Check deployment logs regularly

---

## 📊 Deployment Checklist

### Before Deployment

- [ ] All tests passing
- [ ] No linting errors
- [ ] Type check passing
- [ ] Environment variables configured
- [ ] Custom domain DNS configured (if applicable)
- [ ] Documentation updated

### After Deployment

- [ ] Deployment URL accessible
- [ ] Health checks passing
- [ ] Custom domain working (if applicable)
- [ ] SSL certificate valid
- [ ] Notifications received
- [ ] Rollback plan documented

---

## 📝 Changelog

### v1.0.0 (2026-01-25)

- Initial deployment automation
- Vercel configuration
- CI/CD pipeline
- Custom domain support
- Automated testing
- Rollback on failure
- Slack/Discord notifications

---

## 📄 License

MIT License - See LICENSE file for details
