declare module "ovh" {
	interface OvhConfig {
		endpoint: string
		appKey: string
		appSecret: string
		consumerKey?: string
	}

	interface CredentialResponse {
		applicationKey: string
		applicationSecret: string
		consumerKey: string
		validationUrl: string
	}

	interface OvhApi {
		request(
			method: string,
			path: string,
			body?: unknown
		): Promise<CredentialResponse>
	}

	function ovh(config: OvhConfig): OvhApi
	export = ovh
}
