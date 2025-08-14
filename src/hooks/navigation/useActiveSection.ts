import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export const useActiveSection = () => {
  const pathname = usePathname()
  const [section, setSection] = useState(pathname)

  useEffect(() => {
    setSection(pathname)
  }, [pathname])

  const onSetSection = useCallback((path: string) => {
    setSection(path)
  }, [])

  return {
    section,
    onSetSection,
  }
}
