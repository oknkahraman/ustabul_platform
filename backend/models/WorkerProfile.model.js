const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  skills: [{
    type: String,
    required: true
  }],
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-10', '10+'],
    default: '0-1'
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
    neighborhood: String
  },
  preferences: {
    isAnonymous: {
      type: Boolean,
      default: false
    },
    notificationSettings: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      newJobAlerts: {
        type: Boolean,
        default: true
      }
    }
  },
  hourlyRate: Number,
  availability: {
    type: String,
    enum: ['available', 'busy', 'not_available'],
    default: 'available'
  },
  completedJobs: {
    type: Number,
    default: 0
  },
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
  }
}, {
  timestamps: true
});

workerProfileSchema?.index({ userId: 1 });
workerProfileSchema?.index({ 'location.city': 1, 'location.district': 1 });
workerProfileSchema?.index({ skills: 1 });

module.exports = mongoose?.model('WorkerProfile', workerProfileSchema);