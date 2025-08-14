import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { InfoIcon } from "lucide-react"
import React from "react"

type Props = {
  trigger?: React.ReactNode
  content: string
  maxCharsPerLine?: number // Default char limit per line
  maxLines?: number // Optional: limit number of lines
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}

const AppTooltip = ({
  trigger,
  content,
  maxCharsPerLine = 60,
  maxLines,
  side = "top",
  className,
}: Props) => {
  // Break content into lines based on maxCharsPerLine
  const lines: string[] = []
  for (let i = 0; i < content.length; i += maxCharsPerLine) {
    lines.push(content.slice(i, i + maxCharsPerLine).trim())
  }

  const displayedLines = maxLines ? lines.slice(0, maxLines) : lines

  return (
    <Tooltip>
      <TooltipTrigger>
        {trigger ?? <InfoIcon className="text-muted-foreground w-4 h-4" />}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn("whitespace-pre-line break-words text-sm", className)}
      >
        {displayedLines.map((line, index) => (
          <p key={index} className="mb-1 last:mb-0">
            {line}
          </p>
        ))}
      </TooltipContent>
    </Tooltip>
  )
}

export default AppTooltip
