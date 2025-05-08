import mongoose from 'mongoose';

const testDriveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  additionalInfo: String,
  campaignName: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  utmContent: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TestDrive || mongoose.model('TestDrive', testDriveSchema); 