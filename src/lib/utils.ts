import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility: Determines if background color is light or dark for text contrast
export function getContrastColor(bgColor: string): string {
  if (bgColor.startsWith("linear-gradient")) {
    return "#fff"
  }

  let color = bgColor.startsWith("#") ? bgColor.slice(1) : bgColor
  if (color.length === 3) {
    color = color
      .split("")
      .map(c => c + c)
      .join("")
  }

  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)

  // ITU-R BT.709 luminance formula
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  return luminance > 0.6 ? "#000" : "#fff"
}

export function getMonthName(month: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  if (month < 1 || month > 12) {
    throw new Error("Invalid month. Must be between 1 and 12.")
  }

  return months[month - 1]
}

export function formatDateTime(date: Date) {
  return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`
}
