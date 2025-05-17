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
            src="https://res.cloudinary.com/dckrspiqe/image/upload/v1710835357/showroom-hero_kgxeip.jpg"
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
            <h2 className="text-3xl font-bold mb-6">Our Legacy in the UAE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-6">
                  Established over 15 years ago, Legend Holding Group has become a cornerstone of the UAE's automotive landscape. 
                  As a multi-disciplined organization, we've built our reputation on putting customers at the heart of everything we do.
                </p>
                <p className="text-lg mb-6">
                  Our business interests span across multiple sectors including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Automotive Excellence</li>
                  <li>Tourism Services</li>
                  <li>Rent-A-Car Solutions</li>
                  <li>Energy Innovation</li>
                  <li>Chemical Distribution</li>
                </ul>
                <p className="text-lg">
                  With state-of-the-art showrooms in both Dubai and Abu Dhabi, we're proud to be the exclusive distributor 
                  for Skywell new energy electric vehicles in Dubai, along with Geely Commercial Electric Vehicles and 
                  Wuling Motors across the UAE.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dckrspiqe/image/upload/v1710835357/legend-motors-building_kgxeip.jpg"
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
                  src="https://res.cloudinary.com/dckrspiqe/image/upload/v1710835357/skywell-factory_kgxeip.jpg"
                  alt="Skywell Manufacturing Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-lg mb-6">
                  Skywell is a pioneering force in the electric vehicle industry, backed by decades of expertise in 
                  new energy vehicle research, development, and manufacturing. Founded in 2011, Skywell has rapidly 
                  emerged as one of China's leading electric vehicle manufacturers.
                </p>
                <p className="text-lg mb-6">
                  With a commitment to sustainable transportation, Skywell has invested heavily in:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li>Advanced R&D facilities</li>
                  <li>State-of-the-art manufacturing plants</li>
                  <li>Innovative battery technology</li>
                  <li>Smart vehicle connectivity</li>
                  <li>Autonomous driving capabilities</li>
                </ul>
                <p className="text-lg">
                  Their flagship model, the Skywell ET5, represents the perfect blend of performance, luxury, and 
                  environmental consciousness, setting new standards in the electric SUV segment.
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
