"use client"

import { Input } from "@/components/ui/input"
import { cva } from "class-variance-authority"
import { SearchIcon } from "lucide-react"

export const searchBarStyle = cva("relative flex-1 rounded-full")
export const searchIconStyle = cva("absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500")
export const searchInputStyle = cva(
  "pl-10 rounded-full truncate outline-none ring-0 focus:ring-0 border border-primary dark:border-input"
)

type Props = {
  userId: string
  placeholder?: string
}

// TODO: Build a functional search bar

const Search = ({ userId, placeholder }: Props) => {
  return (
    <div className={searchBarStyle()}>
      <SearchIcon className={searchIconStyle()} />
      <Input
        placeholder={placeholder ?? "Search ..."}
        className={searchInputStyle()}
      />
    </div>
  )
}

type SearchHighlightProps = {
  text: string
  highlight: string
}

export const SearchHighlight = ({ text, highlight }: SearchHighlightProps) => {
  if (!highlight.trim()) return <span>{text}</span>

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-indigo-300 dark:bg-indigo-400">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export default Search
