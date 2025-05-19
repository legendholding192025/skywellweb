import { Metadata } from "next"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Skywell Electric Vehicles UAE",
  description: "Learn about Legend Motors, part of Legend Holding Group, and our partnership with Skywell Electric Vehicles in the UAE.",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
            alt="Legend Motors Showroom"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              About Legend Motors
            </h1>
          </div>
        </div>

        <div className="container py-16 px-4 max-w-7xl mx-auto">
          {/* Legend Motors Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6">About Legend Motors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-6">
                  From humble beginnings in 2008, Legend Holding Group has grown from a small trading company into a global powerhouse based in the UAE. Spanning industries like automotive, green energy, travel, media, technology, logistics, and more, we deliver comprehensive solutions that enhance daily life.
                </p>
                <p className="text-lg mb-6">
                  With over 500 dedicated experts, we prioritize people, innovation, and partnerships, blending excellence with a family spirit. More than a conglomerate, we're a community committed to progress, integrity, and creating a better future.
                </p>
                <p className="text-lg">
                  With state-of-the-art showrooms in both Dubai and Abu Dhabi, we're proud to be the exclusive distributor 
                  for Skywell new energy electric vehicles in Dubai, along with Geely Commercial Electric Vehicles and 
                  Wuling Motors across the UAE.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
                  alt="Legend Motors Building"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Skywell Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6">About Skywell</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dosxengut/image/upload/v1747634627/5b8db088882e43f390dd4a6afdbd08c7_slsp4n.jpg"
                  alt="Skywell Manufacturing Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-lg mb-6">
                  Skywell is a new-generation automotive brand redefining electric mobility with intelligent technology, sustainable design, and exceptional value. As a forward-thinking manufacturer of electric and new energy vehicles, Skywell is committed to creating a cleaner, smarter, and more connected driving experience for modern lifestyles.
                </p>
                <p className="text-lg mb-6">
                  Backed by the global strength of the Skywell Group and officially represented in the UAE by Legend Motors, Skywell delivers vehicles that blend innovation with everyday functionality. From cutting-edge infotainment systems and advanced driver-assistance features to premium interiors and zero-emission performance, Skywell sets a new standard for what electric vehicles can offer.
                </p>
                <p className="text-lg">
                  With a vision rooted in sustainability and progress, Skywell UAE offers customers not just a car, but a smarter way to move forward—powered by technology, supported by excellence, and designed for tomorrow.
                </p>
              </div>
            </div>
          </section>

          {/* Our Presence Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-6">Our Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#4a9cd6] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Dubai Showroom</h3>
                <p className="mb-4">Showroom S02, Al Khoory Sky Garden</p>
                <p className="mb-4">Al Maktoum Road, Port Saeed</p>
                <p className="mb-4">Deira, Dubai, UAE</p>
                <p className="mb-2">Phone: +971 4 548 5633</p>
                <p>Email: skywell@legendmotorsuae.com</p>
              </div>
              <div className="bg-[#4a9cd6] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Abu Dhabi Showroom</h3>
                <p className="mb-4">Coming Soon</p>
                <p className="mb-4">Our new state-of-the-art facility in Abu Dhabi</p>
                <p className="mb-4">will be opening its doors soon to serve</p>
                <p>our valued customers in the capital.</p>
              </div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg">
                  To lead the transformation towards sustainable mobility in the UAE by providing innovative, 
                  high-quality electric vehicles that exceed customer expectations while contributing to a 
                  cleaner, greener future.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg">
                  To deliver exceptional electric vehicles and customer service while promoting environmental 
                  sustainability and supporting the UAE's vision for a sustainable future through our partnership 
                  with Skywell and our commitment to excellence.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 
