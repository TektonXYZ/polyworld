# Contributing to PolyWorld

Thank you for your interest in contributing to PolyWorld! This document provides guidelines for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/polyworld.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -m "Add: your feature description"`
6. Push: `git push origin feature/your-feature-name`
7. Open a Pull Request

## 📋 Code Standards

### JavaScript/React
- Use ESLint configuration
- Follow React best practices
- Comment complex logic
- Use meaningful variable names

### Rust (Smart Contracts)
- Follow Anchor framework conventions
- Add tests for new features
- Document all public functions
- Run `cargo fmt` before committing

### Git Commit Messages
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding tests
- `refactor:` Code refactoring
- `security:` Security improvements

## 🧪 Testing

Before submitting PR:
```bash
# Frontend
cd public && npm test

# Backend
cd backend && npm test

# Smart Contracts
cd anchor && anchor test
```

## 🔒 Security

- Never commit private keys or API tokens
- Report security issues privately
- Follow smart contract best practices

## 📞 Questions?

- Open an issue for bugs
- Join Discord for discussions
- Email: dev@polyworld.game

## 🎉 Recognition

Contributors will be listed in our README!
