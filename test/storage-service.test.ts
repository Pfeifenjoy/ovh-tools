import { writeFile, mkdtemp, rm } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"

import { test, expect } from "@playwright/test"

import { EnvironmentSwapFileExistsException } from "../src/exceptions/environment-swap-file-exists-exception"
import { StorageService } from "../src/services/storage-service"

test.describe("StorageService", () => {
	let storageService: StorageService
	let tempDir: string
	let originalCwd: string

	test.beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "ovh-tools-test-"))
		originalCwd = process.cwd()
		process.chdir(tempDir)

		storageService = new StorageService()
	})

	test.afterEach(async () => {
		process.chdir(originalCwd)
		await rm(tempDir, { recursive: true, force: true })
	})

	test("should create swap file when none exists", async () => {
		const fileHandle = await storageService.createEnvironmentSwapFile()
		expect(fileHandle).toBeDefined()
		await fileHandle.close()
	})

	test("should throw exception when swap file already exists", async () => {
		// Create existing swap file
		await writeFile(".env.swp", "")

		await expect(
			storageService.createEnvironmentSwapFile()
		).rejects.toThrow(EnvironmentSwapFileExistsException)
	})

	test("should stream environment lines from existing file", async () => {
		// Create test .env file
		await writeFile(".env", "VAR1=value1\nVAR2=value2\n")

		const lines: string[] = []
		for await (const line of storageService.streamEnvironmentLines()) {
			lines.push(line)
		}

		expect(lines).toEqual(["VAR1=value1", "VAR2=value2"])
	})

	test("should return empty stream when .env file doesn't exist", async () => {
		const lines: string[] = []
		for await (const line of storageService.streamEnvironmentLines()) {
			lines.push(line)
		}

		expect(lines).toEqual([])
	})
})
