"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function PerformanceSection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  const performanceData = {
    acceleration: {
      value: "4.8",
      unit: "seconds",
      description: "The Skywell ET5 delivers exhilarating acceleration from 0-100 km/h in just 4.8 seconds, providing instant torque from its advanced electric motors."
    },
    range: {
      value: "510",
      unit: "km",
      description: "Experience true freedom with up to 510 kilometers of range on a single charge, making long journeys possible without range anxiety."
    },
    battery: {
      value: "86",
      unit: "kWh",
      description: "The high-capacity 86 kWh battery pack is engineered for longevity and rapid charging, retaining over 80% capacity after 1000+ charging cycles."
    },
    power: {
      value: "320",
      unit: "kW",
      description: "Dual electric motors generate a combined 320 kW (430 hp) of power with precise torque distribution for optimal handling in all conditions."
    }
  }
  
  const drivingModes = [
    {
      name: "Eco",
      description: "Maximizes efficiency and range by optimizing power delivery and regenerative braking",
      icon: "/icons/eco-mode.svg",
      color: "green"
    },
    {
      name: "Comfort",
      description: "Balanced performance with smooth power delivery for everyday driving comfort",
      icon: "/icons/comfort-mode.svg",
      color: "blue"
    },
    {
      name: "Sport",
      description: "Enhanced throttle response and reduced traction control for a more dynamic driving experience",
      icon: "/icons/sport-mode.svg",
      color: "red"
    },
    {
      name: "Custom",
      description: "Personalize driving parameters to create your own unique driving experience",
      icon: "/icons/custom-mode.svg",
      color: "purple"
    }
  ]

  return (
    <div className={`min-h-screen py-24 ${isDark ? "bg-neutral-900" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
            Exhilarating Performance
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            The Skywell ET5 combines powerful electric motors with advanced engineering to deliver a driving experience that's both thrilling and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-[500px]"
          >
            <Image
              src="/et5-performance.png"
              alt="Skywell ET5 Performance"
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent" : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"}`}>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2">
                  Power in Motion
                </h3>
                <p className="text-gray-200">
                  Dual motor all-wheel drive delivers exceptional handling and traction in all weather conditions.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(performanceData).map(([key, data], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 ${isDark ? "bg-neutral-800" : "bg-gray-50"} flex flex-col items-center text-center`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  key === "acceleration" ? "bg-red-100" :
                  key === "range" ? "bg-green-100" :
                  key === "battery" ? "bg-blue-100" :
                  "bg-purple-100"
                }`}>
                  <Image 
                    src={`/icons/${key}-icon.svg`} 
                    alt={key} 
                    width={32} 
                    height={32}
                  />
                </div>
                <div className="flex items-baseline justify-center mb-2">
                  <span className={`text-4xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                    {data.value}
                  </span>
                  <span className={`ml-1 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {data.unit}
                  </span>
                </div>
                <h3 className={`text-lg font-medium mb-2 capitalize ${isDark ? "text-white" : "text-black"}`}>
                  {key}
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {data.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${isDark ? "text-white" : "text-black"}`}>
            Personalized Driving Experience
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {drivingModes.map((mode, index) => (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl ${isDark ? "bg-neutral-800" : "bg-gray-50"} hover:shadow-lg transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${mode.color}-100`}>
                  <Image src={mode.icon} alt={mode.name} width={24} height={24} />
                </div>
                <h4 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-black"}`}>
                  {mode.name} Mode
                </h4>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {mode.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Tabs defaultValue="motors" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="motors">Electric Motors</TabsTrigger>
            <TabsTrigger value="battery">Battery Technology</TabsTrigger>
            <TabsTrigger value="charging">Charging</TabsTrigger>
          </TabsList>
          
          <TabsContent value="motors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-xl ${isDark ? "bg-neutral-800" : "bg-gray-50"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    Dual Motor AWD
                  </h4>
                  <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    The Skywell ET5 features dual high-performance electric motors, one on each axle, delivering instant torque and precise control in all driving conditions.
                  </p>
                  <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Front motor: 160 kW permanent magnet synchronous
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Rear motor: 160 kW permanent magnet synchronous
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Combined output: 320 kW (430 hp)
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Maximum torque: 720 Nm
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src="/et5-motor.png"
                    alt="Skywell ET5 Electric Motor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="battery">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-xl ${isDark ? "bg-neutral-800" : "bg-gray-50"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    Advanced Battery System
                  </h4>
                  <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    The 86 kWh lithium-ion battery pack combines high energy density with sophisticated thermal management for optimal performance in all conditions.
                  </p>
                  <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Capacity: 86 kWh usable
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Cell chemistry: NCM (Nickel, Cobalt, Manganese)
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Thermal management: Liquid-cooled with intelligent temperature control
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Battery warranty: 8 years/160,000 km
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src="/et5-battery.png"
                    alt="Skywell ET5 Battery System"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="charging">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-xl ${isDark ? "bg-neutral-800" : "bg-gray-50"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    Fast Charging Capability
                  </h4>
                  <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    With support for DC fast charging and convenient AC charging options, the Skywell ET5 ensures you spend less time charging and more time driving.
                  </p>
                  <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      DC fast charging: 10-80% in 30 minutes (120 kW)
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      AC charging: Full charge in 7 hours (11 kW)
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Charging port: CCS Combo Type 2
                    </li>
                    <li className="flex items-center">
                      <div className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      Smart charging: Schedule and monitor via mobile app
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src="/et5-charging.png"
                    alt="Skywell ET5 Charging"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 