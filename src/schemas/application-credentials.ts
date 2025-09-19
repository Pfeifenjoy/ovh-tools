import { z } from "zod"

export const ApplicationCredentialsSchema = z.object({
	applicationKey: z.string(),
	applicationSecret: z.string(),
	region: z.enum(["eu", "us"])
})

export type ApplicationCredentials = z.infer<
	typeof ApplicationCredentialsSchema
>
