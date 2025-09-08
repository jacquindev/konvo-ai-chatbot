"use client"

import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { uploadImageString } from "@/lib/upload"
import { cn, formatDateTime } from "@/lib/utils"
import { Product } from "@prisma/client"
import { Trash2 } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

type Props = {
  product: Partial<Product>
  index: number
}

const ProductRow = ({ product, index }: Props) => {
  const fallbackImage = "https://placehold.co/300x300/transparent/purple"

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="hover:bg-muted cursor-pointer transition"
    >
      <TableCell>
        <Image
          src={product.image ? uploadImageString(product.image) : fallbackImage}
          alt="Product Image"
          width={55}
          height={55}
          className="rounded-md border object-cover"
          onError={e => {
            e.currentTarget.src = fallbackImage
          }}
        />
      </TableCell>

      <TableCell title={product.name} className={cn("max-w-[160px] truncate")}>
        {product.name}
      </TableCell>

      <TableCell className="text-muted-foreground text-right">
        {typeof product.price === "number" ? `$${product.price.toFixed(2)}` : "—"}
      </TableCell>

      <TableCell className="text-muted-foreground text-right text-xs">
        {product.createdAt ? formatDateTime(product.createdAt) : "—"}
      </TableCell>

      <TableCell className="text-right">
        {/* TODO: Delete product button */}
        <Button size="icon" className="size-6 transition-all group-hover:scale-105">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </motion.tr>
  )
}

export default ProductRow
