# Contributing to PolyWorld

First off, thank you for considering contributing to PolyWorld! It's people like you that make this project great.

## 🚀 Getting Started

### Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/polyworld.git
   cd polyworld
   ```

3. **Install dependencies**
   ```bash
   cd public && npm install
   cd ../backend && npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run locally**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd public && npx serve .
   ```

## 📝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Browser** and version
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

## 💡 Suggesting Features

We love new ideas! Please:

- Check if the feature already exists
- Explain the use case
- Describe the solution you'd like
- Consider alternatives

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 🔧 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clear, concise code
   - Add comments where needed
   - Update documentation

3. **Test your changes**
   - Ensure the app runs
   - Check console for errors
   - Test on different screen sizes

4. **Commit with clear messages**
   ```bash
   git commit -m "Add: New continent filter feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe what you changed
   - Reference any related issues
   - Add screenshots if UI-related

## 🎨 Style Guidelines

### JavaScript/React
- Use functional components
- Use hooks (useState, useEffect, etc.)
- Destructure props
- Use meaningful variable names

### CSS
- Use camelCase for classNames
- Prefer flexbox/grid
- Mobile-first approach

### Git Commit Messages
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for modifications
- `Remove:` for deletions
- `Refactor:` for code restructuring

## 🏷️ Issue Labels

| Label | Meaning |
|-------|---------|
| `bug` | Something isn't working |
| `enhancement` | New feature request |
| `good first issue` | Great for newcomers |
| `help wanted` | Extra attention needed |
| `documentation` | Docs improvement |

## 🙋 Questions?

- Open a [Discussion](https://github.com/TektonXYZ/polyworld/discussions)
- Join our Discord (coming soon)
- Email: hello@polyworld.game

## 🎉 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Invited to contributor Discord channel

Thank you for making PolyWorld better! 🌍
