import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Offer from "@/models/Offer"

export const dynamic = 'force-dynamic'

// GET /api/offers - Get all active offers
export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get("limit")) || 10
    const page = Number(searchParams.get("page")) || 1
    const skip = (page - 1) * limit

    // Only fetch active offers that are currently valid
    const currentDate = new Date()
    const [offers, total] = await Promise.all([
      Offer.find({
        isActive: true,
        validFrom: { $lte: currentDate },
        validUntil: { $gte: currentDate }
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Offer.countDocuments({
        isActive: true,
        validFrom: { $lte: currentDate },
        validUntil: { $gte: currentDate }
      }),
    ])

    return NextResponse.json({
      offers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error in GET /api/offers:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 