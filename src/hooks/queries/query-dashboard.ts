import { onGetUserBalance, onGetUserBookings, onGetUserCampaigns, onGetUserClients, onGetUserCredits, onGetUserDomains, onGetUserProductsPrice, onGetUserTransactions } from "@/actions/dashboard"
import { useQuery } from "@tanstack/react-query"

export const useQueryDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const [
        clientsCount,
        balanceCount,
        bookingsCount,
        campaignsCount,
        totalProductsPrice,
        totalTransactions,
        domainsCount,
        userCredits,
      ] = await Promise.all([
        onGetUserClients(),
        onGetUserBalance(),
        onGetUserBookings(),
        onGetUserCampaigns(),
        onGetUserProductsPrice(),
        onGetUserTransactions(),
        onGetUserDomains(),
        onGetUserCredits(),
      ])

      return {
        clients: clientsCount?.data ?? 0,
        balance: balanceCount?.data ?? 0,
        bookings: bookingsCount?.data ?? 0,
        campaigns: campaignsCount?.data ?? 0,
        productsPrice: totalProductsPrice?.data ?? 0,
        transactions: totalTransactions?.data ?? [],
        domains: domainsCount?.data ?? 0,
        emailLimit: userCredits?.data?.emailLimit ?? 30,
        contactLimit: userCredits?.data?.contactLimit ?? 10,
        domainLimit: userCredits?.data?.domainLimit ?? 1,
      }
    }
  })
}