import { existsSync, createReadStream } from "fs"
import {
	mkdir,
	writeFile,
	access,
	readFile,
	open,
	FileHandle,
	rename
} from "fs/promises"
import { join } from "path"
import { createInterface } from "readline"

import { CredentialsNotFoundException } from "../exceptions/credentials-not-found-exception.js"
import { EnvironmentSwapFileExistsException } from "../exceptions/environment-swap-file-exists-exception.js"
import {
	ApplicationCredentials,
	ApplicationCredentialsSchema
} from "../schemas/application-credentials.js"
import { Credentials, CredentialsSchema } from "../schemas/credentials.js"

export class StorageService {
	private readonly configDir = ".ovh-tools"

	private resolve(filename: string): string {
		const configPath = join(process.cwd(), this.configDir)
		return join(configPath, filename)
	}

	private async ensureConfigDir(): Promise<void> {
		const configPath = join(process.cwd(), this.configDir)
		if (!existsSync(configPath)) {
			await mkdir(configPath, { recursive: true })
		}
	}

	/**
	 * Saves application credentials to application.json file.
	 */
	async saveApplication(credentials: ApplicationCredentials): Promise<void> {
		await this.ensureConfigDir()
		const applicationPath = this.resolve("application.json")
		await writeFile(applicationPath, JSON.stringify(credentials, null, 2))
	}

	/**
	 * Loads application credentials from application.json file.
	 * Returns null if file doesn't exist or is invalid.
	 */
	async loadApplication(): Promise<ApplicationCredentials | null> {
		const applicationPath = this.resolve("application.json")
		if (!existsSync(applicationPath)) {
			return null
		}

		try {
			const content = await readFile(applicationPath, "utf-8")
			const data = JSON.parse(content)
			return ApplicationCredentialsSchema.parse(data)
		} catch {
			return null
		}
	}

	/**
	 * Saves consumer key credentials to credentials.json file.
	 */
	async saveCredentials(credentials: Credentials): Promise<void> {
		await this.ensureConfigDir()
		const credentialsPath = this.resolve("credentials.json")
		await writeFile(credentialsPath, JSON.stringify(credentials, null, 2))
	}

	/**
	 * Loads consumer key credentials from credentials.json file.
	 * Returns null if file doesn't exist or is invalid.
	 */
	async loadCredentials(): Promise<Credentials | null> {
		const credentialsPath = this.resolve("credentials.json")
		if (!existsSync(credentialsPath)) {
			return null
		}

		try {
			const content = await readFile(credentialsPath, "utf-8")
			const data = JSON.parse(content)
			return CredentialsSchema.parse(data)
		} catch {
			return null
		}
	}

	/**
	 * Loads consumer key credentials from credentials.json.
	 * Throws CredentialsNotFoundException if file doesn't exist.
	 */
	async requireCredentials(): Promise<Credentials> {
		const credentials = await this.loadCredentials()
		if (!credentials) {
			throw new CredentialsNotFoundException()
		}
		return credentials
	}

	/**
	 * Creates an async iterable stream of lines from a .env file.
	 * Returns empty async iterable if file doesn't exist.
	 */
	async *streamEnvironmentLines(): AsyncIterable<string> {
		try {
			await access(".env")
			const fileStream = createReadStream(".env")
			const rl = createInterface({
				input: fileStream,
				crlfDelay: Infinity
			})

			for await (const line of rl) {
				yield line
			}
		} catch (exception) {
			if (
				exception instanceof Error &&
				(exception as NodeJS.ErrnoException).code === "ENOENT"
			) {
				// File doesn't exist, return empty iterator
				return
			}
			throw exception
		}
	}

	/**
	 * Creates a swap file for atomic .env file operations.
	 * Returns a file handle for writing. Throws exception if swap file already exists.
	 */
	async createEnvironmentSwapFile(): Promise<FileHandle> {
		try {
			return await open(".env.swp", "wx")
		} catch (exception) {
			if (
				exception instanceof Error &&
				(exception as NodeJS.ErrnoException).code === "EEXIST"
			) {
				throw new EnvironmentSwapFileExistsException()
			}
			throw exception
		}
	}

	/**
	 * Atomically replaces .env file with the swap file.
	 */
	async activateEnvironmentSwapFile(): Promise<void> {
		await rename(".env.swp", ".env")
	}
}
