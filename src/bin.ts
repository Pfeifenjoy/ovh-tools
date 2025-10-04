#!/usr/bin/env node

import { createCli } from "./cli.js"
import { BaseException } from "./exceptions/base-exception.js"
import { CoreService } from "./services/core-service.js"

async function main() {
	const core = new CoreService()

	try {
		const program = await createCli(core)
		await program.parseAsync()
	} catch (error) {
		if (error instanceof BaseException) {
			core.logger.error(`❌ ${error.message}`)
		} else if (error instanceof Error) {
			const message = error.message
			core.logger.error(`❌ Unexpected error: ${message}`)
		}
		process.exit(1)
	}
}

main()
