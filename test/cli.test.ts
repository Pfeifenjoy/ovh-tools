import { test, expect } from "@playwright/test"

import { createCli } from "../src/cli"
import { LoggerService } from "../src/services/logger-service"

test.describe("CLI", () => {
	test("should create a program with correct name", async () => {
		const logger = new LoggerService()
		const { program } = await createCli(logger)
		expect(program.name()).toBe("ovh-tools")
	})

	test("should have correct description", async () => {
		const logger = new LoggerService()
		const { program } = await createCli(logger)
		expect(program.description()).toBe(
			"CLI tool for streamlined OVH development workflows"
		)
	})

	test("should have correct version", async () => {
		const logger = new LoggerService()
		const { program } = await createCli(logger)
		expect(program.version()).toBe("0.0.0")
	})
})
