"use client"

import React, { Suspense } from "react"
import { TestDriveForm } from "../../components/test-drive/test-drive-form"
import { Navbar } from "../../components/common/navbar"
import { Footer } from "../../components/common/footer"

export default function TestDrivePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl">Book Your Test Drive</h1>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Experience the future of electric mobility with a personalized test drive of the Skywell ET5.
            </p>
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
            <TestDriveForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  )
}
