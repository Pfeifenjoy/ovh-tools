# OVH Tools Documentation

Welcome to the OVH Tools documentation! This CLI tool simplifies OVH API interactions with a developer-friendly interface.

## Quick Start

1. **Install the tool:**

    ```bash
    npm install -g ovh-tools
    ```

2. **Create an OVH application:**

    ```bash
    ovh-tools application create
    ```

3. **Obtain consumer key:**
    ```bash
    ovh-tools credentials update
    ```

## File Structure

The tool creates a `.ovh-tools/` directory in your current working directory:

```
.ovh-tools/
├── application.json    # Application key, secret, region
└── credentials.json    # Consumer key for API access
```

## Architecture

- **Service Layer**: Modular services for different concerns
- **Exception Hierarchy**: Custom exceptions extending BaseException
- **Schema Validation**: Zod schemas for runtime type safety
- **Browser Integration**: Automatic URL opening with fallbacks
- **Secure Storage**: Separate files for different credential types

## Commands

See [commands.md](./commands.md) for detailed command documentation.

## Development

For development information, see the main [README.md](../README.md).
