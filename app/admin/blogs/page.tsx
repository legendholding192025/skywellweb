"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  FileText,
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  Search,
  FileEdit,
  Calendar,
  Clock,
  RefreshCw,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"
import { format, parseISO } from "date-fns"

interface Blog {
  _id: string
  title: string
  slug: string
  status: "draft" | "published"
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all")
  const [sortField, setSortField] = useState<"title" | "updatedAt" | "publishedAt">("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const itemsPerPage = 10

  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/blogs")
      const data = await response.json()
      if (data.success) {
        setBlogs(data.data)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleSort = (field: "title" | "updatedAt" | "publishedAt") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const handleDelete = async () => {
    if (!blogToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/blogs/${blogToDelete.slug}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== blogToDelete._id))
        setBlogToDelete(null)
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        // Apply search filter
        if (searchQuery) {
          return blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return true
      })
      .filter((blog) => {
        // Apply status filter
        if (statusFilter === "all") return true
        return blog.status === statusFilter
      })
      .sort((a, b) => {
        // Apply sorting
        if (sortField === "title") {
          return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        } else if (sortField === "publishedAt") {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA
        } else {
          const dateA = new Date(a.updatedAt).getTime()
          const dateB = new Date(b.updatedAt).getTime()
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA
        }
      })
  }, [blogs, searchQuery, statusFilter, sortField, sortDirection])

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredBlogs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredBlogs, currentPage])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Published
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200">
            <FileEdit className="h-3.5 w-3.5 mr-1" />
            Draft
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    try {
      return format(parseISO(dateString), "MMM d, yyyy")
    } catch (error) {
      return "-"
    }
  }

  const renderSortIcon = (field: "title" | "updatedAt" | "publishedAt") => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ChevronLeft className="h-4 w-4 ml-1 text-blue-600" />
    ) : (
      <ChevronRight className="h-4 w-4 ml-1 text-blue-600" />
    )
  }

  if (loading) {
    return (
      <AdminLayout>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="rounded-md border">
                <div className="h-10 border-b bg-gray-50 px-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-24 mx-4" />
                  ))}
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b">
                    <Skeleton className="h-4 w-full max-w-[500px]" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))}
              </div>
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
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                  <p className="text-gray-500 text-sm">Manage your website's blog content</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm font-medium border-blue-200 bg-blue-50 text-blue-700"
                >
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  Total: {blogs.length}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 border-blue-200 bg-white"
                        onClick={fetchBlogs}
                        disabled={refreshing}
                      >
                        <RefreshCw className={`h-4 w-4 text-blue-600 ${refreshing ? "animate-spin" : ""}`} />
                        <span className="sr-only">Refresh</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh blog posts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button onClick={() => router.push("/admin/blogs/new/edit")} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Blog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Tabs
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as any)}
                  className="w-full md:w-auto"
                >
                  <TabsList className="grid grid-cols-3 w-full md:w-auto">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="published" className="text-xs">
                      Published
                    </TabsTrigger>
                    <TabsTrigger value="draft" className="text-xs">
                      Drafts
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-gray-50/80">
                    <TableHead className="font-medium w-[40%]">
                      <button className="flex items-center font-medium" onClick={() => handleSort("title")}>
                        Title {renderSortIcon("title")}
                      </button>
                    </TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">
                      <button className="flex items-center font-medium" onClick={() => handleSort("publishedAt")}>
                        Published {renderSortIcon("publishedAt")}
                      </button>
                    </TableHead>
                    <TableHead className="font-medium">
                      <button className="flex items-center font-medium" onClick={() => handleSort("updatedAt")}>
                        Last Updated {renderSortIcon("updatedAt")}
                      </button>
                    </TableHead>
                    <TableHead className="w-[80px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBlogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <FileText className="h-8 w-8 mb-2 text-gray-400" />
                          <p className="mb-2">No blog posts found</p>
                          <Button variant="outline" size="sm" onClick={() => router.push("/admin/blogs/new/edit")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create your first blog post
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedBlogs.map((blog) => (
                      <TableRow
                        key={blog._id}
                        className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2">
                              {blog.status === "published" ? (
                                <FileText className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <FileEdit className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{blog.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">/blog/{blog.slug}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(blog.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {blog.publishedAt ? (
                              <>
                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                <span>{formatDate(blog.publishedAt)}</span>
                              </>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                            <span>{formatDate(blog.updatedAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem
                                onClick={() => router.push(`/admin/blogs/${blog.slug}/edit`)}
                                className="cursor-pointer"
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {blog.status === "published" && (
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 cursor-pointer"
                                onClick={() => setBlogToDelete(blog)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post "{blogToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
