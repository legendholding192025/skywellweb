import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// Get blog by slug
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug }).select('-__v');

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Transform the data to match frontend structure
    const transformedBlog = {
      ...blog.toObject(),
      coverImage: {
        url: blog.coverImageUrl || '',
        alt: blog.coverImageAlt || '',
      },
    };

    // Remove the original fields to avoid duplication
    delete transformedBlog.coverImageUrl;
    delete transformedBlog.coverImageAlt;

    return NextResponse.json({
      success: true,
      data: transformedBlog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// Update blog
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!req.body) {
      return NextResponse.json(
        { success: false, message: 'No request body provided' },
        { status: 400 }
      );
    }

    const body = await req.json();
    await connectDB();

    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // If status is changing to published, set publishedAt
    if (body.status === 'published' && blog.status !== 'published') {
      body.publishedAt = new Date();
    }

    // Transform cover image data
    const updateData = {
      ...body,
      coverImageUrl: body.coverImage?.url || '',
      coverImageAlt: body.coverImage?.alt || '',
    };
    delete updateData.coverImage;

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: params.slug },
      updateData,
      { new: true }
    ).select('-__v');

    // Transform the response data to match frontend structure
    const transformedBlog = {
      ...updatedBlog.toObject(),
      coverImage: {
        url: updatedBlog.coverImageUrl || '',
        alt: updatedBlog.coverImageAlt || '',
      }
    };
    delete transformedBlog.coverImageUrl;
    delete transformedBlog.coverImageAlt;

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      data: transformedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// Delete blog
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findOneAndDelete({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 