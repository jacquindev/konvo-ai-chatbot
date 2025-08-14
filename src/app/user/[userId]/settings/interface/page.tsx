import { TabsSection } from "@/components/global/tabs"
import ThemeSwitcher from "@/components/global/theme-switcher"

const ThemeSettingsPage = () => {
  return (
    <TabsSection title="Interface Settings" description="Select your preferred theme style.">
      <ThemeSwitcher type="canvas" />
    </TabsSection>
  )
}

export default ThemeSettingsPage
