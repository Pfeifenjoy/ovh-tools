import { ApplicationService } from "./application-service.js"
import { BrowserService } from "./browser-service.js"
import { LoggerService } from "./logger-service.js"
import { OvhApiService } from "./ovh-api-service.js"
import { PromptService } from "./prompt-service.js"
import { StorageService } from "./storage-service.js"
import { OvhCredentialResponseSchema } from "../schemas/ovh-credential-response.js"

/**
 * Service for managing OVH consumer key credentials.
 * Handles obtaining and storing consumer keys for API authentication.
 */
export class CredentialsService {
	constructor(
		private logger: LoggerService,
		private promptService: PromptService,
		private storageService: StorageService,
		private applicationService: ApplicationService
	) {}

	/**
	 * Updates consumer key credentials through OVH API.
	 * Requests consumer key, opens validation URL, and saves credentials.
	 */
	async updateCredentials(): Promise<void> {
		const existingApplication =
			await this.applicationService.requireApplication()

		this.logger.info("🔄 Obtaining consumer key...")
		this.logger.info(
			`📋 Using application: ${existingApplication.applicationKey}`
		)
		this.logger.info(
			`🌍 Region: ${existingApplication.region.toUpperCase()}`
		)

		// Create OVH API service with correct region
		const ovhApiService = new OvhApiService(existingApplication.region)

		// TODO: Add IP restriction to access rules for better security
		const data = await ovhApiService.post(
			"/1.0/auth/credential",
			{
				accessRules: [
					{ method: "GET", path: "/*" },
					{ method: "POST", path: "/*" },
					{ method: "PUT", path: "/*" },
					{ method: "DELETE", path: "/*" }
				]
			},
			{
				"X-Ovh-Application": existingApplication.applicationKey
			},
			OvhCredentialResponseSchema
		)

		const { consumerKey, validationUrl } = data

		const browserService = new BrowserService(this.logger)
		await browserService.openUrl(
			validationUrl,
			"Opening validation URL in browser..."
		)

		// TODO: Instead of waiting for user input, poll the OVH API to check if credentials are validated
		await this.promptService.prompt(
			"Press Enter after validating your credentials..."
		)

		// Save the consumer key in credentials.json
		await this.storageService.saveCredentials({ consumerKey })

		this.logger.info("✅ Consumer key updated!")
		this.logger.info("💾 Saved to: .ovh-tools/credentials.json")
	}
}
