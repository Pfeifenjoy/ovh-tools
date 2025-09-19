export type OvhRegion = "eu" | "us"

export class OvhApiService {
	constructor(private region: OvhRegion = "eu") {}

	private resolve(path: string): string {
		const baseUrl =
			this.region === "us"
				? "https://api.us.ovhcloud.com"
				: "https://eu.api.ovh.com"

		return new URL(path, baseUrl).toString()
	}

	getCreateAppUrl(): string {
		return this.resolve("/createApp/")
	}

	async post<T>(
		endpoint: string,
		data: unknown,
		headers: Record<string, string>
	): Promise<T> {
		const url = this.resolve(endpoint)

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			body: JSON.stringify(data)
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return response.json() as Promise<T>
	}
}
