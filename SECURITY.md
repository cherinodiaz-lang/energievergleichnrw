# Security Policy

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it to:

📧 **Email:** cherinodiaz@outlook.com

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## Security Measures

### Automated Security Scanning

✅ **NPM Audit** - Weekly automated scans
✅ **Dependabot** - Automatic security updates
✅ **Snyk** - Continuous vulnerability monitoring (optional)
✅ **GitHub Security Advisories** - Automatic alerts

### CI/CD Security Checks

Every commit triggers:
- Dependency vulnerability scan
- Outdated package check
- Security audit report

### Manual Security Checks

```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix all issues (including breaking changes)
npm audit fix --force

# Check outdated packages
npm outdated

# Update packages
npm update

# Run custom security script
node scripts/security-check.js
```

---

## Vulnerability Response

### Timeline

- **Critical:** Fix within 24 hours
- **High:** Fix within 7 days
- **Moderate:** Fix within 30 days
- **Low:** Fix in next release cycle

### Process

1. **Detection:** Automated scan or manual report
2. **Assessment:** Evaluate severity and impact
3. **Fix:** Apply patch or update dependency
4. **Test:** Verify fix doesn't break functionality
5. **Deploy:** Push to production
6. **Notify:** Update security advisory

---

## Dependencies

### Update Strategy

- **Patch updates** (x.x.X): Auto-merge via Dependabot
- **Minor updates** (x.X.x): Review + manual merge
- **Major updates** (X.x.x): Thorough testing required

### Trusted Sources

We only use dependencies from:
- ✅ Official npm registry
- ✅ Verified publishers
- ✅ Active maintenance (updated within 6 months)
- ✅ Good community reputation

---

## Environment Security

### Secrets Management

- ✅ All API keys in GitHub Secrets
- ✅ No secrets in code/commits
- ✅ Environment-specific configs
- ✅ .env files in .gitignore

### Production

- ✅ HTTPS only
- ✅ CSP headers
- ✅ Rate limiting
- ✅ Input validation
- ✅ XSS prevention

---

## Best Practices

### Code

- ✅ Input sanitization
- ✅ Output encoding
- ✅ Parameterized queries
- ✅ Error handling (no sensitive info in errors)

### Dependencies

- ✅ Lock file committed (package-lock.json)
- ✅ Regular updates
- ✅ Minimal dependencies
- ✅ Audit before adding new deps

### CI/CD

- ✅ Security scans in pipeline
- ✅ No secrets in logs
- ✅ Signed commits (optional)
- ✅ Protected branches

---

## Monitoring

### GitHub Security

- [Security Advisories](https://github.com/cherinodiaz-lang/energievergleichnrw/security/advisories)
- [Dependabot Alerts](https://github.com/cherinodiaz-lang/energievergleichnrw/security/dependabot)
- [Code Scanning](https://github.com/cherinodiaz-lang/energievergleichnrw/security/code-scanning)

### Actions

- [Security Audit Workflow](https://github.com/cherinodiaz-lang/energievergleichnrw/actions/workflows/security-audit.yml)

---

## Version Support

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | ✅ Active support  |
| 1.x.x   | ⚠️ Security only   |
| < 1.0   | ❌ No support      |

---

## Contact

For security concerns:
📧 cherinodiaz@outlook.com
🔗 [GitHub Issues](https://github.com/cherinodiaz-lang/energievergleichnrw/issues) (for non-sensitive issues)

---

**Last Updated:** March 2026
