import { BaseException } from "./base-exception.js"

export class CredentialsNotFoundException extends BaseException {
	constructor() {
		super(
			"No consumer key found. Run 'ovh-tools credentials update' first."
		)
	}
}
