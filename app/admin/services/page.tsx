"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Wrench, Clock, AlertCircle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from '@/components/admin/AdminLayout'

interface ServiceBooking {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  message: string
  vehicleModel: string
  createdAt: string
}

export default function ServiceBookings() {
  const [bookings, setBookings] = useState<ServiceBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const res = await fetch("/api/admin/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await res.json()
      setBookings(data)
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="rounded-lg border border-red-200 p-4 bg-red-50">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Service Bookings</h1>
          <Button onClick={fetchBookings} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-gray-500" />
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle Model</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Preferred Schedule</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{`${booking.firstName} ${booking.lastName}`}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.vehicleModel}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {booking.serviceType.replace("-", " ")}
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
                      <div className="space-y-1">
                        <p className="text-sm">{booking.email}</p>
                        <p className="text-sm text-gray-500">{booking.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(booking.createdAt)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
} 