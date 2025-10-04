import { Command } from "commander"

import { CoreService } from "./services/core-service.js"

export async function createCli(core: CoreService) {
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version(await core.metadataService.getVersion())

	const applicationCmd = program
		.command("application")
		.description("Manage OVH applications")

	applicationCmd
		.command("create")
		.description("Create a new OVH application")
		.action(() => core.applicationService.createApplication())

	const credentialsCmd = program
		.command("credentials")
		.description("Manage OVH credentials")

	credentialsCmd
		.command("update")
		.description("Update existing credentials")
		.action(() => core.credentialsService.updateCredentials())

	const environmentCmd = program
		.command("environment")
		.description("Load credentials into environment variables")

	environmentCmd
		.command("bash")
		.description("Output bash export commands")
		.action(() => core.environmentService.bash())

	environmentCmd
		.command("zsh")
		.description("Output zsh export commands")
		.action(() => core.environmentService.zsh())

	environmentCmd
		.command("fish")
		.description("Output fish set commands")
		.action(() => core.environmentService.fish())

	environmentCmd
		.command("dotenv")
		.description("Create or update .env file")
		.action(() => core.environmentService.dotenv())

	return program
}
