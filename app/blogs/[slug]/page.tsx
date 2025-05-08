'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Facebook, Twitter, Linkedin, Link2, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  coverImage: {
    url: string;
    alt: string;
  };
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    if (blog?.tags?.length) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
        if (data.data.seo?.metaTitle) {
          document.title = data.data.seo.metaTitle;
        }
        if (data.data.seo?.metaDescription) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', data.data.seo.metaDescription);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    if (!blog?.tags?.length) return;
    
    try {
      // Fetch blogs with matching tags
      const queryParams = new URLSearchParams({
        status: 'published',
        tags: blog.tags.join(','),
        limit: '5'
      });
      const response = await fetch(`/api/blogs?${queryParams}`);
      const data = await response.json();
      if (data.success) {
        // Filter out the current blog and limit to 4 related posts
        const filtered = data.data
          .filter((b: Blog) => b._id !== blog._id)
          .slice(0, 4);
        setRelatedBlogs(filtered);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Link copied!",
            description: "The blog post URL has been copied to your clipboard.",
          });
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blogs">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Back Button and Share Icons */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/blogs">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('facebook')}
                  title="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('twitter')}
                  title="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                  title="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('copy')}
                  title="Copy Link"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Cover Image */}
            {blog.coverImage?.url && (
              <div className="relative h-[400px] w-full mb-8">
                <Image
                  src={blog.coverImage.url}
                  alt={blog.coverImage.alt || blog.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            )}

            {/* Blog Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(blog.publishedAt), 'MMMM d, yyyy')}
              </div>
            </header>

            {/* Blog Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Related Posts Section */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  {relatedBlogs.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {relatedBlogs.map((relatedBlog) => (
                          <div key={relatedBlog._id} className="group">
                            <Link href={`/blogs/${relatedBlog.slug}`}>
                              <div className="space-y-2">
                                {relatedBlog.coverImage?.url && (
                                  <div className="relative h-32 w-full overflow-hidden rounded-lg">
                                    <Image
                                      src={relatedBlog.coverImage.url}
                                      alt={relatedBlog.coverImage.alt || relatedBlog.title}
                                      fill
                                      className="object-cover transition-transform group-hover:scale-105"
                                    />
                                  </div>
                                )}
                                <h4 className="font-medium group-hover:text-primary line-clamp-2">
                                  {relatedBlog.title}
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {relatedBlog.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs bg-muted px-2 py-1 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(relatedBlog.publishedAt), 'MMM d, yyyy')}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t">
                        <Link href="/blogs">
                          <Button variant="outline" className="w-full">
                            View All Posts
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm">No related posts found.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
} 