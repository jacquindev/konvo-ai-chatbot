import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/upload"
import z from "zod"

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have at least 4 characters" })
    .refine(
      value => /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  image: z
    .any()
    .refine(files => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Your file size must be less then 10MB",
    })
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG, PNG & SVG are accepted file formats",
    }),
})

export const DomainNameSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have at least 4 characters" })
    .refine(
      value => /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/.test(value ?? ""),
      "This is not a valid domain"
    )
    .optional()
    .or(z.literal("").transform(() => undefined)),
})
