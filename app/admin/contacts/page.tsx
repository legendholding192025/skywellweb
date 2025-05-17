"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { 
  Phone, 
  Mail, 
  Clock, 
  AlertCircle, 
  Filter, 
  RefreshCw, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from '@/components/admin/AdminLayout'
import { ExportButton } from "@/components/admin/ExportButton"
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

function ContactLeads() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    fetchContacts()
  }, [currentPage])

  const fetchContacts = async () => {
    try {
      setRefreshing(true)
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      // First, try the new API endpoint
      let response = await fetch(`/api/admin/contacts?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // If the new endpoint fails, try the legacy endpoint
      if (!response.ok) {
        response = await fetch(`/api/contact?page=${currentPage}&limit=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }

      const data = await response.json()
      
      // Handle both new and legacy API response formats
      const contacts = data.contacts || data
      const total = data.total || contacts.length
      
      setContacts(contacts)
      setTotalPages(Math.ceil(total / itemsPerPage))
      setError("")
    } catch (err) {
      console.error('Fetch error:', err)
      setError("Failed to load contact leads. Please try again later.")
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const handleView = (id: string) => {
    router.push(`/admin/contacts/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/contacts/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("admin_token")
      
      // First, try the new API endpoint
      let response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // If the new endpoint fails, try the legacy endpoint
      if (!response.ok) {
        response = await fetch(`/api/contact/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      if (!response.ok) {
        throw new Error("Failed to delete contact")
      }

      setContacts(contacts.filter(contact => contact._id !== id))
      setShowDeleteDialog(false)
      setDeleteContactId(null)
    } catch (err) {
      console.error('Delete error:', err)
      setError("Failed to delete contact. Please try again later.")
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAllContacts = async () => {
    try {
      const token = Cookies.get("admin_token")
      if (!token) {
        throw new Error("Not authenticated")
      }

      // First, try the new API endpoint
      let response = await fetch("/api/admin/contacts?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // If the new endpoint fails, try the legacy endpoint
      if (!response.ok) {
        response = await fetch("/api/contact?limit=1000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }

      const data = await response.json()
      const contacts = data.contacts || data
      
      // Format data for Excel
      return contacts.map((contact: Contact, index: number) => ({
        'S.N.': index + 1,
        'Name': contact.name,
        'Email': contact.email,
        'Phone': contact.phone,
        'Subject': contact.subject,
        'Message': contact.message,
        'Enquiry Type': contact.enquiryType,
        'Status': contact.status,
        'Submitted On': new Date(contact.createdAt).toLocaleDateString(),
      }))
    } catch (error) {
      console.error('Export error:', error)
      throw new Error("Failed to export contacts. Please try again later.")
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
        <h1 className="text-2xl font-semibold">Contact Leads</h1>
        <Button onClick={fetchContacts} variant="outline" size="icon" className="bg-white">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-medium">Recent Contacts</h2>
          </div>
          <Button variant="outline" size="sm" className="bg-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[80px]">S.N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact: Contact, index: number) => (
                <TableRow key={contact._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{contact.email}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 truncate max-w-[300px]">
                      {contact.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(contact._id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(contact._id)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteContactId(contact._id)
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {contacts.length} of {totalPages * itemsPerPage} entries
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
              This action cannot be undone. This will permanently delete the contact lead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteContactId && handleDelete(deleteContactId)}
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

export default function ContactsPage() {
  return (
    <AdminLayout>
      <ContactLeads />
    </AdminLayout>
  )
}
