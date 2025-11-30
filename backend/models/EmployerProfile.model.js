const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyDetails: {
    name: {
      type: String,
      required: [true, 'Şirket adı gereklidir'],
      trim: true
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
    }
  },
  location: {
    city: {
      type: String,
      required: [true, 'Şehir gereklidir']
    },
    district: {
      type: String,
      required: [true, 'İlçe gereklidir']
    },
    neighborhood: String,
    street: String,
    buildingNo: String
  },
  industry: String,
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  },
  website: String,
  verified: {
    type: Boolean,
    default: false
  },
  jobsPosted: {
    type: Number,
    default: 0
  },
  activeJobs: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

employerProfileSchema?.index({ userId: 1 });
employerProfileSchema?.index({ 'location.city': 1, 'location.district': 1 });

module.exports = mongoose?.model('EmployerProfile', employerProfileSchema);