"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import AdminLayout from '@/components/admin/AdminLayout'
import { ExportButton } from "@/components/admin/ExportButton"

interface NewsletterSubscription {
  _id: string
  email: string
  subscriptionDate: string
  status: 'active' | 'unsubscribed'
  lastEmailSent?: string
  emailsSent: number
}

export default function NewsletterSubscriptionsPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalSubscriptions, setTotalSubscriptions] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    fetchSubscriptions()
  }, [currentPage])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`/api/newsletter?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch subscriptions')
      }

      setSubscriptions(data.data)
      setTotalPages(Math.ceil(data.total / itemsPerPage))
      setTotalSubscriptions(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const getAllSubscriptions = async () => {
    try {
      const response = await fetch(`/api/newsletter?limit=1000`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch subscriptions')
      }
      
      // Format data for Excel
      return data.data.map((subscription: NewsletterSubscription, index: number) => ({
        'S.N.': index + 1,
        'Email': subscription.email,
        'Status': subscription.status,
        'Subscription Date': new Date(subscription.subscriptionDate).toLocaleDateString(),
        'Last Email Sent': subscription.lastEmailSent ? new Date(subscription.lastEmailSent).toLocaleDateString() : 'Never',
        'Emails Sent': subscription.emailsSent,
      }))
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
      throw error
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Newsletter Subscriptions
          </h1>
          <div className="flex items-center space-x-4">
            <ExportButton getData={getAllSubscriptions} filename="newsletter-subscriptions" />
            <Badge variant="outline">
              Total: {totalSubscriptions}
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Active: {subscriptions.filter(sub => sub.status === 'active').length}
            </Badge>
          </div>
        </div>

        <div className={`rounded-lg border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.N.</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Date</TableHead>
                <TableHead>Last Email</TableHead>
                <TableHead>Emails Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription, index) => (
                <TableRow key={subscription._id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{subscription.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        subscription.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }
                    >
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscription.subscriptionDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {subscription.lastEmailSent
                      ? format(new Date(subscription.lastEmailSent), 'MMM d, yyyy')
                      : 'Never'}
                  </TableCell>
                  <TableCell>{subscription.emailsSent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing {subscriptions.length} of {totalSubscriptions} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
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
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 