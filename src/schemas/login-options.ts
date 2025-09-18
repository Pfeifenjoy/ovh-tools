import { z } from "zod"

export const LoginOptionsSchema = z.object({
	username: z.string().optional(),
	password: z.string().optional(),
	twoFactorToken: z.string().optional()
})

export type LoginOptions = z.infer<typeof LoginOptionsSchema>
