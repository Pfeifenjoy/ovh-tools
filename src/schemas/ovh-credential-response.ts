import { z } from "zod"

export const OvhCredentialResponseSchema = z.object({
	consumerKey: z.string(),
	validationUrl: z.string()
})

export type OvhCredentialResponse = z.infer<typeof OvhCredentialResponseSchema>
