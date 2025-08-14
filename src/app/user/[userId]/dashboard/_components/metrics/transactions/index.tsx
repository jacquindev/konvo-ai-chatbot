"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag } from "lucide-react"
import { Variants, motion } from "motion/react"
import { useState } from "react"
import Stripe from "stripe"
import TransactionsModal from "./modal"

type Props = {
  variants: Variants
  transactions: Stripe.Charge[]
}

const Transactions = ({ variants, transactions }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardHeader className="p-0">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-row items-center gap-3">
            <div className="border-border text-muted-foreground flex aspect-square h-10 w-10 items-center justify-center rounded-md border p-1">
              <ShoppingBag />
            </div>
            <div>
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
              <CardDescription>An overview of your latest earnings.</CardDescription>
            </div>
          </div>

          {/* TODO: Make the see all works on click */}
          <p
            className="text-primary text-sm font-semibold hover:cursor-pointer hover:underline"
            onClick={() => setOpen(true)}
          >
            See all
          </p>
        </div>
        <Separator className="bg-primary/30 mx-auto" />
      </CardHeader>

      <div className="flex flex-col gap-5 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="space-y-4"
        >
          {transactions.length > 0 ? (
            transactions.slice(0, 4).map((tx, i) => (
              <motion.div
                key={tx.id}
                className="border-primary/20 flex items-center justify-between border-b px-2 py-1"
                variants={variants}
                custom={i}
              >
                <p className="max-w-[60%] truncate text-sm font-medium">
                  {tx.calculated_statement_descriptor}
                </p>
                <p className="text-sm font-medium text-green-600">
                  +${(tx.amount / 100).toFixed(2)}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-muted-foreground py-6 text-center text-lg"
              variants={variants}
            >
              No recent transactions.
            </motion.div>
          )}
        </motion.div>
      </div>

      <TransactionsModal open={open} onClose={() => setOpen(false)} transactions={transactions} />
    </Card>
  )
}

export default Transactions
