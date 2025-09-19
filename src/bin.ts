#!/usr/bin/env node

import { createCli } from "./cli.js"
import { LoggerService } from "./services/logger-service.js"

async function main() {
	const logger = new LoggerService()

	try {
		const { program } = await createCli(logger)
		await program.parseAsync()
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		logger.error(`Unexpected error: ${message}`)
		process.exit(1)
	}
}

main()
