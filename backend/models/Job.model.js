const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'İş başlığı gereklidir'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'İş açıklaması gereklidir']
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
    fullAddress: String
  },
  salary: {
    min: {
      type: Number,
      required: [true, 'Minimum ücret gereklidir']
    },
    max: {
      type: Number,
      required: [true, 'Maximum ücret gereklidir']
    }
  },
  skills: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

jobSchema?.index({ employerId: 1 });
jobSchema?.index({ status: 1 });
jobSchema?.index({ 'location.city': 1, 'location.district': 1 });
jobSchema?.index({ createdAt: -1 });

module.exports = mongoose?.model('Job', jobSchema);