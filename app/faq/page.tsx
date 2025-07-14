"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How far can I go with a fully charged battery?",
    answer: "With a 100% charge on Skywell ET5, which has a battery capacity of 72kWh, you can travel a distance of 520 kms (based on NEDC standards), which will be sufficient for you to travel from Dubai to Abu Dhabi and back from Abu Dhabi to Dubai in a single charge."
  },
  {
    question: "Where all can I charge my vehicle battery? How much time will it take me to fully charge my battery?",
    answer: "You can charge your Skywell ET5 at your home or workplace just by plugging in the charging adapter (based on the availability in the facility) or you can charge it in any of the malls or charging station in the UAE. You can charge the battery of the vehicles 30% to 80% in 30 minutes at any of the DC charging stations with a power output of 80 kW. Battery charging of your vehicle at AC charging stations varies according to AC charging input and charging station power output capacity."
  },
  {
    question: "What is the battery life and warranty?",
    answer: "The batteries, which have the capacity of recharging 5,500 to 6,000 times, have a driving warranty of 8 years and 200,000 km. Within the scope of this warranty, if the battery life loses more than 30% capacity under appropriate usage conditions, the battery is replaced under warranty."
  },
  {
    question: "Is the vehicle suitable for climate in the UAE?",
    answer: "Skywell vehicles have been manufactured and tested to sustain in the extreme climate making it completely suitable for the climate in the region. The vehicle has been certified by ECAS (Emirates Conformity Assessment Scheme) for Electric Vehicles in the UAE."
  },
  {
    question: "Are there service and maintenance centres for Skywell vehicles in the UAE?",
    answer: "Authorized service is provided by EGME (in Abu Dhabi) and Legend Motors (in Dubai), and the service network is expanding day-by-day with the dealer network. You can contact EGME or Legend Motors to get detailed up-to-date information about authorized service network."
  },
  {
    question: "How is the supply of spare parts?",
    answer: "Spare parts for Skywell brand vehicles are imported and kept in stock by the authorized service providers, EGME (in Abu Dhabi) and Legend Motors (in Dubai). You can contact EGME or Legend Motors to get detailed and up-to-date information about the authorized service network."
  },
  {
    question: "What is the maintenance schedule for Electric Vehicles?",
    answer: "The Electric Vehicles have fewer moveable parts, so the maintenance of Electric Vehicles is much lower than the conventional fuel vehicles. Sources suggest electric vehicle owners spend roughly a third of what conventionally powered auto owners do for regular service. Get in touch with one of our highly trained sales executive to know more about the vehicle and maintenance schedule."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-[#294972] to-[#4a9cd6] pt-32 pb-24 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(41, 73, 114, 0.8), rgba(74, 156, 214, 0.8)), url('https://skywell-uae.com/wp-content/uploads/2022/07/aboutbready.jpg')"
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                FAQ
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Find answers to the most frequently asked questions about Skywell electric vehicles
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#294972] mb-4">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about Skywell electric vehicles
                </p>
              </div>

              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-[#294972] pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openItems.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-[#4a9cd6]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#4a9cd6]" />
                        )}
                      </div>
                    </button>
                    
                    {openItems.includes(index) && (
                      <div className="px-6 pb-5">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed mt-3">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-[#294972] mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact-us"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#4a9cd6] text-white font-medium rounded-lg hover:bg-[#3a8bc6] transition-colors duration-200"
                  >
                    Contact Support
                  </a>
                  <a
                    href="tel:04-221-9958"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#4a9cd6] text-[#4a9cd6] font-medium rounded-lg hover:bg-[#4a9cd6] hover:text-white transition-colors duration-200"
                  >
                    Call: 04 221 9958
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
} 