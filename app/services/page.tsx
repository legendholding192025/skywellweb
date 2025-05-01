"use client"

import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CountryPhoneSelect } from "@/components/common/country-phone-select"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { ScrollPopup } from "@/components/common/ScrollPopup"
import { 
  Clock, 
  Check, 
  AlertCircle, 
  Loader2, 
  Calendar, 
  Wrench, 
  MapPin,
  Settings,
  AlertTriangle,
  Phone,
  Mail,
  User,
  Car,
  MessageSquare
} from "lucide-react"

const serviceCenter = {
  id: "rasalkhor",
  name: "Ras Al Khor Service Center",
  address: "Ras Al Khor Industrial Area, Dubai, UAE",
  phone: "+971 4 234 5678",
  email: "service@skywell-uae.com",
  hours: "Mon-Sat: 8:00 AM - 8:00 PM"
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM"
]

const serviceTypes = [
  { id: "regular-maintenance", name: "Regular Maintenance", description: "Scheduled maintenance service" },
  { id: "diagnostic", name: "Diagnostic Service", description: "Vehicle inspection and diagnostics" },
  { id: "repair", name: "Repair Service", description: "Vehicle repairs and fixes" },
  { id: "battery", name: "Battery Service", description: "EV battery maintenance and check" }
]

type FormData = {
  name: string
  email: string
  phone: string
  countryCode: string
  date: Date
  time: string
  serviceType: string
  vehicleModel: string
  additionalInfo: string
}

export default function ServicesPage() {
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      countryCode: "+971",
      serviceType: ""
    }
  })

  // Initialize the component after mount to avoid hydration errors
  useEffect(() => {
    setIsMounted(true)
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  // Update isDark when theme changes, but only after mounted
  useEffect(() => {
    if (isMounted) {
      setIsDark(resolvedTheme === "dark")
    }
  }, [resolvedTheme, isMounted])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Service booking data:", data)
      setIsLoading(false)
      setIsSubmitted(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsLoading(false)
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    }
  }

  // If not mounted yet, return loading spinner
  if (!isMounted || isDark === null) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#4a9cd6] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4 md:text-4xl">Book Your Service</h1>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Schedule a service appointment for your Skywell vehicle with our expert technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-8 rounded-xl ${isDark ? "bg-[#4a9cd620]" : "bg-[#4a9cd610]"} text-center`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4a9cd6] mb-6">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Service Appointment Scheduled!</h3>
                  <p className="text-lg mb-2">
                    Thank you for scheduling a service appointment with Skywell. We'll contact you shortly to confirm your booking.
                  </p>
                  <p className="text-md mb-6 opacity-80">
                    Location: Ras Al Khor Service Center, Dubai
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white">
                    Schedule Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-8 rounded-xl ${isDark ? "bg-gray-900" : "bg-white"} shadow-lg`}
                >
                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-700 dark:text-red-300 font-medium">Error submitting your booking</p>
                          <p className="text-red-600 dark:text-red-200 text-sm">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
                        Full Name*
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className={`${errors.name ? "border-red-500" : ""} ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
                        Email Address*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className={`${errors.email ? "border-red-500" : ""} ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Phone Field with Country Code */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
                        Phone Number*
                      </Label>
                      <div className="flex">
                        <Controller
                          name="countryCode"
                          control={control}
                          render={({ field }) => (
                            <CountryPhoneSelect 
                              value={field.value} 
                              onChange={field.onChange}
                              error={!!errors.countryCode}
                              className="mr-2"
                            />
                          )}
                        />
                        <Input
                          id="phone"
                          placeholder="Phone number"
                          className={`flex-1 ${errors.phone ? "border-red-500" : ""} ${
                            isDark ? "bg-gray-800" : "bg-gray-50"
                          }`}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{7,15}$/,
                              message: "Please enter a valid phone number",
                            },
                          })}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Vehicle Model Field */}
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel" className={errors.vehicleModel ? "text-red-500" : ""}>
                        Vehicle Model*
                      </Label>
                      <Input
                        id="vehicleModel"
                        placeholder="e.g., Skywell ET5"
                        className={`${errors.vehicleModel ? "border-red-500" : ""} ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                        {...register("vehicleModel", { required: "Vehicle model is required" })}
                      />
                      {errors.vehicleModel && <p className="text-red-500 text-sm">{errors.vehicleModel.message}</p>}
                    </div>

                    {/* Service Type Selection */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="serviceType" className={errors.serviceType ? "text-red-500" : ""}>
                        Service Type*
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceTypes.map((service) => (
                          <div
                            key={service.id}
                            className={`p-4 rounded-lg border cursor-pointer ${
                              watch("serviceType") === service.id
                                ? `border-[#4a9cd6] ${isDark ? "bg-[#4a9cd615]" : "bg-[#4a9cd610]"}`
                                : `${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`
                            }`}
                            onClick={() => setValue("serviceType", service.id)}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={service.id}
                                value={service.id}
                                className="hidden"
                                {...register("serviceType", { required: "Service type is required" })}
                              />
                              <label htmlFor={service.id} className="flex items-center cursor-pointer w-full">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                                    watch("serviceType") === service.id
                                      ? "border-[#4a9cd6]"
                                      : isDark
                                      ? "border-gray-400"
                                      : "border-gray-500"
                                  }`}
                                >
                                  {watch("serviceType") === service.id && (
                                    <div className="w-3 h-3 rounded-full bg-[#4a9cd6]"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{service.name}</h4>
                                  <p className="text-sm opacity-70">{service.description}</p>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
                    </div>

                    {/* Date and Time Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className={errors.date ? "text-red-500" : ""}>
                        Preferred Date*
                      </Label>
                      <Controller
                        name="date"
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                          <Input
                            type="date"
                            className={`${errors.date ? "border-red-500" : ""} ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                            min={new Date().toISOString().split('T')[0]}
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        )}
                      />
                      {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className={errors.time ? "text-red-500" : ""}>
                        Preferred Time*
                      </Label>
                      <Controller
                        name="time"
                        control={control}
                        rules={{ required: "Time is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className={`w-full ${errors.time ? "border-red-500" : ""} ${
                                isDark ? "bg-gray-800" : "bg-gray-50"
                              }`}
                            >
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className={isDark ? "bg-gray-800" : "bg-white"}>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    {time}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any specific requirements or questions..."
                        className={`min-h-[100px] ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                        {...register("additionalInfo")}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white py-6 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Processing...
                        </div>
                      ) : (
                        "Schedule Service"
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Right Side Information */}
            <div className={`rounded-xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-lg h-fit`}>
              <h3 className="text-xl font-bold mb-6">Service Center Information</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-[#4a9cd6] mb-2">What to Bring</h4>
                  <ul className="text-sm opacity-80 space-y-1">
                    <li>• Vehicle registration card</li>
                    <li>• Valid ID/driving license</li>
                    <li>• Service history (if available)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#4a9cd6] mb-2">Location</h4>
                  <div className="space-y-2 text-sm opacity-80">
                    <p className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      {serviceCenter.address}
                    </p>
                    <p className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      {serviceCenter.hours}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm opacity-80">
                    Need assistance? Contact us at:
                    <br />
                    <a href={`tel:${serviceCenter.phone}`} className="text-[#4a9cd6] hover:underline">
                      {serviceCenter.phone}
                    </a>
                    {" "}or{" "}
                    <a href={`mailto:${serviceCenter.email}`} className="text-[#4a9cd6] hover:underline">
                      {serviceCenter.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollPopup />
    </div>
  )
} 