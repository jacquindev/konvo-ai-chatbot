import { useSidebar } from "@/components/ui/sidebar"

export const useCollapsedSidebar = () => {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return isCollapsed
}
