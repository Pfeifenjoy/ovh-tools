#!/usr/bin/env node

import { createCli } from "./cli.js"
import { BaseException } from "./exceptions/base-exception.js"
import { LoggerService } from "./services/logger-service.js"

async function main() {
	const logger = new LoggerService()

	try {
		const { program } = await createCli(logger)
		await program.parseAsync()
	} catch (error) {
		if (error instanceof BaseException) {
			logger.error(`❌ ${error.message}`)
		} else if (error instanceof Error) {
			const message = error.message
			logger.error(`❌ Unexpected error: ${message}`)
		}
		process.exit(1)
	}
}

main()
