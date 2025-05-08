"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Phone, Mail, Clock, AlertCircle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from '@/components/admin/AdminLayout'

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  enquiryType: string
  status: string
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setRefreshing(true)
      const token = Cookies.get("admin_token")

      if (!token) {
        router.push("/admin/login")
        return
      }

      const response = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        router.push("/admin/login")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }

      const data = await response.json()
      setContacts(data)
    } catch (err) {
      setError("Failed to load contacts")
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-medium">New</Badge>
      case "in-progress":
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">In Progress</Badge>
      case "completed":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium">Completed</Badge>
      default:
        return (
          <Badge variant="outline" className="text-gray-500 font-medium">
            {status}
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <AdminLayout>
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <Card className="w-full border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-6">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load contacts</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchContacts}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-sm">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
                  <p className="text-gray-500 text-sm">Manage and respond to customer inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700"
                >
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  Total: {contacts.length}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 border-blue-200 bg-white"
                        onClick={fetchContacts}
                        disabled={refreshing}
                      >
                        <RefreshCw className={`h-4 w-4 text-blue-600 ${refreshing ? "animate-spin" : ""}`} />
                        <span className="sr-only">Refresh</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh contacts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="h-9 w-9 border-blue-200 bg-white">
                        <Filter className="h-4 w-4 text-blue-600" />
                        <span className="sr-only">Filter</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter contacts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-gray-50/80">
                  <TableHead className="w-[120px] font-medium">Date</TableHead>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Contact</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Subject</TableHead>
                  <TableHead className="font-medium">Message</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Mail className="h-8 w-8 mb-2 text-gray-400" />
                        <p>No contact submissions yet</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact) => (
                    <TableRow
                      key={contact._id}
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer border-b border-gray-100"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-600">
                        {formatDate(contact.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm text-gray-700">
                            <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                            {contact.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                            {contact.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize bg-gray-50 text-gray-700 font-medium">
                          {contact.enquiryType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[180px] truncate text-gray-700">{contact.subject}</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>{contact.subject}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[180px] truncate text-gray-700">{contact.message}</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>{contact.message}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
