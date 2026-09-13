# Architecture

## Goals

CloudPress AI Secure is AWS-first, secure by default, event-driven where useful, and designed to evolve from a portfolio MVP into a production SaaS platform.

## Logical flow

1. Users access the admin or employee portal through CloudFront.
2. AWS WAF filters malicious or abnormal traffic.
3. Amazon Cognito authenticates users with MFA and provides role claims.
4. API Gateway validates requests and invokes least-privilege Lambda functions.
5. DynamoDB stores structured application metadata; S3 stores documents and media.
6. EventBridge, SQS, SNS, and Step Functions coordinate asynchronous workflows.
7. Bedrock provides content assistance, guarded generation, and permission-aware RAG.
8. Security and operational events flow to CloudWatch, CloudTrail, GuardDuty, Security Hub, AWS Config, Macie, and IAM Access Analyzer.

## Application domains

- Identity and access
- Articles and publishing
- Documents and media
- Approval workflows
- Knowledge and retrieval
- AI assistance
- Users and permissions
- Security and audit

Domain boundaries should remain clear in the frontend, API, infrastructure, and tests.

## Data protection

- Encrypt data in transit and at rest.
- Apply tenant, role, and resource-level authorisation on every request.
- Store secrets only in managed secret stores.
- Inspect sensitive content before AI or cross-cloud processing.
- Filter RAG retrieval before generation, not only after generation.
- Record content, permission, workflow, and AI actions in audit logs.
- Keep AI-assisted publication human-controlled.

## Multi-cloud boundary

AWS hosts the core application and remains the system of record. Azure integrations are optional adapters for selected search or AI capabilities. Only the minimum required content may cross the boundary, using encryption, managed identities or short-lived credentials, explicit allow-lists, and traceable requests.

## Planned deployment model

Terraform modules will manage separate development, staging, and production environments. CI/CD will run formatting, type checking, tests, dependency checks, infrastructure validation, and security scanning before controlled deployment.

## Architecture decisions

Material technical choices will be recorded as Architecture Decision Records in `docs/decisions/`.
