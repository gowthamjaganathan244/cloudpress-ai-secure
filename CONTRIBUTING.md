# Contributing

## Working method

Work on one roadmap milestone at a time.

1. Inspect the current repository and relevant documentation.
2. Write a short implementation plan.
3. Create a focused branch.
4. Make small, coherent changes.
5. Run formatting, type checking, linting, and tests.
6. Verify light and dark themes at desktop and tablet widths for UI changes.
7. Remove unused code and dependencies.
8. Open a pull request describing the outcome and verification.

## Branch naming

- `feat/<short-name>`
- `fix/<short-name>`
- `docs/<short-name>`
- `chore/<short-name>`

## Commit style

Use clear, imperative Conventional Commit-style messages, for example:

- `feat: add article status filters`
- `fix: enforce reviewer permission`
- `docs: record RAG authorisation decision`

## Code standards

- TypeScript strict mode
- no unexplained `any`
- semantic, accessible HTML
- reusable domain-focused components
- predictable error handling
- tests for meaningful behaviour
- no secrets or sensitive data
- no unrelated changes in a pull request

## Pull requests

Explain what changed, why it changed, how it was tested, security considerations, screenshots for UI changes, and remaining work.
