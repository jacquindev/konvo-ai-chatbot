"use client"

import { Moon, Sun } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useThemeMode } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { CheckCircle2 } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import React from "react"

type Props = {
  type?: "button" | "canvas"
}

const sunIconStyle = cva(
  "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
)
const moonIconStyle = cva(
  "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
)

const themes = [
  { value: "light", image: "/assets/light-mode.png" },
  { value: "dark", image: "/assets/dark-mode.png" },
  { value: "system", image: "/assets/system-mode.png" },
]

const ThemeSwitcher = ({ type = "button" }: Props) => {
  const { toggleTheme, theme, setTheme } = useThemeMode()

  switch (type) {
    case "button":
    default:
      return (
        <Button
          variant="secondary"
          size="icon"
          className="size-7 border border-border"
          onClick={toggleTheme}
        >
          <Sun style={{ width: 20, height: 20 }} className={sunIconStyle()} />
          <Moon style={{ width: 20, height: 20 }} className={moonIconStyle()} />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      )

    case "canvas":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {themes.map(({ value, image }) => {
            const isActive = theme === value

            return (
              <motion.div
                key={value}
                onClick={() => setTheme(value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl transition-all",
                  "gradient-background pt-12", // apply gradient directly here
                  isActive
                    ? "border-primary outline-8 ring-2 ring-primary/50 drop-shadow-xl"
                    : "border-muted hover:border-primary/50"
                )}
              >
                <div className="ml-10 aspect-video relative w-full">
                  <Image
                    src={image}
                    alt={`${value} theme`}
                    fill
                    className="object-cover transition-all rounded-tl-xl group-hover:brightness-110"
                  />
                </div>

                <div className="relative z-10 p-2 flex items-center justify-between text-sm font-medium bg-muted/70 backdrop-blur-sm text-foreground">
                  <span className="capitalize">{value}</span>
                  {isActive && <CheckCircle2 className="text-primary w-4 h-4" />}
                </div>
              </motion.div>
            )
          })}
        </div>
      )
  }
}

export default ThemeSwitcher
