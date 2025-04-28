"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Contact form submitted:", data);
      
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
    }
  }

  return (
    <div>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-xl ${isDark ? "bg-[#4a9cd620]" : "bg-[#4a9cd610]"} text-center`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4a9cd6] mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
          <p className="text-lg mb-6">
            Thank you for reaching out. We've received your message and will get back to you shortly.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white">
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-8 rounded-xl ${isDark ? "bg-gray-900" : "bg-white"} shadow-lg`}
        >
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

            {/* Subject Field */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subject" className={errors.subject ? "text-red-500" : ""}>
                Subject*
              </Label>
              <Input
                id="subject"
                placeholder="What is your inquiry about?"
                className={`${errors.subject ? "border-red-500" : ""} ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
            </div>

            {/* Message Field */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className={errors.message ? "text-red-500" : ""}>
                Message*
              </Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your inquiry..."
                className={`min-h-[150px] ${errors.message ? "border-red-500" : ""} ${
                  isDark ? "bg-gray-800" : "bg-gray-50"
                }`}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
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
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  )
} 