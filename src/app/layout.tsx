import { Toaster } from "@/components/ui/sonner"
import { ClerkClientProvider, ReactQueryProvider, ThemeProvider } from "@/providers"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const font = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Konvo.",
  description: "Konvo is a platform for creating and managing your chatbots.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <ClerkClientProvider>
            <ReactQueryProvider>
              {children}
              <Toaster closeButton />
            </ReactQueryProvider>
          </ClerkClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
