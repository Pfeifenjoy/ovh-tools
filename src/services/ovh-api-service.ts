export type OvhRegion = "eu" | "us"

import { z } from "zod"

import { OvhApiException } from "../exceptions/ovh-api-exception.js"

/**
 * Service for interacting with OVH API endpoints.
 * Provides region-aware API calls with schema validation.
 */
export class OvhApiService {
	constructor(private region: OvhRegion = "eu") {}

	/**
	 * Resolves a path to the full OVH API URL for the configured region.
	 * @param path - API endpoint path (e.g., "/auth/credential")
	 * @returns Full URL to the API endpoint
	 */
	resolve(path: string): string {
		const baseUrl =
			this.region === "us"
				? "https://api.us.ovhcloud.com"
				: "https://eu.api.ovh.com"

		return new URL(path, baseUrl).toString()
	}

	getCreateAppUrl(): string {
		return this.resolve("/createApp/")
	}

	/**
	 * Makes a POST request to an OVH API endpoint with schema validation.
	 * @param endpoint - API endpoint path
	 * @param data - Request body data
	 * @param headers - Additional HTTP headers
	 * @param responseSchema - Zod schema for response validation
	 * @returns Promise resolving to validated response data
	 * @throws {OvhApiException} When API request fails
	 */
	async post<T>(
		endpoint: string,
		data: unknown,
		headers: Record<string, string>,
		responseSchema: z.ZodSchema<T>
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
			throw new OvhApiException(response.status, response.statusText)
		}

		const json = await response.json()
		return responseSchema.parse(json)
	}
}
