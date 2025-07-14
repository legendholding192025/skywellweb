"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
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
import Image from "next/image"

type FormData = {
  name: string
  email: string
  phone: string
  countryCode: string
  date: Date
  time: string
  additionalInfo: string
  vehicleInterest: string
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

const vehicleOptions = [
  { id: "et5", name: "Skywell ET5", description: "Electric SUV" },
]

// API constants - same as test-drive
const DEALERSHIP_ID = "6807da3c6c9a35dad0d98355"
const COMPANY_CODE = "Skywell"
const COMPANY_ID = "Skywell-01"
const DEFAULT_CAMPAIGN = "Direct Website"
// Use the dedicated quote API endpoint
const API_ENDPOINT = "/api/submit-quote"

export function GetQuoteForm() {
  const { resolvedTheme } = useTheme()
  // Use state for isDark to avoid hydration mismatch
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSimulated, setIsSimulated] = useState(false)
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
      additionalInfo: "",
      vehicleInterest: "et5",
    },
  })

  const selectedVehicle = watch("vehicleInterest");

  // Update form value when date changes
  useEffect(() => {
    if (selectedDate && isMounted) {
      setValue("date", selectedDate)
    }
  }, [selectedDate, setValue, isMounted])

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
      
      // Format vehicle interest
      const vehicleInfo = vehicleOptions.find(vehicle => vehicle.id === data.vehicleInterest);
      const vehicleName = vehicleInfo?.name || data.vehicleInterest;
      
      // Format additional information without newlines for header compatibility
      const additionalInfo = data.additionalInfo.trim()
      const utmInfo = `Vehicle: ${vehicleName} UTM Source: ${utmSource} UTM Medium: ${utmMedium} UTM Campaign: ${utmCampaign} UTM Content: ${utmContent}`.trim()
      
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
        'LeadSourceId': utmSource || "Website",  // Required
        'CompanyID': COMPANY_ID,                 // Required
        'CustomerName': data.name,               // Required
        'MobileNumber': fullMobileNumber,        // Required
        'CarModal': vehicleName,                 // Required - API uses "CarModal", not "CarModel"
        'Location': "Website Quote Request",
        'CampaignName': utmCampaign || DEFAULT_CAMPAIGN,
        'Email': data.email,
        'Date': formattedDate,
        'AdditionalInformation': combinedAdditionalInfo,
        'Time': formattedTime,
        'CompanyCode': COMPANY_CODE,             // Required
        'DearlerShipId': DEALERSHIP_ID,          // Required - Using the exact spelling from API docs (with typo)
        'DealerShipId': DEALERSHIP_ID            // Also include the correct spelling just in case
      }

      console.log("Sending quote API request with payload:", payload)
      
      // Send to our dedicated quote API endpoint
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

      // Check if this was a simulated response
      if (responseData.simulated) {
        console.log("Received simulated successful response:", responseData);
        setIsSimulated(true);
      } else {
        console.log("Received actual API success response:", responseData);
        setIsSimulated(false);
      }
      
      // Form was successfully submitted
      setIsLoading(false)
      setIsSubmitted(true)
      
      reset()
      setSelectedDate(addDays(new Date(), 1))

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setIsSimulated(false)
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
            <h3 className="text-2xl font-bold mb-4">Quote Request Submitted!</h3>
            <p className="text-lg mb-2">
              Thank you for your interest in Skywell. Our team will prepare a personalized quote and contact you at your preferred time.
            </p>
            {isSimulated && (
              <p className="text-sm opacity-70 mt-2">
                (Note: Your request has been saved locally due to temporary API limitations)
              </p>
            )}
            <Button onClick={() => setIsSubmitted(false)} className="bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white mt-4">
              Submit Another Request
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
                    <p className="text-red-700 dark:text-red-300 font-medium">Error submitting your quote request</p>
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

              {/* Vehicle Interest Field */}
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <div
                  className={`p-4 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">Skywell ET5</h4>
                      <p className="text-sm opacity-70">Electric SUV</p>
                    </div>
                    <div className="w-24 h-16 relative">
                      <Image src="https://cdn.legendholding.com/images/cdn_68749cd46b0695.08392751_20250714_055948.png" alt="Skywell ET5" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Field with Calendar */}
              <div className="space-y-2">
                <Label htmlFor="date" className={errors.date ? "text-red-500" : ""}>
                  Preferred Contact Date*
                </Label>
                <SimpleDatePicker date={selectedDate} setDate={setSelectedDate} error={!!errors.date} />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
              </div>

              {/* Time Field */}
              <div className="space-y-2">
                <Label htmlFor="time" className={errors.time ? "text-red-500" : ""}>
                  Preferred Contact Time*
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
                <Label htmlFor="additionalInfo">Additional Requirements (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Please share any specific requirements or questions about pricing, financing options, etc."
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
                  "Request a Quote"
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Right Side Information */}
      <div className={`rounded-xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-lg h-fit`}>
        <h3 className="text-xl font-bold mb-6">Quote Information</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">What to Expect</h4>
            <p className="text-sm opacity-80">
              Our team will review your request and prepare a customized quote based on your preferences and requirements.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">The Skywell Advantage</h4>
            <ul className="text-sm opacity-80 space-y-1">
              <li>• Competitive pricing with flexible financing options</li>
              <li>• Complete vehicle customization options</li>
              <li>• Extended warranty packages available</li>
              <li>• Comprehensive after-sales support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#4a9cd6] mb-2">Available Models</h4>
            <div className="space-y-3">
              {vehicleOptions.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-[#4a9cd6] mr-2 ${selectedVehicle === vehicle.id ? "opacity-100" : "opacity-50"}`}></div>
                  <div>
                    <p className="text-sm font-medium">{vehicle.name}</p>
                    <p className="text-xs opacity-70">{vehicle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm opacity-80">
              Need assistance? Contact us at:
              <br />
              <a href="tel:+97142219958" className="text-[#4a9cd6] hover:underline">
                +971 4 221 9958
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