import mongoose from "mongoose"

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

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
    validate: {
      validator: function(url: string) {
        return url.match(/\.(jpg|jpeg|png|webp)$/i)
      },
      message: "Image URL must end with .jpg, .jpeg, .png, or .webp"
    }
  }],
  termsAndConditions: {
    type: String,
    required: true,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export interface IOffer {
  _id: string
  title: string
  description: string
  images: string[]
  termsAndConditions: string
  validFrom: Date
  validUntil: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema)
export default Offer 