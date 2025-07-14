"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Calendar, Gift, ChevronLeft, ChevronRight, Phone, Sparkles, Clock, Tag, X } from "lucide-react"
import type { IOffer } from "@/models/Offer"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function OffersPage() {
  const [offers, setOffers] = useState<IOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    fetchOffers()
  }, [currentPage])

  const fetchOffers = async () => {
    try {
      const res = await fetch(`/api/offers?page=${currentPage}&limit=${itemsPerPage}`)
      if (!res.ok) {
        throw new Error("Failed to fetch offers")
      }

      const data = await res.json()
      setOffers(data.offers)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError("Failed to load offers")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy")
  }

  const calculateDaysLeft = (validUntil: Date) => {
    const today = new Date()
    const endDate = new Date(validUntil)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <div className="container mx-auto py-8">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <Skeleton className="h-10 w-[300px] mx-auto" />
                <Skeleton className="h-5 w-[400px] mx-auto" />
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[200px] rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <div className="container mx-auto py-12">
            <div className="rounded-lg border border-red-200 p-6 bg-red-50">
              <div className="flex items-center space-x-3 text-red-600">
                <AlertCircle className="h-6 w-6" />
                <p className="text-lg font-medium">{error}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto py-12 px-4 sm:px-6">
            <div className="space-y-10">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Limited Time Deals</span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Special Offers</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Discover our latest deals and exclusive offers with incredible savings
                </p>
              </div>

              {offers.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
                  <Gift className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-slate-700 mb-2">No Active Offers</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We're currently preparing some amazing new deals for you. Check back soon or subscribe to our newsletter
                    to get notified.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => {
                      const daysLeft = calculateDaysLeft(offer.validUntil)
                      const isUrgent = daysLeft <= 3 && daysLeft > 0

                      return (
                        <Card
                          key={offer._id}
                          className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                        >
                          <div className="relative w-full bg-slate-50" style={{ minHeight: "220px" }}>
                            {offer.images[0] && (
                              <Image
                                src={offer.images[0] || "/placeholder.svg"}
                                alt={offer.title}
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            )}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                              <Badge className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-2.5 py-1 text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                Special Offer
                              </Badge>
                              {isUrgent && (
                                <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-2.5 py-1 text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {daysLeft === 1 ? "Ends today!" : `${daysLeft} days left!`}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                                {offer.title}
                              </h3>
                              <p className="text-sm text-slate-600 line-clamp-2">{offer.description}</p>
                            </div>

                            <div className="flex items-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                              <Calendar className="h-3.5 w-3.5 text-rose-600 mr-1.5 flex-shrink-0" />
                              <span>
                                Valid until{" "}
                                <span className="font-semibold text-slate-700">{formatDate(offer.validUntil)}</span>
                              </span>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <Button
                                className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-200 border-0 h-9 px-3 text-sm"
                                onClick={() => setSelectedOffer(offer)}
                              >
                                <Gift className="h-3.5 w-3.5 mr-1.5" />
                                View Details
                              </Button>
                              <Link href="/contact" className="flex-1">
                                <Button
                                  variant="outline"
                                  className="w-full border-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-200 h-9 px-3 text-sm"
                                >
                                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                                  Contact Sales
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow transition-all duration-200"
                      >
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md border-0"
                                : "border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow"
                            }
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm hover:shadow transition-all duration-200"
                      >
                        Next
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{selectedOffer.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedOffer(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="relative w-full bg-slate-50 rounded-lg" style={{ minHeight: "300px" }}>
                {selectedOffer.images[0] && (
                  <Image
                    src={selectedOffer.images[0]}
                    alt={selectedOffer.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600">{selectedOffer.description}</p>
              </div>
              <div className="flex items-center text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                <Calendar className="h-4 w-4 text-rose-600 mr-2" />
                <span>
                  Valid until{" "}
                  <span className="font-semibold text-slate-700">{formatDate(selectedOffer.validUntil)}</span>
                </span>
              </div>
              <div className="flex gap-3 pt-4">
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-200 border-0">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Sales
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setSelectedOffer(null)}
                  className="border-2 border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

