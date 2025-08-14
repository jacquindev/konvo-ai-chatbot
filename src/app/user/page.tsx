import { onAuthenticatedUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const authUser = await onAuthenticatedUser()

  if (authUser.status === 200 || authUser.status === 201) {
    redirect(`/user/${authUser.user?.id}/dashboard`)
  } else {
    redirect("/")
  }
}
