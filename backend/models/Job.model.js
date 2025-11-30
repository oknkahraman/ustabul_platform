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
  category: {
    type: String,
    required: [true, 'Kategori gereklidir']
  },
  skills: [{
    type: String,
    trim: true
  }],
  budget: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'negotiable'],
      default: 'fixed'
    },
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'TRY'
    }
  },
  duration: {
    type: String,
    enum: ['1-3 gün', '1 hafta', '1-2 hafta', '1 ay', '1-3 ay', '3+ ay']
  },
  location: {
    type: {
      type: String,
      enum: ['onsite', 'remote', 'hybrid'],
      default: 'onsite'
    },
    address: {
      street: String,
      city: String,
      district: String
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startDate: {
    type: Date
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'very_urgent'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'in_progress', 'completed', 'cancelled', 'closed'],
    default: 'draft'
  },
  requirements: {
    experience: String,
    certifications: [String],
    equipment: [String]
  },
  images: [{
    type: String
  }],
  applicationsCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  selectedWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  completionDate: {
    type: Date
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
jobSchema?.index({ employerId: 1 });
jobSchema?.index({ status: 1 });
jobSchema?.index({ category: 1 });
jobSchema?.index({ 'location.coordinates': '2dsphere' });
jobSchema?.index({ createdAt: -1 });
jobSchema?.index({ publishedAt: -1 });

module.exports = mongoose?.model('Job', jobSchema);