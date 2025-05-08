import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
  },
  // For tracking email campaigns and engagement
  lastEmailSent: {
    type: Date,
  },
  emailsSent: {
    type: Number,
    default: 0,
  },
});

// Create the model if it doesn't exist, otherwise use the existing one
const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

export default Newsletter; 