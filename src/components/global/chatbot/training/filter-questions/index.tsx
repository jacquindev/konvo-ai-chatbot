"use client"

import AppTooltip from "@/components/global/app-tooltip"
import { FormGenerator } from "@/components/global/form-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFilterQuestion } from "@/hooks/contexts/chatbot/useFilterQuestion"
import { useQueryDomainFilterQuestion } from "@/hooks/queries"
import { Loader2, Trash2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = { domainId: string }

const ChatBotFilterQuestions = ({ domainId }: Props) => {
  const {
    register,
    errors,
    handleAddFilterQuestion,
    addingFilterQuestion,
    deleteFilterQuestion,
    deletingId,
  } = useFilterQuestion(domainId)
  const { data, isPending } = useQueryDomainFilterQuestion(domainId)

  const questions = data?.questions ?? []
  const pathname = usePathname()

  return (
    <Card className="w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="border-border space-y-6 border-b p-6 lg:border-r lg:border-b-0">
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
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Bot Question Bank</CardTitle>
            <AppTooltip content="These questions will guide the bot's conversations." />
          </div>

          <CardContent className="max-h-[400px] space-y-4 overflow-y-auto p-0">
            <AnimatePresence initial={false} mode="wait">
              {questions.length > 0 ? (
                questions.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="bg-muted text-muted-foreground border-border hover:bg-primary/15 relative rounded-md border p-3 text-sm"
                  >
                    <Link href={`${pathname}?question=${item.question.trim()}`}>
                      <p className="truncate pr-6 font-medium">{item.question}</p>
                    </Link>

                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteFilterQuestion(item.id)}
                        disabled={deletingId === item.id}
                        className="text-destructive hover:bg-destructive/10 size-6 hover:cursor-pointer"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
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
