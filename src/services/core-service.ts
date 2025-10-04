import { ApplicationService } from "./application-service.js"
import { CredentialsService } from "./credentials-service.js"
import { EnvironmentService } from "./environment-service.js"
import { LoggerService } from "./logger-service.js"
import { MetadataService } from "./metadata-service.js"
import { PathService } from "./path-service.js"
import { PromptService } from "./prompt-service.js"
import { StorageService } from "./storage-service.js"

export class CoreService {
	public readonly logger: LoggerService
	public readonly promptService: PromptService
	public readonly storageService: StorageService
	public readonly pathService: PathService
	public readonly metadataService: MetadataService
	public readonly applicationService: ApplicationService
	public readonly environmentService: EnvironmentService
	public readonly credentialsService: CredentialsService

	constructor() {
		this.logger = new LoggerService()
		this.promptService = new PromptService()
		this.storageService = new StorageService()
		this.pathService = new PathService()
		this.metadataService = new MetadataService(this.pathService)
		this.applicationService = new ApplicationService(
			this.logger,
			this.promptService,
			this.storageService
		)
		this.environmentService = new EnvironmentService(
			this.logger,
			this.storageService,
			this.applicationService
		)
		this.credentialsService = new CredentialsService(
			this.logger,
			this.promptService,
			this.storageService,
			this.applicationService
		)
	}
}
