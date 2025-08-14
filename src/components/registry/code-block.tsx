"use client"

import { useMounted } from "@/hooks/shared"
import { useThemeMode } from "@/hooks/ui"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { toast } from "sonner"

type CodeBlockProps = {
  language: string
  filename: string
  highlightLines?: number[]
} & (
  | {
      code: string
      tabs?: never
    }
  | {
      code?: never
      tabs: Array<{
        name: string
        code: string
        language?: string
        highlightLines?: number[]
      }>
    }
)

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const isMounted = useMounted()

  const [copied, setCopied] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<number>(0)

  const { theme } = useThemeMode()

  const tabsExist = tabs.length > 0

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      toast.success("Copied to clipboard", {
        description: "You can now paste the code inside your website",
      })
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeCode = tabsExist ? tabs[activeTab].code : code
  const activeLanguage = tabsExist ? tabs[activeTab].language || language : language
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines

  // Dynamically choose theme
  const syntaxTheme = theme === "light" ? materialLight : materialDark // fallback to dark if theme is system/undefined

  return (
    <div className="relative w-full rounded-lg bg-transparent p-4 mt-8 font-mono text-sm">
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 text-xs transition-colors font-sans ${
                  activeTab === index ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="z-50 fixed top-2 left-4 right-4 px-4 flex justify-between items-center p-0">
            <div className="text-xs text-zinc-400 mb-2">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              {copied ? <Check size={14} /> : <Copy size={16} />}
            </button>
          </div>
        )}
      </div>

      <SyntaxHighlighter
        language={activeLanguage}
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem",
        }}
        wrapLines
        showLineNumbers
        lineProps={(lineNumber: number) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  )
}
