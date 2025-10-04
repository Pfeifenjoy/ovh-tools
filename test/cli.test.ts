import { test, expect } from "@playwright/test"

import { createCli } from "../src/cli"
import { CoreService } from "../src/services/core-service"

test.describe("CLI", () => {
	test("should create a program with correct name", async () => {
		const core = new CoreService()
		const program = await createCli(core)
		expect(program.name()).toBe("ovh-tools")
	})

	test("should have correct description", async () => {
		const core = new CoreService()
		const program = await createCli(core)
		expect(program.description()).toBe(
			"CLI tool for streamlined OVH development workflows"
		)
	})

	test("should have correct version", async () => {
		const core = new CoreService()
		const program = await createCli(core)
		expect(program.version()).toBe("0.0.0")
	})
})
