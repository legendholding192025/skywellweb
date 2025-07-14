"use client"

import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { FeatureSection } from "@/components/home/feature-section"
import { SpecsSection } from "@/components/home/specs-section"

export default function ET5Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://cdn.legendholding.com/images/cdn_6874a889c85675.25089476_20250714_064945.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Skywell ET5
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Experience the future of electric mobility with the all-new Skywell ET5. 
                Combining cutting-edge technology with elegant design.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                  Configure Yours
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-colors">
                  Book Test Drive
                </button>
              </div>

              {/* Key Specs */}
              <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">450km</div>
                  <div className="text-sm text-white/80">Range (WLTP)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.8s</div>
                  <div className="text-sm text-white/80">0-100 km/h</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150kW</div>
                  <div className="text-sm text-white/80">Max Power</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

      {/* Specs Section */}
      <SpecsSection />

      <Footer />
    </div>
  )
} 