"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Car, Clock, AlertCircle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from '@/components/admin/AdminLayout'

interface TestDrive {
  _id: string
  name: string
  email: string
  phone: string
  model: string
  location: string
  preferredDate: string
  preferredTime: string
  additionalInfo: string
  campaignName: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  createdAt: string
}

export default function TestDriveRequests() {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchTestDrives()
  }, [])

  const fetchTestDrives = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const res = await fetch("/api/admin/test-drive", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch test drives")
      }

      const data = await res.json()
      setTestDrives(data)
      setError("")
    } catch (err) {
      setError("Failed to load test drive requests")
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
          <h1 className="text-2xl font-semibold text-gray-800">Test Drive Requests</h1>
          <Button onClick={fetchTestDrives} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-medium">Recent Requests</h2>
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
                  <TableHead>Location</TableHead>
                  <TableHead>Preferred Schedule</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testDrives.map((testDrive) => (
                  <TableRow key={testDrive._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{testDrive.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{testDrive.model}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {testDrive.location === "dubai" ? "Dubai" : "Abu Dhabi"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{formatDate(testDrive.preferredDate)}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preferred Time: {testDrive.preferredTime}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{testDrive.email}</p>
                        <p className="text-sm text-gray-500">{testDrive.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="capitalize">
                              {testDrive.campaignName || "Direct"}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              <p>Source: {testDrive.utmSource || "Direct"}</p>
                              <p>Medium: {testDrive.utmMedium || "None"}</p>
                              <p>Campaign: {testDrive.utmCampaign || "None"}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDate(testDrive.createdAt)}
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