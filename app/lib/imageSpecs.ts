export interface IImageSpecs {
  width: number
  height: number
  aspectRatio: string
  maxSizeKB: number
}

export const IMAGE_SPECS: IImageSpecs = {
  width: 800,
  height: 600,
  aspectRatio: "4:3",
  maxSizeKB: 500
} 