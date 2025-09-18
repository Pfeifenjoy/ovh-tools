import { read } from "read"

export class PromptService {
	async prompt(question: string): Promise<string> {
		return read({
			prompt: question
		})
	}

	async promptPassword(question: string): Promise<string> {
		return read({
			prompt: question,
			silent: true
		})
	}
}
