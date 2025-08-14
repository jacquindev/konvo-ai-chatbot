import SidebarToggle from "@/components/global/app-sidebar/sidebar-toggle"
import Search from "@/components/global/search"
import ThemeSwitcher from "@/components/global/theme-switcher"
import { Separator } from "@/components/ui/separator"
import BreadCrumb from "./bread-crumb"

type Props = {
  userId: string
}

const AppInfoBar = ({ userId }: Props) => {
  return (
    <header className="bg-sidebar/40 sticky top-0 right-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 rounded-t-xl px-4 shadow-sm backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex items-center gap-2">
        <SidebarToggle />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <BreadCrumb userId={userId} />
      </div>

      <div className="flex w-6/12 flex-wrap items-center gap-2 md:flex-row">
        <Search userId={userId} />
        <Separator orientation="vertical" className="ml-2 data-[orientation=vertical]:h-4" />
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default AppInfoBar
