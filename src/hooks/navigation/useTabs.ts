import { usePathname } from "next/navigation"
import { useMemo } from "react"

export const useTabs = () => {
  const pathname = usePathname()
  const activeTab = useMemo(() => {
    const path = pathname.split("/").filter(Boolean)
    return path[path.length - 1] || ""
  }, [pathname])

  return {
    activeTab,
  }
}
