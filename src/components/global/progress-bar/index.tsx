"use client"

import { TriangleDown } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type Props = {
  label: string
  credits: number
  end: number
  className?: string
  color?: string
  icon?: boolean
}

const ProgressBar = ({
  label,
  credits,
  end,
  className,
  color = "linear-gradient(90deg,#8b5cf6,#6366f1,#3b82f6)",
  icon = true,
}: Props) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const percentage = Math.min((credits / end) * 100, 100)
    setProgress(percentage)
  }, [credits, end])

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="mb-1 flex items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          {icon && (
            <div
              className="flex items-center justify-center rounded-full p-0.5"
              style={{ background: color }}
            >
              <TriangleDown className="h-4 w-4 text-white dark:text-black" />
            </div>
          )}
          <div className="flex flex-row items-center gap-3">
            <Label className="text-lg">{label}</Label>
            <Badge variant="outline" className="bg-primary/10 rounded-full text-xs">
              {Math.round(progress)}%
            </Badge>
          </div>
        </div>
        <span className="text-muted-foreground text-xs">
          {credits}/{end}
        </span>
      </div>
      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-800 ease-out"
          style={{
            width: `${progress}%`,
            background: color,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
