"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { Calculator, Clock, AlertCircle, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin/AdminLayout"
import { ExportButton } from "@/components/admin/ExportButton"

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
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    fetchQuotes()
  }, [currentPage])

  const fetchQuotes = async () => {
    try {
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
    }
  }

  const getAllQuotes = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        throw new Error("Not authenticated")
      }

      const res = await fetch("/api/admin/quotes?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch quotes")
      }

      const data = await res.json()
      
      // Format data for Excel
      return data.quotes.map((quote: Quote, index: number) => ({
        'S.N.': index + 1,
        'Name': quote.name,
        'Email': quote.email,
        'Phone': quote.phone,
        'Vehicle Model': quote.model,
        'Preferred Date': new Date(quote.preferredDate).toLocaleDateString(),
        'Preferred Time': quote.preferredTime,
        'Additional Info': quote.additionalInfo,
        'Campaign': quote.campaignName || 'Direct',
        'Source': quote.utmSource || 'Direct',
        'Medium': quote.utmMedium || 'None',
        'Campaign Name': quote.utmCampaign || 'None',
        'Submitted On': new Date(quote.createdAt).toLocaleDateString(),
      }))
    } catch (error) {
      console.error('Failed to fetch all quotes:', error)
      throw error
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
        <div className="flex items-center space-x-3">
          <ExportButton getData={getAllQuotes} filename="quote-requests" />
          <Button onClick={fetchQuotes} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-gray-500" />
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
                <TableHead className="w-[50px]">S.N.</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle Model</TableHead>
                <TableHead>Preferred Schedule</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote, index) => (
                <TableRow key={quote._id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{quote.model}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{formatDate(quote.preferredDate)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preferred Time: {quote.preferredTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{quote.email}</p>
                      <p className="text-sm text-gray-500">{quote.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="capitalize">
                            {quote.campaignName || "Direct"}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {quotes.length} of {totalPages * itemsPerPage} entries
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
              {[...Array(totalPages)].map((_, i) => (
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
                disabled={currentPage === totalPages}
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

export default function QuotesPage() {
  return (
    <AdminLayout>
      <QuoteRequests />
    </AdminLayout>
  )
} 