import chalk from "chalk"

import { LoggerService } from "./logger-service.js"
import { PromptService } from "./prompt-service.js"
import { LoginOptions } from "../schemas/login-options.js"

export class LoginService {
	constructor(
		private logger: LoggerService,
		private promptService: PromptService
	) {}

	async login(options: LoginOptions): Promise<void> {
		// Prompt for username if not provided
		const username =
			options.username || (await this.promptService.prompt("Username: "))

		// Prompt for password if not provided
		const password =
			options.password ||
			(await this.promptService.promptPassword("Password: "))

		// TODO: Implement actual OVH authentication
		// First try login without 2FA
		// If 2FA is required, then prompt for token and retry

		this.logger.info(
			chalk.yellow("🚧 OVH authentication not yet implemented")
		)
		this.logger.info(`Username: ${username}`)
		this.logger.info(`Password: ${"*".repeat(password.length)}`)

		// Only show 2FA token if it was provided via CLI
		if (options.twoFactorToken) {
			this.logger.info(`2FA Token: ${options.twoFactorToken}`)
		}
	}
}
