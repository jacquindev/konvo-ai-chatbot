"use client"

import AppTooltip from "@/components/global/app-tooltip"
import { FormGenerator } from "@/components/global/form-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFilterQuestion } from "@/hooks/contexts/chatbot/useFilterQuestion"
import { useQueryDomainFilterQuestion } from "@/hooks/queries"
import { Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = { domainId: string }

const ChatBotFilterQuestions = ({ domainId }: Props) => {
  const { register, errors, handleAddFilterQuestion, addingFilterQuestion } =
    useFilterQuestion(domainId)
  const { data, isPending } = useQueryDomainFilterQuestion(domainId)

  const questions = data?.questions ?? []
  const pathname = usePathname()

  return (
    <Card className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="p-6 border-b lg:border-r lg:border-b-0 border-border space-y-6">
          <CardHeader>
            <CardTitle className="text-2xl">Bot Questions</CardTitle>
            <CardDescription className="text-sm">
              Add questions that your chatbot will ask to customers.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAddFilterQuestion} className="flex flex-col gap-6">
              <div className="space-y-2">
                <FormGenerator
                  label="Question"
                  description="Add a question your chatbot will ask site visitors."
                  inputType="input"
                  placeholder="What is the best way to contact you?"
                  register={register}
                  name="question"
                  errors={errors}
                  form="filter-questions-form"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  className="w-fit cursor-pointer"
                  type="submit"
                  disabled={addingFilterQuestion}
                >
                  {addingFilterQuestion ? (
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

        {/* Right: FAQ list */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Bot Question Bank</CardTitle>
            <AppTooltip content="These questions will guide the bot's conversations." />
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
                    className="relative rounded-md bg-muted p-3 text-sm text-muted-foreground border border-border hover:bg-primary/15"
                  >
                    <Link href={`${pathname}?question=${item.question.trim()}`}>
                      <p className="font-medium pr-6 truncate">{item.question}</p>
                    </Link>

                    <div className="absolute top-3 right-3 flex gap-1 items-center">
                      {/* TODO: Wire up delete button */}
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

export default ChatBotFilterQuestions
