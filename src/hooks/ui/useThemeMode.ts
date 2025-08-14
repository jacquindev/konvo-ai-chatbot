import { useTheme } from "next-themes"
import { useMounted } from "../shared"

export const useThemeMode = () => {
  const { theme, setTheme } = useTheme()

  const isMounted = useMounted()
  const currentTheme = theme ?? "system"

  const toggleTheme = () => {
    if (!isMounted) return

    const nextTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
  }

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme,
  }
}
