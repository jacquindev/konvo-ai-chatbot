import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/upload"
import z from "zod"

export const ChatbotSettingsSchema = z
  .object({
    icon: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, "The message must be at least 6 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    theme: z.enum(["system", "dark", "light"]).optional(),
    botBackground: z
      .string()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    bubbleColor: z
      .string()
      .optional()
      .or(z.literal("").transform(() => undefined)),
    textColor: z
      .string()
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .refine(
    schema => {
      if (schema.icon?.length) {
        if (
          ACCEPTED_IMAGE_TYPES.includes(schema.icon?.[0]?.type) &&
          schema.icon?.[0]?.size <= MAX_UPLOAD_SIZE
        )
          return true
      }
      if (!schema.icon?.length) return true
    },
    {
      message: "The file must be less then 10MB, and only PNG, JPEG, JPG & SVG files are accepted",
      path: ["icon"],
    }
  )

export const HelpDeskSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
  answer: z.string().min(1, { message: "Question cannot be left empty" }),
})

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
})
