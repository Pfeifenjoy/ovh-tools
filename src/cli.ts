import { Command } from "commander"

import { LoginOptionsSchema } from "./schemas/login-options.js"
import { LoggerService } from "./services/logger-service.js"
import { LoginService } from "./services/login-service.js"
import { PromptService } from "./services/prompt-service.js"

export function createCli() {
	const logger = new LoggerService()
	const promptService = new PromptService()
	const loginService = new LoginService(logger, promptService)
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version("0.0.0")

	program
		.command("login")
		.description("Login to OVH with username and password")
		.option("-u, --username <username>", "OVH username")
		.option("-p, --password <password>", "OVH password")
		.option("-t, --two-factor-token <token>", "2FA token")
		.action(async options => {
			const validatedOptions = LoginOptionsSchema.parse(options)

			await loginService.login(validatedOptions)
		})

	return {
		program
	}
}
