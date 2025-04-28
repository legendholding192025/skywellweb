import { Metadata } from "next"
import { ContactSection } from "@/components/contact/contact-section"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export const metadata: Metadata = {
  title: "Contact Us | Skywell Electric Vehicles UAE",
  description: "Get in touch with Legend Motors, the exclusive distributor for Skywell electric vehicles in Dubai. Visit our showroom or contact us for any inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  )
} 