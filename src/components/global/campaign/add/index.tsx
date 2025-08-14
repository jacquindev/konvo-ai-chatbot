"use client"

import AppButton from "@/components/global/app-button"
import { FormGenerator } from "@/components/global/form-generator"
import Modal, { ModalFooter } from "@/components/global/modal"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEmailMarketing } from "@/hooks/contexts/email"
import { useQueryUserCustomers } from "@/hooks/queries"
import { cn } from "@/lib/utils"
import { Loader2, Plus } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

type Props = {
  userId: string
  className?: string
  animated?: boolean
}

const AddCampaign = ({ userId, className, animated = false }: Props) => {
  const [open, setOpen] = useState(false)

  const { register, errors, handleSubmitCampaign, addingCampaign } = useEmailMarketing()
  const { data } = useQueryUserCustomers(userId)

  const customers =
    data?.data?.domains?.flatMap(domain =>
      domain.customers.map(c => ({
        id: c.id,
        email: c.email ?? "unknown@email.com",
        domainName: c.Domain?.name ?? "unknown domain",
      }))
    ) ?? []

  const renderTrigger = () => {
    return (
      <AppButton className={cn(className, "w-fit cursor-pointer rounded-lg")}>
        <Plus className="h-4 w-4" />
        New Campaign
      </AppButton>
    )
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add a campaign"
      description="Create a new campaign to your email marketing strategy."
      trigger={
        animated ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            {renderTrigger()}
          </motion.div>
        ) : (
          renderTrigger()
        )
      }
    >
      <form className="space-y-4" onSubmit={handleSubmitCampaign}>
        <FormGenerator
          register={register}
          errors={errors}
          inputType="input"
          type="text"
          placeholder="Your campaign name"
          name="name"
          label="Campaign Name"
        />
        <FormGenerator
          register={register}
          errors={errors}
          inputType="textarea"
          placeholder="Short description of your campaign..."
          name="description"
          label="Description"
          lines={5}
        />
        <FormGenerator
          register={register}
          errors={errors}
          inputType="textarea"
          placeholder="Your email content..."
          name="template"
          label="Email Template / Message"
          lines={10}
        />

        {/* TODO: Customers Selection */}
        <div className="space-y-1">
          <Label>Customers</Label>
          {customers.length > 0 ? (
            customers.map(customer => (
              <Label key={customer.id} className="flex items-center gap-2 text-sm">
                <Input type="checkbox" value={customer.id} {...register("customers")} />
                <span>
                  {customer.email}{" "}
                  <span className="text-muted-foreground">{customer.domainName}</span>
                </span>
              </Label>
            ))
          ) : (
            <CardDescription>No customers found.</CardDescription>
          )}
        </div>

        <ModalFooter>
          <Button type="submit" className="cursor-pointer" disabled={addingCampaign}>
            {addingCampaign ? (
              <>
                <Loader2 className="animate-spin" /> Creating...{" "}
              </>
            ) : (
              "Create"
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddCampaign
