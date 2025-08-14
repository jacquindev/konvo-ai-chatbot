"use client"

import AppButton from "@/components/global/app-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription as ModalDescription,
  DialogFooter as ModalFooter,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

type Props = {
  title: string
  titleClassName?: string
  description: string
  logo: string
  logoClassName?: string
}

const ComingSoonCard = ({ title, titleClassName, description, logo, logoClassName }: Props) => {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = async () => {
    try {
      setSubmitting(true)
      // Fake delay
      await new Promise(res => setTimeout(res, 1000))

      // TODO: Replace this with real API call
      console.log(`Notify request submitted for: ${email}`)

      setSubmitted(true)
    } catch (err) {
      console.error("Notify failed", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "bg-card/80 flex min-h-[240px] w-full justify-center rounded-xl p-2 opacity-80 shadow-md backdrop-blur-sm transition-all dark:opacity-70",
          "hover:ring-muted-foreground/40 hover:opacity-100 hover:shadow-xl hover:ring-2 hover:dark:opacity-100"
        )}
      >
        {/* Top Right Logo */}
        <div className="absolute top-4 right-4">
          <Image
            src={logo}
            alt={`${title} Logo`}
            width={0}
            height={0}
            sizes="100vw"
            className={cn("h-auto w-20 object-contain", logoClassName)}
          />
        </div>

        <CardHeader className="p-2">
          <CardTitle>
            <span className={cn("text-xl leading-tight font-bold tracking-wide", titleClassName)}>
              {title}
            </span>
          </CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-3 w-full pt-6 text-sm wrap-anywhere">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-4 mb-2 px-2">
          <div className="flex w-full items-center justify-between gap-4">
            <Badge
              variant="outline"
              className="dark:bg-muted dark:text-muted-foreground rounded-full bg-gray-500 px-3 py-2.5 text-sm font-medium tracking-widest text-gray-300 uppercase"
            >
              Coming Soon
            </Badge>

            <Dialog>
              <DialogTrigger asChild>
                <AppButton
                  variant="secondary"
                  className="flex cursor-pointer items-center gap-2 rounded-full"
                >
                  <Sparkles className="h-4 w-4" />
                  Notify Me
                </AppButton>
              </DialogTrigger>
              <DialogContent className="dark:bg-background backdrop-blur-md">
                <ModalHeader>
                  <ModalTitle>Be the First to Know</ModalTitle>
                  <ModalDescription>
                    We'll email you when <strong>{title}</strong> becomes available.
                  </ModalDescription>
                </ModalHeader>

                {!submitted ? (
                  <>
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <ModalFooter className="mt-4 flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleNotify} disabled={submitting || !email.includes("@")}>
                        {submitting ? "Submitting..." : "Notify Me"}
                      </Button>
                    </ModalFooter>
                  </>
                ) : (
                  <div className="space-y-2 py-6 text-center">
                    <p className="text-muted-foreground text-sm">🎉 You're on the list!</p>
                    <DialogClose asChild>
                      <Button className="mt-2">Close</Button>
                    </DialogClose>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ComingSoonCard
