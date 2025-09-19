import { z } from "zod"

export const PackageJsonSchema = z.object({
	version: z.string().default("0.0.0")
})

export type PackageJson = z.infer<typeof PackageJsonSchema>
