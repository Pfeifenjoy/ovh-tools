import { existsSync } from "fs"
import { mkdir, readFile, writeFile } from "fs/promises"
import { join } from "path"

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

	async saveApplication(credentials: ApplicationCredentials): Promise<void> {
		await this.ensureConfigDir()
		const applicationPath = this.resolve("application.json")
		await writeFile(applicationPath, JSON.stringify(credentials, null, 2))
	}

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

	async saveCredentials(credentials: Credentials): Promise<void> {
		await this.ensureConfigDir()
		const credentialsPath = this.resolve("credentials.json")
		await writeFile(credentialsPath, JSON.stringify(credentials, null, 2))
	}

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
}
