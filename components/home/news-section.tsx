"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  coverImage: {
    url: string
    alt: string
  }
  publishedAt: string
  slug: string
  readTime: number
}

export function NewsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    fetchLatestPosts()
  }, [])

  const fetchLatestPosts = async () => {
    try {
      const res = await fetch("/api/blogs?limit=3&public=true")
      if (!res.ok) {
        throw new Error("Failed to fetch posts")
      }
      const data = await res.json()
      if (data.success) {
        setPosts(data.data)
      } else {
        throw new Error(data.message || "Failed to fetch posts")
      }
    } catch (err) {
      setError("Failed to load posts")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className={`py-16 ${isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-slate-50 to-white"}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-4 text-center mb-12">
            <Skeleton className={`h-8 w-[200px] mx-auto ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
            <Skeleton className={`h-4 w-[300px] mx-auto ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className={`h-[200px] w-full rounded-xl ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
                <Skeleton className={`h-6 w-3/4 ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
                <Skeleton className={`h-4 w-full ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
                <Skeleton className={`h-4 w-2/3 ${isDark ? "bg-gray-800" : "bg-gray-200"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return null // Hide section if there's an error
  }

  return (
    <section className={`py-16 ${isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-slate-50 to-white"}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Latest News & Updates
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            Stay informed about the latest developments and stories from Skywell
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post._id}
              className={`group overflow-hidden border-0 transition-all duration-300 rounded-xl ${
                isDark 
                  ? "bg-gray-800/50 hover:bg-gray-800 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30" 
                  : "bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <div className={`flex items-center text-sm mb-3 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), "MMM d, yyyy")}
                  </time>
                  <span className="mx-2">·</span>
                  <span>{post.readTime} min read</span>
                </div>
                <Link href={`/blogs/${post.slug}`}>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-[#4a9cd6] transition-colors line-clamp-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {post.title}
                  </h3>
                </Link>
                <p className={`line-clamp-2 mb-4 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                  {post.excerpt}
                </p>
                <Link href={`/blogs/${post.slug}`}>
                  <Button
                    variant="ghost"
                    className={`group/btn p-0 h-auto hover:bg-transparent ${
                      isDark ? "text-[#4a9cd6] hover:text-[#3a8cc6]" : "text-[#4a9cd6] hover:text-[#3a8cc6]"
                    }`}
                  >
                    Read More{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blogs">
            <Button
              variant="outline"
              className={`border-2 ${
                isDark 
                  ? "border-[#4a9cd6]/20 text-[#4a9cd6] hover:bg-[#4a9cd6]/10 hover:text-[#3a8cc6] hover:border-[#4a9cd6]/30" 
                  : "border-[#4a9cd6]/20 text-[#4a9cd6] hover:bg-[#4a9cd6]/10 hover:text-[#3a8cc6] hover:border-[#4a9cd6]/30"
              }`}
            >
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 