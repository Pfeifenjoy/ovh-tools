// Mock chalk and ovh modules
jest.mock("chalk", () => ({
	green: jest.fn(text => text),
	cyan: jest.fn(text => text),
	blue: jest.fn(text => text),
	red: jest.fn(text => text)
}))

jest.mock("ovh", () => jest.fn())

import { createCli } from "../src/cli"

describe("CLI", () => {
	it("should create a program with correct name", () => {
		const cli = createCli()
		expect(cli.program.name()).toBe("ovh-tools")
	})

	it("should have correct description", () => {
		const cli = createCli()
		expect(cli.program.description()).toBe(
			"CLI tool for streamlined OVH development workflows"
		)
	})

	it("should have correct version", () => {
		const cli = createCli()
		expect(cli.program.version()).toBe("0.0.0")
	})
})
