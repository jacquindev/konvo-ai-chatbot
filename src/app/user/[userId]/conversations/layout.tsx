import React from 'react'
import ConversationsLayout from './_components/layout'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <ConversationsLayout>
      {children}
    </ConversationsLayout>
  )
}

export default Layout