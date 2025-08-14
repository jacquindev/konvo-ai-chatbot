import { onGetAllUserAppointments } from "@/actions/appointment"
import { onGetCurrentUserInfo } from "@/actions/auth"
import { onGetAllUserDomains } from "@/actions/domain"
import { onGetAllUserCampaigns, onGetAllUserCustomers } from "@/actions/marketing"
import { onGetSubscriptionPlan } from "@/actions/subscription"
import { SubscriptionPlanEnum } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export const useQueryCurrentUser = (userId: string) => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => onGetCurrentUserInfo(userId),
  })
}

export const useQueryUserCustomers = (userId: string) => {
  return useQuery({
    queryKey: ["user-customers"],
    queryFn: () => onGetAllUserCustomers(userId),
  })
}

export const useQueryUserCampaigns = (userId: string) => {
  return useQuery({
    queryKey: ["user-campaigns"],
    queryFn: () => onGetAllUserCampaigns(userId),
  })
}

export const useQueryDomains = () => {
  return useQuery({
    queryKey: ["user-domains"],
    queryFn: onGetAllUserDomains,
  })
}

export const useQuerySubscriptionPlan = (plan: SubscriptionPlanEnum) => {
  return useQuery({
    queryKey: ["user-subscription"],
    queryFn: () => onGetSubscriptionPlan(plan),
  })
}

export const useQueryAllUserAppointments = (userId: string) => {
  return useQuery({
    queryKey: ["user-appointments"],
    queryFn: () => onGetAllUserAppointments(userId),
  })
}
