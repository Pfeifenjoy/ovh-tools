import { Command } from "commander"

import { AuthOptionsSchema } from "./schemas/auth-options.js"
import { AuthService } from "./services/auth-service.js"
import { LoggerService } from "./services/logger-service.js"

export function createCli() {
	const logger = new LoggerService()
	const authService = new AuthService(logger)
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version("0.0.0")

	program
		.command("auth")
		.description("Generate OVH application credentials")
		.option("-r, --region <region>", "OVH region", "ovh-eu")
		.requiredOption("-n, --name <name>", "Application name")
		.requiredOption(
			"-d, --description <description>",
			"Application description"
		)
		.action(async options => {
			const validatedOptions = AuthOptionsSchema.parse(options)

			await authService.generateApplicationKey(
				validatedOptions.region,
				validatedOptions.name,
				validatedOptions.description
			)
		})

	return program
}
