import { createCli } from "../src/cli"

describe("CLI", () => {
	it("should create a program with correct name", () => {
		const program = createCli()
		expect(program.name()).toBe("ovh-tools")
	})

	it("should have correct description", () => {
		const program = createCli()
		expect(program.description()).toBe(
			"CLI tool for streamlined OVH development workflows"
		)
	})

	it("should have correct version", () => {
		const program = createCli()
		expect(program.version()).toBe("0.0.0")
	})
})
