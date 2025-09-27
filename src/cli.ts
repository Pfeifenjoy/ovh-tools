import { Command } from "commander"

import { ApplicationService } from "./services/application-service.js"
import { CredentialsService } from "./services/credentials-service.js"
import { EnvironmentService } from "./services/environment-service.js"
import { LoggerService } from "./services/logger-service.js"
import { MetadataService } from "./services/metadata-service.js"
import { PathService } from "./services/path-service.js"
import { PromptService } from "./services/prompt-service.js"
import { StorageService } from "./services/storage-service.js"

export async function createCli(logger: LoggerService) {
	const promptService = new PromptService()
	const storageService = new StorageService()
	const pathService = new PathService()
	const metadataService = new MetadataService(pathService)
	const applicationService = new ApplicationService(
		logger,
		promptService,
		storageService
	)
	const environmentService = new EnvironmentService(
		logger,
		storageService,
		applicationService
	)
	const credentialsService = new CredentialsService(
		logger,
		promptService,
		storageService,
		applicationService
	)
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version(await metadataService.getVersion())

	const applicationCmd = program
		.command("application")
		.description("Manage OVH applications")

	applicationCmd
		.command("create")
		.description("Create a new OVH application")
		.action(() => applicationService.createApplication())

	const credentialsCmd = program
		.command("credentials")
		.description("Manage OVH credentials")

	credentialsCmd
		.command("update")
		.description("Update existing credentials")
		.action(() => credentialsService.updateCredentials())

	const environmentCmd = program
		.command("environment")
		.description("Load credentials into environment variables")

	environmentCmd
		.command("bash")
		.description("Output bash export commands")
		.action(() => environmentService.bash())

	environmentCmd
		.command("zsh")
		.description("Output zsh export commands")
		.action(() => environmentService.zsh())

	environmentCmd
		.command("fish")
		.description("Output fish set commands")
		.action(() => environmentService.fish())

	environmentCmd
		.command("dotenv")
		.description("Create or update .env file")
		.action(() => environmentService.dotenv())

	return {
		program,
		logger
	}
}
