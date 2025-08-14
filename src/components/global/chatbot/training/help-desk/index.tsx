"use client"

import AppAccordion from "@/components/global/app-accordion"
import AppTooltip from "@/components/global/app-tooltip"
import { FormGenerator } from "@/components/global/form-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useHelpDesk } from "@/hooks/contexts/chatbot"
import { useQueryDomainHelpDesk } from "@/hooks/queries"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = { domainId: string }

const ChatBotHelpDesk = ({ domainId }: Props) => {
  const { register, errors, handleAddHelpDesk, addingHelpDesk } = useHelpDesk(domainId)
  const { data, isPending } = useQueryDomainHelpDesk(domainId)

  const questions = data?.questions ?? []
  const pathname = usePathname()

  return (
    <Card className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 border-b lg:border-r lg:border-b-0 border-border space-y-6">
          <CardHeader>
            <CardTitle className="text-2xl">Help Desk</CardTitle>
            <CardDescription className="text-sm">
              Add & manage frequently asked questions for your chatbot.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAddHelpDesk} className="flex flex-col gap-6">
              <div className="space-y-2">
                <FormGenerator
                  label="Question"
                  description="Enter a frequently asked question."
                  inputType="input"
                  placeholder="What is the best way to contact you?"
                  register={register}
                  name="question"
                  errors={errors}
                  form="help-desk-form"
                />
              </div>
              <div className="space-y-2">
                <FormGenerator
                  label="Answer"
                  description="Provide a clear and concise response."
                  register={register}
                  errors={errors}
                  inputType="textarea"
                  form="help-desk-form"
                  name="answer"
                  placeholder="Write the answer here..."
                  type="text"
                  lines={5}
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button className="w-fit cursor-pointer" disabled={addingHelpDesk} type="submit">
                  {addingHelpDesk ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Question"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">FAQ List</CardTitle>
            <AppTooltip content="These are the active questions shown in your chatbot." />
          </div>

          <CardContent className="space-y-4 p-0 max-h-[400px] overflow-y-auto">
            <AnimatePresence initial={false} mode="wait">
              {questions.length > 0 ? (
                questions.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "relative border border-border rounded-lg px-4 pb-3 pt-0 transition bg-muted hover:bg-primary/15"
                    )}
                  >
                    <Link href={`${pathname}?question=${item.question.trim()}`}>
                      <AppAccordion
                        trigger={item.question}
                        content={item.answer}
                        className="top-0"
                      />
                    </Link>

                    <div className="absolute bottom-1 right-3 flex gap-1 items-center">
                      {/* TODO: Delete Helpdesk button */}
                    </div>
                  </motion.div>
                ))
              ) : (
                <CardDescription className="text-sm">No questions available yet.</CardDescription>
              )}
            </AnimatePresence>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default ChatBotHelpDesk
