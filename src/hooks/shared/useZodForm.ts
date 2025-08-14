import { zodResolver } from "@hookform/resolvers/zod"
import { Mode, useForm, UseFormProps } from "react-hook-form"
import { z, ZodType } from "zod"

export const useZodForm = <TSchema extends ZodType<any, any, any>>(
  schema: TSchema,
  mode?: Mode,
  defaultValues?: UseFormProps<z.infer<TSchema>>["defaultValues"]
) => {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as any,
    mode,
    defaultValues,
  })
}
