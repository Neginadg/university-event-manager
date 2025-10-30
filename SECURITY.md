# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in our University Event Management System, please follow these steps:

### For University-Specific Security Issues
1. **Contact University IT Security** first if the vulnerability involves:
   - University database access
   - LDAP/SSO authentication
   - Student/instructor data exposure
   - University network security

### For Application Security Issues
1. **DO NOT** create a public GitHub issue
2. Send an email to: [your-team-email@university.edu]
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if known)

### Response Timeline
- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Status Update**: Weekly until resolved
- **Resolution**: Depends on severity and complexity

### Security Best Practices for Contributors

#### Authentication & Authorization
- Never hardcode credentials in source code
- Use university-approved authentication methods only
- Implement proper role-based access control
- Validate all user inputs

#### Data Protection
- Follow university data privacy policies
- Encrypt sensitive data in transit and at rest
- Limit data access to minimum required
- Log security-relevant events

#### Dependencies
- Keep all dependencies updated
- Use `npm audit` and `pip-audit` regularly
- Review security advisories for used packages
- Remove unused dependencies

#### Development Environment
- Use `.env` files for local configuration
- Never commit sensitive environment variables
- Use HTTPS for all external communications
- Secure development databases

### Vulnerability Categories

#### High Priority
- Authentication bypass
- Data exposure (student/instructor information)
- SQL injection or similar database attacks
- Remote code execution

#### Medium Priority
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Information disclosure
- Privilege escalation

#### Low Priority
- Denial of service (application level)
- Minor information leakage
- Non-critical configuration issues

## Security Features

Our application includes:
- University LDAP/SSO integration
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement (production)
- Security headers
- Audit logging
