"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ArrowRight, Search, Tag, Clock, BookOpen, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: {
    url: string
    alt: string
  }
  publishedAt: string
  tags?: string[]
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?status=published")
      const data = await response.json()
      if (data.success) {
        setBlogs(data.data)

        // Extract all unique tags
        const tags = data.data.reduce((acc: string[], blog: Blog) => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach((tag) => {
              if (!acc.includes(tag)) {
                acc.push(tag)
              }
            })
          }
          return acc
        }, [])

        setAllTags(tags)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        // Apply search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return blog.title.toLowerCase().includes(query) || blog.excerpt.toLowerCase().includes(query)
        }
        return true
      })
      .filter((blog) => {
        // Apply tag filter
        if (selectedTag) {
          return blog.tags && blog.tags.includes(selectedTag)
        }
        return true
      })
      .sort((a, b) => {
        // Apply sorting
        const dateA = new Date(a.publishedAt).getTime()
        const dateB = new Date(b.publishedAt).getTime()
        return sortBy === "latest" ? dateB - dateA : dateA - dateB
      })
  }, [blogs, searchQuery, sortBy, selectedTag])

  const renderSkeletonCards = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <Card key={index} className="flex flex-col overflow-hidden h-full">
          <CardHeader className="p-0">
            <Skeleton className="h-48 w-full rounded-t-lg" />
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
              Our Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Latest News & Updates</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay up to date with the latest news, announcements, and insights about Skywell electric vehicles.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4 sm:px-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {allTags.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <Tag className="h-4 w-4 mr-2" />
                    {selectedTag || "All Topics"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedTag(null)}>All Topics</DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Tabs
              defaultValue="latest"
              value={sortBy}
              onValueChange={(value) => setSortBy(value as "latest" | "oldest")}
            >
              <TabsList>
                <TabsTrigger value="latest" className="text-xs">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="oldest" className="text-xs">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Oldest
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Results info */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing {filteredAndSortedBlogs.length} article{filteredAndSortedBlogs.length !== 1 ? "s" : ""}
              {selectedTag ? ` in "${selectedTag}"` : ""}
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
            {selectedTag && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedTag(null)}>
                Clear filter
              </Button>
            )}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            renderSkeletonCards()
          ) : filteredAndSortedBlogs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                {searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}"`
                  : selectedTag
                    ? `We couldn't find any articles with the tag "${selectedTag}"`
                    : "There are no published articles yet."}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedTag(null)
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            filteredAndSortedBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="flex flex-col overflow-hidden h-full transition-all duration-200 hover:shadow-md group"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={blog.coverImage?.url || "/placeholder.svg?height=192&width=384&query=blog"}
                      alt={blog.coverImage?.alt || blog.title}
                      fill
                      className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {format(new Date(blog.publishedAt), "MMM d, yyyy")}
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs font-normal"
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedTag(tag)
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs font-normal">
                            +{blog.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-3">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/blogs/${blog.slug}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-50 rounded-xl p-8 md:p-12 mt-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest updates, news, and exclusive content directly to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>    
      <Footer />
    </>
  )
}
