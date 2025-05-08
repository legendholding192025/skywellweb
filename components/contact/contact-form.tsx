"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, AlertCircle } from "lucide-react"

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
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      if (data.success) {
        setShowSuccess(true)
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you soon.",
          variant: "default",
          duration: 5000,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          enquiryType: "general"
        })

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className={`p-4 rounded-lg ${isDark ? "bg-green-900/50" : "bg-green-50"} flex items-center space-x-2`}>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className={`text-sm ${isDark ? "text-green-100" : "text-green-800"}`}>
            Your message has been sent successfully! We'll contact you soon.
          </span>
        </div>
      )}

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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                Enquiry Type *
              </label>
              <Select
                value={formData.enquiryType}
                onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className={`w-full bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white transition-all duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Sending...</span>
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          <p className={`text-sm text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            * Required fields
          </p>
        </div>
      </form>
    </div>
  )
} 