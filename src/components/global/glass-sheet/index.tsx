import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import React from "react"

type Props = {
  trigger?: React.ReactNode
  children: React.ReactNode
  title?: string
  description?: string
  side?: "left" | "right" | "top" | "bottom"
  className?: string
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const sheetContentStyle = cva("bg-background/90 dark:bg-background/60 backdrop-blur-xl p-0")

const GlassSheet = ({
  trigger,
  children,
  title,
  description,
  side = "right",
  className,
  footer,
  open,
  onOpenChange,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}

      <SheetContent className={cn(sheetContentStyle(), className)} side={side}>
        <SheetHeader>
          {title ? <SheetTitle>{title}</SheetTitle> : <SheetTitle />}

          {description ? <SheetDescription>{description}</SheetDescription> : ""}
        </SheetHeader>

        {children}

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export default GlassSheet
