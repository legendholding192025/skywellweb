import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { verifyAuth } from '@/lib/auth';

// Get all blogs or filter by status
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (status) query.status = status;
    if (tag) query.tags = tag;

    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Blog.countDocuments(query);

    // Transform the data to match frontend structure
    const transformedBlogs = blogs.map(blog => {
      const blogObj = blog.toObject();
      const transformed = {
        ...blogObj,
        coverImage: {
          url: blogObj.coverImageUrl || '',
          alt: blogObj.coverImageAlt || '',
        }
      };
      delete transformed.coverImageUrl;
      delete transformed.coverImageAlt;
      return transformed;
    });

    return NextResponse.json({
      success: true,
      data: transformedBlogs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// Create new blog
export async function POST(req: Request) {
  try {
    // Verify admin authentication
    const admin = await verifyAuth(req);
    if (!admin) {
      console.log('Authentication failed - no admin found');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
      console.log('Received blog data:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request body',
          error: 'Failed to parse JSON data'
        },
        { status: 400 }
      );
    }

    await connectDB();
    console.log('Connected to database');

    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields', 
          error: `Missing fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    try {
      const blogData = {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        slug: body.slug,
        status: body.status || 'draft',
        author: admin._id,
        publishedAt: body.status === 'published' ? new Date() : null,
        coverImageUrl: body.coverImage?.url || '',
        coverImageAlt: body.coverImage?.alt || body.title,
        tags: Array.isArray(body.tags) ? body.tags : [],
        seo: {
          metaTitle: body.seo?.metaTitle || body.title,
          metaDescription: body.seo?.metaDescription || body.excerpt,
          keywords: Array.isArray(body.seo?.keywords) ? body.seo.keywords : [],
        }
      };

      console.log('Attempting to create blog with data:', blogData);

      const blog = await Blog.create(blogData);
      console.log('Blog created successfully:', blog);

      // Transform the response data to match frontend structure
      const transformedBlog = {
        ...blog.toObject(),
        coverImage: {
          url: blog.coverImageUrl || '',
          alt: blog.coverImageAlt || '',
        }
      };
      delete transformedBlog.coverImageUrl;
      delete transformedBlog.coverImageAlt;

      return NextResponse.json({
        success: true,
        message: 'Blog created successfully',
        data: transformedBlog,
      });
    } catch (dbError: any) {
      console.error('Database error creating blog:', {
        error: dbError,
        message: dbError.message,
        code: dbError.code,
        name: dbError.name,
        data: body
      });
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create blog',
          error: dbError.message || 'Unknown database error'
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error in blog creation:', {
      error,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create blog',
        error: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 