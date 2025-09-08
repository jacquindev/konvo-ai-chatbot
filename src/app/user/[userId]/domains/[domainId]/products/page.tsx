"use client"

import { TabsSection } from "@/components/global/tabs"
import { useDomainProducts } from "@/hooks/contexts/domain"
import { useQueryDomainProducts } from "@/hooks/queries"
import { useDebounce } from "@/hooks/shared"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import ProductsFormSheet from "./_components/form-sheet"
import ProductsTable from "./_components/table"
import ProductsToolbar from "./_components/tool-bar"

const ProductsPage = () => {
  const { domainId } = useParams()

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)

  const pageSize = 5
  const debouncedSearch = useDebounce(search, 300)

  const { data } = useQueryDomainProducts(domainId as string)
  const { register, errors, onCreateProduct, creatingProduct } = useDomainProducts(
    domainId as string
  )

  const products = data?.products ?? []

  const filtered = useMemo(() => {
    const matches = products.filter(p =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    switch (sort) {
      case "name":
        return [...matches].sort((a, b) => a.name.localeCompare(b.name))
      case "price":
        return [...matches].sort((a, b) => a.price - b.price)
      case "createdAt":
        return [...matches].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      default:
        return matches
    }
  }, [products, debouncedSearch, sort])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <TabsSection
      title="Products Management"
      description="Manage your product listings, prices, and availability."
      trigger={
        <ProductsFormSheet
          register={register}
          errors={errors}
          loading={creatingProduct}
          onSubmit={onCreateProduct}
        />
      }
    >
      <ProductsToolbar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      {paginated.length > 0 ? (
        <ProductsTable products={paginated} page={page} setPage={setPage} totalPages={totalPages} />
      ) : (
        <div className="text-muted-foreground py-10 text-center">No products found.</div>
      )}
    </TabsSection>
  )
}

export default ProductsPage
