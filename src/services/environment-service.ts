import { ApplicationService } from "./application-service.js"
import { StorageService } from "./storage-service.js"

/**
 * Service for loading OVH credentials into environment variables.
 */
export class EnvironmentService {
	constructor(
		private storageService: StorageService,
		private applicationService: ApplicationService
	) {}

	private async requireCredentials() {
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

		console.log(
			`export OVH_APPLICATION_KEY="${credentials.applicationKey}"`
		)
		console.log(
			`export OVH_APPLICATION_SECRET="${credentials.applicationSecret}"`
		)
		console.log(`export OVH_CONSUMER_KEY="${credentials.consumerKey}"`)
		console.log(`export OVH_ENDPOINT="${credentials.endpoint}"`)
	}

	/**
	 * Outputs zsh export commands for environment variables.
	 */
	async zsh(): Promise<void> {
		const credentials = await this.requireCredentials()

		console.log(
			`export OVH_APPLICATION_KEY="${credentials.applicationKey}"`
		)
		console.log(
			`export OVH_APPLICATION_SECRET="${credentials.applicationSecret}"`
		)
		console.log(`export OVH_CONSUMER_KEY="${credentials.consumerKey}"`)
		console.log(`export OVH_ENDPOINT="${credentials.endpoint}"`)
	}

	/**
	 * Outputs fish set commands for environment variables.
	 */
	async fish(): Promise<void> {
		const credentials = await this.requireCredentials()

		console.log(
			`set -x OVH_APPLICATION_KEY "${credentials.applicationKey}"`
		)
		console.log(
			`set -x OVH_APPLICATION_SECRET "${credentials.applicationSecret}"`
		)
		console.log(`set -x OVH_CONSUMER_KEY "${credentials.consumerKey}"`)
		console.log(`set -x OVH_ENDPOINT "${credentials.endpoint}"`)
	}
}
