import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CookieConsent } from "@/components/common/cookie-consent"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skywell - Electric Vehicles",
  description:
    "Experience the next generation of sustainable transportation with Skywell's innovative electric vehicles.",
  generator: 'v0.dev',
  icons: {
    icon: '/logo/skywell-favicon.svg',
    shortcut: '/logo/skywell-favicon.svg',
    apple: '/logo/skywell-favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  )
}
