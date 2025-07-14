import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function Support() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Customer Support</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">How Can We Help?</h2>
            <p className="text-gray-600 mb-6">
              Our dedicated support team is here to assist you with any questions or concerns about your Skywell vehicle.
            </p>
            <div className="flex gap-4">
              <Link href="/contact-us">
                <Button>Contact Support</Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline">View FAQs</Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p>📞 Phone: 04 221 9958</p>
                <p>✉️ Email: skywell@legendmotorsuae.com</p>
                <p>⏰ Hours: 24/7 Support</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Owner's Manual</li>
                <li>• Warranty Information</li>
                <li>• Service Schedule</li>
                <li>• Emergency Assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 