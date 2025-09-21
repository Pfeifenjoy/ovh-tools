import open from "open"

import { LoggerService } from "./logger-service.js"

/**
 * Service for opening URLs in the user's default browser.
 * Provides consistent error handling and fallback messaging.
 */
export class BrowserService {
	constructor(private logger: LoggerService) {}

	/**
	 * Opens a URL in the default browser with fallback to manual instruction.
	 * @param url - URL to open
	 * @param description - Optional description for logging
	 */
	async openUrl(url: string, description?: string): Promise<void> {
		const message = description || "Opening URL in browser..."
		this.logger.info(`🔗 ${message}`)

		try {
			await open(url)
			this.logger.info("✅ Browser opened successfully")
		} catch {
			this.logger.error("❌ Failed to open browser automatically")
			this.logger.info(`Please visit: ${url}`)
		}
	}
}
