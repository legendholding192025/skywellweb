import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, Send, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    className="h-4 w-4"
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.012 2zm-.004 2c2.295 0 4.446.894 6.062 2.51a8.491 8.491 0 012.51 6.062c-.001 4.723-3.846 8.568-8.57 8.568a8.57 8.57 0 01-4.097-1.04l-.722-.399-.767.18-2.104.495.517-1.932.203-.757-.423-.739a8.495 8.495 0 01-1.14-4.276c0-4.723 3.845-8.568 8.569-8.568zm-3.325 4.408c-.19 0-.398.042-.624.233-.226.19-.855.817-.855 2.004 0 1.186.875 2.34.994 2.498.119.159 1.627 2.576 4.02 3.51 1.99.774 2.392.62 2.825.582.432-.04 1.392-.557 1.587-1.097.196-.541.196-.992.138-1.09-.058-.098-.218-.157-.456-.275-.238-.119-1.392-.675-1.608-.752-.217-.079-.374-.119-.53.118-.159.238-.614.753-.752.91-.139.156-.277.176-.515.058-.237-.118-1.002-.362-1.91-1.157-.707-.617-1.184-1.38-1.322-1.617-.138-.238-.016-.367.104-.486.106-.106.237-.275.356-.413.118-.137.158-.236.237-.394.08-.157.04-.295-.02-.413-.058-.119-.507-1.254-.715-1.715-.174-.384-.354-.394-.53-.401-.137-.007-.296-.007-.454-.007z" />
  </svg>
)

export const ScrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [imageError, setImageError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    // Check if popup has been shown before
    const hasShownPopup = localStorage.getItem('hasShownPopup')
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Set flag in localStorage
        localStorage.setItem('hasShownPopup', 'true')
        // Reset flag after 24 hours
        setTimeout(() => {
          localStorage.removeItem('hasShownPopup')
        }, 24 * 60 * 60 * 1000)
      }, 20000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Reset form
      formRef.current?.reset()
      setShowForm(false)
      // You can add actual form submission logic here
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/+971542457866', '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-[9999]"
        >
          <div className={`rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white'
          } overflow-hidden backdrop-blur-sm`}>
            {showForm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 w-[380px]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Quick Enquiry</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {!imageError ? (
                  <div className="mb-4 relative w-full h-[200px] rounded-lg overflow-hidden">
                    <Image
                      src="https://skywell-ev.ae/images/skywell/et5-banner.jpg"
                      alt="Skywell Vehicle"
                      fill
                      className="object-cover"
                      unoptimized
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : null}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      required
                      className={isDark ? 'bg-gray-800' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className={isDark ? 'bg-gray-800' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      required
                      pattern="[0-9+]{8,}"
                      className={isDark ? 'bg-gray-800' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      required
                      className={`min-h-[100px] ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <div className="p-4">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowForm(true)}
                    className="flex-1 bg-[#4a9cd6] hover:bg-[#3a8cc6] text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enquiry
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    className="flex-1 bg-[#25D366] hover:bg-[#20BD5C] text-white"
                  >
                    <WhatsAppIcon />
                    <span className="ml-2">WhatsApp</span>
                  </Button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 