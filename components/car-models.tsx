"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarModel {
  id: number
  name: string
  image: string
  description: string
}

export function CarModels() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Replace with your actual car models
  const carModels: CarModel[] = [
    {
      id: 1,
      name: "Skywell ET5",
      image: "/images/skywell-et5.jpg", // Add your image here
      description: "The flagship electric SUV with 450km range and advanced autopilot.",
    },
    {
      id: 2,
      name: "Skywell EC3",
      image: "/images/skywell-ec3.jpg", // Add your image here
      description: "Compact city electric vehicle with 350km range and fast charging.",
    },
    {
      id: 3,
      name: "Skywell ER6",
      image: "/images/skywell-er6.jpg", // Add your image here
      description: "Premium electric sedan with 500km range and luxury interior.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carModels.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carModels.length - 1 : prevIndex - 1))
  }

  return (
    <div className="w-full py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Our Electric Vehicle Models</h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div className="relative h-[500px]">
              {carModels.map((car, index) => (
                <motion.div
                  key={car.id}
                  className="absolute inset-0 flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    x: currentIndex === index ? 0 : 100,
                    zIndex: currentIndex === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full md:w-1/2 p-6">
                    <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{car.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{car.description}</p>
                    <Button className="bg-[#4a9cd6] hover:bg-[#3a8cc6]">Learn More</Button>
                  </div>
                  <div className="w-full md:w-1/2">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-20"
          >
            <ChevronLeft className="h-6 w-6 text-[#4a9cd6]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-20"
          >
            <ChevronRight className="h-6 w-6 text-[#4a9cd6]" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {carModels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-[#4a9cd6]" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
