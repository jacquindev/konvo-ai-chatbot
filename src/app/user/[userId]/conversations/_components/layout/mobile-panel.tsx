import GlassSheet from '@/components/global/glass-sheet'
import React from 'react'

type Props = {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}


const ConversationMobilePanel = ({ children, open, setOpen }: Props) => {
  return (
    <GlassSheet
      open={open}
      onOpenChange={setOpen}
      side="left"
      className='min-w-[400px] flex justify-start items-center px-4'
    >
      {children}
    </GlassSheet>
  )
}

export default ConversationMobilePanel