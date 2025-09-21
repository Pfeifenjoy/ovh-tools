import { BaseException } from "./base-exception.js"

export class OvhApiException extends BaseException {
	constructor(status: number, statusText: string) {
		super(`HTTP ${status}: ${statusText}`)
	}
}
