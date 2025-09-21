import { Command } from "commander"

import { ApplicationService } from "./services/application-service.js"
import { CredentialsService } from "./services/credentials-service.js"
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

	return {
		program,
		logger
	}
}
