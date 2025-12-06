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
  requiredSkills: [{
    category: {
      type: String,
      required: true,
      // Main categories: Kaynak, Elektrik, Tesisat, Boya, İnşaat, vb.
    },
    subcategories: [{
      type: String,
      // For Kaynak: TIG, MIG/MAG, Elektrik Kaynağı, Oksijen Kaynağı, vb.
    }]
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'closed'],
    default: 'draft'
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
jobSchema?.index({ 'requiredSkills.category': 1 });
jobSchema?.index({ 'requiredSkills.subcategories': 1 });
jobSchema?.index({ createdAt: -1 });

module.exports = mongoose?.model('Job', jobSchema);