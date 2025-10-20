import { z } from "zod"

export const StoredCredentialsSchema = z.object({
	consumerKey: z.string()
})

export type StoredCredentials = z.infer<typeof StoredCredentialsSchema>
