"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import { addDays, format } from "date-fns"
import { Clock, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SimpleDatePicker } from "@/components/common/simple-date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CountryPhoneSelect } from "@/components/common/country-phone-select"
import { useSearchParams } from "next/navigation"

type FormData = {
  name: string
  email: string
  phone: string
  countryCode: string
  date: Date
  time: string
  model: string
  location: string
  additionalInfo: string
  campaignName: string
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
  "7:00 PM",
  "8:00 PM",
]

const locations = [
  { id: "dubai", name: "Dubai Showroom", address: "Sheikh Zayed Road, Dubai, UAE" },
  { id: "abudhabi", name: "Abu Dhabi Showroom", address: "Corniche Road, Abu Dhabi, UAE" },
]

// API constants
const DEALERSHIP_ID = "6807da3c6c9a35dad0d98355"
const COMPANY_CODE = "Skywell"
const COMPANY_ID = "Skywell-01"
const DEFAULT_CAMPAIGN = "Direct Website"
// Use our proxy API route instead of calling the external API directly
const API_ENDPOINT = "/api/submit-test-drive"

export function TestDriveForm() {
  const { resolvedTheme } = useTheme()
  // Use a state variable for isDark to prevent hydration mismatch
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Get UTM parameters from URL
  const searchParams = useSearchParams()
  const utmSource = searchParams?.get('utm_source') || ''
  const utmMedium = searchParams?.get('utm_medium') || ''
  const utmCampaign = searchParams?.get('utm_campaign') || ''
  const utmContent = searchParams?.get('utm_content') || ''

  // Initialize the component after mount to avoid hydration errors
  useEffect(() => {
    setIsMounted(true)
    
    // Only set the date and theme on the client side after mounting
    if (typeof window !== 'undefined') {
      setSelectedDate(addDays(new Date(), 1))
      setIsDark(resolvedTheme === "dark")
    }
  }, [resolvedTheme])

  // Update isDark when theme changes, but only after mounted
  useEffect(() => {
    if (isMounted) {
      setIsDark(resolvedTheme === "dark")
    }
  }, [resolvedTheme, isMounted])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      countryCode: "+971",
      date: undefined, // Initialize as undefined to prevent hydration mismatch
      time: "10:00 AM",
      model: "Skywell ET5",
      location: "dubai",
      additionalInfo: "",
      campaignName: DEFAULT_CAMPAIGN,
    },
  })

  const selectedLocation = watch("location");
  const campaignName = watch("campaignName");

  // Update form value when date changes
  useEffect(() => {
    if (selectedDate && isMounted) {
      setValue("date", selectedDate)
    }
  }, [selectedDate, setValue, isMounted])

  // Set UTM campaign name if available
  useEffect(() => {
    if (utmCampaign && isMounted) {
      setValue("campaignName", utmCampaign)
    }
  }, [utmCampaign, setValue, isMounted])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Format date for API - needs to be in YYYY-MM-DD format
      const formattedDate = data.date ? format(data.date, 'yyyy-MM-dd') : ''
      
      // Format time from "9:00 AM" format to "HH:MM:SS" 24-hour format
      let formattedTime = data.time;
      if (data.time) {
        const timeParts = data.time.split(' ')
        const hourMinute = timeParts[0].split(':')
        let hour = parseInt(hourMinute[0])
        const minute = hourMinute[1]
        
        // Convert to 24-hour format for the API
        if (timeParts[1] === 'PM' && hour !== 12) {
          hour += 12
        } else if (timeParts[1] === 'AM' && hour === 12) {
          hour = 0
        }
        
        formattedTime = `${String(hour).padStart(2, '0')}:${minute}:00`
      }
      
      // Format additional information without newlines for header compatibility
      const additionalInfo = data.additionalInfo.trim()
      const utmInfo = `Time: ${data.time} UTM Source: ${utmSource} UTM Medium: ${utmMedium} UTM Campaign: ${utmCampaign} UTM Content: ${utmContent}`.trim()
      
      // Combine all additional info into one line
      const combinedAdditionalInfo = additionalInfo 
        ? `${additionalInfo} - ${utmInfo}`
        : utmInfo
      
      // Ensure phone number is properly formatted
      // First normalize the country code (ensure it starts with +)
      const normalizedCountryCode = data.countryCode.startsWith('+') 
        ? data.countryCode 
        : `+${data.countryCode.replace(/^\+/, '')}`;
      
      // Remove any spaces or non-digit characters from phone
      const normalizedPhone = data.phone.replace(/\s+/g, '');
      
      // Create the full mobile number by combining them
      const fullMobileNumber = `${normalizedCountryCode}${normalizedPhone}`;
      
      // Create payload with exact parameter names from API documentation
      const payload = {
        'LeadSourceId': utmSource || "Website", // Required
        'CompanyID': COMPANY_ID,                // Required
        'CustomerName': data.name,              // Required
        'MobileNumber': fullMobileNumber,       // Required
        'CarModal': data.model,                 // Required - API uses "CarModal", not "CarModel"
        'Location': locations.find(loc => loc.id === data.location)?.name || data.location,
        'CampaignName': data.campaignName || DEFAULT_CAMPAIGN,
        'Email': data.email,
        'Date': formattedDate,
        'AdditionalInformation': combinedAdditionalInfo,
        'Time': formattedTime,
        'CompanyCode': COMPANY_CODE,            // Required
        'DearlerShipId': DEALERSHIP_ID,         // Required - Using the exact spelling from API docs (with typo)
        'DealerShipId': DEALERSHIP_ID           // Also include the correct spelling just in case
      }

      console.log("Sending API request with payload:", payload)
      
      // Send to our proxy API endpoint
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      // Parse response
      let responseData;
      try {
        responseData = await response.json();
        console.log("API Response data:", responseData);
      } catch (e) {
        // If not JSON, get text
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        responseData = { error: "Invalid response format", raw: textResponse };
      }

      if (!response.ok) {
        const errorMsg = responseData?.error || `Error ${response.status}: ${response.statusText}`;
        console.error("API error response:", responseData);
        throw new Error(errorMsg);
      }
      
      // Form was successfully submitted
      console.log("Test drive booking successful");
      setIsLoading(false)
      setIsSubmitted(true)
      
      reset()
      setSelectedDate(addDays(new Date(), 1))

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

  // If not mounted yet, return empty div to avoid hydration issues
  if (!isMounted || isDark === null) {
    return <div className="min-h-[300px] flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-2 border-[#4a9cd6] border-t-transparent rounded-full"></div>
    </div>
  }

  return (
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
            <h3 className="text-2xl font-bold mb-4">Test Drive Scheduled!</h3>
            <p className="text-lg mb-2">
              Thank you for scheduling a test drive with Skywell. We'll contact you shortly to confirm your appointment.
            </p>
            <p className="text-md mb-6 opacity-80">
              Location: {selectedLocation === "dubai" ? "Dubai Showroom, Sheikh Zayed Road" : "Abu Dhabi Showroom, Corniche Road"}
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

              {/* Date Field with Calendar */}
              <div className="space-y-2">
                <Label htmlFor="date" className={errors.date ? "text-red-500" : ""}>
                  Preferred Date*
                </Label>
                <SimpleDatePicker date={selectedDate} setDate={setSelectedDate} error={!!errors.date} />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
              </div>

              {/* Time Field */}
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

              {/* Model Selection */}
              <div className="space-y-2 md:col-span-2">
                <Label>Model</Label>
                <div
                  className={`p-4 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">Skywell ET5</h4>
                      <p className="text-sm opacity-70">Electric SUV with 450km range</p>
                    </div>
                    <div className="w-24 h-16 relative">
                      <Image src="/sleek-electric-vehicle.png" alt="Skywell ET5" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>
                  Test Drive Location*
                </Label>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-4 rounded-lg border cursor-pointer ${
                        selectedLocation === location.id
                          ? `border-[#4a9cd6] ${isDark ? "bg-[#4a9cd615]" : "bg-[#4a9cd610]"}`
                          : `${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`
                      }`}
                      onClick={() => setValue("location", location.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={location.id}
                          value={location.id}
                          className="hidden"
                          {...register("location", { required: "Location is required" })}
                        />
                        <label htmlFor={location.id} className="flex items-center cursor-pointer w-full">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                              selectedLocation === location.id
                                ? "border-[#4a9cd6]"
                                : isDark
                                ? "border-gray-400"
                                : "border-gray-500"
                            }`}
                          >
                            {selectedLocation === location.id && <div className="w-3 h-3 rounded-full bg-[#4a9cd6]"></div>}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{location.name}</h4>
                            <p className="text-sm opacity-70">{location.address}</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
              </div>

              {/* Hidden Campaign Name */}
              <input 
                type="hidden" 
                {...register("campaignName")} 
              />

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
                  "Schedule Test Drive"
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Right Side Information */}
      <div className={`rounded-xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-lg h-fit`}>
        <h3 className="text-xl font-bold mb-6">Test Drive Information</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">What to Expect</h4>
            <p className="text-sm opacity-80">
              Your test drive will last approximately 30-45 minutes, giving you ample time to experience the performance
              and features of the Skywell ET5.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">What to Bring</h4>
            <ul className="text-sm opacity-80 space-y-1">
              <li>• Valid driver's license</li>
              <li>• Proof of insurance</li>
              <li>• Confirmation email</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">Location</h4>
            <p className="text-sm opacity-80">
              {selectedLocation === "dubai" ? (
                <>
                  Skywell Showroom<br />
                  Showroom S02, Al Khoory Sky Garden,<br />
                  Al Maktoum Road, Port Saeed,<br />
                  Deira, Dubai, UAE
                </>
              ) : (
                <>
                  Skywell Motors<br />
                  Corniche Road<br />
                  Abu Dhabi, United Arab Emirates
                </>
              )}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm opacity-80">
              Need assistance? Contact us at:
              <br />
              <a href="tel:+97142345678" className="text-[#4a9cd6] hover:underline">
                +971 4 234 5678
              </a>{" "}
              or{" "}
              <a href="mailto:skywell@legendmotorsuae.com" className="text-[#4a9cd6] hover:underline">
                skywell@legendmotorsuae.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}