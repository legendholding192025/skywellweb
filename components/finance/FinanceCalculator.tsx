"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function FinanceCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(50000)
  const [downPayment, setDownPayment] = useState(10000)
  const [loanTerm, setLoanTerm] = useState(60) // months
  const [interestRate, setInterestRate] = useState(5.99)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  useEffect(() => {
    calculateMonthlyPayment()
  }, [vehiclePrice, downPayment, loanTerm, interestRate])

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = (interestRate / 100) / 12
    const numberOfPayments = loanTerm

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(payment)
    } else {
      setMonthlyPayment(0)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finance Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Vehicle Price: {formatCurrency(vehiclePrice)}</Label>
              <Slider
                value={[vehiclePrice]}
                onValueChange={(value) => setVehiclePrice(value[0])}
                max={150000}
                min={10000}
                step={1000}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Down Payment: {formatCurrency(downPayment)}</Label>
              <Slider
                value={[downPayment]}
                onValueChange={(value) => setDownPayment(value[0])}
                max={vehiclePrice * 0.5}
                min={0}
                step={500}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Loan Term: {loanTerm} months</Label>
              <Slider
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                max={84}
                min={12}
                step={12}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Interest Rate: {interestRate}%</Label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={20}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle Price:</span>
                  <span className="font-medium">{formatCurrency(vehiclePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Down Payment:</span>
                  <span className="font-medium">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-medium">{formatCurrency(vehiclePrice - downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Term:</span>
                  <span className="font-medium">{loanTerm} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Monthly Payment:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(monthlyPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply for Financing
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 