"use client"

import DangerZone, { DangerZoneButton } from "@/components/global/danger-zone"
import { DeleteDomain } from "@/components/global/domain"
import { FormGenerator } from "@/components/global/form-generator"
import { TabsSection } from "@/components/global/tabs"
import { CodeBlock } from "@/components/registry/code-block"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { codeSnippetTemplate } from "@/constants/template"
import { useDomainSettings } from "@/hooks/contexts/domain"
import { useQueryCurrentDomain } from "@/hooks/queries"
import { Loader2 } from "lucide-react"
import { motion, Variants } from "motion/react"
import { useParams } from "next/navigation"

const motionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const DomainSettingsPage = () => {
  const { userId, domainId } = useParams()

  const { register, errors, updatingDomainName, handleSubmitDomainName } = useDomainSettings(
    domainId as string
  )

  const { data: domain } = useQueryCurrentDomain(domainId as string)
  const domainName = domain?.data?.domain?.name ?? ""

  return (
    <>
      <TabsSection
        title="Domain Settings"
        description="Configure the domain you've connected to this workspace."
      >
        <form onSubmit={handleSubmitDomainName} className="space-y-10">
          <motion.div variants={motionVariants}>
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <FormGenerator
                  register={register}
                  errors={errors}
                  name="domain"
                  type="text"
                  inputType="input"
                  label="Domain Name"
                  placeholder={domainName}
                  defaultValue={domainName}
                />
              </div>
              <Button
                className="mt-6 hover:cursor-pointer"
                type="submit"
                disabled={updatingDomainName}
              >
                {updatingDomainName ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Domain Name"
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div variants={motionVariants}>
            <div className="space-y-2">
              <div>
                <Label htmlFor="code-snippet">Code Snippet</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Copy & paste this into your site&apos;s <code>&lt;head&gt;</code> tag.
                </p>
              </div>

              <ScrollArea
                id="code-snippet"
                className="w-full h-fit rounded-md bg-background backdrop-blur-sm"
              >
                <CodeBlock
                  language="javascript"
                  filename="konvo.js"
                  code={codeSnippetTemplate(domainId as string)}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </motion.div>
        </form>
      </TabsSection>
      <DangerZone
        className="mt-6"
        description="This action cannot be undone. This will permanently delete your domain and all its related data from our servers."
      >
        <DeleteDomain
          userId={userId as string}
          domainId={domainId as string}
          trigger={<DangerZoneButton>Delete Domain</DangerZoneButton>}
        />
      </DangerZone>
    </>
  )
}

export default DomainSettingsPage
