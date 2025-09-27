import { BaseException } from "./base-exception.js"

export class EnvironmentSwapFileExistsException extends BaseException {
	constructor() {
		super(
			"Environment swap file already exists. Another operation may be in progress."
		)
	}
}
