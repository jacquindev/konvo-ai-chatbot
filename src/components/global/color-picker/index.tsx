"use client"

import AppTooltip from "@/components/global/app-tooltip"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { GRADIENT_PRESETS, SOLID_PRESETS } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from "react"

type ModeType = "preset" | "solid" | "gradient" | "custom"

type Props = {
  label?: string
  value?: string
  onValueChangeAction?: (value: string) => void
  description?: string
}

export default function ColorPicker({
  value = "",
  onValueChangeAction,
  label = "Color",
  description = "Pick a color for your chatbot icon.",
}: Props) {
  const initialMode: ModeType = value.startsWith("linear-gradient")
    ? "gradient"
    : SOLID_PRESETS.includes(value)
      ? "preset"
      : value.startsWith("#")
        ? "solid"
        : "custom"

  const DEFAULT_DEGREE = 45

  const [mode, setMode] = useState<ModeType>(initialMode)
  const [customValue, setCustomValue] = useState(value)

  // Store base gradient preset without degree:
  const [baseGradientPreset, setBaseGradientPreset] = useState<string | null>(null)
  const [gradientDegree, setGradientDegree] = useState(DEFAULT_DEGREE)

  // Extract colors inside linear-gradient(...)
  function extractColors(gradientStr: string) {
    const match = gradientStr.match(/\(([^)]+)\)/)
    if (!match) return []
    const parts = match[1].split(",").map(s => s.trim())
    if (parts.length > 1 && (parts[0].startsWith("to") || parts[0].endsWith("deg"))) parts.shift()
    return parts
  }

  // Compose gradient string from degree + colors
  const composeGradient = (degree: number, gradientPreset: string) => {
    const colors = extractColors(gradientPreset)
    if (colors.length < 2) return gradientPreset
    return `linear-gradient(${degree}deg, ${colors.join(", ")})`
  }

  // On selecting preset color or gradient
  const handleSelect = (val: string) => {
    onValueChangeAction?.(val)
    setCustomValue(val)

    if (val.startsWith("linear-gradient")) {
      // When user picks a gradient preset, find matching base preset (ignore degree)
      const matchedPreset = GRADIENT_PRESETS.find(preset => {
        const presetColors = extractColors(preset).join(", ")
        const valColors = extractColors(val).join(", ")
        return presetColors === valColors
      })
      setBaseGradientPreset(matchedPreset || null)
      setGradientDegree(DEFAULT_DEGREE)
    } else {
      setBaseGradientPreset(null)
    }
  }

  // When degree changes, rebuild gradient if base preset known
  useEffect(() => {
    if (mode === "preset" && baseGradientPreset) {
      const newGradient = composeGradient(gradientDegree, baseGradientPreset)
      setCustomValue(newGradient)
      onValueChangeAction?.(newGradient)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradientDegree])

  // If user manually edits gradient or custom input, update baseGradientPreset accordingly
  useEffect(() => {
    if (customValue.startsWith("linear-gradient")) {
      // Try to find matching preset ignoring degree
      const matchedPreset = GRADIENT_PRESETS.find(preset => {
        const presetColors = extractColors(preset).join(", ")
        const valColors = extractColors(customValue).join(", ")
        return presetColors === valColors
      })
      setBaseGradientPreset(matchedPreset || null)
    } else {
      setBaseGradientPreset(null)
    }
  }, [customValue])

  // Reset degree to default
  const resetDegree = () => {
    setGradientDegree(DEFAULT_DEGREE)
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Label className="text-sm font-semibold">{label}</Label>
        <AppTooltip content={description} />
      </div>
      <Select
        value={mode}
        onValueChange={val => setMode(val as ModeType)}
        aria-label="Select color mode"
      >
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Select color mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="preset">Presets</SelectItem>
          <SelectItem value="solid">Solid</SelectItem>
          <SelectItem value="gradient">Gradient</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      <Card className="bg-background border border-border rounded-lg shadow-sm p-0 mt-4">
        <CardContent className="p-4 space-y-6">
          {/* Color preview */}
          <AnimatePresence initial={false}>
            {customValue && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Label className="text-sm mb-1 font-medium">Preview</Label>
                <div
                  className="w-full h-14 rounded-lg border shadow-inner transition-all"
                  style={{ background: customValue }}
                  aria-label="Color preview"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Presets mode */}
          <AnimatePresence initial={false}>
            {mode === "preset" && (
              <motion.div
                key="preset"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <Label className="text-sm font-medium mb-2">Solid Presets</Label>
                  <div className="max-h-[125px] overflow-y-auto rounded-md border border-border p-2 shadow-inner">
                    <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
                      {SOLID_PRESETS.map(color => (
                        <button
                          key={color}
                          className={cn(
                            "h-12 w-12 rounded-full border transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                            color === value
                              ? "ring-2 ring-offset-2 ring-primary scale-110"
                              : "hover:scale-110"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => handleSelect(color)}
                          aria-label={`Select solid color ${color}`}
                          type="button"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2">Gradient Presets</Label>
                  <div className="max-h-[125px] overflow-y-auto rounded-md border border-border p-2 shadow-inner">
                    <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
                      {GRADIENT_PRESETS.map(gradient => (
                        <button
                          key={gradient}
                          className={cn(
                            "h-12 w-12 rounded-md border transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                            gradient === value
                              ? "ring-2 ring-offset-2 ring-primary scale-110"
                              : "hover:scale-110"
                          )}
                          style={{ background: gradient }}
                          onClick={() => handleSelect(gradient)}
                          aria-label={`Select gradient preset`}
                          type="button"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Show slider + reset only if selected preset is gradient */}
                {baseGradientPreset && (
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1">
                      <Label htmlFor="gradient-degree" className="text-sm font-medium mb-1">
                        Gradient Angle: {gradientDegree}°
                      </Label>
                      <Slider
                        id="gradient-degree"
                        min={0}
                        max={360}
                        step={1}
                        value={[gradientDegree]}
                        onValueChange={vals => setGradientDegree(vals[0])}
                        aria-label="Gradient angle slider"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetDegree}
                      aria-label="Reset gradient angle"
                      title="Reset gradient angle"
                      className="h-10 w-10 flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solid mode */}
          <AnimatePresence initial={false}>
            {mode === "solid" && (
              <motion.div
                key="solid"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <Label htmlFor="solid-color" className="text-sm font-medium">
                  Choose Solid Color
                </Label>
                <Input
                  id="solid-color"
                  type="color"
                  className="w-16 h-12 rounded-md border cursor-pointer"
                  value={value || "#000000"}
                  onChange={e => handleSelect(e.target.value)}
                  aria-label="Choose solid color"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gradient mode */}
          <AnimatePresence initial={false}>
            {mode === "gradient" && (
              <motion.div
                key="gradient"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <Label htmlFor="gradient-css" className="text-sm font-medium">
                  Gradient CSS
                </Label>
                <Input
                  id="gradient-css"
                  placeholder="e.g. linear-gradient(to right, #4facfe, #00f2fe)"
                  value={customValue}
                  onChange={e => handleSelect(e.target.value)}
                  aria-label="Enter gradient CSS"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom mode */}
          <AnimatePresence initial={false}>
            {mode === "custom" && (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <Label htmlFor="custom-color" className="text-sm font-medium">
                  Custom Color or Gradient
                </Label>
                <Input
                  id="custom-color"
                  placeholder="e.g. #3b82f6 or linear-gradient(...)"
                  value={customValue}
                  onChange={e => handleSelect(e.target.value)}
                  aria-label="Enter custom color or gradient"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </>
  )
}
