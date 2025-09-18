import { test, expect } from "@playwright/test"

import { createCli } from "../src/cli"

test.describe("CLI", () => {
	test("should create a program with correct name", () => {
		const cli = createCli()
		expect(cli.program.name()).toBe("ovh-tools")
	})

	test("should have correct description", () => {
		const cli = createCli()
		expect(cli.program.description()).toBe(
			"CLI tool for streamlined OVH development workflows"
		)
	})

	test("should have correct version", () => {
		const cli = createCli()
		expect(cli.program.version()).toBe("0.0.0")
	})
})
