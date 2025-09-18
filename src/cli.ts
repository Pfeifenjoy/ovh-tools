import { Command } from "commander"

export function createCli() {
	const program = new Command()

	program
		.name("ovh-tools")
		.description("CLI tool for streamlined OVH development workflows")
		.version("0.0.0")

	return program
}
