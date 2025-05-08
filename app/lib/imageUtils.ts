import { IImageSpecs } from "@/models/Offer"

export async function validateImageDimensions(url: string, specs: IImageSpecs): Promise<{ 
  isValid: boolean
  error?: string 
}> {
  try {
    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        const errors: string[] = []
        
        if (img.width !== specs.width) {
          errors.push(`Width must be ${specs.width}px`)
        }
        if (img.height !== specs.height) {
          errors.push(`Height must be ${specs.height}px`)
        }
        
        // Check aspect ratio
        const actualRatio = img.width / img.height
        const [targetWidth, targetHeight] = specs.aspectRatio.split(":").map(Number)
        const targetRatio = targetWidth / targetHeight
        
        if (Math.abs(actualRatio - targetRatio) > 0.01) { // Allow small deviation
          errors.push(`Aspect ratio must be ${specs.aspectRatio}`)
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
  } catch (error) {
    return {
      isValid: false,
      error: "Failed to validate image"
    }
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
} 