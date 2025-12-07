const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  skills: [{
    mainCategory: {
      type: String,
      required: true,
      enum: ['METAL İŞLERİ', 'ELEKTRİK', 'TESİSAT']
    },
    subCategory: {
      type: String,
      required: true
      // Examples: 'KAYNAK', 'ABKANT BÜKÜM', 'PANO MONTAJI', etc.
    },
    details: [{
      type: {
        type: String
        // Examples: 'MİG-MAG', 'CNC TORNA', 'PLC', etc.
      },
      options: [{
        type: String
        // Examples: ['Alüminyum', 'Çelik'], ['2 Eksen', '3 Eksen'], etc.
      }],
      other: String // For "Diğer" manual input
    }]
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
workerProfileSchema?.index({ 'skills.mainCategory': 1 });
workerProfileSchema?.index({ 'skills.subCategory': 1 });
workerProfileSchema?.index({ 'skills.details.type': 1 });

module.exports = mongoose?.model('WorkerProfile', workerProfileSchema);