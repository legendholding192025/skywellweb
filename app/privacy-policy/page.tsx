import { Metadata } from "next"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Skywell Electric Vehicles UAE",
  description: "Learn about how Skywell Electric Vehicles UAE handles your personal information and uses cookies to enhance your browsing experience.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="container py-16 px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 md:text-4xl">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                Legend Motors, the exclusive distributor for Skywell electric vehicles in Dubai, UAE ("we," "our," or "us"), 
                respects your privacy and is committed to protecting your personal information. This privacy policy explains 
                how we collect, use, and safeguard your data when you visit our website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Enquiry details and preferences</li>
                <li>Test drive booking information</li>
                <li>Vehicle quote requests</li>
              </ul>
              <p>
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Use of Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience on our website. 
                Cookies are small text files that are stored on your device when you visit our website.
              </p>
              <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly, including navigation and access to secure areas.
                </li>
                <li>
                  <strong>Analytical Cookies:</strong> Help us understand how visitors interact with our website through anonymous data collection.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences and choices to provide a personalized experience.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track marketing campaign effectiveness.
                </li>
              </ul>
              <p>
                You can control cookie preferences through your browser settings. However, disabling certain cookies may impact website functionality.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6">
                <li>Process your enquiries and requests</li>
                <li>Schedule test drives and provide quotes</li>
                <li>Send relevant updates and promotional materials</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                For any privacy-related questions or concerns, please contact us at:
              </p>
              <div className="mt-4">
                <p>Legend Motors</p>
                <p>Showroom S02, Al Khoory Sky Garden</p>
                <p>Al Maktoum Road, Port Saeed</p>
                <p>Deira, Dubai, UAE</p>
                <p>Email: skywell@legendmotorsuae.com</p>
                <p>Phone: +971 4 548 5633</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The latest version will always be available on our website, 
                and significant changes will be communicated appropriately.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 