import { z } from "zod"

export const CredentialsSchema = z.object({
	consumerKey: z.string()
})

export type Credentials = z.infer<typeof CredentialsSchema>
