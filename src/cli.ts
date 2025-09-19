import { Command } from "commander"

import { ApplicationService } from "./services/application-service.js"
import { LoggerService } from "./services/logger-service.js"
import { PromptService } from "./services/prompt-service.js"
import { StorageService } from "./services/storage-service.js"

export function createCli() {
	const logger = new LoggerService()
	const promptService = new PromptService()
	const storageService = new StorageService()
	const applicationService = new ApplicationService(
		logger,
		promptService,
		storageService
	)
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version("0.0.0")

	const applicationCmd = program
		.command("application")
		.description("Manage OVH applications")

	applicationCmd
		.command("create")
		.description("Create a new OVH application")
		.action(async () => {
			await applicationService.createApplication()
		})

	return {
		program
	}
}
