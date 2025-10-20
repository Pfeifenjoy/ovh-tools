import { from } from "ix/asynciterable"
import { map } from "ix/asynciterable/operators"

import { ApplicationService } from "./application-service.js"
import { LoggerService } from "./logger-service.js"
import { StorageService } from "./storage-service.js"

type EnvironmentVariable = {
	key: string
	value: string
}

/**
 * Service for loading OVH credentials into environment variables.
 */
export class EnvironmentService {
	constructor(
		private logger: LoggerService,
		private storageService: StorageService,
		private applicationService: ApplicationService
	) {}

	/**
	 * Loads consumer key credentials from credentials.json.
	 * Throws CredentialsNotFoundException if file doesn't exist.
	 */
	public async requireCredentials() {
		const application = await this.applicationService.requireApplication()
		const credentials = await this.storageService.requireCredentials()

		const endpoint = application.region === "us" ? "ovh-us" : "ovh-eu"

		return {
			applicationKey: application.applicationKey,
			applicationSecret: application.applicationSecret,
			consumerKey: credentials.consumerKey,
			endpoint
		}
	}

	/**
	 * Outputs bash export commands for environment variables.
	 */
	async bash(): Promise<void> {
		const credentials = await this.requireCredentials()

		// Use console.log to print directly to stdout, not winston logging
		// eslint-disable-next-line no-console
		console.log(
			`export OVH_APPLICATION_KEY="${credentials.applicationKey}"`
		)
		// eslint-disable-next-line no-console
		console.log(
			`export OVH_APPLICATION_SECRET="${credentials.applicationSecret}"`
		)
		// eslint-disable-next-line no-console
		console.log(`export OVH_CONSUMER_KEY="${credentials.consumerKey}"`)
		// eslint-disable-next-line no-console
		console.log(`export OVH_ENDPOINT="${credentials.endpoint}"`)
	}

	/**
	 * Outputs zsh export commands for environment variables.
	 */
	async zsh(): Promise<void> {
		const credentials = await this.requireCredentials()

		// Use console.log to print directly to stdout, not winston logging
		// eslint-disable-next-line no-console
		console.log(
			`export OVH_APPLICATION_KEY="${credentials.applicationKey}"`
		)
		// eslint-disable-next-line no-console
		console.log(
			`export OVH_APPLICATION_SECRET="${credentials.applicationSecret}"`
		)
		// eslint-disable-next-line no-console
		console.log(`export OVH_CONSUMER_KEY="${credentials.consumerKey}"`)
		// eslint-disable-next-line no-console
		console.log(`export OVH_ENDPOINT="${credentials.endpoint}"`)
	}

	/**
	 * Outputs fish set commands for environment variables.
	 */
	async fish(): Promise<void> {
		const credentials = await this.requireCredentials()

		// Use console.log to print directly to stdout, not winston logging
		// eslint-disable-next-line no-console
		console.log(
			`set -x OVH_APPLICATION_KEY "${credentials.applicationKey}"`
		)
		// eslint-disable-next-line no-console
		console.log(
			`set -x OVH_APPLICATION_SECRET "${credentials.applicationSecret}"`
		)
		// eslint-disable-next-line no-console
		console.log(`set -x OVH_CONSUMER_KEY "${credentials.consumerKey}"`)
		// eslint-disable-next-line no-console
		console.log(`set -x OVH_ENDPOINT "${credentials.endpoint}"`)
	}

	private processLine(
		line: string,
		newVariables: Record<string, EnvironmentVariable>,
		processedVariables: Set<string>
	): string {
		const trimmedLine = line.trim()
		if (trimmedLine && !trimmedLine.startsWith("#")) {
			return line
		}

		const [key, ...valueParts] = trimmedLine.split("=")

		if (!(key && valueParts.length > 0)) {
			return line
		}

		const variable = { key, value: valueParts.join("=") }

		const newValue = newVariables[variable.key]

		if (!newValue) {
			return line
		} else {
			processedVariables.add(variable.key)
		}

		return `${variable.key}=${variable.value}`
	}

	/**
	 * Creates or updates a .env file with environment variables.
	 */
	public async dotenv(): Promise<void> {
		this.logger.info("🔄 Updating .env file...")

		const credentials = await this.requireCredentials()

		const newVariables = {
			OVH_APPLICATION_KEY: {
				key: "OVH_APPLICATION_KEY",
				value: credentials.applicationKey
			},
			OVH_APPLICATION_SECRET: {
				key: "OVH_APPLICATION_SECRET",
				value: credentials.applicationSecret
			},
			OVH_CONSUMER_KEY: {
				key: "OVH_CONSUMER_KEY",
				value: credentials.consumerKey
			},
			OVH_ENDPOINT: { key: "OVH_ENDPOINT", value: credentials.endpoint }
		}

		const processedVariables: Set<string> = new Set()
		const stream = from(this.storageService.streamEnvironmentLines()).pipe(
			map(line =>
				this.processLine(line, newVariables, processedVariables)
			)
		)

		const fileHandle = await this.storageService.createEnvironmentSwapFile()

		for await (const line of stream) {
			await fileHandle.write(`${line}\n`)
		}

		const missedVariables = Object.keys(newVariables).filter(
			variable => !processedVariables.has(variable)
		) as Array<keyof typeof newVariables>

		for (const missedVariable of missedVariables) {
			const variable = newVariables[missedVariable]
			await fileHandle.write(`${variable.key}=${variable.value}\n`)
		}

		await fileHandle.close()

		await this.storageService.activateEnvironmentSwapFile()

		this.logger.info("✅ Updated .env")
	}
}

export type Credentials = Awaited<
	ReturnType<EnvironmentService["requireCredentials"]>
>
