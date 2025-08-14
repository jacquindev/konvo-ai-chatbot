"use client"

import AppTable from "@/components/global/app-table"
import { searchBarStyle, searchIconStyle, searchInputStyle } from "@/components/global/search"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn, formatDateTime } from "@/lib/utils"
import { CalendarClock, Mail, SearchIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"

type Props = {
  bookings:
    | {
        id: string
        date: Date
        slot: string
        email: string
        createdAt: Date
        updatedAt: Date
        domainId: string | null
        Customer: {
          Domain: {
            name: string
          } | null
        } | null
      }[]
    | undefined
}

const AllAppointmentsTable = ({ bookings }: Props) => {
  const pathname = usePathname()
  const baseLink = `${pathname}?bookingId=`

  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const [sortBy, setSortBy] = useState<"requestedTime" | "createdAt" | "email" | "domain">(
    "requestedTime"
  )

  const headers = [
    { name: "Email" },
    { name: "Requested Time", className: "text-right" },
    { name: "Created At", className: "text-right" },
    { name: "Domain", className: "text-right" },
  ]

  const uniqueDomains = useMemo(() => {
    const domains = bookings?.map(b => b.Customer?.Domain?.name).filter((d): d is string => !!d)
    return Array.from(new Set(domains))
  }, [bookings])

  const filtered = useMemo(() => {
    const filtered =
      bookings?.filter(booking => {
        const matchesDomain =
          domainFilter === "all" || booking.Customer?.Domain?.name === domainFilter
        const matchesSearch = booking.email.toLowerCase().includes(search.toLowerCase())
        return matchesDomain && matchesSearch
      }) ?? []

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "email":
          return a.email.localeCompare(b.email)
        case "domain":
          return (a.Customer?.Domain?.name ?? "").localeCompare(b.Customer?.Domain?.name ?? "")
        case "createdAt":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "requestedTime":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }, [bookings, domainFilter, search, sortBy])

  return (
    <div className="min-h-[240px] space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className={cn(searchBarStyle(), "w-full")}>
          <SearchIcon className={searchIconStyle()} />
          <Input
            id="search"
            placeholder="Search by email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={searchInputStyle()}
          />
        </div>

        <div className="flex flex-row gap-4">
          {/* Domain filter */}
          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {uniqueDomains.map(d => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort selector */}
          <Select value={sortBy} onValueChange={val => setSortBy(val as any)}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="requestedTime">Requested Time</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="domain">Domain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <AppTable headers={headers}>
        {filtered.length > 0 ? (
          filtered.map(booking => {
            const bookingSlot = `${formatDateTime(booking.date)} ${booking.slot}`
            const bookingAddedTime = formatDateTime(booking.createdAt)
            const domain = booking.Customer?.Domain?.name ?? "—"
            const email = booking.email ?? "—"

            return (
              <TableRow key={booking.id}>
                <TableCell className="flex items-center gap-2 text-sm">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <Link href={`${baseLink}${booking.id}`}>{email}</Link>
                </TableCell>
                <TableCell className="text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <CalendarClock className="text-muted-foreground h-4 w-4" />
                    <span>{bookingSlot}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-sm">
                  {bookingAddedTime}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">{domain}</TableCell>
              </TableRow>
            )
          })
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-muted-foreground py-8 text-center">
              No appointments found.
            </TableCell>
          </TableRow>
        )}
      </AppTable>
    </div>
  )
}

export default AllAppointmentsTable
