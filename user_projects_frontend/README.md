# Projects Overview Frontend

A lightweight React application that lists all existing projects for an authenticated user. The UI follows the Ocean Professional theme with a clean navbar and a card-based project grid. The current implementation uses mocked authentication and a mock data service for projects.

## Features and Screens

- Projects listing page with responsive card grid
- Ocean Professional theme (blue primary, subtle gradients, soft shadows)
- Skeleton loading states and user-friendly error presentation
- Mock authentication context providing a sample user
- Simple navbar with user initials avatar
- Simulated error path using URL query parameter (?error=1)

## Tech Stack

- React 18 with Create React App tooling
- CSS with design tokens (CSS variables)
- Jest and React Testing Library (CRA defaults) for testing
- ESLint (CRA defaults) plus a local flat config file

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm 8+ recommended

### Install
```bash
cd user-projects-overview-209992-210001/user_projects_frontend
npm install
```

### Run (development)
```bash
npm start
```
Open http://localhost:3000 in your browser.

### Build (production)
```bash
npm run build
```

## Environment Variables

There are currently no required environment variables. The app uses a local mock service for projects.

Recommended future variable for real backend integration:
- REACT_APP_API_BASE_URL: Base URL for the API server (e.g., https://api.example.com)

Example .env for future:
```
REACT_APP_API_BASE_URL=https://api.example.com
```

## Project Structure

```
user_projects_frontend/
├─ package.json
├─ eslint.config.mjs
├─ src/
│  ├─ index.js                # CRA entry point
│  ├─ index.css               # Global tokens, layout utilities, base styles
│  ├─ App.js                  # Root composition (Navbar + Projects)
│  ├─ App.css                 # Minimal app-level styles
│  ├─ setupTests.js           # Jest-DOM setup
│  ├─ context/
│  │  └─ AuthContext.jsx      # Mock auth provider and hook
│  ├─ components/
│  │  ├─ Navbar.jsx           # Top navbar with user initials
│  │  └─ ProjectCard.jsx      # Project card UI
│  ├─ pages/
│  │  └─ ProjectsPage.jsx     # Page: data fetching + grid rendering
│  ├─ services/
│  │  └─ projects.js          # Mock data + useProjects hook
│  └─ styles/
│     └─ theme.css            # Theme variables (duplicated with index.css tokens)
```

## Available Scripts

- npm start: Start development server
- npm run build: Build for production
- npm test: Run tests in watch mode (CRA)
- npm run eject: Eject CRA (not recommended)

Optional (local convention):
- npm run lint: Use ESLint (if you add a script)
- npm run format: Use Prettier (if you add a script)

## Testing

This project includes CRA’s Jest and React Testing Library setup via src/setupTests.js.

The default CRA test (src/App.test.js) looks for a “learn react” link, which does not exist in this UI and will fail by default. Update or replace this test to reflect the app’s actual UI, e.g., assert that “Projects Overview” or “Your Projects” is present.

Example direction to fix:
- Replace the default assertion with an expectation for the heading “Your Projects”, rendered by ProjectsPage.

Run tests:
```bash
npm test
```

## Styling and Theme

The Ocean Professional palette:
- Primary: #3b82f6
- Secondary: #64748b
- Success: #06b6d4
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Design tokens are defined as CSS variables in src/index.css and also in src/styles/theme.css. There is duplication; prefer consolidating all tokens in a single file (recommended: src/index.css) and remove duplication.

UI patterns:
- Navbar at top with application title and user initials
- Main content uses container layout with a responsive project grid
- Cards use subtle shadows, rounded corners, and transitions
- Skeletons show loading shimmer effect

## Simulating States

- Loading: visible immediately upon navigation to the page
- Error: append ?error=1 to the URL to simulate an API error using the mock service
  - Example: http://localhost:3000/?error=1

## Roadmap

- Integrate real API using REACT_APP_API_BASE_URL and an API client abstraction
- Replace mock AuthContext with a real auth provider (e.g., OAuth/OIDC)
- Add routing and project detail view (modal or route)
- Expand test coverage for components, hooks, and error states
- Add CI workflow (lint, test, build) and pre-commit hooks
- Consolidate ESLint config (avoid double configs) and add Prettier
- Consolidate theme variables into a single source of truth
- Accessibility improvements and keyboard interactions for cards and menus
