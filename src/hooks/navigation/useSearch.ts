import { useState } from "react"

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return {
    searchValue,
    selectedIndex,
  }
}
