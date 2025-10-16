# Contributing Guide

## How to Contribute

We welcome improvements via bug fixes, tests, documentation, and new features that align with the project roadmap. Please open an issue to discuss larger changes before submitting a PR.

## Local Setup

1. Requirements:
   - Node.js 18+
   - npm 8+
2. Install dependencies:
   ```bash
   cd user-projects-overview-209992-210001/user_projects_frontend
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```

## Branching Strategy and Commit Style

- Create feature branches from main: feature/short-description, fix/bug-description, docs/topic.
- Keep commits focused and descriptive. Use the imperative mood (e.g., "Add ProjectCard tests").
- Optional Conventional Commits (recommended): feat:, fix:, docs:, style:, refactor:, test:, chore:.

## Code Style

- ESLint:
  - CRA provides a default ESLint configuration via "extends": "react-app".
  - There is also a local flat ESLint config (eslint.config.mjs). To avoid confusion, we recommend consolidating to a single source:
    - Either rely on CRA’s config only, or
    - Fully adopt the flat config and remove CRA’s eslintConfig entry from package.json.
- Prettier:
  - Prettier is not configured by default. We recommend adding it for consistent formatting.
  - Suggested script: "format": "prettier --write ."
- General guidance:
  - Prefer functional components and hooks.
  - Keep components small and focused.
  - Move repeated inline styles to CSS classes when practical.
  - Use CSS variables (design tokens) for colors, spacing, and shadows.

## Testing Requirements and Examples

- Replace the default CRA test which looks for “learn react” with assertions that reflect our UI.
- Minimum expectations for new code:
  - Unit tests for pure utilities and hooks (e.g., useProjects behavior).
  - Component tests for ProjectsPage error/loading/empty states and ProjectCard rendering.
- Run tests:
  ```bash
  npm test
  ```
- Example expectations:
  - Renders heading “Your Projects”.
  - When URL has ?error=1, shows error card and “Try again” button.
  - ProjectCard shows name, description, status badge, and updated date.

## Accessibility Checklist

- Provide descriptive labels and roles for interactive elements.
- Ensure focus visibility; maintain keyboard navigation support.
- Use semantic HTML where possible (e.g., header, main, article).
- Verify color contrast according to WCAG AA using theme colors.
- Add aria-live regions for dynamic content updates where appropriate.

## Review Process and Definition of Done

- PR includes:
  - Clear description of changes and screenshots for UI updates.
  - Tests passing locally and in CI.
  - Lint and (if added) format checks passing.
- Definition of Done:
  - Meets acceptance criteria and roadmap direction.
  - Includes appropriate tests and documentation updates.
  - No console errors/warnings in the browser for new code.

## Issue Templates and Feature Requests

- When filing issues, include:
  - Summary, steps to reproduce (if applicable), expected vs actual behavior.
  - Proposed solution or alternatives.
- Feature requests:
  - Explain the user value and example use cases.
  - Note any dependencies (API, auth) and design considerations.

## Theming Note

We use the Ocean Professional theme:
- Primary: #3b82f6, Secondary: #64748b, Success: #06b6d4, Error: #EF4444, Background: #f9fafb, Surface: #ffffff, Text: #111827
There is duplication between src/index.css and src/styles/theme.css. Contributors are encouraged to consolidate tokens into a single file to ensure consistency.
