import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  enquiryType: {
    type: String,
    required: true,
    enum: ['general', 'sales', 'service', 'test-drive', 'corporate'],
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'in-progress', 'completed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema); 