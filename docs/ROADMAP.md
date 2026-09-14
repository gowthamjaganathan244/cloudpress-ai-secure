# Delivery Roadmap

Every milestone follows the same quality gate: inspect, plan, implement, run, type-check, lint, test, inspect the UI, verify light/dark themes and desktop/tablet layouts, remove weak code, and document the result.

## Phase 1 — Product foundation

- [x] Milestone 1: Project foundation and design system
- [x] Milestone 2: Admin application shell — implemented locally; awaiting review
- [ ] Milestone 3: Admin overview dashboard

**Outcome:** coherent architecture, tokens, typography, navigation, accessible themes, reusable components, and a responsive enterprise shell.

Milestone 2 delivers the `/admin` route boundary, desktop sidebar preference,
tablet/mobile drawer, active links and breadcrumbs, demo account disclosure,
keyboard page finder, safe system/light/dark preferences, planned-page states,
and error/not-found/loading fallbacks. Dashboard content remains fictional demo
data. Chrome interaction tests cover all admin destinations and both themes at
768, 1024, 1280, 1440, and 1920 pixels. See [the handoff](MILESTONE-2.md) for
verification details and unverified cases. Milestone 3 remains unstarted.

## Phase 2 — Core CMS

- [ ] Milestone 4: Articles and CMS
- [ ] Milestone 5: Article editor and AI assistant
- [ ] Milestone 6: Documents and media
- [ ] Milestone 7: Approval workflow

**Outcome:** authors can create content, collaborate through controlled review, manage assets, and publish approved material.

## Phase 3 — Knowledge and AI

- [ ] Milestone 8: Knowledge base
- [ ] Milestone 9: AI workspace and RAG administration
- [ ] Milestone 13: Ask CloudPress

**Outcome:** authorised users can search and ask questions with grounded answers and citations.

## Phase 4 — Governance

- [ ] Milestone 10: Users, roles, and permissions
- [ ] Milestone 11: Security dashboard and audit logs
- [ ] Milestone 12: Employee/user portal

**Outcome:** role-aware experiences, permission governance, visible security posture, and reliable auditability.

## Phase 5 — Cloud delivery

- [ ] Milestone 14: Backend and API integration
- [ ] Milestone 15: AWS integration
- [ ] Milestone 16: Terraform infrastructure
- [ ] Milestone 17: Azure integration and DevOps hardening

**Outcome:** repeatable cloud environments, production controls, observability, and a documented multi-cloud boundary.

## MVP definition

The first deployable MVP includes authentication, Admin/Editor roles, article CRUD, draft-to-published workflow, secure uploads, a public published-content experience, API Gateway, Lambda, DynamoDB, S3, Cognito, and baseline Terraform.

AI, RAG, extended roles, security analytics, and Azure integration follow after the core workflow is reliable.
