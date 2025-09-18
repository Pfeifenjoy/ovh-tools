import chalk from "chalk"

import { LoggerService } from "./logger-service.js"

export class AuthService {
	constructor(private logger: LoggerService) {}

	async generateApplicationKey(
		endpoint: string,
		applicationName: string,
		applicationDescription: string
	): Promise<void> {
		// TODO: Implement OVH application key generation
		this.logger.info(chalk.yellow("🚧 Feature not yet implemented"))
		this.logger.info(`Application: ${applicationName}`)
		this.logger.info(`Description: ${applicationDescription}`)
		this.logger.info(`Endpoint: ${endpoint}`)
	}
}
