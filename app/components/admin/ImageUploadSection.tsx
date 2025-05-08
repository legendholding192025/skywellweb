"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define image specifications
const IMAGE_SPECS = {
  width: 800,
  height: 600,
  aspectRatio: "4:3",
  maxSizeKB: 500
} as const

interface ImageUploadSectionProps {
  imageUrls: string[]
  onAddImage: (url: string) => void
  onRemoveImage: (index: number) => void
}

export function ImageUploadSection({
  imageUrls,
  onAddImage,
  onRemoveImage,
}: ImageUploadSectionProps) {
  const [newImageUrl, setNewImageUrl] = useState("")
  const [validationError, setValidationError] = useState<string>("")

  const validateImageDimensions = (url: string): Promise<{ isValid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const img = document.createElement("img")
      
      img.onload = () => {
        const errors: string[] = []
        
        if (img.width !== IMAGE_SPECS.width) {
          errors.push(`Width must be ${IMAGE_SPECS.width}px`)
        }
        if (img.height !== IMAGE_SPECS.height) {
          errors.push(`Height must be ${IMAGE_SPECS.height}px`)
        }
        
        // Check aspect ratio
        const actualRatio = img.width / img.height
        const [targetWidth, targetHeight] = IMAGE_SPECS.aspectRatio.split(":").map(Number)
        const targetRatio = targetWidth / targetHeight
        
        if (Math.abs(actualRatio - targetRatio) > 0.01) { // Allow small deviation
          errors.push(`Aspect ratio must be ${IMAGE_SPECS.aspectRatio}`)
        }

        resolve({
          isValid: errors.length === 0,
          error: errors.length > 0 ? errors.join(", ") : undefined
        })
      }

      img.onerror = () => {
        resolve({
          isValid: false,
          error: "Failed to load image"
        })
      }

      img.src = url
    })
  }

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) return

    // Validate image URL format
    if (!newImageUrl.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setValidationError("Image URL must end with .jpg, .jpeg, .png, or .webp")
      return
    }

    // Validate image dimensions
    const validation = await validateImageDimensions(newImageUrl.trim())
    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid image dimensions")
      return
    }

    onAddImage(newImageUrl.trim())
    setNewImageUrl("")
    setValidationError("")
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <div className="space-y-1">
            <p>Required image specifications:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Width: {IMAGE_SPECS.width}px</li>
              <li>Height: {IMAGE_SPECS.height}px</li>
              <li>Aspect ratio: {IMAGE_SPECS.aspectRatio}</li>
              <li>Maximum size: {IMAGE_SPECS.maxSizeKB}KB</li>
              <li>Formats: .jpg, .jpeg, .png, .webp</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Input
          type="url"
          placeholder="Enter image URL"
          value={newImageUrl}
          onChange={(e) => {
            setNewImageUrl(e.target.value)
            setValidationError("")
          }}
        />
        <Button
          type="button"
          onClick={handleAddImage}
          variant="outline"
        >
          Add Image
        </Button>
      </div>

      {validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {imageUrls.length > 0 && (
        <div className="space-y-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2 bg-slate-50 p-2 rounded">
              <div className="relative h-12 w-12 rounded overflow-hidden">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="flex-1 truncate text-sm">{url}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 