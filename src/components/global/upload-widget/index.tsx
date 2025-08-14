"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ErrorMessage } from "@hookform/error-message"
import { UploadIcon, XCircle } from "lucide-react"
import Image from "next/image"
import React, { useRef, useState } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<any>
  errors: FieldErrors
  label: string
  className?: string
  id?: string
  name?: string
}

const UploadWidget = ({ register, label, errors, className, id, name = "image" }: Props) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      const dt = new DataTransfer()
      dt.items.add(file)
      if (inputRef.current) inputRef.current.files = dt.files
      await handleFileChange({ target: { files: dt.files } } as any)
    }
  }

  // Remove file and reset state
  const handleRemove = () => {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <Card
      role="button"
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-colors duration-200 outline-none hover:scale-102",
        dragActive
          ? "border-primary bg-accent dark:bg-muted scale-102 shadow-lg"
          : "border-muted bg-background",
        className
      )}
      tabIndex={0}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => !preview && inputRef.current?.click()}
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && !preview) {
          inputRef.current?.click()
        }
      }}
      aria-label="File upload area"
      style={{ minHeight: 180, cursor: preview ? "default" : "pointer" }}
    >
      {preview ? (
        <div className="group relative mx-auto flex w-fit flex-col items-center justify-center p-2">
          <div>
            <Image
              src={preview}
              alt="preview"
              width={96}
              height={96}
              className="h-24 w-24 cursor-pointer rounded border object-cover transition-shadow group-hover:shadow-lg"
              tabIndex={0}
              aria-label="Edit image"
            />
            <Button
              type="button"
              variant={null}
              size={null}
              className="absolute -top-0.5 right-0 rounded-full bg-transparent p-1 shadow transition hover:cursor-pointer hover:bg-red-100/20"
              onClick={e => {
                e.stopPropagation()
                handleRemove()
              }}
              aria-label="Remove image"
              tabIndex={0}
            >
              <XCircle className="text-destructive h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : dragActive ? (
        <div className="pointer-events-none flex flex-col items-center justify-center gap-2">
          <UploadIcon className="text-primary h-8 w-8 animate-bounce" />
          <span className="text-primary text-lg font-semibold">Drop your image here</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <UploadIcon className="text-muted-foreground h-8 w-8" />
          <span className="text-base font-medium">
            Drag & drop {" "}<span className="italic">or</span>{" "} Click to upload
          </span>
        </div>
      )}

      <Input
        {...register(name, {
          onChange: handleFileChange,
        })}
        ref={inputRef}
        className="hidden"
        type="file"
        id={id ?? "upload-file"}
        aria-label={label}
        aria-describedby={id ? `${id}-desc` : undefined}
        tabIndex={-1}
        multiple={false}
      />
      <p
        id={id ? `${id}-desc` : undefined}
        className="text-muted-foreground mt-2 max-w-xs text-center text-xs italic"
      >
        Recommended size is 300px × 300px, less than 10MB.
      </p>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p className="mt-2 text-red-400">{message === "Required" ? "" : message}</p>
        )}
      />
    </Card>
  )
}

export default UploadWidget
