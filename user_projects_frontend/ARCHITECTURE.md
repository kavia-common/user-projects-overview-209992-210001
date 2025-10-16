# Architecture

## System Overview

The application is a React-based frontend that lists projects for an authenticated user. It uses a mock authentication context and a mock data service instead of a real backend. The UI follows the Ocean Professional theme with a focus on simplicity and performance.

## Containers and Dependencies

- Frontend container: user_projects_frontend (React, CRA)
- Dependencies: user_projects_db (referenced at the project level but not included in this repository)
- No backend service exists in this repo; all data is currently mocked in the frontend.

## Application Architecture

- React functional components and hooks
- App composition:
  - AuthProvider (mock user provider) wraps the app
  - Navbar (top-level)
  - ProjectsPage (main content)
- Data Layer:
  - services/projects.js defines sample data, a fetchProjects function simulating an API, and a useProjects hook for consumption

Key modules:
- src/App.js: Root composition
- src/context/AuthContext.jsx: Mock auth context and hook
- src/services/projects.js: Mock data and data-fetch hook
- src/pages/ProjectsPage.jsx: Fetching and presentation orchestration
- src/components/Navbar.jsx / ProjectCard.jsx: Presentation components
- src/index.css and src/styles/theme.css: Design tokens and base styles

## Component Map and Responsibilities

- App
  - Sets up AuthProvider
  - Renders Navbar and ProjectsPage
- Navbar
  - Displays app title and user info (initials)
- ProjectsPage
  - Uses useProjects to load data
  - Manages responsive grid layout and skeletons
  - Renders error and empty states
- ProjectCard
  - Displays project name, description, updated date, and status badge
- AuthProvider / useAuth
  - Provides a mock authenticated user object

## Data Layer

- fetchProjects(): Simulates an API call with a short delay and optional failure path controlled by URL parameter (?error=1).
- useProjects(): Hook that encapsulates async loading, error handling, and refetch logic. Returns { data, loading, error, refetch }.

Migration path to real API:
- Introduce an API client module that reads REACT_APP_API_BASE_URL.
- Swap fetchProjects implementation to call the API.
- Keep useProjects as the consumer API for components.

## State Management

- AuthContext provides user state globally (mocked data).
- Local component state is used in useProjects for loading, error, and data.
- No global state management library is used; scale can be addressed later with Context, Redux Toolkit, or Zustand if needed.

## Error Handling and Loading States

- Loading: ProjectsPage shows skeleton card placeholders.
- Error: ProjectsPage displays a card-styled alert with a retry button calling refetch.
- Simulated error path via ?error=1 for local testing and demos.

## Styling System

- Design tokens and utilities are defined in src/index.css.
- A separate theme variable file exists at src/styles/theme.css with overlapping tokens.
- Components mostly use inline styles leveraging variables; some class-based styles (card, badge, skeleton) are in index.css.
- Known duplication: tokens appear in both index.css and styles/theme.css. Consolidation into a single source (prefer index.css) is recommended.

## Build and Tooling

- Create React App with react-scripts for build and dev server.
- Jest and React Testing Library configured via CRA; src/setupTests.js includes jest-dom.
- ESLint:
  - CRA default config in package.json ("extends": "react-app").
  - Additional flat config file eslint.config.mjs adds rules and React plugin.
  - Recommendation: consolidate to one approach to avoid confusion; prefer CRA default or a single flat config.

## Security and Privacy Considerations

- No real authentication or network calls; user data is mocked.
- When adding a real API:
  - Do not commit secrets. Use environment variables prefixed with REACT_APP_ and CI secrets.
  - Consider token storage risks; prefer in-memory or HttpOnly cookies for session.
  - Validate and sanitize all data rendered in the UI.
  - Apply CORS configurations appropriately in the backend.

## Known Gaps and Future Design

- API client: Implement a typed client or simple wrapper using fetch with base URL from REACT_APP_API_BASE_URL.
- Auth provider: Replace mock context with a provider that integrates with an identity solution, offering login/logout flows and token management.
- Routing: Add react-router to support multiple views (project details, settings).
- Theming: Centralize tokens, consider a theme file and CSS layering strategy; reduce inline style duplication by moving repeated rules to CSS classes.
- Accessibility: Expand keyboard interactions and ARIA labeling for interactive cards and menus.
- Testing: Replace default failing test with meaningful tests for ProjectsPage and ProjectCard; add hook tests for useProjects.
