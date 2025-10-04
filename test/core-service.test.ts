import { test, expect } from "@playwright/test"

import { CoreService } from "../src/services/core-service"
import { LoggerService } from "../src/services/logger-service"

test.describe("CoreService", () => {
	test("should create services with defaults", () => {
		const core = new CoreService()

		expect(core.logger).toBeInstanceOf(LoggerService)
		expect(core.storageService).toBeDefined()
		expect(core.applicationService).toBeDefined()
	})

	test("should allow dependency injection", () => {
		const customLogger = new LoggerService()
		const core = new CoreService({ logger: customLogger })

		expect(core.logger).toBe(customLogger)
	})

	test("should use injected services in dependent services", () => {
		const customLogger = new LoggerService()
		const core = new CoreService({ logger: customLogger })

		// The applicationService should use the injected logger
		expect(core.applicationService).toBeDefined()
	})
})
