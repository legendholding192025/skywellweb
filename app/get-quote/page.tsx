import React from "react"
import { GetQuoteForm } from "@/components/get-quote/get-quote-form"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export const metadata = {
  title: "Get a Quote | Skywell Electric Vehicles",
  description: "Request a personalized quote for a Skywell electric vehicle. Our team will contact you with detailed pricing and financing options.",
}

export default function GetQuotePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl">Request a Personalized Quote</h1>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Interested in a Skywell electric vehicle? Fill out the form below, and our team will prepare a detailed quote tailored to your needs.
            </p>
          </div>
          
          <GetQuoteForm />
        </div>
      </div>
      <Footer />
    </div>
  )
} 