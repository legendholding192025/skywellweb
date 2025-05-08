"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FileText, Save, ArrowLeft, X, ImageIcon, Tag, Search, Globe, Eye, Clock, Upload, AlertCircle, CheckCircle2 } from 'lucide-react'
import AdminLayout from "@/components/admin/AdminLayout"
import { useToast } from "@/components/ui/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

// Dynamic import of the editor to avoid SSR issues
const Editor = dynamic(() => import("@/components/editor/TipTap"), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md p-4 w-full">
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  ),
})

interface BlogFormData {
  title: string
  content: string
  excerpt: string
  status: "draft" | "published"
  coverImage: {
    url: string
    alt: string
  }
  tags: string[]
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export default function EditBlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const router = useRouter()
  const { toast } = useToast()
  const isNew = params.slug === "new"
  const [newTag, setNewTag] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [activeTab, setActiveTab] = useState("content")
  const [previewMode, setPreviewMode] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    excerpt: "",
    status: "draft",
    coverImage: {
      url: "",
      alt: "",
    },
    tags: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  })

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchBlog()
    }
  }, [isNew])

  // Calculate completion percentage
  useEffect(() => {
    let completed = 0
    let total = 5 // Required fields: title, content, excerpt, coverImage, tags

    if (formData.title.trim()) completed++
    if (formData.content.trim()) completed++
    if (formData.excerpt.trim()) completed++
    if (formData.coverImage.url.trim()) completed++
    if (formData.tags.length > 0) completed++

    setCompletionPercentage(Math.round((completed / total) * 100))
  }, [formData])

  // Auto-save functionality
  useEffect(() => {
    if (!isNew && autoSaveEnabled && unsavedChanges) {
      const timer = setTimeout(() => {
        handleAutoSave()
      }, 30000) // Auto-save after 30 seconds of inactivity

      return () => clearTimeout(timer)
    }
  }, [formData, autoSaveEnabled, unsavedChanges])

  // Prompt before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [unsavedChanges])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`)
      const data = await response.json()
      if (data.success) {
        // Transform the flattened structure back to the form structure
        const blog = {
          ...data.data,
          coverImage: {
            url: data.data.coverImageUrl || "",
            alt: data.data.coverImageAlt || "",
          },
        }
        delete blog.coverImageUrl
        delete blog.coverImageAlt
        setFormData(blog)
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blog data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (newFormData: BlogFormData) => {
    setFormData(newFormData)
    setUnsavedChanges(true)
  }

  const handleAutoSave = async () => {
    if (isNew || !autoSaveEnabled || !unsavedChanges) return

    try {
      setSaving(true)
      const url = `/api/blogs/${params.slug}`
      const method = "PUT"

      // Validate required fields
      if (!formData.title || !formData.content || !formData.excerpt) {
        return // Don't auto-save if required fields are missing
      }

      const requestData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        status: formData.status,
        coverImage: {
          url: formData.coverImage?.url || "",
          alt: formData.coverImage?.alt || formData.title,
        },
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        seo: {
          metaTitle: formData.seo?.metaTitle || formData.title,
          metaDescription: formData.seo?.metaDescription || formData.excerpt,
          keywords: Array.isArray(formData.seo?.keywords) ? formData.seo.keywords : [],
        },
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        setLastSaved(new Date())
        setUnsavedChanges(false)
        toast({
          title: "Auto-saved",
          description: "Your changes have been automatically saved",
        })
      }
    } catch (error) {
      console.error("Error auto-saving:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isNew ? "/api/blogs" : `/api/blogs/${params.slug}`
      const method = isNew ? "POST" : "PUT"

      // Validate required fields
      if (!formData.title || !formData.content || !formData.excerpt) {
        throw new Error("Please fill in all required fields: Title, Content, and Excerpt")
      }

      // Ensure the coverImage data is properly structured
      const requestData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        status: formData.status,
        coverImage: {
          url: formData.coverImage?.url || "",
          alt: formData.coverImage?.alt || formData.title,
        },
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        seo: {
          metaTitle: formData.seo?.metaTitle || formData.title,
          metaDescription: formData.seo?.metaDescription || formData.excerpt,
          keywords: Array.isArray(formData.seo?.keywords) ? formData.seo.keywords : [],
        },
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData}`)
      }

      const data = await response.json()

      if (data.success) {
        setUnsavedChanges(false)
        setLastSaved(new Date())
        toast({
          title: "Success",
          description: isNew ? "Blog created successfully" : "Blog updated successfully",
        })
        router.push("/admin/blogs")
      } else {
        throw new Error(data.error || data.message || "Failed to save blog")
      }
    } catch (error: any) {
      console.error("Error saving blog:", {
        message: error.message,
        stack: error.stack,
        formData: formData,
      })

      toast({
        title: "Error",
        description: error.message || "Failed to save blog. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(newTag.trim())) {
        handleFormChange({
          ...formData,
          tags: [...formData.tags, newTag.trim()],
        })
      }
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    handleFormChange({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newKeyword.trim()) {
      e.preventDefault()
      if (!formData.seo.keywords.includes(newKeyword.trim())) {
        handleFormChange({
          ...formData,
          seo: {
            ...formData.seo,
            keywords: [...formData.seo.keywords, newKeyword.trim()],
          },
        })
      }
      setNewKeyword("")
    }
  }

  const handleRemoveKeyword = (keywordToRemove: string) => {
    handleFormChange({
      ...formData,
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords.filter((keyword) => keyword !== keywordToRemove),
      },
    })
  }

  const handleCancel = () => {
    if (unsavedChanges) {
      setShowExitDialog(true)
    } else {
      router.push("/admin/blogs")
    }
  }

  const formatLastSaved = () => {
    if (!lastSaved) return "Not saved yet"
    
    const now = new Date()
    const diffMs = now.getTime() - lastSaved.getTime()
    const diffMins = Math.round(diffMs / 60000)
    
    if (diffMins < 1) return "Just now"
    if (diffMins === 1) return "1 minute ago"
    if (diffMins < 60) return `${diffMins} minutes ago`
    
    const hours = Math.floor(diffMins / 60)
    if (hours === 1) return "1 hour ago"
    if (hours < 24) return `${hours} hours ago`
    
    return lastSaved.toLocaleString()
  }

  if (loading) {
    return (
      <AdminLayout>
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <Skeleton className="h-8 w-64" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <div className="h-64 w-full border rounded-md p-4">
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {isNew ? "Create New Blog" : "Edit Blog"}
                </h2>
                <p className="text-sm text-gray-500">
                  {isNew ? "Create a new blog post" : `Editing: ${formData.title || "Untitled"}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{lastSaved ? formatLastSaved() : "Not saved yet"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={autoSaveEnabled}
                          onCheckedChange={setAutoSaveEnabled}
                          id="auto-save"
                        />
                        <Label htmlFor="auto-save" className="text-sm cursor-pointer">
                          Auto-save
                        </Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Automatically save changes every 30 seconds</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="px-6 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge variant={formData.status === "published" ? "default" : "outline"} className="text-sm">
                  {formData.status === "published" ? "Published" : "Draft"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Completion:</span>
                  <Progress value={completionPercentage} className="w-24 h-2" />
                  <span className="text-sm font-medium">{completionPercentage}%</span>
                </div>
              </div>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="border-gray-200"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {previewMode ? "Exit Preview" : "Preview"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview how your blog post will look</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 pt-4">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleFormChange({ ...formData, title: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-medium">
                      Excerpt <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) =>
                        handleFormChange({ ...formData, excerpt: e.target.value })
                      }
                      className="mt-1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      A brief summary of your blog post (150-160 characters recommended)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "draft" | "published") =>
                        handleFormChange({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="tags" className="text-sm font-medium">
                        Tags
                      </Label>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Type a tag and press Enter"
                        className="max-w-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newTag.trim()) {
                            if (!formData.tags.includes(newTag.trim())) {
                              handleFormChange({
                                ...formData,
                                tags: [...formData.tags, newTag.trim()],
                              })
                            }
                            setNewTag("")
                          }
                        }}
                        disabled={!newTag.trim()}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Press Enter to add a tag or click the Add button
                    </p>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Editor
                    content={formData.content}
                    onChange={(content) =>
                      handleFormChange({ ...formData, content })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6 pt-4">
                {/* Cover Image */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4 text-gray-500" />
                    <h3 className="text-lg font-medium">Cover Image</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="coverImageUrl" className="text-sm font-medium">
                          Image URL
                        </Label>
                        <Input
                          id="coverImageUrl"
                          value={formData.coverImage.url}
                          onChange={(e) =>
                            handleFormChange({
                              ...formData,
                              coverImage: { ...formData.coverImage, url: e.target.value },
                            })
                          }
                          placeholder="Enter image URL"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="coverImageAlt" className="text-sm font-medium">
                          Alt Text
                        </Label>
                        <Input
                          id="coverImageAlt"
                          value={formData.coverImage.alt}
                          onChange={(e) =>
                            handleFormChange({
                              ...formData,
                              coverImage: { ...formData.coverImage, alt: e.target.value },
                            })
                          }
                          placeholder="Describe the image for accessibility"
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Describe the image for screen readers and SEO
                        </p>
                      </div>

                      <div className="pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Cover Image</DialogTitle>
                              <DialogDescription>
                                Upload an image from your computer or enter a URL
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <p className="text-sm text-gray-500 mb-2">
                                  Drag and drop your image here, or click to browse
                                </p>
                                <Button variant="outline" size="sm">
                                  Choose File
                                </Button>
                              </div>
                              <div className="text-center text-sm text-gray-500">
                                Supported formats: JPG, PNG, GIF, WebP
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" className="w-full">
                                Upload
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Preview</Label>
                      {formData.coverImage.url ? (
                        <div className="relative h-64 w-full rounded-lg overflow-hidden border">
                          <Image
                            src={formData.coverImage.url || "/placeholder.svg"}
                            alt={formData.coverImage.alt || formData.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 w-full rounded-lg border bg-gray-50">
                          <div className="text-center">
                            <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No image selected</p>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        Recommended size: 1200 x 630 pixels (16:9 ratio)
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6 pt-4">
                {/* SEO Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <h3 className="text-lg font-medium">SEO Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle" className="text-sm font-medium">
                        Meta Title
                      </Label>
                      <Input
                        id="seoTitle"
                        value={formData.seo.metaTitle}
                        onChange={(e) =>
                          handleFormChange({
                            ...formData,
                            seo: { ...formData.seo, metaTitle: e.target.value },
                          })
                        }
                        placeholder="Enter meta title"
                        className="mt-1"
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Recommended length: 50-60 characters
                        </p>
                        <p className="text-xs text-gray-500">
                          {formData.seo.metaTitle.length} / 60 characters
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="seoDescription" className="text-sm font-medium">
                        Meta Description
                      </Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seo.metaDescription}
                        onChange={(e) =>
                          handleFormChange({
                            ...formData,
                            seo: { ...formData.seo, metaDescription: e.target.value },
                          })
                        }
                        placeholder="Enter meta description"
                        className="mt-1"
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Recommended length: 150-160 characters
                        </p>
                        <p className="text-xs text-gray-500">
                          {formData.seo.metaDescription.length} / 160 characters
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="keywords" className="text-sm font-medium">
                          Keywords
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.seo.keywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
                          >
                            {keyword}
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyword(keyword)}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="keywords"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          onKeyDown={handleAddKeyword}
                          placeholder="Type a keyword and press Enter"
                          className="max-w-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (newKeyword.trim()) {
                              if (!formData.seo.keywords.includes(newKeyword.trim())) {
                                handleFormChange({
                                  ...formData,
                                  seo: {
                                    ...formData.seo,
                                    keywords: [...formData.seo.keywords, newKeyword.trim()],
                                  },
                                })
                              }
                              setNewKeyword("")
                            }
                          }}
                          disabled={!newKeyword.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Add keywords relevant to your blog post (5-10 recommended)
                      </p>
                    </div>

                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <h4 className="text-sm font-medium mb-2">Search Engine Preview</h4>
                      <div className="space-y-1">
                        <p className="text-blue-600 text-base font-medium truncate">
                          {formData.seo.metaTitle || formData.title || "Page Title"}
                        </p>
                        <p className="text-green-700 text-xs">
                          {window?.location?.origin || "https://yourdomain.com"}/blogs/
                          {params.slug === "new" ? "blog-title" : params.slug}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {formData.seo.metaDescription || formData.excerpt || "Page description goes here..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <CardFooter className="flex justify-between border-t mt-6 py-4">
            <div className="flex items-center">
              {completionPercentage < 100 ? (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Complete all required fields before publishing</span>
                </div>
              ) : (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span className="text-sm">All required fields completed</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>

      {/* Exit confirmation dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowExitDialog(false)
                router.push("/admin/blogs")
              }}
            >
              Leave Page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
