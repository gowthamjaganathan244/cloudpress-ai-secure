# Security Policy

## Reporting a vulnerability

Please do not open a public GitHub issue for a suspected vulnerability.

Use GitHub's private vulnerability reporting feature when it is enabled for this repository. Include:

- affected component and version or commit
- reproducible steps
- expected and actual behaviour
- potential impact
- suggested mitigation, if known

Do not include real credentials, personal data, or production customer information.

## Supported versions

This project is currently pre-release. Security fixes apply to the latest code on the default branch.

## Security expectations

- Never commit credentials, tokens, private keys, or environment files.
- Use least-privilege IAM and short-lived credentials.
- Validate authentication and authorisation independently.
- Validate and encode untrusted input.
- Treat uploaded files and retrieved knowledge as untrusted content.
- Require human approval for publication.
- Log security-relevant actions without logging secrets or sensitive content.
- Keep dependencies and infrastructure providers reviewed and updated.

## Responsible testing

Test only systems and accounts you own or are explicitly authorised to test. Avoid privacy violations, service disruption, data destruction, and social engineering.
