import { z } from "zod"

export const OvhRegion = z.enum(["ovh-eu", "ovh-us", "ovh-ca"])
export type OvhRegion = z.infer<typeof OvhRegion>
