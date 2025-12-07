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
    required: [true, 'İş kategorisi gereklidir'],
    enum: [
      'KAYNAK', 'ABKANT BÜKÜM', 'TESVİYE', 'İMALAT', 'TALAŞLI İMALAT',
      'LAZER KESİM', 'PLAZMA KESİM', 'ŞERİT TESTERE', 
      'PANO MONTAJI', 'KABLAJ', 'OTOMASYONCU', 'BAKIM ONARIM',
      'HİDROLİK', 'PNOMATİK'
    ]
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
    buildingNo: String,
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
    subCategory: {
      type: String,
      required: true
    },
    details: [{
      type: {
        type: String
      },
      options: [{
        type: String
      }],
      other: String
    }]
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'filled'],
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
jobSchema?.index({ category: 1 });
jobSchema?.index({ 'requiredSkills.subCategory': 1 });
jobSchema?.index({ createdAt: -1 });

module.exports = mongoose?.model('Job', jobSchema);