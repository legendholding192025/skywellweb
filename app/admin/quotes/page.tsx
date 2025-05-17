"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Calculator, Clock, AlertCircle, Filter, RefreshCw, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin/AdminLayout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Quote {
  _id: string
  name: string
  email: string
  phone: string
  model: string
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

function QuoteRequests() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [deleteQuoteId, setDeleteQuoteId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    fetchQuotes()
  }, [currentPage])

  const fetchQuotes = async () => {
    try {
      setRefreshing(true)
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const res = await fetch(`/api/admin/quotes?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch quotes")
      }

      const data = await res.json()
      setQuotes(data.quotes)
      setTotalPages(Math.ceil(data.total / itemsPerPage))
      setError("")
    } catch (err) {
      setError("Failed to load quote requests")
      console.error(err)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const handleView = (id: string) => {
    router.push(`/admin/quotes/${id}`)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/quotes/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("admin_token")
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete quote")
      }

      setQuotes(quotes.filter(quote => quote._id !== id))
      setShowDeleteDialog(false)
      setDeleteQuoteId(null)
    } catch (err) {
      console.error(err)
      setError("Failed to delete quote")
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
        <h1 className="text-2xl font-semibold text-gray-800">Quote Requests</h1>
        <Button onClick={fetchQuotes} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-medium">Recent Requests</h2>
          </div>
          <Button variant="outline" size="sm" className="bg-white">
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
                <TableHead>Preferred Schedule</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{quote.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">{quote.model}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-900">{formatDate(quote.preferredDate)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-gray-900 border-gray-200">
                          <p>Preferred Time: {quote.preferredTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{quote.email}</p>
                      <p className="text-sm text-gray-500">{quote.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="capitalize bg-white text-gray-900 border-gray-200">
                            {quote.campaignName || "Direct"}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-gray-900 border-gray-200">
                          <div className="text-xs">
                            <p>Source: {quote.utmSource || "Direct"}</p>
                            <p>Medium: {quote.utmMedium || "None"}</p>
                            <p>Campaign: {quote.utmCampaign || "None"}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {formatDate(quote.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(quote._id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(quote._id)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteQuoteId(quote._id)
                          setShowDeleteDialog(true)
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {quotes.length} of {totalPages * itemsPerPage} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteQuoteId && handleDelete(deleteQuoteId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function QuotesPage() {
  return (
    <AdminLayout>
      <QuoteRequests />
    </AdminLayout>
  )
} 