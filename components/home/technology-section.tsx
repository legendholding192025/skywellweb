"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"

export function TechnologySection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activeFeature, setActiveFeature] = useState(0)

  const techFeatures = [
    {
      title: "15.6\" Touchscreen Display",
      description: "Control virtually every aspect of your ET5 through the intuitive high-resolution 15.6-inch touchscreen with customizable interface and responsive controls.",
      image: "/et5-display.png"
    },
    {
      title: "Augmented Reality HUD",
      description: "The advanced heads-up display projects critical driving information directly onto the windshield in your line of sight, enhancing safety and convenience.",
      image: "/et5-hud.png"
    },
    {
      title: "Voice Assistant",
      description: "Communicate naturally with your ET5 through the AI-powered voice assistant capable of controlling vehicle functions, navigation, and entertainment.",
      image: "/et5-voice.png"
    },
    {
      title: "Smartphone Integration",
      description: "Seamlessly connect your smartphone with wireless Apple CarPlay and Android Auto for enhanced connectivity and entertainment options.",
      image: "/et5-smartphone.png"
    }
  ]

  const connectivityFeatures = [
    {
      title: "5G Connectivity",
      description: "Stay connected with high-speed 5G internet access for streaming, over-the-air updates, and real-time traffic information.",
      icon: "/icons/5g-icon.svg"
    },
    {
      title: "Mobile App Control",
      description: "Remotely control and monitor your ET5 from anywhere using the dedicated smartphone app with charging status, climate control, and location services.",
      icon: "/icons/app-icon.svg"
    },
    {
      title: "OTA Updates",
      description: "Receive regular over-the-air software updates that enhance your vehicle's performance, add new features, and improve the user experience.",
      icon: "/icons/update-icon.svg"
    },
    {
      title: "Smart Home Integration",
      description: "Connect your ET5 to your smart home ecosystem to control home devices from your car or prepare your car remotely from your home.",
      icon: "/icons/smarthome-icon.svg"
    }
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  }

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
            Cutting-Edge Technology
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            The Skywell ET5 integrates advanced technology to create an intuitive, connected driving experience that anticipates your needs.
          </p>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                onClick={() => setActiveFeature(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? isDark ? "bg-blue-900/30 border border-blue-500/50" : "bg-blue-50 border border-blue-200" 
                    : isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                    {feature.title}
                  </h3>
                  <ChevronRight className={`w-5 h-5 ${
                    activeFeature === index 
                      ? "text-blue-500" 
                      : isDark ? "text-gray-400" : "text-gray-500"
                  }`} />
                </div>
                {activeFeature === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {feature.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={techFeatures[activeFeature].image}
                alt={techFeatures[activeFeature].title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black/70 to-transparent" : "bg-gradient-to-t from-black/50 to-transparent"}`}></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {techFeatures[activeFeature].title}
                </h3>
                <p className="text-gray-200">
                  {techFeatures[activeFeature].description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Digital Cockpit Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
                Digital Cockpit Experience
              </h3>
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                The Skywell ET5 features a fully digital cockpit that transforms how you interact with your vehicle. 
                The minimalist dashboard centers around dual high-resolution displays that provide all the information 
                you need while driving.
              </p>
              
              <ul className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <li className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      12.3" Digital Instrument Cluster
                    </h4>
                    <p>Customizable display showing speed, range, navigation, and driver assistance status in stunning clarity</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      15.6" Central Touchscreen
                    </h4>
                    <p>Ultra-responsive touchscreen controlling entertainment, climate, vehicle settings, and navigation with intuitive gestures</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3 ${isDark ? "bg-blue-900/30" : "bg-blue-100"}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                      Ambient Lighting System
                    </h4>
                    <p>64-color ambient lighting integrated throughout the cabin, responding to driving modes and multimedia</p>
                  </div>
                </li>
              </ul>
              
              <div className={`flex items-center space-x-2 mt-8 group cursor-pointer ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                <span className="font-medium">Learn more about the digital experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/et5-cockpit.png"
                alt="Skywell ET5 Digital Cockpit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Connectivity Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-10 text-center ${isDark ? "text-white" : "text-black"}`}>
            Connected Intelligence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {connectivityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`p-6 rounded-xl border ${
                  isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}>
                  <Image 
                    src={feature.icon} 
                    alt={feature.title} 
                    width={28} 
                    height={28} 
                  />
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${isDark ? "text-white" : "text-black"}`}>
                  {feature.title}
                </h4>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* AI Assistant Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`rounded-2xl overflow-hidden ${isDark ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20" : "bg-gradient-to-r from-blue-50 to-purple-50"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-10 lg:p-16">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                AI-Powered Assistant
              </div>
              <h3 className={`text-2xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
                Meet Your Digital Co-Pilot
              </h3>
              <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                The Skywell ET5 features an advanced AI assistant that learns your preferences and adapts to your needs.
                Using natural language processing, it responds to voice commands for navigation, climate control, entertainment,
                and vehicle functions while continuously improving through machine learning.
              </p>
              
              <div className={`p-4 rounded-xl ${isDark ? "bg-black/30" : "bg-white"} mb-8`}>
                <p className={`italic ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  "Hey Skywell, find me a charging station nearby with at least 100 kW power output and a coffee shop within walking distance."
                </p>
              </div>
              
              <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}>
                Explore AI features
              </button>
            </div>
            
            <div className="relative h-[500px]">
              <Image
                src="/et5-ai-assistant.png"
                alt="Skywell ET5 AI Assistant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 