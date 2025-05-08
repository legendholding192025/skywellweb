"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Clock, AlertCircle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin/AdminLayout"
import { ExportButton } from "@/components/admin/ExportButton"

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  vehicleModel: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  status: string
  createdAt: string
}

interface BookingsResponse {
  bookings: Booking[]
  total: number
  page: number
  totalPages: number
}

function ServiceBookings() {
  const [bookingsData, setBookingsData] = useState<BookingsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    fetchBookings()
  }, [currentPage])

  const fetchBookings = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const res = await fetch(`/api/admin/leads?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await res.json()
      setBookingsData(data)
      setError("")
    } catch (err) {
      setError("Failed to load service bookings")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const getAllBookings = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        throw new Error("Not authenticated")
      }

      const res = await fetch("/api/admin/leads?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await res.json()
      
      // Format data for Excel
      return data.bookings.map((booking: Booking, index: number) => ({
        'S.N.': index + 1,
        'Name': booking.name,
        'Email': booking.email,
        'Phone': booking.phone,
        'Vehicle Model': booking.vehicleModel,
        'Service Type': booking.serviceType,
        'Preferred Date': new Date(booking.preferredDate).toLocaleDateString(),
        'Preferred Time': booking.preferredTime,
        'Status': booking.status,
        'Submitted On': new Date(booking.createdAt).toLocaleDateString(),
      }))
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 p-4 bg-red-50">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Service Bookings</h1>
        <div className="flex items-center space-x-3">
          <ExportButton getData={getAllBookings} filename="service-bookings" />
          <Button onClick={fetchBookings} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium">Recent Bookings</h2>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.N.</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle Model</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Preferred Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingsData?.bookings.map((booking, index) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <div className="text-sm text-gray-500">
                        <p>{booking.email}</p>
                        <p>{booking.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.vehicleModel}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {booking.serviceType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{formatDate(booking.preferredDate)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preferred Time: {booking.preferredTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={booking.status === "pending" ? "outline" : "default"}
                      className="capitalize"
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(booking.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {bookingsData?.bookings.length} of {bookingsData?.total || 0} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(bookingsData?.totalPages || 0)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === (bookingsData?.totalPages || 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <AdminLayout>
      <ServiceBookings />
    </AdminLayout>
  )
} 