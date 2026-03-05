# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT open a public issue

Security vulnerabilities should not be disclosed publicly until they have been addressed.

### 2. Email us directly

Send details to: security@energievergleich-nrw.de

Include:

- Type of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **24 hours**: Initial response acknowledging receipt
- **7 days**: Assessment and action plan
- **30 days**: Fix deployed (for valid vulnerabilities)

## Security Measures

### Application Security

- **HTTPS**: All traffic encrypted
- **Input Validation**: Zod schema validation
- **Sanitization**: XSS protection
- **CSRF Protection**: Token-based
- **Content Security Policy**: Restrictive CSP headers

### Data Protection

- **GDPR Compliance**: Privacy by design
- **Data Minimization**: Only necessary data collected
- **Encryption**: Data encrypted in transit and at rest
- **Access Control**: Principle of least privilege

### Infrastructure

- **Vercel**: Secure hosting platform
- **Automatic Updates**: Dependencies kept current
- **Monitoring**: Error and security monitoring
- **Backups**: Regular automated backups

## Best Practices

### For Contributors

1. **Dependencies**: Keep dependencies updated
2. **Secrets**: Never commit secrets or API keys
3. **Code Review**: All code reviewed before merge
4. **Testing**: Include security tests

### For Users

1. **Passwords**: Use strong, unique passwords
2. **Browser**: Keep browser updated
3. **Suspicious Activity**: Report immediately
4. **Personal Data**: Provide only required information

## Known Security Considerations

### Third-Party Services

- Google Analytics (optional, consent-based)
- Vercel Analytics (privacy-focused)

### Data Processing

- Form data processed server-side
- No sensitive data stored client-side
- Session data expires after 24 hours

## Security Updates

Security updates are released as soon as possible:

1. Patch developed and tested
2. Security advisory published
3. Users notified via email (if applicable)
4. Update deployed automatically

## Contact

Security Team: security@energievergleich-nrw.de

For general inquiries: kontakt@energievergleich-nrw.de
