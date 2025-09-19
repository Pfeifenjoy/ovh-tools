import { readFile } from "fs/promises"

import { PathService } from "./path-service.js"
import { PackageJsonSchema } from "../schemas/package-json.js"

export class MetadataService {
	constructor(private pathService: PathService) {}

	async getVersion(): Promise<string> {
		try {
			const packagePath = this.pathService.resolve("package.json")
			const content = await readFile(packagePath, "utf-8")
			const data = JSON.parse(content)
			const packageJson = PackageJsonSchema.parse(data)
			return packageJson.version
		} catch {
			return "0.0.0"
		}
	}
}
