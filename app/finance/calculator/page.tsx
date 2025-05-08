import { FinanceCalculator } from "@/components/finance/FinanceCalculator"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"

export default function FinanceCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <FinanceCalculator />
      </main>
      <Footer />
    </>
  )
} 