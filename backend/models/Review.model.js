const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  revieweeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewerType: {
    type: String,
    enum: ['worker', 'employer'],
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Değerlendirme gereklidir'],
    min: 1,
    max: 5
  },
  aspects: {
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5
    },
    timeManagement: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  response: {
    text: String,
    createdAt: Date
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
reviewSchema?.index({ revieweeId: 1 });
reviewSchema?.index({ jobId: 1 });
reviewSchema?.index({ reviewerId: 1, revieweeId: 1, jobId: 1 }, { unique: true });
reviewSchema?.index({ createdAt: -1 });

module.exports = mongoose?.model('Review', reviewSchema);