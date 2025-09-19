import { dirname, join } from "path"
import { fileURLToPath } from "url"

export class PathService {
	private readonly projectRoot: string

	constructor() {
		const __filename = fileURLToPath(import.meta.url)
		const __dirname = dirname(__filename)
		this.projectRoot = join(__dirname, "..", "..")
	}

	resolve(relativePath: string): string {
		return join(this.projectRoot, relativePath)
	}
}
