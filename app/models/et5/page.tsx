"use client"

import Link from "next/link"
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
                <Link href="/test-drive">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-colors">
                    Book Test Drive
                  </button>
                </Link>
                <Link href="https://www.720yun.com/t/65vktm1qs1h?scene_id=75958446" target="_blank" rel="noopener noreferrer">
                  <button className="bg-transparent border-2 border-white/40 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                    View 360°
                  </button>
                </Link>
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

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Exterior Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Exterior
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Exterior Images */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f48f640194.11823816_20250714_121407.webp"
                  alt="Skywell ET5 - Rear View"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f4a9cc0c95.35931803_20250714_121433.webp"
                  alt="Skywell ET5 - Side View"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f4b997f796.60691145_20250714_121449.webp"
                  alt="Skywell ET5 - Front View"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f4d1accba0.04059496_20250714_121513.webp"
                  alt="Skywell ET5 - Three Quarter View"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Second Row of Exterior Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f4e7dbd751.64460216_20250714_121535.webp"
                  alt="Skywell ET5 - Charging Port"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f5063abfc6.43791859_20250714_121606.webp"
                  alt="Skywell ET5 - Skywell Branding"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f515c84b78.11677858_20250714_121621.jpg"
                  alt="Skywell ET5 - Headlights"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary_6874f54ca7f125.33678428_20250714_121716.webp"
                  alt="Skywell ET5 - Wheel Detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Interior Section */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Interior
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Interior Images */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary/cloudinary_6874f7b24862e8.74200320_20250714_122730.webp"
                  alt="Skywell ET5 - Dashboard"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary/cloudinary_6874f7d85cbdf7.08587484_20250714_122808.jpg"
                  alt="Skywell ET5 - Infotainment System"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary/cloudinary_6874f7f8607861.10997396_20250714_122840.jpg"
                  alt="Skywell ET5 - Panoramic Roof"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://cdn.legendholding.com/images/cloudinary/cloudinary_6874f810d43285.26832725_20250714_122904.jpg"
                  alt="Skywell ET5 - Interior Space"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 