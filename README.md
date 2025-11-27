# Forum Diskusi React Redux App

A modern discussion forum application built with React 18, Redux Toolkit, and Tailwind CSS. Features include user authentication, thread creation, voting system, comments, and leaderboards.

## 🚀 Features

- **User Authentication**: Register, login, and persistent sessions
- **Thread Management**: Create, view, and vote on discussion threads
- **Comments**: Add comments and vote on them
- **Leaderboards**: Track top contributors
- **Category Filtering**: Filter threads by category
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components

## 📋 Prerequisites

- **Node.js** (>= 18.0.0)
- **npm** (>= 9.0.0)
- **Git**

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/gilangheavy/open-discuss-app.git
cd open-discuss-app

# Install dependencies
npm install
```

## 💻 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

## 🧪 Testing

```bash
# Run unit tests (watch mode)
npm run test

# Run all tests (CI mode)
npm run test:ci

# Run linter
npm run lint

# Run E2E tests with Cypress
npm run e2e

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🏗️ Tech Stack

### Frontend
- **React** 18 - UI library
- **Redux Toolkit** - State management
- **React Router** v6 - Routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Build Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

### Testing
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **Storybook** - Component documentation

### CI/CD
- **GitHub Actions** - Continuous Integration
- **Vercel** - Continuous Deployment

## 📁 Project Structure

```
src/
├── app/              # Redux store configuration
├── components/       # Reusable UI components
│   ├── common/       # Header, Loading, etc.
│   └── ui/           # shadcn/ui components
├── features/         # Redux slices
│   ├── auth/         # Authentication
│   ├── threads/      # Threads management
│   ├── threadDetail/ # Thread details
│   ├── users/        # Users data
│   └── leaderboards/ # Leaderboards
├── pages/            # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DetailPage.jsx
│   ├── AddThreadPage.jsx
│   └── LeaderboardPage.jsx
├── services/         # API services
│   └── api.js        # API helper functions
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 🔧 Configuration

### ESLint
The project uses ESLint with Google style guide and custom rules:
- Max line length: 150 characters
- 2-space indentation
- LF line endings

### Tailwind CSS
Custom configuration with shadcn/ui integration. See `tailwind.config.js` for details.

## 🌐 API

This app uses the Dicoding Forum API:
- Base URL: `https://forum-api.dicoding.dev/v1/`
- Documentation: [Forum API Docs](https://forum-api.dicoding.dev/v1/)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (watch mode) |
| `npm run test:ci` | Run all tests (CI mode) |
| `npm run e2e` | Run E2E tests with Cypress |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Ensure all tests pass (`npm run test:ci`)
5. Ensure lint passes (`npm run lint`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT © 2025

## 👨‍💻 Author

**Gilang Heavy**
- GitHub: [@gilangheavy](https://github.com/gilangheavy)

## 🙏 Acknowledgments

- [Dicoding](https://www.dicoding.com/) for the Forum API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
