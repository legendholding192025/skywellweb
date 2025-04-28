"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "general"
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the form data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your enquiry. We'll get back to you shortly.",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        enquiryType: "general"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-lg ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>Send Us a Message</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Full Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Email Address *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Phone Number *
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
              placeholder="+971 XX XXX XXXX"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Enquiry Type *
            </label>
            <Select
              value={formData.enquiryType}
              onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
            >
              <SelectTrigger className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
                <SelectValue placeholder="Select enquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Enquiry</SelectItem>
                <SelectItem value="sales">Sales Enquiry</SelectItem>
                <SelectItem value="service">Service & Maintenance</SelectItem>
                <SelectItem value="test-drive">Test Drive Request</SelectItem>
                <SelectItem value="corporate">Corporate Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
            Subject *
          </label>
          <Input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className={isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
            Message *
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className={`min-h-[150px] ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            placeholder="Enter your message here..."
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        <p className={`text-sm text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          * Required fields
        </p>
      </div>
    </form>
  )
} 