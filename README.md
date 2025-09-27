# 🛠️ OVH Tools

> A powerful CLI tool for streamlined OVH development workflows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CI](https://github.com/Pfeifenjoy/ovh-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/Pfeifenjoy/ovh-tools/actions/workflows/ci.yml)

⚠️ **This project is currently in development and not yet ready for production use.**

## ✨ Features

- 🚀 Simplified OVH API interactions
- 🔧 Developer-friendly command interface
- 📦 TypeScript support with full type safety
- 🎯 Optimized for modern development workflows
- 🔐 Secure credential management with separate storage
- 🌍 Multi-region support (EU/US)

## 🚀 Installation

```bash
npm install -g ovh-tools
```

## 📖 Usage

### Create OVH Application

First, create an OVH application to get your API credentials:

```bash
ovh-tools application create
```

This will:

1. Open your browser to the OVH application creation page
2. Guide you through creating an application
3. Save your application key, secret, and region to `.ovh-tools/application.json`

### Obtain Consumer Key

After creating an application, obtain a consumer key for API access:

```bash
ovh-tools credentials update
```

This will:

1. Request a consumer key from the OVH API
2. Open your browser to validate the credentials
3. Save the consumer key to `.ovh-tools/credentials.json`

### File Structure

```
.ovh-tools/
├── application.json    # Application key, secret, region
└── credentials.json    # Consumer key for API access
```

## 🔧 Commands

| Command                        | Description                  |
| ------------------------------ | ---------------------------- |
| `ovh-tools application create` | Create a new OVH application |
| `ovh-tools credentials update` | Obtain/update consumer key   |
| `ovh-tools environment bash`   | Output bash export commands  |
| `ovh-tools environment zsh`    | Output zsh export commands   |
| `ovh-tools environment fish`   | Output fish set commands     |
| `ovh-tools environment dotenv` | Create or update .env file   |
| `ovh-tools --help`             | Show help information        |

## 🏗️ Architecture

- **Exception Hierarchy**: Custom exceptions extending BaseException
- **Service Layer**: Modular services for different concerns
- **Schema Validation**: Zod schemas for runtime type safety
- **Browser Integration**: Automatic URL opening with fallbacks
- **Secure Storage**: Separate files for different credential types

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Format code
npm run format
```

## 📝 License

MIT © [Arwed Mett](https://github.com/Pfeifenjoy)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Pfeifenjoy/ovh-tools/issues).
