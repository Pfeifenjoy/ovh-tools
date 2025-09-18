import { createLogger, format, transports } from "winston"

import type { Logform } from "winston"

export class LoggerService {
	private logger: ReturnType<typeof createLogger>

	constructor() {
		this.logger = createLogger({
			level: "info",
			format: format.printf((info: Logform.TransformableInfo) =>
				String(info.message)
			),
			transports: [new transports.Console()]
		})
	}

	info(message: string) {
		this.logger.info(message)
	}

	error(message: string) {
		this.logger.error(message)
	}
}
