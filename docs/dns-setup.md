# DNS Setup Guide

# Complete guide for configuring custom domains on Vercel

## 📋 Overview

This guide explains how to configure DNS records for your custom domain when deploying to Vercel. Vercel automatically manages SSL certificates, so you only need to point your domain to Vercel's DNS servers.

---

## 🔍 Prerequisites

Before starting, ensure you have:

1. ✅ **Domain ownership**: You own the domain you want to use
2. ✅ **Vercel account**: Active Vercel account with project deployed
3. ✅ **Vercel project ID**: Found in `.vercel/project.json` or Vercel dashboard
4. ✅ **Domain access**: Access to your domain's DNS management (GoDaddy, Namecheap, Cloudflare, etc.)

---

## 🚀 Quick Setup (Recommended)

### Step 1: Add Domain in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain (e.g., `yourdomain.com`)
5. Click **Add**

Vercel will provide DNS configuration details.

### Step 2: Configure DNS Records

You have two options:

#### Option A: CNAME Record (Recommended)

**Use for:** Subdomains (e.g., `www.yourdomain.com`) or root domain

| Type  | Name | Value                | TTL  |
| ----- | ---- | -------------------- | ---- |
| CNAME | www  | cname.vercel-dns.com | 3600 |

For root domain (e.g., `yourdomain.com`):

| Type  | Name | Value                | TTL  |
| ----- | ---- | -------------------- | ---- |
| CNAME | @    | cname.vercel-dns.com | 3600 |

#### Option B: A Record

**Use for:** If you need to point to specific IP addresses

| Type | Name | Value       | TTL  |
| ---- | ---- | ----------- | ---- |
| A    | @    | 76.76.21.21 | 3600 |
| A    | www  | 76.76.21.21 | 3600 |

### Step 3: Verify DNS Propagation

DNS changes can take anywhere from **5 minutes to 48 hours** to propagate globally. To verify:

```bash
# Check DNS propagation
dig yourdomain.com

# Or using nslookup
nslookup yourdomain.com

# Check specific DNS server
dig @8.8.8.8 yourdomain.com
```

You can also use online tools:

- https://www.whatsmydns.net/
- https://dnschecker.org/
- https://www.nslookup.io/

---

## 🔐 SSL/TLS Certificates

### Automatic SSL Setup

**Good news:** Vercel **automatically** provisions SSL certificates for all domains!

- ✅ **No manual certificate upload needed**
- ✅ **Uses Let's Encrypt** (free, trusted by all browsers)
- ✅ **Auto-renews** certificates before expiration
- ✅ **Forces HTTPS** - all traffic is encrypted

### SSL Certificate Status

Check your SSL status in Vercel dashboard:

1. Go to **Settings** → **Domains**
2. Find your domain
3. Check status:
   - ✅ **Valid Configuration** - DNS is correct, SSL is working
   - ⏳ **Configuring** - DNS is correct, SSL is provisioning
   - ❌ **Invalid Configuration** - DNS needs fixing

### Troubleshooting SSL Issues

If SSL shows "Configuring" for more than 24 hours:

1. **Verify DNS records** - Ensure they match Vercel's instructions exactly
2. **Check for typos** - Even one wrong character breaks SSL
3. **Wait for propagation** - DNS can take up to 48 hours globally
4. **Contact Vercel Support** - If it's been >48 hours with correct DNS

---

## 🌍 Common DNS Providers

### Cloudflare (Recommended)

If using Cloudflare, follow these steps:

1. Log in to Cloudflare dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Add CNAME record:

| Type  | Name | Content              | Proxy Status              |
| ----- | ---- | -------------------- | ------------------------- |
| CNAME | www  | cname.vercel-dns.com | ✅ Proxied (Orange Cloud) |

**Important:** Keep proxy enabled (orange cloud icon) for DDoS protection and CDN.

### GoDaddy

1. Log in to GoDaddy
2. Go to **My Products** → **DNS Management**
3. Add record:

| Type  | Name | Value                | TTL    |
| ----- | ---- | -------------------- | ------ |
| CNAME | www  | cname.vercel-dns.com | 1 hour |

### Namecheap

1. Log in to Namecheap
2. Go to **Domain List** → **Manage**
3. **Advanced DNS** → **Add New Record**

| Type         | Host | Value                | TTL       |
| ------------ | ---- | -------------------- | --------- |
| CNAME Record | www  | cname.vercel-dns.com | Automatic |

### Google Domains

1. Go to Google Domains
2. Click your domain → **DNS**
3. **Custom resource records**
4. Add:

| Type  | Host | Data                 | TTL  |
| ----- | ---- | -------------------- | ---- |
| CNAME | www  | cname.vercel-dns.com | 3600 |

---

## 📧 Email Configuration

### Using Vercel for Email

**Note:** Vercel **does not** provide email services. You have two options:

#### Option 1: Third-Party Email Provider

Use services like:

- **Google Workspace** (Gmail)
- **Microsoft 365** (Outlook)
- **Zoho Mail**
- **ProtonMail**

**Setup:**

1. Purchase email service
2. Update MX records at your domain registrar:

| Type | Host | Value         | Priority |
| ---- | ---- | ------------- | -------- |
| MX   | @    | smtp.zoho.com | 10       |
| MX   | @    | mx2.zoho.com  | 20       |
| MX   | @    | mx3.zoho.com  | 50       |

#### Option 2: Email Forwarding

Simple forwarding to existing email:

- Forward `info@yourdomain.com` → `your@gmail.com`

Configure at your domain registrar's email settings.

---

## 🔍 DNS Verification Checklist

Before deploying to production, verify:

- [ ] **DNS records configured** - CNAME or A records match Vercel instructions
- [ ] **DNS propagated** - `dig yourdomain.com` returns Vercel IPs
- [ ] **SSL certificate** - Shows "Valid Configuration" in Vercel dashboard
- [ ] **HTTPS works** - Visit `https://yourdomain.com` (should load without warnings)
- [ ] **WWW redirect** - Both `yourdomain.com` and `www.yourdomain.com` work
- [ ] **Email configured** (if needed) - MX records set correctly

---

## ⚡ Advanced Configuration

### Subdomains

You can configure multiple subdomains:

| Subdomain           | DNS Record Type | Value                |
| ------------------- | --------------- | -------------------- |
| app.yourdomain.com  | CNAME           | cname.vercel-dns.com |
| blog.yourdomain.com | CNAME           | cname.vercel-dns.com |
| api.yourdomain.com  | CNAME           | cname.vercel-dns.com |

Each subdomain can point to a different Vercel project.

### Apex Domain (Root Domain)

To use root domain (`yourdomain.com`), you need:

1. **CNAME flattening** (recommended):
   - Add CNAME record: `@` → `cname.vercel-dns.com`

2. **A record fallback** (if CNAME not supported):
   - Add A record: `@` → `76.76.21.21`

### WWW Redirect

Ensure both `yourdomain.com` and `www.yourdomain.com` work:

**Option 1:** Add both DNS records (recommended):

- CNAME: `@` → `cname.vercel-dns.com`
- CNAME: `www` → `cname.vercel-dns.com`

**Option 2:** Redirect via Vercel:

1. Go to Vercel project **Settings** → **Domains**
2. Add both `yourdomain.com` and `www.yourdomain.com`
3. Vercel will automatically handle redirect

---

## 🛡️ Security Best Practices

### DNS Security

1. **Enable DNSSEC** (if your registrar supports it)
   - Cryptographic verification of DNS responses
   - Prevents DNS spoofing attacks

2. **Use Cloudflare** (recommended)
   - DDoS protection
   - CDN acceleration
   - WAF (Web Application Firewall)

3. **Lock DNS records** (if supported)
   - Prevents unauthorized changes
   - Requires manual unlock to modify

### HTTPS Enforcement

Vercel automatically:

- ✅ Redirects HTTP → HTTPS
- ✅ Uses HSTS (HTTP Strict Transport Security)
- ✅ Enables modern TLS 1.3

No additional configuration needed!

---

## 🐛 Troubleshooting

### Issue: DNS Propagation Taking Too Long

**Symptoms:**

- Site works for some, not for others
- `dig` shows old DNS values

**Solutions:**

1. Wait 48 hours (maximum propagation time)
2. Clear browser DNS cache:
   - Chrome: `chrome://net-internals/#dns`
   - Firefox: About:preferences → Privacy & Security → Clear Data
3. Flush local DNS:
   - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - Linux: `sudo systemd-resolve --flush-caches`
   - Windows: `ipconfig /flushdns`

### Issue: "Invalid Configuration" in Vercel

**Symptoms:**

- Vercel shows DNS error
- Site doesn't load

**Solutions:**

1. Verify DNS records match Vercel instructions exactly
2. Check for typos in domain names
3. Ensure no conflicting A/CNAME records
4. Remove old records if switching providers
5. Contact Vercel support if correct but still invalid

### Issue: SSL Certificate Not Provisioning

**Symptoms:**

- SSL status stays "Configuring" for >24 hours
- Browser shows "Not Secure" warning

**Solutions:**

1. Verify DNS is 100% correct
2. Wait up to 48 hours for SSL to generate
3. Check if domain is on Cloudflare (disable SSL in Cloudflare)
4. Try removing and re-adding domain in Vercel
5. Check domain lock status (unlocked domains work faster)

---

## 📞 Support

### Vercel Support

- **Documentation:** https://vercel.com/docs/domains
- **Support:** https://vercel.com/support
- **Status Page:** https://vercel-status.com/

### Additional Resources

- **DNS Propagation Checker:** https://www.whatsmydns.net/
- **SSL Certificate Checker:** https://www.ssllabs.com/ssltest/
- **MX Record Lookup:** https://mxtoolbox.com/

---

## ✅ Final Checklist

Before going live:

- [ ] DNS records configured correctly
- [ ] DNS propagated globally (wait 48 hours)
- [ ] SSL certificate shows "Valid"
- [ ] HTTPS works without browser warnings
- [ ] Both root domain and www work
- [ ] Email configured (if needed)
- [ ] Tested all functionality (checkout, forms, etc.)
- [ ] Set up monitoring (e.g., UptimeRobot)
- [ ] Configured backups

---

**Last Updated:** 2026-01-25
**Maintained By:** Infrastructure Team
