# Commands

## `ovh-tools application create`

Initializes an OVH application by guiding you through the creation process and saving credentials locally.

### Usage

```bash
ovh-tools application create
```

### What it does

- Opens the OVH application creation page in your browser
- Prompts for Application Key and Application Secret
- Saves credentials to `.ovh-tools/application.json`

### Configuration File

```json
{
	"applicationKey": "your_application_key",
	"applicationSecret": "your_application_secret",
	"region": "eu"
}
```
