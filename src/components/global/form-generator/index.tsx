import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ErrorMessage } from "@hookform/error-message"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Option = { value: string; label: string; id: string }

type FormGeneratorProps = {
  inputType: "select" | "input" | "textarea"
  name: string
  register: UseFormRegister<any>
  errors: FieldErrors
  label?: string
  description?: string
  placeholder?: string
  defaultValue?: string | null
  type?: "text" | "email" | "password" | "number" | "color"
  options?: Option[]
  lines?: number
  form?: string
  className?: string
}

export const FormGenerator = ({
  inputType,
  name,
  register,
  errors,
  label,
  description,
  placeholder = "",
  defaultValue,
  type = "text",
  options = [],
  lines = 4,
  form,
  className,
}: FormGeneratorProps) => {
  const inputId = `${inputType}-${name}`

  const renderLabel = () =>
    label ? (
      <Label htmlFor={inputId} className="p-0 mb-2">
        {label}
      </Label>
    ) : null

  const renderDescription = () =>
    description ? <p className="text-xs text-muted-foreground mb-2">{description}</p> : null

  const renderError = () => (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) =>
        message === "Required" ? null : <p className="text-red-400 mt-2">{message}</p>
      }
    />
  )

  if (inputType === "input") {
    return (
      <>
        {renderLabel()}
        {renderDescription()}
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          form={form}
          className={cn("bg-background", className)}
          {...register(name)}
        />
        {renderError()}
      </>
    )
  }

  if (inputType === "textarea") {
    return (
      <>
        {renderLabel()}
        {renderDescription()}
        <Textarea
          id={inputId}
          placeholder={placeholder}
          defaultValue={defaultValue}
          form={form}
          rows={lines}
          className={cn("bg-background", className)}
          {...register(name)}
        />
        {renderError()}
      </>
    )
  }

  if (inputType === "select") {
    return (
      <>
        {renderLabel()}
        {renderDescription()}
        <select
          id={inputId}
          form={form}
          className={cn("w-full bg-transparent border border-input p-3 rounded-lg", className)}
          {...register(name)}
        >
          {options.map(option => (
            <option key={option.id} value={option.value} className="dark:bg-muted">
              {option.label}
            </option>
          ))}
        </select>
        {renderError()}
      </>
    )
  }

  return null
}
