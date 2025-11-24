# Forum Diskusi React Redux App

## Overview
A modern discussion forum built with **React 18**, **Redux Toolkit**, **React Router v6**, and **Tailwind CSS**. The app demonstrates authentication, thread creation, voting, and a leaderboard.

## Prerequisites
- **Node.js** (>=18) and **npm**
- **Git**

## Getting Started
```bash
# Clone the repository
git clone <repo-url>
cd react-redux-app

# Install dependencies
npm install
```

## Development
```bash
# Start the development server
npm run dev
```
The app will be available at `http://localhost:5173/`.

## Linting & Formatting
The project uses **ESLint** with a custom `max‑len` of 150 characters.
```bash
# Run lint and auto‑fix
npx eslint . --fix
```

## Building for Production
```bash
npm run build
```
The production bundle will be generated in the `dist/` folder.

## Testing
(If tests are added)
```bash
npm test
```

## Project Structure
```
src/
├─ app/            # Redux store configuration
├─ components/     # Reusable UI components
│   ├─ common/     # Header, etc.
│   └─ ...
├─ features/       # Redux slices (auth, threads, users)
├─ pages/          # Page components (Home, Login, Register, AddThread, …)
├─ services/       # API helper functions
└─ App.jsx         # Main router and layout
```

## UI Improvements
- **Card‑based forms** for Login, Register, and Add Thread pages.
- Consistent spacing, icons, and loading animations.
- Enhanced error messages with visual cues.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Ensure lint passes (`npx eslint . --fix`).
4. Open a pull request.

## License
MIT © 2025
