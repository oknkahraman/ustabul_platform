const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500
  },
  skills: [{
    category: String,
    skills: [String]
  }],
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-10', '10+'],
    default: '0-1'
  },
  hourlyRate: {
    type: Number,
    min: 0
  },
  availability: {
    type: String,
    enum: ['Tam Zamanlı', 'Yarı Zamanlı', 'Proje Bazlı', 'Uygun Değil'],
    default: 'Uygun Değil'
  },
  location: {
    city: String,
    district: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    completionDate: Date,
    category: String
  }],
  certificates: [{
    name: String,
    issuer: String,
    issueDate: Date,
    fileUrl: String
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
  completedJobs: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preferences: {
    workRadius: {
      type: Number,
      default: 50
    },
    minimumBudget: {
      type: Number,
      default: 0
    },
    preferredJobTypes: [String]
  }
}, {
  timestamps: true
});

// Index for location-based searches
workerProfileSchema?.index({ 'location.coordinates': '2dsphere' });
workerProfileSchema?.index({ userId: 1 });
workerProfileSchema?.index({ 'rating.average': -1 });

module.exports = mongoose?.model('WorkerProfile', workerProfileSchema);