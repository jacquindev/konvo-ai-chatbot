import AppTable from "@/components/global/app-table"
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import React from "react"
import ProductRow from "./row"

type Props = {
  products: Partial<Product>[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}

const ProductsTable = ({ products, page, setPage, totalPages }: Props) => {
  const headers = [
    { name: "image" },
    { name: "name" },
    { name: "price" },
    { name: "created at" },
    { name: "actions" },
  ]

  return (
    <>
      <AppTable headers={headers}>
        {products.map((product, i) => (
          <ProductRow key={product.id} product={product} index={i} />
        ))}
      </AppTable>

      <div className="flex justify-center gap-2 pt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)} size="sm" variant="ghost">
          <ArrowLeft />
        </Button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          size="sm"
          variant="ghost"
        >
          <ArrowRight />
        </Button>
      </div>
    </>
  )
}

export default ProductsTable
