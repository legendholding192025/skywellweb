import { NextResponse } from "next/server"
import { headers } from "next/headers"
import dbConnect from "@/lib/dbConnect"
import Offer from "@/models/Offer"
import { verifyToken } from "@/lib/auth"

export const dynamic = 'force-dynamic'

// GET /api/admin/offers - Get all offers
export async function GET(request: Request) {
  try {
    const headersList = headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isValid = await verifyToken(token)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get("limit")) || 10
    const page = Number(searchParams.get("page")) || 1
    const skip = (page - 1) * limit

    const [offers, total] = await Promise.all([
      Offer.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Offer.countDocuments({}),
    ])

    return NextResponse.json({
      offers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error in GET /api/admin/offers:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/admin/offers - Create a new offer
export async function POST(request: Request) {
  try {
    const headersList = headers()
    const token = headersList.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isValid = await verifyToken(token)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()
    const offer = await Offer.create(data)

    return NextResponse.json(offer)
  } catch (error) {
    console.error("Error in POST /api/admin/offers:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 