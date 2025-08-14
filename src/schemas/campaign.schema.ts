import { z } from "zod"

export const AddCampaignSchema = z.object({
  name: z.string().min(3, { message: "Campaign name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Campaign description must be at least 30 characters long" })
    .optional(),
  template: z
    .string()
    .min(10, { message: "Campaign template must be at least 30 characters long" }),
  customers: z.array(z.string()).optional(),
})
