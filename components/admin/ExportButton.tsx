"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateExcel } from "@/lib/excel"

interface ExportButtonProps {
  getData: () => Promise<any[]>
  filename: string
}

export function ExportButton({ getData, filename }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const data = await getData()
      generateExcel(data, filename)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center space-x-2"
    >
      <Download className="h-4 w-4" />
      <span>{isExporting ? "Exporting..." : "Export to Excel"}</span>
    </Button>
  )
} 