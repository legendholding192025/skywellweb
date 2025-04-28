import React from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react"

export const metadata = {
  title: "Contact Us | Skywell Electric Vehicles",
  description: "Get in touch with Skywell UAE. Visit our showroom or contact us for any inquiries about our electric vehicles.",
}

export default function ContactUsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl">Contact Us</h1>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Have questions about Skywell electric vehicles? Reach out to our team for assistance with sales, service, or general inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="rounded-xl p-8 bg-[#4a9cd6] text-white shadow-lg h-fit">
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-medium flex items-center mb-3">
                      <MapPin className="mr-2 h-5 w-5" />
                      Our Showroom
                    </h4>
                    <p className="opacity-90">
                      Showroom S02, Al Khoory Sky Garden, <br />
                      Al Maktoum Road, Port Saeed, <br />
                      Deira, Dubai, UAE
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center mb-3">
                      <Phone className="mr-2 h-5 w-5" />
                      Phone & WhatsApp
                    </h4>
                    <p className="opacity-90">
                      <a href="tel:+97145485633" className="hover:underline">+971 4 548 5633</a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center mb-3">
                      <Mail className="mr-2 h-5 w-5" />
                      Email
                    </h4>
                    <p className="opacity-90">
                      <a href="mailto:skywell@legendmotorsuae.com" className="hover:underline">skywell@legendmotorsuae.com</a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center mb-3">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      About Legend Motors
                    </h4>
                    <p className="opacity-90">
                      Official Skywell Dealership<br />
                      Member of Legend Holding Group
                    </p>
                  </div>
                  
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="font-medium mb-3">Business Hours</h4>
                    <ul className="space-y-1 opacity-90">
                      <li className="flex justify-between">
                        <span>Monday - Saturday:</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.068332622203!2d55.327344!3d25.259679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3ebc3f3c13%3A0x8a9e3750b411ffcd!2sAl%20Khoory%20Sky%20Garden%20Hotel!5e0!3m2!1sen!2sae!4v1587123456789!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 shadow-md bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="opacity-80">We accept cash, bank transfers, and all major credit cards. We also offer financing options through our banking partners.</p>
              </div>
              
              <div className="rounded-xl p-6 shadow-md bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-2">Do you offer test drives?</h3>
                <p className="opacity-80">Yes, we offer test drives of all our Skywell models. You can book a test drive online or visit our showroom directly.</p>
              </div>
              
              <div className="rounded-xl p-6 shadow-md bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-2">What warranty do Skywell vehicles come with?</h3>
                <p className="opacity-80">Skywell vehicles come with a comprehensive 5-year/150,000 km warranty and an 8-year/160,000 km warranty on the battery.</p>
              </div>
              
              <div className="rounded-xl p-6 shadow-md bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-semibold mb-2">Where are your service centers located?</h3>
                <p className="opacity-80">Our main service center is located in Al Quoz Industrial Area. We also have service partners across Dubai and Abu Dhabi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 