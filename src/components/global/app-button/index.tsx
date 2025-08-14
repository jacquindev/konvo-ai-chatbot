import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import React from "react"

type AppButtonProps = {
  children: React.ReactNode
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost"
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  isGradient?: boolean
} & React.ComponentPropsWithoutRef<typeof Button>

const buttonStyle = cva(
  "bg-gradient-to-br !text-white transition-all duration-200 transform hover:scale-[1.05] from-indigo-500 to-purple-400 hover:from-indigo-600 hover:to-purple-500 dark:from-indigo-600 dark:to-purple-500 dark:hover:from-indigo-500 dark:hover:to-purple-400"
)

const AppButton = ({
  variant = "secondary",
  children,
  className,
  size = "default",
  isGradient = true,
  ...props
}: AppButtonProps) => {
  return (
    <Button
      size={size}
      variant={variant}
      className={cn(isGradient && buttonStyle(), className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default AppButton
