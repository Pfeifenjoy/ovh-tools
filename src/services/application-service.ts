import open from "open"
import { z } from "zod"

import { LoggerService } from "./logger-service.js"
import { OvhApiService } from "./ovh-api-service.js"
import { PromptService } from "./prompt-service.js"
import { StorageService } from "./storage-service.js"

const RegionSchema = z.enum(["eu", "us"])

export class ApplicationService {
	constructor(
		private logger: LoggerService,
		private promptService: PromptService,
		private storageService: StorageService
	) {}

	private async checkOverwrite(): Promise<boolean> {
		const existingApp = await this.storageService.loadApplication()
		if (!existingApp) {
			return true
		}

		this.logger.info(
			`📋 Found existing application for ${existingApp.region.toUpperCase()} region`
		)
		this.logger.info(`🔑 Application Key: ${existingApp.applicationKey}`)

		const overwrite = await this.promptService.promptBoolean(
			"Do you want to overwrite it?"
		)

		if (!overwrite) {
			this.logger.info("❌ Application creation cancelled")
		}

		return overwrite
	}

	async createApplication(): Promise<void> {
		// Check if we should proceed
		if (!(await this.checkOverwrite())) {
			return
		}

		// Ask user for region with validation
		let region
		while (true) {
			const regionInput = await this.promptService.prompt(
				"Which OVH region? (eu/us): "
			)

			const regionResult = RegionSchema.safeParse(regionInput)
			if (regionResult.success) {
				region = regionResult.data
				break
			}

			this.logger.error("Invalid region. Please choose 'eu' or 'us'")
		}

		// Create API service with region
		const apiService = new OvhApiService(region)
		const createUrl = apiService.getCreateAppUrl()

		this.logger.info(
			`🌍 Opening ${region.toUpperCase()} application creation page...`
		)

		try {
			await open(createUrl)
			this.logger.info("✅ Browser opened successfully")
		} catch {
			this.logger.error("❌ Failed to open browser")
			this.logger.info(`🔗 Please visit manually: ${createUrl}`)
		}

		this.logger.info("\n📝 Please create your application in the browser:")
		this.logger.info("1. Login to your OVH account")
		this.logger.info("2. Fill in the application name and description")
		this.logger.info("3. Click 'Create'")
		this.logger.info(
			"4. Copy the Application Key and Application Secret and paste them here"
		)

		// Collect the credentials
		const applicationKey = await this.promptService.prompt(
			"\nApplication Key: "
		)
		const applicationSecret = await this.promptService.promptPassword(
			"Application Secret: "
		)

		// Save credentials
		await this.storageService.saveApplication({
			applicationKey,
			applicationSecret,
			region
		})

		this.logger.info("\n✅ Application created!")
		this.logger.info(`🔑 Application Key: ${applicationKey}`)
		this.logger.info(
			`🔐 Application Secret: ${"*".repeat(applicationSecret.length)}`
		)
		this.logger.info(`🌍 Region: ${region.toUpperCase()}`)
		this.logger.info(`💾 Saved to: .ovh-tools/application.json`)
	}
}
