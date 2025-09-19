# OVH Tools Documentation

Welcome to the OVH Tools documentation! This CLI tool helps streamline OVH development workflows.

## Getting Started

### Installation

```bash
npm install -g ovh-tools
```

### Quick Start

Create your first OVH application:

```bash
ovh-tools application create
```

## Available Commands

- [`application create`](./commands.md#ovh-tools-application-create) - Create a new OVH application

## Configuration

OVH Tools stores configuration files in the `.ovh-tools` directory in your current working directory:

- `application.json` - OVH application credentials

## Regions

OVH Tools supports both OVH regions:

- **EU** - European region (`https://eu.api.ovh.com`)
- **US** - US region (`https://api.us.ovhcloud.com`)

## Security

- Application secrets are masked in output
- Configuration files are automatically added to `.gitignore`
- Credentials are validated using Zod schemas
