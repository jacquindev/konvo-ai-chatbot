// components/dashboard/TransactionsModal.tsx

"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Stripe from "stripe"

type Props = {
  open: boolean
  onClose: () => void
  transactions: Stripe.Charge[]
}

const TransactionsModal = ({ open, onClose, transactions }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">All Transactions</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[450px] space-y-3 pr-2">
          {transactions.length > 0 ? (
            transactions.map(tx => (
              <div
                key={tx.id}
                className="hover:bg-muted mb-2 flex items-center justify-between border-b p-2 transition"
              >
                <div className="text-foreground/80 truncate text-sm">
                  {tx.calculated_statement_descriptor || "Transaction"}
                </div>
                <div className="text-sm font-medium text-green-600">
                  +${(tx.amount / 100).toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center text-sm">No transactions available.</p>
          )}
        </ScrollArea>

        <DialogFooter className="pr-2">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionsModal
