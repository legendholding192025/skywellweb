"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import Cookies from "js-cookie"
import { Car, Clock, AlertCircle, Filter, RefreshCw, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from '@/components/admin/AdminLayout'
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

interface TestDrive {
  _id: string
  name: string
  email: string
  phone: string
  model: string
  preferredDate: string
  preferredTime: string
  location: string
  status: "pending" | "scheduled" | "completed" | "cancelled"
  createdAt: string
}

function TestDriveLeads() {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [deleteTestDriveId, setDeleteTestDriveId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const itemsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    fetchTestDrives()
  }, [currentPage])

  const fetchTestDrives = async () => {
    try {
      setRefreshing(true)
      const token = Cookies.get("admin_token")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const res = await fetch(`/api/admin/test-drive?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch test drive requests")
      }

      const data = await res.json()
      setTestDrives(data.testDrives)
      setTotalPages(Math.ceil(data.total / itemsPerPage))
      setError("")
    } catch (err) {
      setError("Failed to load test drive requests")
      console.error(err)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const handleView = (id: string) => {
    router.push(`/admin/test-drive/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/test-drive/${id}/edit`)
  }

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("admin_token")
      const res = await fetch(`/api/admin/test-drive/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error("Failed to delete test drive request")
      }

      setTestDrives(testDrives.filter(testDrive => testDrive._id !== id))
      setShowDeleteDialog(false)
      setDeleteTestDriveId(null)
    } catch (err) {
      console.error(err)
      setError("Failed to delete test drive request")
    }
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
        <h1 className="text-2xl font-semibold text-gray-800">Test Drive Requests</h1>
        <Button onClick={fetchTestDrives} variant="outline" size="icon">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-blue-500" />
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
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[80px]">S.N</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle Model</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testDrives.map((testDrive, index) => (
                <TableRow key={testDrive._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{testDrive.name}</p>
                  </TableCell>
                  <TableCell className="text-gray-900">{testDrive.model}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {testDrive.location}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-900">{formatDate(testDrive.preferredDate)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-gray-900 border-gray-200">
                          <p>Preferred Time: {testDrive.preferredTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{testDrive.email}</p>
                      <p className="text-sm text-gray-500">{testDrive.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${
                        testDrive.status === "completed" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : testDrive.status === "scheduled"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : testDrive.status === "cancelled"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {testDrive.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(testDrive._id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(testDrive._id)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDeleteTestDriveId(testDrive._id)
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
              Showing {testDrives.length} of {totalPages * itemsPerPage} entries
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
              This action cannot be undone. This will permanently delete the test drive request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTestDriveId && handleDelete(deleteTestDriveId)}
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

export default function TestDrivePage() {
  return (
    <AdminLayout>
      <TestDriveLeads />
    </AdminLayout>
  )
} 