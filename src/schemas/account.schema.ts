import {
  MAX_PASS_LENGTH,
  MIN_PASS_LENGTH,
  PASSWORD_FIELD_VALIDATION,
} from "@/constants/form"
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/upload"
import z from "zod"

const passwordPatterns = z
  .string()
  .min(MIN_PASS_LENGTH, { message: PASSWORD_FIELD_VALIDATION.MSG.MIN_LEN })
  .max(MAX_PASS_LENGTH, { message: PASSWORD_FIELD_VALIDATION.MSG.MAX_LEN })
  .refine(PASSWORD_FIELD_VALIDATION.TEST.SPECIAL_CHAR, {
    message: PASSWORD_FIELD_VALIDATION.MSG.SPECIAL_CHAR,
  })
  .refine(PASSWORD_FIELD_VALIDATION.TEST.LOWERCASE, {
    message: PASSWORD_FIELD_VALIDATION.MSG.LOWERCASE,
  })
  .refine(PASSWORD_FIELD_VALIDATION.TEST.UPPERCASE, {
    message: PASSWORD_FIELD_VALIDATION.MSG.UPPERCASE,
  })
  .refine(PASSWORD_FIELD_VALIDATION.TEST.NUMBER, { message: PASSWORD_FIELD_VALIDATION.MSG.NUMBER })

export const AccountSettingsSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Your first name must be at least 2 characters long" })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    lastName: z
      .string()
      .min(2, { message: "Your last name must be at least 2 characters long" })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    password: passwordPatterns.optional().or(z.literal("").transform(() => undefined)),
    confirmPassword: passwordPatterns.optional().or(z.literal("").transform(() => undefined)),
    avatar: z
      .any()
      .refine(files => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
        message: "Your file size must be less then 10MB",
      })
      .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: "Only JPG, JPEG, PNG & SVG are accepted file formats",
      })
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .refine(schema => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
