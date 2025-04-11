# Contributing to Islamic Education Portal

Thank you for your interest in contributing to the Islamic Education Portal! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug in the application, please create an issue with the following information:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Your environment (browser, operating system, etc.)

### Suggesting Features

We welcome suggestions for new features. Please create an issue with:

1. A clear, descriptive title
2. A detailed description of the proposed feature
3. Any relevant mockups or examples
4. Why this feature would be beneficial to the project

### Pull Requests

We actively welcome pull requests:

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Ensure your code follows the project's coding standards
5. Write or update tests as needed
6. Update documentation as needed
7. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/islamic-education-portal.git
cd islamic-education-portal
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
```

4. Run the development server
```
npm run dev
```

## Coding Standards

- Use TypeScript for type safety
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Write comments for complex logic
- Update types in `shared/schema.ts` when modifying data models

## Git Workflow

1. Create a branch for your feature or bugfix
2. Make your changes with clear, descriptive commit messages
3. Push your branch to your fork
4. Submit a pull request to the main repository

## Testing

- Write tests for new features
- Ensure all existing tests pass
- Test your changes across different browsers and devices

## Documentation

- Update documentation when adding or changing features
- Use clear and concise language
- Provide examples when applicable

## Internationalization

This project supports both English and Somali languages. When adding new user-facing text:

1. Add translations for both languages
2. Use the language context to display the appropriate text
3. Test the UI in both language modes

## Review Process

All submissions require review. We'll do our best to review your contribution as quickly as possible.

## Thank You!

Thank you for contributing to the Islamic Education Portal! Your efforts help make this educational resource better for everyone.