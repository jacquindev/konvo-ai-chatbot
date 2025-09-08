"use client"

import { searchIconStyle, searchInputStyle } from "@/components/global/search"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import React from "react"

type Props = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
}

const ProductsToolbar = ({ search, setSearch, sort, setSort }: Props) => {
  return (
    <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
      <div className="bg-background relative w-full rounded-full md:w-4/5">
        <SearchIcon className={searchIconStyle()} />
        <Input
          className={searchInputStyle()}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for a product..."
        />
      </div>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="bg-card/55 dark:bg-background/25 w-full rounded-lg transition-[color,box-shadow] md:w-1/5">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="dark:bg-background/60 rounded-lg backdrop-blur-lg">
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProductsToolbar
