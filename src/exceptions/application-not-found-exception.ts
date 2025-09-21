import { BaseException } from "./base-exception.js"

export class ApplicationNotFoundException extends BaseException {
	constructor() {
		super(
			"No application found. Please create one first with 'ovh-tools application create'"
		)
	}
}
