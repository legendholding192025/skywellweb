"use client"

import { MapPin, Phone, Mail, MessageSquare } from "lucide-react"
import { ContactForm } from "./contact-form"
import { useTheme } from "next-themes"

export function ContactSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="pt-20">
      <div className="container py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className={`text-3xl font-bold mb-4 md:text-4xl ${isDark ? "text-white" : "text-black"}`}>Contact Us</h1>
          <p className={`text-lg opacity-80 max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Have questions about Skywell electric vehicles? Reach out to our team for assistance with sales, service, or general inquiries.
          </p>
        </div>

        {/* About Legend Motors */}
        <div className={`mb-12 p-8 rounded-xl ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>About Legend Motors</h2>
          <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Established here in the UAE for over 15 years, Legend Holding Group is a multi-disciplined with the customer at the heart of everything we do. 
            With business interests from Automotives, Tourism, Rent-A-Car, Energy and Chemicals, we are well placed at the heart of the UAE community.
          </p>
          <p className={`text-lg mt-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Legend Motors is the exclusive distributor for Skywell new energy electric vehicles in Dubai, Geely Commercial Electric Vehicles and Wuling Motors in the UAE.
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
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-black"}`}>Find Us</h2>
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
      </div>
    </div>
  )
} 