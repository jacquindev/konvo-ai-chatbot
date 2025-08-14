export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ userId: string }>
}

const EmailMarketingPage = async ({ params }: Props) => {
  const { userId } = await params
  redirect(`/user/${userId}/email-marketing/campaigns`)
}

export default EmailMarketingPage
