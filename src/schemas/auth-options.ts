import { z } from "zod"

import { OvhRegion } from "./ovh-region.js"

export const AuthOptionsSchema = z.object({
	region: OvhRegion.default("ovh-eu"),
	name: z.string(),
	description: z.string()
})
export type AuthOptions = z.infer<typeof AuthOptionsSchema>
