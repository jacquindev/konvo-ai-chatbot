export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    userId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { userId } = await params
  redirect(`/user/${userId}/settings/account`)
}

export default Page
