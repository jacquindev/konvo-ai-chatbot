import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type Props = {
  trigger: string
  content: string
  className?: string
}

const AppAccordion = ({ trigger, content, className }: Props) => {
  return (
    <Accordion type="single" collapsible className={cn(className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AppAccordion
