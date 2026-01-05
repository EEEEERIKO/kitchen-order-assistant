# Contributing to Kitchen Order Assistant

Thank you for your interest in contributing to Kitchen Order Assistant! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** - Click the fork button on GitHub
2. **Clone your fork** - `git clone https://github.com/YOUR_USERNAME/kitchen-order-assistant.git`
3. **Create a branch** - `git checkout -b feature/amazing-feature`
4. **Make your changes** - Implement your feature or fix
5. **Commit with clear messages** - `git commit -m 'Add amazing feature'`
6. **Push to your fork** - `git push origin feature/amazing-feature`
7. **Open a Pull Request** - Describe your changes clearly

## Code Guidelines

### Style
- **Language**: TypeScript - use strict mode (`strict: true`)
- **Formatting**: 2-space indentation
- **Naming**: 
  - Components: PascalCase (e.g., `ProductForm`)
  - Functions/variables: camelCase (e.g., `encodeListForSharing`)
  - Constants: UPPER_SNAKE_CASE (e.g., `STORAGE_KEY`)

### Best Practices
- Write self-documenting code
- Remove console.log statements before committing
- Add JSDoc comments for complex functions
- Keep components small and focused
- Use TypeScript types instead of `any`

### Example Commit Messages
```
feat: Add bilingual product dictionary
fix: Resolve URL encoding for special characters
docs: Update README with examples
refactor: Simplify compression algorithm
style: Format code according to guidelines
test: Add test coverage for PDF export
```

## Code Review Process

All submissions require review before merging:
1. Code quality check (TypeScript, naming conventions)
2. Functionality validation
3. Performance impact assessment
4. Documentation completeness

## Reporting Issues

When reporting bugs, include:
- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

### Example Issue Format
```markdown
**Description**: [Clear description of the issue]

**To Reproduce**:
1. Open the app
2. Add 5 products
3. Click Share button
4. [Error occurs]

**Expected**: [What should happen]
**Actual**: [What happens instead]
**Browser**: Chrome 120 on Windows 10
```

## Feature Requests

Feature requests are welcome! Please include:
- Motivation - Why would this feature be useful?
- Implementation approach - How might it work?
- Affected users - Who would benefit?

## Development Workflow

### Setup Development Environment
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Code Quality
```bash
# Run linter
npx eslint src --fix

# Type checking
npx tsc --noEmit
```

## Project Structure

```
src/
├── App.tsx              # Main app component
├── components/          # Reusable React components
├── app/
│   └── domain/          # Business logic & data
└── assets/             # Static assets
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript 5** - Type safety
- **Vite** - Build tool
- **CSS Modules** - Component styling

## Communication

- **Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Pull Requests**: For code contributions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to:
- Open an issue labeled "question"
- Start a discussion
- Comment on existing issues

---

**Happy contributing! We look forward to your ideas and improvements.** 🚀
