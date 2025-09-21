# Commands

## `ovh-tools application create`

Creates a new OVH application and saves the credentials.

### Usage

```bash
ovh-tools application create
```

### Workflow

1. **Region Selection**: Choose between EU or US region
2. **Browser Opening**: Opens OVH application creation page
3. **Credential Collection**: Prompts for application key and secret
4. **Storage**: Saves credentials to `.ovh-tools/application.json`

### Example Output

```
Which OVH region? (eu/us): eu
🌍 Opening EU application creation page...
✅ Browser opened successfully

📝 Please create your application in the browser:
1. Login to your OVH account
2. Fill in the application name and description
3. Click 'Create'
4. Copy the Application Key and Application Secret and paste them here

Application Key: your_app_key_123
Application Secret: [hidden]
✅ Application created!
🔑 Application Key: your_app_key_123
🔐 Application Secret: ****************
🌍 Region: EU
💾 Saved to: .ovh-tools/application.json
```

## `ovh-tools credentials update`

Obtains a consumer key for API authentication.

### Usage

```bash
ovh-tools credentials update
```

### Prerequisites

- Must have an existing application (run `ovh-tools application create` first)

### Workflow

1. **API Request**: Calls OVH `/auth/credential` endpoint
2. **Browser Opening**: Opens validation URL automatically
3. **User Validation**: User validates credentials in browser
4. **Storage**: Saves consumer key to `.ovh-tools/credentials.json`

### Access Rules

The consumer key is requested with full API access:

- `GET /*` - Read access to all resources
- `POST /*` - Create new resources
- `PUT /*` - Update existing resources
- `DELETE /*` - Delete resources

### Example Output

```
🔄 Obtaining consumer key...
📋 Using application: your_app_key_123
🌍 Region: EU
🔗 Opening validation URL in browser...
✅ Browser opened successfully
Press Enter after validating your credentials...
✅ Consumer key updated!
💾 Saved to: .ovh-tools/credentials.json
```

## Global Options

### `--help`

Shows help information for the command.

```bash
ovh-tools --help
ovh-tools application --help
ovh-tools credentials --help
```

### `--version`

Shows the current version of ovh-tools.

```bash
ovh-tools --version
```
