"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, CreditCard, Calendar, Percent, Calculator, ChevronRight } from "lucide-react"

export function FinanceCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(180000)
  const [downPayment, setDownPayment] = useState(36000)
  const [loanTerm, setLoanTerm] = useState(60) // months
  const [interestRate, setInterestRate] = useState(4.5)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    calculatePayments()
  }, [vehiclePrice, downPayment, loanTerm, interestRate])

  const calculatePayments = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

      setMonthlyPayment(payment)
      setTotalInterest(payment * numberOfPayments - principal)
      setTotalCost(payment * numberOfPayments + downPayment)
    } else {
      setMonthlyPayment(principal / numberOfPayments || 0)
      setTotalInterest(0)
      setTotalCost(principal + downPayment)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void, max: number) => {
    // Remove currency formatting and non-numeric characters
    const cleanedValue = e.target.value.replace(/[^\d.]/g, "")

    // Handle empty input case
    if (cleanedValue === "" || cleanedValue === ".") {
      setter(0)
      e.target.value = ""
      return
    }

    const value = Number.parseFloat(cleanedValue)
    if (!isNaN(value) && value >= 0 && value <= max) {
      setter(value)
    }
  }

  const getDownPaymentPercentage = () => {
    return vehiclePrice > 0 ? Math.round((downPayment / vehiclePrice) * 100) : 0
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Auto Finance Calculator</h1>
        <p className="text-muted-foreground">Plan your vehicle purchase with our easy-to-use calculator</p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 bg-[#76b4e0]/10">
          <TabsTrigger
            value="calculator"
            className="text-sm sm:text-base data-[state=active]:bg-[#76b4e0] data-[state=active]:text-white"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="text-sm sm:text-base data-[state=active]:bg-[#76b4e0] data-[state=active]:text-white"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md border-t-4 border-t-[#76b4e0]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="mr-2 h-5 w-5 text-[#76b4e0]" />
                  Vehicle Details
                </CardTitle>
                <CardDescription>Adjust the details of your vehicle purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="vehicle-price" className="text-sm font-medium">
                      Vehicle Price
                    </Label>
                    <div className="relative">
                      <Input
                        id="vehicle-price"
                        value={formatCurrency(vehiclePrice)}
                        onChange={(e) => handleInputChange(e, setVehiclePrice, 1000000)}
                        onFocus={(e) => (e.target.value = vehiclePrice.toString())}
                        onBlur={(e) => (e.target.value = formatCurrency(vehiclePrice))}
                        className="w-32 text-right font-medium"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[vehiclePrice]}
                    onValueChange={(value) => setVehiclePrice(value[0])}
                    max={500000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <style jsx global>{`
                    .react-slider-track {
                      background-color: #76b4e0 !important;
                    }
                    .react-slider-thumb {
                      background-color: #76b4e0 !important;
                      border-color: #76b4e0 !important;
                    }
                  `}</style>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>AED 0</span>
                    <span>AED 500,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="down-payment" className="text-sm font-medium">
                      Down Payment{" "}
                      <span className="text-xs text-muted-foreground">({getDownPaymentPercentage()}%)</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="down-payment"
                        value={formatCurrency(downPayment)}
                        onChange={(e) => handleInputChange(e, setDownPayment, vehiclePrice)}
                        onFocus={(e) => (e.target.value = downPayment.toString())}
                        onBlur={(e) => (e.target.value = formatCurrency(downPayment))}
                        className="w-32 text-right font-medium"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    max={vehiclePrice}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <style jsx global>{`
                    .react-slider-track {
                      background-color: #76b4e0 !important;
                    }
                    .react-slider-thumb {
                      background-color: #76b4e0 !important;
                      border-color: #76b4e0 !important;
                    }
                  `}</style>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(vehiclePrice * 0.1)}</span>
                    <span>{formatCurrency(vehiclePrice * 0.8)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="loan-term" className="text-sm font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-[#76b4e0]" />
                      Loan Term
                    </Label>
                    <div className="bg-muted px-3 py-1 rounded-md font-medium">
                      {loanTerm} months ({loanTerm / 12} years)
                    </div>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={84}
                    min={12}
                    step={12}
                    className="w-full"
                  />
                  <style jsx global>{`
                    .react-slider-track {
                      background-color: #76b4e0 !important;
                    }
                    .react-slider-thumb {
                      background-color: #76b4e0 !important;
                      border-color: #76b4e0 !important;
                    }
                  `}</style>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12 months</span>
                    <span>84 months</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="interest-rate" className="text-sm font-medium flex items-center">
                      <Percent className="mr-2 h-4 w-4 text-[#76b4e0]" />
                      Interest Rate
                    </Label>
                    <div className="bg-muted px-3 py-1 rounded-md font-medium">{interestRate}%</div>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={15}
                    min={1}
                    step={0.25}
                    className="w-full"
                  />
                  <style jsx global>{`
                    .react-slider-track {
                      background-color: #76b4e0 !important;
                    }
                    .react-slider-thumb {
                      background-color: #76b4e0 !important;
                      border-color: #76b4e0 !important;
                    }
                  `}</style>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-t-4 border-t-[#76b4e0]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-[#76b4e0]" />
                  Payment Summary
                </CardTitle>
                <CardDescription>Your estimated monthly payment and total costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-[#76b4e0]/10 rounded-lg p-6 mb-6 border-2 border-[#76b4e0]/20">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-muted-foreground mb-1">Monthly Payment</h3>
                    <p className="text-4xl font-bold text-[#76b4e0]">{formatCurrency(monthlyPayment)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Vehicle Price</span>
                    <span className="font-medium">{formatCurrency(vehiclePrice)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-medium">{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-medium">{formatCurrency(vehiclePrice - downPayment)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-medium">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#76b4e0] hover:bg-[#76b4e0]/90" size="lg">
                  Apply for Financing <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <Card className="shadow-md border-t-4 border-t-[#76b4e0]">
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
              <CardDescription>Detailed view of your loan payments over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Loan Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Principal Amount:</span>
                      <span>{formatCurrency(vehiclePrice - downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Down Payment:</span>
                      <span>{formatCurrency(downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate:</span>
                      <span>{interestRate}% per annum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Term:</span>
                      <span>
                        {loanTerm} months ({loanTerm / 12} years)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Payment:</span>
                      <span className="font-medium">{formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Principal Paid:</span>
                      <span>{formatCurrency(vehiclePrice - downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest Paid:</span>
                      <span>{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount Paid:</span>
                      <span className="font-medium">{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Important Notes</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>This calculator provides estimates only and actual terms may vary.</li>
                  <li>Additional fees such as processing fees, insurance, and taxes are not included.</li>
                  <li>Interest rates are subject to change based on credit score and lender policies.</li>
                  <li>A higher down payment typically results in lower monthly payments and total interest.</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#76b4e0] hover:bg-[#76b4e0]/90" size="lg">
                Schedule a Consultation <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
