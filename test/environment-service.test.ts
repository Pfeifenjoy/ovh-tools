import { writeFile, access, mkdtemp, rm, readFile } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"

import { test, expect } from "@playwright/test"

import { ApplicationService } from "../src/services/application-service"
import { EnvironmentService } from "../src/services/environment-service"
import { LoggerService } from "../src/services/logger-service"
import { StorageService } from "../src/services/storage-service"

test.describe("EnvironmentService", () => {
	let environmentService: EnvironmentService
	let logger: LoggerService
	let storageService: StorageService
	let applicationService: ApplicationService
	let tempDir: string
	let originalCwd: string

	test.beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "ovh-tools-test-"))
		originalCwd = process.cwd()
		process.chdir(tempDir)

		logger = new LoggerService()
		storageService = new StorageService()
		applicationService = new ApplicationService(
			logger,
			{} as never,
			storageService
		)
		environmentService = new EnvironmentService(
			logger,
			storageService,
			applicationService
		)
	})

	test.afterEach(async () => {
		process.chdir(originalCwd)
		await rm(tempDir, { recursive: true, force: true })
	})

	test("should create .env file when none exists", async () => {
		// Mock credentials
		const mockCredentials = {
			applicationKey: "test_key",
			applicationSecret: "test_secret",
			consumerKey: "test_consumer",
			endpoint: "ovh-eu"
		}

		// Mock the requireCredentials method
		environmentService["requireCredentials"] = async () => mockCredentials

		await environmentService.dotenv()

		// Check if .env file was created
		await expect(access(".env")).resolves.toBeUndefined()
	})

	test("should update existing .env file", async () => {
		// Create existing .env file
		await writeFile(
			".env",
			"EXISTING_VAR=value\nOVH_APPLICATION_KEY=old_key\n"
		)

		// Mock credentials
		const mockCredentials = {
			applicationKey: "new_key",
			applicationSecret: "new_secret",
			consumerKey: "new_consumer",
			endpoint: "ovh-us"
		}

		environmentService["requireCredentials"] = async () => mockCredentials

		await environmentService.dotenv()

		// Check if file exists and contains updated values
		await expect(access(".env")).resolves.toBeUndefined()

		const content = await readFile(".env", "utf-8")
		expect(content).toContain("EXISTING_VAR=value")
		expect(content).toContain("OVH_APPLICATION_KEY=new_key")
		expect(content).toContain("OVH_APPLICATION_SECRET=new_secret")
		expect(content).toContain("OVH_CONSUMER_KEY=new_consumer")
		expect(content).toContain("OVH_ENDPOINT=ovh-us")
	})
})
