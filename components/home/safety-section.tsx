"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { ChevronRight, Shield, Eye, Car, Zap } from "lucide-react"

export function SafetySection() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activeTab, setActiveTab] = useState("adas")
  
  const tabs = [
    { id: "adas", label: "Advanced Driver Assistance", icon: Eye },
    { id: "structure", label: "Safety Structure", icon: Shield },
    { id: "battery", label: "Battery Safety", icon: Zap },
    { id: "protection", label: "Occupant Protection", icon: Car }
  ]
  
  const safetyFeatures = {
    adas: [
      {
        title: "Highway Driving Pilot",
        description: "Navigate highways with adaptive cruise control that maintains safe distances, lane centering, and automated lane changes for a stress-free commute.",
        image: "/safety/highway-pilot.png"
      },
      {
        title: "Automated Emergency Braking",
        description: "Detect potential collisions with vehicles, pedestrians, and cyclists, automatically applying brakes to prevent or mitigate impacts.",
        image: "/safety/emergency-braking.png"
      },
      {
        title: "360° Camera System",
        description: "Gain complete awareness of your surroundings with birds-eye view visualization and object detection for confident maneuvering in tight spaces.",
        image: "/safety/360-camera.png"
      },
      {
        title: "Traffic Sign Recognition",
        description: "Automatically detect and display speed limits and other traffic signs on your instrument panel to help you stay informed and compliant.",
        image: "/safety/traffic-sign.png"
      }
    ],
    structure: [
      {
        title: "High-Strength Steel Cage",
        description: "A reinforced passenger compartment constructed with ultra-high-strength steel provides superior protection in case of collision.",
        image: "/safety/steel-cage.png"
      },
      {
        title: "Crumple Zones",
        description: "Strategically designed front and rear crumple zones absorb and dissipate impact energy away from occupants.",
        image: "/safety/crumple-zones.png"
      },
      {
        title: "Side Impact Protection",
        description: "Reinforced door beams and B-pillars provide enhanced resistance against lateral impacts to protect occupants.",
        image: "/safety/side-impact.png"
      },
      {
        title: "Rigid Roof Structure",
        description: "Engineered to withstand over 4 times the vehicle's weight to maintain cabin integrity during rollovers.",
        image: "/safety/roof-structure.png"
      }
    ],
    battery: [
      {
        title: "Advanced Battery Management",
        description: "Continuous monitoring system regulates temperature, voltage, and current to prevent thermal events and optimize performance.",
        image: "/safety/battery-management.png"
      },
      {
        title: "Fire-Resistant Barriers",
        description: "Multiple layers of fire-resistant materials isolate the battery pack from the passenger compartment.",
        image: "/safety/fire-resistant.png"
      },
      {
        title: "Liquid Cooling System",
        description: "Sophisticated cooling system maintains optimal battery temperature even under extreme driving conditions.",
        image: "/safety/cooling-system.png"
      },
      {
        title: "Cell-to-Cell Isolation",
        description: "Individual cell compartmentalization prevents thermal propagation between cells in case of a cell failure.",
        image: "/safety/cell-isolation.png"
      }
    ],
    protection: [
      {
        title: "8 Airbag System",
        description: "Comprehensive airbag system includes front, side, curtain, and knee airbags for maximum occupant protection.",
        image: "/safety/airbag-system.png"
      },
      {
        title: "Pre-Tensioning Seatbelts",
        description: "Automatic seatbelt tightening upon collision detection to minimize occupant movement and reduce injury risks.",
        image: "/safety/seatbelts.png"
      },
      {
        title: "Child Safety System",
        description: "ISOFIX anchors and top tether points for secure child seat installation with rear door child safety locks.",
        image: "/safety/child-safety.png"
      },
      {
        title: "Pedestrian Protection",
        description: "Specially designed front-end with energy-absorbing hood and bumper to minimize pedestrian injuries in case of impact.",
        image: "/safety/pedestrian.png"
      }
    ]
  }
  
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
    <div className={`min-h-screen py-24 ${isDark ? "bg-neutral-900" : "bg-gray-50"}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${isDark ? "bg-red-900/30" : "bg-red-100"}`}>
            <Shield className={`w-8 h-8 ${isDark ? "text-red-400" : "text-red-500"}`} />
          </div>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
            Safety Without Compromise
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            The Skywell ET5 integrates cutting-edge safety technologies to protect you and your loved ones at every turn.
          </p>
        </motion.div>

        {/* Safety Ratings Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-16 rounded-xl p-8 ${isDark ? "bg-neutral-800" : "bg-white"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left md:col-span-1">
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-black"}`}>
                5-Star Safety Rating
              </h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                The Skywell ET5 has achieved the highest safety ratings in all categories from major global safety organizations.
              </p>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className={`p-4 rounded-lg text-center ${isDark ? "bg-neutral-700" : "bg-gray-50"}`}>
                <div className="flex justify-center mb-2">
                  <Image 
                    src="/safety/euro-ncap.svg" 
                    alt="Euro NCAP" 
                    width={80} 
                    height={40} 
                  />
                </div>
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                  5★ Euro NCAP
                </div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  95% Adult Protection
                </p>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${isDark ? "bg-neutral-700" : "bg-gray-50"}`}>
                <div className="flex justify-center mb-2">
                  <Image 
                    src="/safety/iihs.svg" 
                    alt="IIHS" 
                    width={80} 
                    height={40} 
                  />
                </div>
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                  IIHS Top Safety Pick+
                </div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Superior Crash Prevention
                </p>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${isDark ? "bg-neutral-700" : "bg-gray-50"}`}>
                <div className="flex justify-center mb-2">
                  <Image 
                    src="/safety/c-ncap.svg" 
                    alt="C-NCAP" 
                    width={80} 
                    height={40} 
                  />
                </div>
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                  5★ C-NCAP
                </div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Best in Segment Rating
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Safety Features Tabs */}
        <div className="mb-24">
          <div className={`flex flex-wrap gap-3 border-b mb-12 ${isDark ? "border-neutral-700" : "border-gray-200"}`}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 pb-4 font-medium transition-colors ${
                    activeTab === tab.id 
                      ? isDark 
                        ? "text-red-400 border-b-2 border-red-400 -mb-[2px]" 
                        : "text-red-600 border-b-2 border-red-600 -mb-[2px]"
                      : isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {/* Featured Safety Image */}
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] rounded-2xl overflow-hidden mb-8"
              >
                <Image
                  src={`/safety/${activeTab}-hero.png`}
                  alt={`Skywell ET5 ${tabs.find(t => t.id === activeTab)?.label}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div
                key={`desc-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {activeTab === "adas" && "The Skywell ET5 features a comprehensive suite of driver assistance technologies that work together to prevent accidents and reduce driver fatigue. With 12 ultrasonic sensors, 5 radar units, and 8 cameras, the system provides 360° awareness in all driving conditions."}
                  {activeTab === "structure" && "Engineered with a high-strength steel and aluminum construction, the ET5's safety cage is designed to absorb and redistribute impact energy away from occupants during a collision while maintaining cabin integrity."}
                  {activeTab === "battery" && "The ET5's battery system incorporates multiple layers of safety features, from intelligent battery management to physical protection, ensuring optimal performance while minimizing risks typically associated with high-voltage systems."}
                  {activeTab === "protection" && "Should a collision occur, the ET5 is equipped with comprehensive occupant protection systems including strategically placed airbags, advanced seatbelt technology, and structural reinforcements to minimize injury risk."}
                </p>
              </motion.div>
            </div>
            
            <div>
              <div className="grid grid-cols-1 gap-4">
                {safetyFeatures[activeTab as keyof typeof safetyFeatures].map((feature, index) => (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className={`p-5 rounded-xl border ${
                      isDark ? "bg-neutral-800/50 border-neutral-700" : "bg-white border-gray-100 shadow-sm"
                    }`}
                  >
                    <div className="flex">
                      <div className="shrink-0 w-16 h-16 mr-5 rounded-lg overflow-hidden relative">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div>
                        <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Automatic Emergency Response */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`rounded-2xl overflow-hidden mb-16 ${
            isDark ? "bg-gradient-to-r from-red-900/20 to-amber-900/20" : "bg-gradient-to-r from-red-50 to-amber-50"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 p-10 lg:p-16">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"
              }`}>
                Intelligent Emergency Response
              </div>
              
              <h3 className={`text-2xl md:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
                Help When You Need It Most
              </h3>
              
              <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                In the event of a severe collision, the Skywell ET5's Automatic Emergency Response System activates 
                instantly to protect you and expedite assistance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl ${isDark ? "bg-black/20" : "bg-white/80"}`}>
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-3 ${
                      isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}>
                      <span className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-500"}`}>1</span>
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                        Automatic Detection
                      </h4>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Sensors detect collision severity and cabin status, activating appropriate safety measures
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${isDark ? "bg-black/20" : "bg-white/80"}`}>
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-3 ${
                      isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}>
                      <span className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-500"}`}>2</span>
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                        Safety Protocols
                      </h4>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Automatically disconnects high-voltage system, unlocks doors, and activates hazard lights
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${isDark ? "bg-black/20" : "bg-white/80"}`}>
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-3 ${
                      isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}>
                      <span className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-500"}`}>3</span>
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                        Emergency Services
                      </h4>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Contacts emergency services with vehicle location, crash data, and occupant information
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${isDark ? "bg-black/20" : "bg-white/80"}`}>
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-3 ${
                      isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}>
                      <span className={`text-xl font-bold ${isDark ? "text-red-400" : "text-red-500"}`}>4</span>
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-black"}`}>
                        Occupant Communication
                      </h4>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        Establishes voice connection with emergency operators to assess occupant condition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 relative min-h-[400px]">
              <Image
                src="/safety/emergency-response.png"
                alt="Skywell ET5 Emergency Response System"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Safety Testing Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center p-10 rounded-xl mb-8 ${
            isDark ? "bg-neutral-800" : "bg-white"
          }`}
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
            Extensively Tested. Proven Safe.
          </h3>
          
          <p className={`max-w-3xl mx-auto mb-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Before reaching customers, the Skywell ET5 undergoes over 1,000 rigorous safety tests and simulations, 
            exceeding regulatory requirements to ensure exceptional protection in real-world scenarios.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>100+</div>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Crash Tests</p>
            </div>
            
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>500+</div>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Digital Simulations</p>
            </div>
            
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>250+</div>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Battery Safety Tests</p>
            </div>
            
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}>150+</div>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>ADAS Scenarios</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 