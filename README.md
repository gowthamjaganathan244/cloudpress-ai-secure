# CloudPress AI Secure

> A secure, AI-powered, multi-cloud content management and enterprise knowledge platform built primarily on AWS, with selected Azure capabilities and Terraform-managed infrastructure.

![Status](https://img.shields.io/badge/status-project%20foundation-2563EB)
![AWS](https://img.shields.io/badge/primary%20cloud-AWS-FF9900)
![Terraform](https://img.shields.io/badge/IaC-Terraform-844FBA)

## Overview

CloudPress AI Secure helps organisations create, review, publish, protect, and search content. It combines a modern CMS with permission-aware retrieval-augmented generation (RAG), sensitive-data controls, responsible-AI guardrails, and auditable workflows.

This is a production-minded portfolio project demonstrating full-stack engineering, AWS architecture, security, generative AI, DevOps, and Infrastructure as Code.

## Core capabilities

- MFA authentication and role-based access control
- Article creation, editing, review, approval, and publishing
- Secure document and media management
- AI-assisted drafting, rewriting, summarisation, SEO metadata, and tagging
- Semantic search and a cited **Ask our knowledge base** experience
- Permission-aware retrieval so users receive only authorised content
- Sensitive-data detection before AI processing
- Security dashboards, audit logs, monitoring, and alerting
- Repeatable infrastructure through Terraform

## Roles

| Role | Responsibility |
|---|---|
| Admin | Platform configuration and administration |
| Security Admin | Security policy, audit, and sensitive-data oversight |
| CMS Admin | Content operations and publishing governance |
| Editor | Edit and prepare content |
| Reviewer | Review and approve changes |
| Author | Create and revise drafts |
| Read-only | Search and consume authorised knowledge |

## Architecture

AWS is the primary cloud:

- CloudFront and AWS WAF
- Amazon Cognito
- API Gateway and AWS Lambda
- DynamoDB and Amazon S3
- AWS KMS and Secrets Manager
- Amazon Bedrock, Knowledge Bases, and Guardrails
- EventBridge, SQS, SNS, and Step Functions
- CloudWatch, CloudTrail, GuardDuty, Security Hub, Macie, AWS Config, and IAM Access Analyzer

Azure is reserved for selected complementary AI/search capabilities where there is a clear technical reason. Terraform will manage reproducible infrastructure and CI/CD will enforce testing, validation, and security checks.

Read the planned design in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Planned frontend

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS
- shadcn/ui and Radix primitives where appropriate
- Zod and React Hook Form
- Accessible light and dark themes
- Responsive desktop and tablet enterprise UX

## Roadmap

1. Project foundation and design system
2. Admin application shell
3. Admin overview dashboard
4. Articles and CMS
5. Article editor and AI assistant
6. Documents and media
7. Approval workflow
8. Knowledge base
9. AI workspace and RAG administration
10. Users, roles, and permissions
11. Security dashboard and audit logs
12. Employee/user portal
13. Ask CloudPress
14. Backend and API integration
15. AWS integration
16. Terraform infrastructure
17. Azure integration and DevOps hardening

See [docs/ROADMAP.md](docs/ROADMAP.md).

## Security principles

- Least privilege by default
- Encryption in transit and at rest
- Explicit tenant- and document-level authorisation
- Permission checks before retrieval and generation
- Human approval before publishing AI-generated content
- Sensitive-data inspection before cross-cloud or model processing
- Immutable, queryable audit trails
- No secrets committed to source control

Please report vulnerabilities according to [SECURITY.md](SECURITY.md).

## Current status

**Milestone 1 — Project foundation and design system**

The next build step is the frontend foundation and admin shell.

## Author

**Gowtham Jaganathan**  
Canberra, Australia
