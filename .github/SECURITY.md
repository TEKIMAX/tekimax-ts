# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| v0.x    | :white_check_mark: |
| < v0.1  | :x:                |

## Reporting a Vulnerability

We take the security of `tekimax-ts` seriously. If you have discovered a security vulnerability, please do not disclose it publicly until we have had a chance to fix it.

### Procedure

1.  **Private Reporting**: Please report vulnerabilities by opening a [Security Advisory](https://github.com/TEKIMAX/tekimax-ts/security/advisories/new) on GitHub. This allows us to discuss and fix the issue privately.
2.  **Email Alternative**: If you are unable to use GitHub Security Advisories, please email us at `security@tekimax.com`.

### What to Include

*   A description of the vulnerability.
*   Steps to reproduce the issue.
*   Any relevant logs or screenshots.
*   The version of `tekimax-ts` you are using.

### Our Response

*   We will acknowledge your report within **48 hours**.
*   We will provide a timeline for the fix and release.
*   We will credit you for the discovery (if desired) in our release notes.

## Zero CVE Policy

We strive to maintain **Zero CVEs** in our production builds. Our Docker images are built on hardened [Chainguard](https://www.chainguard.dev/) base images and scanned continuously.

## Security Audits

If you are an enterprise customer requiring a full security audit report or SBOM (Software Bill of Materials), please contact `enterprise@tekimax.com`.
