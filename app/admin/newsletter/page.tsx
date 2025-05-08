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
import AdminLayout from '@/components/admin/AdminLayout'

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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/newsletter')
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch subscriptions')
        }

        setSubscriptions(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subscriptions')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

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
            <Badge variant="outline">
              Total: {subscriptions.length}
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
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Date</TableHead>
                <TableHead>Last Email</TableHead>
                <TableHead>Emails Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription._id}>
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
        </div>
      </div>
    </AdminLayout>
  )
} 