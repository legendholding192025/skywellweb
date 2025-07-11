import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function ServiceCenter() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Service Center</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Schedule Your Service</h2>
            <p className="text-gray-600 mb-6">
              Keep your Skywell vehicle in perfect condition with our professional service center.
              Our expert technicians are trained to provide the highest quality service for your electric vehicle.
            </p>
            <Button>Book Service Appointment</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Service Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Factory trained technicians</li>
                <li>✓ Genuine parts and accessories</li>
                <li>✓ State-of-the-art facilities</li>
                <li>✓ Comprehensive vehicle inspection</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Service Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 