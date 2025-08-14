"use client"

import GlassSheet from "@/components/global/glass-sheet"
import Modal from "@/components/global/modal"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn, formatDateTime } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Calendar, Clock, Pencil, Users } from "lucide-react"
import { motion } from "motion/react"
import CampaignCardTrigger from "./trigger"
import { Campaign } from "@prisma/client"

type Props = {
  userId: string
  name: string
  description?: string
  customers: number
  createdAt?: Date
  updatedAt?: Date
  template?: string
  campaign: Partial<Campaign>
}

const titleStyle = cva(
  "font-semibold uppercase text-gray-400 dark:text-muted-foreground col-span-1"
)
const detailStyle = cva("text-sm text-foreground flex items-center gap-2 col-span-2")
const iconStyle = cva("w-4 h-4 text-gray-500 dark:text-muted-foreground")

const CampaignCard = ({
  userId,
  name,
  description,
  customers,
  createdAt,
  updatedAt,
  template,
  campaign,
}: Props) => {
  return (
    <GlassSheet
      title="Campaign Details"
      description="View the details of your campaign."
      side="right"
      trigger={
        <CampaignCardTrigger
          userId={userId}
          name={name}
          description={description}
          customers={customers}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      }
    >
      <motion.div
        className="space-y-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="grid grid-cols-3 gap-4">
          <dt className={titleStyle()}>Name</dt>
          <dd className={cn(detailStyle(), "text-primary font-bold text-lg")}>{name}</dd>

          <dt className={titleStyle()}>Description</dt>
          <dd
            className={cn(
              detailStyle(),
              "col-span-2 text-muted-foreground text-sm whitespace-pre-wrap leading-tight tracking-tight"
            )}
          >
            {description ?? "No description"}
          </dd>

          <dt className={titleStyle()}>Template</dt>
          <dd
            className={cn(
              detailStyle(),
              "col-span-2 text-sm whitespace-pre-wrap leading-tight tracking-tight italic"
            )}
          >
            {template ?? "No template"}
          </dd>

          <dt className={titleStyle()}>Customers</dt>
          <dd className={detailStyle()}>
            <Users className={iconStyle()} />
            {customers}
            <span className="text-muted-foreground text-xs">
              {customers > 1 ? "customers" : "customer"}
            </span>
          </dd>

          <dt className={titleStyle()}>Created At</dt>
          <dd className={detailStyle()}>
            <Calendar className={iconStyle()} />
            {createdAt ? formatDateTime(createdAt) : "—"}
          </dd>

          <dt className={titleStyle()}>Updated At</dt>
          <dd className={detailStyle()}>
            <Clock className={iconStyle()} />
            {updatedAt ? formatDateTime(updatedAt) : "—"}
          </dd>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end gap-3">
          <Modal
            trigger={
              <Button variant="outline">
                <Pencil className="w-4 h-4 mr-1" /> Edit{" "}
              </Button>
            }
            title="Edit Campaign"
            description="Edit campaign details"
          >
            EditCampaign
          </Modal>
        </div>
      </motion.div>
    </GlassSheet>
  )
}

export default CampaignCard
