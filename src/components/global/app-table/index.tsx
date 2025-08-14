import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  headers: { name: string; className?: string }[]
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const AppTable = ({ headers, children, footer, className }: Props) => {
  return (
    <Table className={cn("mt-2 w-full overflow-hidden rounded-lg", className)}>
      <TableHeader className="bg-primary/20 hover:bg-primary/20 hover:dark:bg-muted dark:bg-muted">
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className={cn(
                "capitalize",
                header.className,
                index === headers.length - 1 && "text-right"
              )}
            >
              {header.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="divide-border divide-y bg-transparent">{children}</TableBody>

      {footer && <TableFooter>{footer}</TableFooter>}
    </Table>
  )
}

export default AppTable
