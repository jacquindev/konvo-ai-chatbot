"use client"

import AppTable from "@/components/global/app-table"
import GlassSheet from "@/components/global/glass-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableCell, TableRow } from "@/components/ui/table"
import { useState } from "react"

type Props = {
  domains: {
    customers: {
      id: string
      email: string | null
      Domain: {
        name: string
      } | null
    }[]
  }[]
}

const CustomerTable = ({ domains }: Props) => {
  const customers = domains?.flatMap(domain => domain.customers)

  const headers = [
    { name: "Id" },
    { name: "Email" },
    { name: "Domain", className: "text-right" },
    { name: "Answers" },
  ]

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const handleSelect = (id: string) => setSelectedId(id)

  return (
    <AppTable headers={headers}>
      {customers.length > 0 ? (
        customers.map(customer => (
          <TableRow key={customer.id} className="hover:bg-muted/30">
            <TableCell>
              <Input
                type="radio"
                name="selectedCustomer"
                checked={selectedId === customer.id}
                onChange={() => handleSelect(customer.id)}
                className="accent-primary"
              />
            </TableCell>
            <TableCell className="text-muted-foreground hover:text-foreground text-sm">
              {customer.email || "-"}
            </TableCell>
            <TableCell className="text-muted-foreground hover:text-foreground text-right text-sm font-medium">
              {customer.Domain?.name || "-"}
            </TableCell>
            <TableCell className="text-muted-foreground hover:text-foreground text-right text-sm">
              <GlassSheet
                title="Answers"
                description="Answers are stored by the bot when your customers respond back to the questions asked by the bot."
                trigger={
                  <Button size="sm" className="cursor-pointer">
                    View
                  </Button>
                }
              >
                {/* TODO: Add customer responses */}
                CustomerResponses
              </GlassSheet>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={headers.length} className="text-muted-foreground py-4 text-center">
            No customers found
          </TableCell>
        </TableRow>
      )}
    </AppTable>
  )
}

export default CustomerTable
