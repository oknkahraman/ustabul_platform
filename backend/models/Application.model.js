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
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
});

applicationSchema?.index({ jobId: 1, workerId: 1 }, { unique: true });
applicationSchema?.index({ workerId: 1, status: 1 });
applicationSchema?.index({ jobId: 1, status: 1 });

module.exports = mongoose?.model('Application', applicationSchema);