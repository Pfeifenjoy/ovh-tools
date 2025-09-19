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

	async promptBoolean(question: string): Promise<boolean> {
		const answer = await this.prompt(`${question} (y/n): `)
		const normalized = answer.toLowerCase()
		return normalized === "y" || normalized === "yes"
	}
}
