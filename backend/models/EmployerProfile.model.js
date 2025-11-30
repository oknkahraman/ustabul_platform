const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: [true, 'Şirket ünvanı gereklidir'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: null
  },
  companyDescription: {
    type: String,
    maxlength: 1000
  },
  industry: {
    type: String,
    trim: true
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  },
  address: {
    street: String,
    city: String,
    district: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  taxNumber: {
    type: String,
    required: [true, 'Vergi numarası gereklidir'],
    trim: true
  },
  taxOffice: {
    type: String,
    required: [true, 'Vergi dairesi gereklidir'],
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  socialMedia: {
    linkedin: String,
    facebook: String,
    instagram: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: String,
    fileUrl: String,
    uploadedAt: Date
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  jobsPosted: {
    type: Number,
    default: 0
  },
  activeJobs: {
    type: Number,
    default: 0
  },
  paymentReliability: {
    onTimePayments: {
      type: Number,
      default: 0
    },
    totalPayments: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for location-based searches
employerProfileSchema?.index({ 'address.coordinates': '2dsphere' });
employerProfileSchema?.index({ userId: 1 });
employerProfileSchema?.index({ verified: 1 });

module.exports = mongoose?.model('EmployerProfile', employerProfileSchema);