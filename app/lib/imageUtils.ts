export async function validateImage(url: string): Promise<{ 
  isValid: boolean
  error?: string 
}> {
  try {
    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        resolve({
          isValid: true
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

export function isValidImageUrl(url: string): boolean {
  // Check if the URL ends with common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i
  return imageExtensions.test(url)
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
} 