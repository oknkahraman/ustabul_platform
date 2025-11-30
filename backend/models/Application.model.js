const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 1000
  },
  proposedBudget: {
    amount: Number,
    currency: {
      type: String,
      default: 'TRY'
    }
  },
  proposedDuration: {
    type: String
  },
  startDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  attachments: [{
    type: String
  }],
  employerNotes: {
    type: String
  },
  reviewedAt: {
    type: Date
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
applicationSchema?.index({ jobId: 1, workerId: 1 }, { unique: true });
applicationSchema?.index({ workerId: 1, status: 1 });
applicationSchema?.index({ employerId: 1, status: 1 });
applicationSchema?.index({ jobId: 1, status: 1 });
applicationSchema?.index({ createdAt: -1 });

module.exports = mongoose?.model('Application', applicationSchema);