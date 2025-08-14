"use client"

import { useThemeMode } from "@/hooks/ui"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import React from "react"

type Props = {
  children: React.ReactNode
}

const ClerkClientProvider = ({ children }: Props) => {
  const { theme } = useThemeMode()

  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: theme === "dark" ? "#a48fff" : "#6e56cf",
          colorText: theme === "dark" ? "#e2e2f5" : "#2a2a4a",
          colorBackground: theme === "dark" ? "#1a1a2ef7" : "#f5f5fff2",
          borderRadius: "0.625rem",
        },
        captcha: { size: "flexible" }
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkClientProvider
