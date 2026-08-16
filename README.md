# React Todo UI Monolith ⚡

A feature-rich, high-performance React Todo UI Monolith web application with automated GitHub Actions CI/CD deployment to GitHub Pages.

## 🚀 Features

- **Modern Visual Aesthetics**: Glassmorphism UI cards, vibrant accent gradients, and custom dark/light theme switcher.
- **Task Management**: Create, edit, delete, mark complete, and filter tasks seamlessly.
- **Priority & Categories**: Organize tasks with High, Medium, or Low priority badges and Work, Personal, Shopping, Health, and Fitness category tags.
- **Subtask Checklists**: Interactive subtask lists with real-time progress indicators.
- **Due Date Tracker**: Calendar picker with relative due date alerts ("Today", "Overdue").
- **Productivity Dashboard**: Visual SVG progress ring and stat counters for active, finished, and overdue tasks.
- **LocalStorage Persistence**: Auto-saves your tasks and theme preference locally in your browser.
- **GitHub Actions Integration**: Automated test, build, and deploy pipeline configured via `.github/workflows/main.yml`.

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (outputs to ./build)
npm run build

# 4. Preview production build locally
npm run preview
```

## 📦 Build Output
- Production bundle is generated in `./build` (configured in `vite.config.js` to match GitHub Pages deployment settings).