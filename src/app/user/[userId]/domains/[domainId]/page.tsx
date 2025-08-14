export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    domainId: string
    userId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { domainId, userId } = await params

  redirect(`/user/${userId}/domains/${domainId}/domain-settings`)
}

export default Page
