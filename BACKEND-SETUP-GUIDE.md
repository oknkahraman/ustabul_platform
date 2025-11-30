# UstaBul Platform - Backend API Kurulum Rehberi

## Genel Bakış
Bu rehber, UstaBul platformu için Node.js + Express + MongoDB backend'ini VPS sunucunuzda kurmanıza yardımcı olacaktır.

## Gereksinimler
- Node.js v18+ (VPS'nizde kurulu)
- MongoDB v6+ (kurulu ve çalışır durumda)
- PM2 (process yönetimi için - önerilir)
- Nginx (reverse proxy için - önerilir)

## Adım 1: Backend Projesini Başlatın

```bash
# Backend dizini oluşturun
mkdir ustabul-backend
cd ustabul-backend

# Node.js projesini başlatın
npm init -y

# Bağımlılıkları yükleyin
npm install express mongoose bcryptjs jsonwebtoken cors dotenv helmet express-rate-limit
npm install -D nodemon
```

## Adım 2: Dizin Yapısını Oluşturun

```bash
mkdir -p src/models src/routes src/middleware src/controllers src/utils
touch src/server.js .env
```

## Adım 3: Ortam Değişkenleri (.env)

`.env` dosyasını oluşturun ve aşağıdaki içeriği ekleyin:

```env
# Sunucu Yapılandırması
PORT=5000
NODE_ENV=production

# MongoDB Yapılandırması
MONGODB_URI=mongodb://localhost:27017/ustabul

# JWT Yapılandırması
JWT_SECRET=gizli-anahtarinizi-buraya-yazin-production-icin-degistirin
JWT_EXPIRE=7d

# CORS Yapılandırması
CLIENT_URL=http://frontend-domain-adresiniz.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Adım 4: MongoDB Modelleri

### User Model (src/models/User.js)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['worker', 'employer'],
    required: true
  },
  companyName: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Kaydetmeden önce şifreyi hashle
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Şifre karşılaştırma metodu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Job Model (src/models/Job.js)

```javascript
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    city: String,
    district: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'TRY'
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  requirements: {
    experience: String,
    education: String,
    certifications: [String]
  },
  projectDetails: {
    duration: String,
    startDate: Date,
    workType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'temporary']
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'paused'],
    default: 'draft'
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
```

### Application Model (src/models/Application.js)

```javascript
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
    enum: ['pending', 'approved', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    trim: true
  },
  proposedSalary: {
    type: Number
  },
  availability: {
    startDate: Date,
    endDate: Date
  },
  rejectionReason: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Application', applicationSchema);
```

### Worker Profile Model (src/models/WorkerProfile.js)

```javascript
const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  skills: [{
    category: String,
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    }
  }],
  experience: {
    years: Number,
    description: String
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    expiryDate: Date,
    fileUrl: String
  }],
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    completedDate: Date,
    category: String
  }],
  location: {
    city: String,
    district: String
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  rating: {
    average: {
      type: Number,
      default: 0
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WorkerProfile', workerProfileSchema);
```

### Employer Profile Model (src/models/EmployerProfile.js)

```javascript
const mongoose = require('mongoose');

const employerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyDetails: {
    name: String,
    description: String,
    industry: String,
    size: String,
    website: String,
    logo: String,
    taxNumber: String,
    taxOffice: String
  },
  location: {
    city: String,
    district: String,
    address: String
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    documents: [{
      type: String,
      url: String
    }],
    verifiedAt: Date
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  statistics: {
    jobsPosted: {
      type: Number,
      default: 0
    },
    workersHired: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EmployerProfile', employerProfileSchema);
```

## Adım 5: Profile Controller (src/controllers/profileController.js)

```javascript
const WorkerProfile = require('../models/WorkerProfile');
const EmployerProfile = require('../models/EmployerProfile');
const User = require('../models/User');

// Worker profil güncelleme
exports.updateWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Kullanıcı rolünü kontrol et
    const user = await User.findById(userId);
    if (user.role !== 'worker') {
      return res.status(403).json({ message: 'Bu işlem sadece işçi hesapları için geçerlidir' });
    }

    // Profili güncelle veya oluştur
    let profile = await WorkerProfile.findOne({ userId });
    
    if (!profile) {
      profile = new WorkerProfile({ userId, ...req.body });
    } else {
      Object.assign(profile, req.body);
    }
    
    await profile.save();

    // Kullanıcının profil tamamlama durumunu güncelle
    user.profileCompleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      profile
    });
  } catch (error) {
    console.error('Worker profile update error:', error);
    res.status(500).json({ 
      message: 'Profil güncellenirken bir hata oluştu', 
      error: error.message 
    });
  }
};

// Employer profil güncelleme
exports.updateEmployerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Kullanıcı rolünü kontrol et
    const user = await User.findById(userId);
    if (user.role !== 'employer') {
      return res.status(403).json({ message: 'Bu işlem sadece işveren hesapları için geçerlidir' });
    }

    // Profili güncelle veya oluştur
    let profile = await EmployerProfile.findOne({ userId });
    
    if (!profile) {
      profile = new EmployerProfile({ userId, ...req.body });
    } else {
      Object.assign(profile, req.body);
    }
    
    await profile.save();

    // Kullanıcının profil tamamlama durumunu güncelle
    user.profileCompleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      profile
    });
  } catch (error) {
    console.error('Employer profile update error:', error);
    res.status(500).json({ 
      message: 'Profil güncellenirken bir hata oluştu', 
      error: error.message 
    });
  }
};

// Worker profil getirme
exports.getWorkerProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    
    const profile = await WorkerProfile.findOne({ userId })
      .populate('userId', 'fullName email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profil bulunamadı' });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Profil getirilemedi', 
      error: error.message 
    });
  }
};

// Employer profil getirme
exports.getEmployerProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    
    const profile = await EmployerProfile.findOne({ userId })
      .populate('userId', 'fullName email companyName');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profil bulunamadı' });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Profil getirilemedi', 
      error: error.message 
    });
  }
};
```

## Adım 6: Authentication Controller (src/controllers/authController.js)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const WorkerProfile = require('../models/WorkerProfile');
const EmployerProfile = require('../models/EmployerProfile');

// JWT Token oluştur
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role, companyName } = req.body;

    // Zorunlu alanları kontrol et
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({ 
        message: 'E-posta, şifre, tam ad ve rol alanları zorunludur' 
      });
    }

    // Rol bazlı alan kontrolü
    if (role === 'employer' && !companyName) {
      return res.status(400).json({ 
        message: 'İşveren hesabı için şirket adı zorunludur' 
      });
    }

    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'Bu e-posta adresi zaten kayıtlı' });
    }

    // Kullanıcı oluştur - fullName ve companyName'i doğrudan kaydet
    const user = await User.create({
      email: email.toLowerCase().trim(),
      password,
      fullName: fullName.trim(),
      role,
      companyName: role === 'employer' ? companyName.trim() : undefined
    });

    // Rol bazlı profil oluştur
    if (role === 'worker') {
      await WorkerProfile.create({ userId: user._id });
    } else {
      await EmployerProfile.create({ 
        userId: user._id,
        companyDetails: {
          name: companyName.trim()
        }
      });
    }

    // Token oluştur
    const token = generateToken(user._id);

    // Tam kullanıcı bilgilerini döndür
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyName: user.companyName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Kayıt işlemi başarısız', 
      error: error.message 
    });
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Girdi kontrolü
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'E-posta ve şifre alanları zorunludur' 
      });
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Şifre kontrolü
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Son giriş zamanını güncelle
    user.lastLogin = Date.now();
    await user.save();

    // Token oluştur
    const token = generateToken(user._id);

    // Tam kullanıcı bilgilerini döndür
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyName: user.companyName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Giriş işlemi başarısız', 
      error: error.message 
    });
  }
};

// Mevcut kullanıcıyı getir
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyName: user.companyName,
        isVerified: user.isVerified,
        profileCompleted: user.profileCompleted
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      message: 'Kullanıcı bilgileri alınamadı', 
      error: error.message 
    });
  }
};

// Çıkış
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Başarıyla çıkış yapıldı'
  });
};
```

## Adım 7: Job Controller (src/controllers/jobController.js)

```javascript
const Job = require('../models/Job');
const Application = require('../models/Application');
const EmployerProfile = require('../models/EmployerProfile');

// İş ilanı oluştur
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employerId: req.user.id
    });

    // İşveren profilindeki iş sayısını artır
    await EmployerProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { 'statistics.jobsPosted': 1 } }
    );

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ 
      message: 'İş ilanı oluşturulamadı', 
      error: error.message 
    });
  }
};

// Tüm iş ilanlarını getir
exports.getAllJobs = async (req, res) => {
  try {
    const { status, city, skills, employerId } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (city) filter['location.city'] = city;
    if (skills) filter.skills = { $in: skills.split(',') };
    if (employerId) filter.employerId = employerId;

    const jobs = await Job.find(filter)
      .populate('employerId', 'fullName companyName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'İş ilanları getirilemedi', 
      error: error.message 
    });
  }
};

// ID ile iş ilanı getir
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employerId', 'fullName companyName email');

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'İş ilanı getirilemedi', 
      error: error.message 
    });
  }
};

// İş ilanı güncelle
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    // Sahiplik kontrolü
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'İş ilanı güncellenemedi', 
      error: error.message 
    });
  }
};

// İş ilanı kapat
exports.closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    job.status = 'closed';
    await job.save();

    res.status(200).json({
      success: true,
      message: 'İş ilanı kapatıldı',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'İş ilanı kapatılamadı', 
      error: error.message 
    });
  }
};

// İş ilanı sil
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'İş ilanı silindi'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'İş ilanı silinemedi', 
      error: error.message 
    });
  }
};
```

## Adım 8: Application Controller (src/controllers/applicationController.js)

```javascript
const Application = require('../models/Application');
const Job = require('../models/Job');

// İş başvurusu yap
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Daha önce başvuru yapılmış mı kontrol et
    const existingApplication = await Application.findOne({
      jobId,
      workerId: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Bu işe zaten başvurdunuz' });
    }

    const application = await Application.create({
      jobId,
      workerId: req.user.id,
      ...req.body
    });

    // İş başvuru sayısını artır
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationCount: 1 }
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ 
      message: 'Başvuru yapılamadı', 
      error: error.message 
    });
  }
};

// İşe göre başvuruları getir
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // İşin sahibi mi kontrol et
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }
    
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }
    
    const applications = await Application.find({ jobId })
      .populate('workerId', 'fullName email')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Başvurular getirilemedi', 
      error: error.message 
    });
  }
};

// Başvuru onayla
exports.approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }
    
    // İşin sahibi mi kontrol et
    const job = await Job.findById(application.jobId);
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }
    
    application.status = 'approved';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Başvuru onaylandı',
      application
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Başvuru onaylanamadı', 
      error: error.message 
    });
  }
};

// Başvuru reddet
exports.rejectApplication = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }
    
    // İşin sahibi mi kontrol et
    const job = await Job.findById(application.jobId);
    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }
    
    application.status = 'rejected';
    application.rejectionReason = reason;
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Başvuru reddedildi',
      application
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Başvuru reddedilemedi', 
      error: error.message 
    });
  }
};

// İşçinin başvurularını getir
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ workerId: req.user.id })
      .populate('jobId', 'title location salary status')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Başvurular getirilemedi', 
      error: error.message 
    });
  }
};
```

## Adım 9: Dashboard Controller (src/controllers/dashboardController.js)

```javascript
const Job = require('../models/Job');
const Application = require('../models/Application');
const WorkerProfile = require('../models/WorkerProfile');
const EmployerProfile = require('../models/EmployerProfile');

// İşçi dashboard verilerini getir
exports.getWorkerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Profil bilgilerini al
    const profile = await WorkerProfile.findOne({ userId })
      .populate('userId', 'fullName email');

    // Başvuruları al
    const applications = await Application.find({ workerId: userId })
      .populate('jobId', 'title location salary status')
      .sort({ appliedAt: -1 })
      .limit(10);

    // İstatistikleri hesapla
    const stats = {
      totalApplications: await Application.countDocuments({ workerId: userId }),
      pendingApplications: await Application.countDocuments({ 
        workerId: userId, 
        status: 'pending' 
      }),
      approvedApplications: await Application.countDocuments({ 
        workerId: userId, 
        status: 'approved' 
      }),
      rejectedApplications: await Application.countDocuments({ 
        workerId: userId, 
        status: 'rejected' 
      })
    };

    // Mevcut aktif işleri al
    const activeJobs = await Job.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      profile,
      applications,
      stats,
      activeJobs
    });
  } catch (error) {
    console.error('Worker dashboard error:', error);
    res.status(500).json({ 
      message: 'Dashboard verileri yüklenirken hata oluştu', 
      error: error.message 
    });
  }
};

// İşveren dashboard verilerini getir
exports.getEmployerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Profil bilgilerini al
    const profile = await EmployerProfile.findOne({ userId })
      .populate('userId', 'fullName email companyName');

    // İş ilanlarını al
    const jobs = await Job.find({ employerId: userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // İstatistikleri hesapla
    const stats = {
      totalJobs: await Job.countDocuments({ employerId: userId }),
      activeJobs: await Job.countDocuments({ employerId: userId, status: 'active' }),
      closedJobs: await Job.countDocuments({ employerId: userId, status: 'closed' }),
      draftJobs: await Job.countDocuments({ employerId: userId, status: 'draft' })
    };

    // Son başvuruları al
    const jobIds = jobs.map(job => job._id);
    const recentApplications = await Application.find({ 
      jobId: { $in: jobIds } 
    })
      .populate('workerId', 'fullName email')
      .populate('jobId', 'title')
      .sort({ appliedAt: -1 })
      .limit(10);

    // Toplam başvuru sayısı
    stats.totalApplications = await Application.countDocuments({ 
      jobId: { $in: jobIds } 
    });

    res.status(200).json({
      success: true,
      profile,
      jobs,
      stats,
      recentApplications
    });
  } catch (error) {
    console.error('Employer dashboard error:', error);
    res.status(500).json({ 
      message: 'Dashboard verileri yüklenirken hata oluştu', 
      error: error.message 
    });
  }
};
```

## Adım 10: Authentication Middleware (src/middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token doğrulama middleware
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token'ı headerdan al
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Giriş yapmanız gerekiyor' });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bul
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Geçersiz token', error: error.message });
  }
};

// Rol bazlı yetkilendirme
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Bu işlemi yapmaya yetkiniz yok' 
      });
    }
    next();
  };
};
```

## Adım 11: Routes (src/routes/*.js)

### Auth Routes (src/routes/authRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
```

### Job Routes (src/routes/jobRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', protect, authorize('employer'), jobController.createJob);
router.put('/:id', protect, authorize('employer'), jobController.updateJob);
router.patch('/:id/close', protect, authorize('employer'), jobController.closeJob);
router.delete('/:id', protect, authorize('employer'), jobController.deleteJob);

module.exports = router;
```

### Application Routes (src/routes/applicationRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// İşçi rotaları
router.post('/jobs/:jobId/apply', protect, authorize('worker'), applicationController.applyForJob);
router.get('/my-applications', protect, authorize('worker'), applicationController.getMyApplications);

// İşveren rotaları
router.get('/jobs/:jobId/applications', protect, authorize('employer'), applicationController.getApplicationsByJob);
router.patch('/:id/approve', protect, authorize('employer'), applicationController.approveApplication);
router.patch('/:id/reject', protect, authorize('employer'), applicationController.rejectApplication);

module.exports = router;
```

### Profile Routes (src/routes/profileRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/auth');

// Worker profil rotaları
router.get('/worker/:userId?', protect, profileController.getWorkerProfile);
router.put('/worker', protect, authorize('worker'), profileController.updateWorkerProfile);

// Employer profil rotaları
router.get('/employer/:userId?', protect, profileController.getEmployerProfile);
router.put('/employer', protect, authorize('employer'), profileController.updateEmployerProfile);

module.exports = router;
```

### Dashboard Routes (src/routes/dashboardRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.get('/worker', protect, authorize('worker'), dashboardController.getWorkerDashboard);
router.get('/employer', protect, authorize('employer'), dashboardController.getEmployerDashboard);

module.exports = router;
```

## Adım 12: Ana Sunucu Dosyası (src/server.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Güvenlik middleware
app.use(helmet());

// CORS yapılandırması
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 dakika
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // Her IP için maksimum istek
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server çalışıyor',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'API endpoint bulunamadı' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// MongoDB bağlantısı ve sunucu başlatma
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB bağlantısı başarılı');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

// Unhandled rejection handler
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Sunucu kapatılıyor...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Sunucuyu başlat
startServer();
```

## Adım 13: Package.json Güncelleme

`package.json` dosyanıza aşağıdaki scriptleri ekleyin:

```json
{
  "name": "ustabul-backend",
  "version": "1.0.0",
  "description": "UstaBul Platform Backend API",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node src/utils/seedDatabase.js"
  },
  "keywords": ["ustabul", "backend", "api", "nodejs", "express", "mongodb"],
  "author": "Your Name",
  "license": "ISC"
}
```

## Backend'i Çalıştırma

### Geliştirme Modu
```bash
npm run dev
```

### Production Modu
```bash
npm start
```

Sunucu varsayılan olarak 5000 portunda başlayacaktır.

## Test ve Sorun Giderme

### Backend Çalışıyor mu Kontrol Edin

```bash
# Health endpoint'ini test edin
curl http://localhost:5000/health

# Beklenen çıktı:
# {"status":"OK","message":"Server çalışıyor","timestamp":"..."}
```

### Kayıt İşlemi Testi

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456",
    "fullName": "Test Kullanıcı",
    "role": "worker"
  }'
```

### Giriş İşlemi Testi

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

## Yaygın Hatalar ve Çözümleri

### 1. "Kayıt başarısız" Hatası

**Belirtiler:**
- Frontend'de genel hata mesajı
- Konsolda detaylı hata yok
- Backend yanıt vermiyor olabilir

**Çözümler:**

```bash
# Backend çalışıyor mu kontrol et
cd /path/to/backend
npm run dev

# MongoDB çalışıyor mu kontrol et
systemctl status mongod

# Backend loglarını kontrol et
# Terminal'de hata mesajlarına bakın

# Port zaten kullanımda mı kontrol et
lsof -i :5000

# Gerekirse port değiştirin (.env dosyasında PORT=5001)
```

### 2. CORS Hataları

Browser konsolunda CORS hatası görüyorsanız:

**server.js'de CORS yapılandırmasını güncelleyin:**

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-production-domain.com'
  ],
  credentials: true
}));
```

### 3. MongoDB Bağlantı Hatası

```bash
# MongoDB durumunu kontrol et
sudo systemctl status mongod

# MongoDB başlat
sudo systemctl start mongod

# Başlangıçta otomatik başlasın
sudo systemctl enable mongod

# MongoDB loglarını kontrol et
sudo tail -f /var/log/mongodb/mongod.log
```

### 4. "Port 5000 zaten kullanımda" Hatası

```bash
# Hangi process kullanıyor bul
lsof -i :5000

# Process'i kapat
kill -9 <PID>

# Veya farklı bir port kullan
# .env dosyasında: PORT=5001
```

### 5. Frontend Backend'e Bağlanamıyor

**Frontend .env dosyasını kontrol edin:**

```env
# Local development için
VITE_API_BASE_URL=http://localhost:5000/api

# Production için
VITE_API_BASE_URL=https://your-domain.com/api
```

**Browser Console'da network hatalarını kontrol edin:**

- Kırmızı network errors → Backend çalışmıyor
- 404 errors → URL yanlış
- 401/403 errors → Auth problemi
- 500 errors → Backend kod hatası

## Production Deployment (VPS)

### 1. VPS'de MongoDB Kurulumu

```bash
# MongoDB GPG key ekle
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# MongoDB repository ekle (Ubuntu 22.04 için)
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Paket listesini güncelle
sudo apt update

# MongoDB'yi yükle
sudo apt install -y mongodb-org

# MongoDB'yi başlat ve enable et
sudo systemctl start mongod
sudo systemctl enable mongod

# Durumu kontrol et
sudo systemctl status mongod
```

### 2. Node.js Backend Kurulumu

```bash
# Node.js 18.x yükle (eğer yoksa)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Proje dizinine git
cd /var/www/ustabul-backend

# Bağımlılıkları yükle
npm install --production

# PM2'yi global olarak yükle
sudo npm install -g pm2

# Backend'i PM2 ile başlat
pm2 start src/server.js --name ustabul-api

# PM2'yi kaydet ve startup script oluştur
pm2 save
pm2 startup

# Verilen komutu çalıştırın (sudo ile başlayan)
```

### 3. Nginx Reverse Proxy Kurulumu

```bash
# Nginx yükle
sudo apt install nginx

# Nginx yapılandırma dosyası oluştur
sudo nano /etc/nginx/sites-available/ustabul
```

**Nginx yapılandırması:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend (Eğer aynı sunucuda ise)
    location / {
        root /var/www/ustabul-frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Siteyi aktif et
sudo ln -s /etc/nginx/sites-available/ustabul /etc/nginx/sites-enabled/

# Nginx yapılandırmasını test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx
```

### 4. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot yükle
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Otomatik yenileme için cron job zaten kurulu
# Test etmek için:
sudo certbot renew --dry-run
```

### 5. Production Environment Variables

VPS'deki `.env` dosyasını güncelleyin:

```env
# Production ayarları
PORT=5000
NODE_ENV=production

# MongoDB (local veya cloud)
MONGODB_URI=mongodb://localhost:27017/ustabul

# Güçlü JWT secret
JWT_SECRET=your-very-strong-production-secret-key-here-min-32-chars
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=https://your-domain.com

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Monitoring ve Logs

### PM2 Komutları

```bash
# Backend loglarını görüntüle
pm2 logs ustabul-api

# Gerçek zamanlı monitoring
pm2 monit

# Process durumu
pm2 status

# Backend'i yeniden başlat
pm2 restart ustabul-api

# Backend'i durdur
pm2 stop ustabul-api

# Backend'i sil
pm2 delete ustabul-api
```

### MongoDB Logs

```bash
# MongoDB loglarını görüntüle
sudo tail -f /var/log/mongodb/mongod.log

# Son 100 satırı göster
sudo tail -n 100 /var/log/mongodb/mongod.log
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Güvenlik Kontrol Listesi

- ✅ HTTPS kullan (Let's Encrypt ile)
- ✅ Güçlü JWT_SECRET belirle (min. 32 karakter)
- ✅ Rate limiting aktif
- ✅ Helmet middleware aktif
- ✅ CORS sadece frontend domain'i için
- ✅ Şifreler bcrypt ile hashlenmiş
- ✅ Environment variables (.env) kullan
- ✅ MongoDB authentication aktif
- ✅ Regular security updates (npm audit fix)
- ✅ PM2 ile process yönetimi
- ✅ Nginx reverse proxy
- ✅ Firewall yapılandırması (UFW)

### Firewall Kurulumu (UFW)

```bash
# UFW yükle
sudo apt install ufw

# SSH, HTTP, HTTPS portlarına izin ver
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# UFW'yi aktif et
sudo ufw enable

# Durumu kontrol et
sudo ufw status
```

## Database Backup

### Otomatik Backup Script Oluşturma

```bash
# Backup dizini oluştur
sudo mkdir -p /var/backups/mongodb

# Backup script oluştur
sudo nano /usr/local/bin/mongodb-backup.sh
```

**Backup script içeriği:**

```bash
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/mongodb"
DB_NAME="ustabul"

# Backup oluştur
mongodump --db=$DB_NAME --out=$BACKUP_DIR/$TIMESTAMP

# 7 günden eski backupları sil
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR/$TIMESTAMP"
```

```bash
# Script'i çalıştırılabilir yap
sudo chmod +x /usr/local/bin/mongodb-backup.sh

# Günlük 2:00'de otomatik backup için cron job ekle
sudo crontab -e

# Aşağıdaki satırı ekle:
0 2 * * * /usr/local/bin/mongodb-backup.sh >> /var/log/mongodb-backup.log 2>&1
```

### Manuel Backup ve Restore

```bash
# Backup oluştur
mongodump --db=ustabul --out=/path/to/backup

# Restore et
mongorestore --db=ustabul /path/to/backup/ustabul
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Yeni kullanıcı kaydı

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Ahmet Yılmaz",
  "role": "worker", // or "employer"
  "companyName": "ABC İnşaat" // employer için zorunlu
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "fullName": "Ahmet Yılmaz",
    "role": "worker",
    "companyName": null
  }
}
```

#### POST /api/auth/login
Kullanıcı girişi

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "fullName": "Ahmet Yılmaz",
    "role": "worker"
  }
}
```

#### GET /api/auth/me
Mevcut kullanıcı bilgilerini getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "fullName": "Ahmet Yılmaz",
    "role": "worker",
    "profileCompleted": true
  }
}
```

### Job Endpoints

#### GET /api/jobs
Tüm iş ilanlarını listele

**Query Parameters:**
- status: active, draft, closed
- city: İstanbul, Ankara, vs.
- skills: Boya Badana, Elektrik (virgülle ayrılmış)
- employerId: specific employer ID

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "jobs": [...]
}
```

#### POST /api/jobs
Yeni iş ilanı oluştur (Employer only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Ev Tadilat İşi",
  "description": "Detaylı açıklama...",
  "location": {
    "city": "İstanbul",
    "district": "Kadıköy",
    "address": "Tam adres"
  },
  "salary": {
    "min": 5000,
    "max": 10000,
    "currency": "TRY"
  },
  "skills": ["Boya Badana", "Elektrik"],
  "projectDetails": {
    "duration": "15 gün",
    "startDate": "2024-12-01",
    "workType": "full-time"
  },
  "status": "active"
}
```

#### GET /api/jobs/:id
İş ilanı detaylarını getir

**Response (200):**
```json
{
  "success": true,
  "job": {...}
}
```

#### PUT /api/jobs/:id
İş ilanını güncelle (Employer only, owner)

**Headers:**
```
Authorization: Bearer <token>
```

#### DELETE /api/jobs/:id
İş ilanını sil (Employer only, owner)

**Headers:**
```
Authorization: Bearer <token>
```

### Application Endpoints

#### POST /api/applications/jobs/:jobId/apply
İşe başvur (Worker only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "coverLetter": "Başvuru mektubu...",
  "proposedSalary": 7500,
  "availability": {
    "startDate": "2024-12-01"
  }
}
```

#### GET /api/applications/my-applications
Kendi başvurularını listele (Worker only)

**Headers:**
```
Authorization: Bearer <token>
```

#### GET /api/applications/jobs/:jobId/applications
İşe yapılan başvuruları listele (Employer only, job owner)

**Headers:**
```
Authorization: Bearer <token>
```

#### PATCH /api/applications/:id/approve
Başvuruyu onayla (Employer only)

**Headers:**
```
Authorization: Bearer <token>
```

#### PATCH /api/applications/:id/reject
Başvuruyu reddet (Employer only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reason": "Red nedeni..."
}
```

### Profile Endpoints

#### GET /api/profiles/worker/:userId?
Worker profili getir

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT /api/profiles/worker
Worker profilini güncelle (Worker only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "skills": [
    {
      "category": "İnşaat",
      "name": "Boya Badana",
      "level": "expert"
    }
  ],
  "experience": {
    "years": 5,
    "description": "5 yıllık deneyim"
  },
  "location": {
    "city": "İstanbul",
    "district": "Kadıköy"
  },
  "portfolio": [
    {
      "title": "Villa Boyama",
      "description": "200m2 villa boyası",
      "images": ["url1", "url2"],
      "completedDate": "2024-01-15"
    }
  ]
}
```

#### GET /api/profiles/employer/:userId?
Employer profili getir

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT /api/profiles/employer
Employer profilini güncelle (Employer only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "companyDetails": {
    "name": "ABC İnşaat",
    "description": "Şirket açıklaması",
    "industry": "İnşaat",
    "taxNumber": "1234567890",
    "taxOffice": "Kadıköy Vergi Dairesi"
  },
  "location": {
    "city": "İstanbul",
    "district": "Kadıköy",
    "address": "Tam adres"
  }
}
```

### Dashboard Endpoints

#### GET /api/dashboard/worker
Worker dashboard verilerini getir (Worker only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "profile": {...},
  "applications": [...],
  "stats": {
    "totalApplications": 15,
    "pendingApplications": 5,
    "approvedApplications": 8,
    "rejectedApplications": 2
  },
  "activeJobs": [...]
}
```

#### GET /api/dashboard/employer
Employer dashboard verilerini getir (Employer only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "profile": {...},
  "jobs": [...],
  "stats": {
    "totalJobs": 10,
    "activeJobs": 5,
    "closedJobs": 3,
    "draftJobs": 2,
    "totalApplications": 50
  },
  "recentApplications": [...]
}
```

## Performans Optimizasyonu

### MongoDB İndeksleme

Backend başlangıcında veya migration script'inde indeksler oluşturun:

```javascript
// User model indeksleri
userSchema.index({ email: 1 });

// Job model indeksleri
jobSchema.index({ employerId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ 'location.city': 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ createdAt: -1 });

// Application model indeksleri
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ workerId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ appliedAt: -1 });

// WorkerProfile model indeksleri
workerProfileSchema.index({ userId: 1 });
workerProfileSchema.index({ 'location.city': 1 });

// EmployerProfile model indeksleri
employerProfileSchema.index({ userId: 1 });
```

### Response Caching (İleriye Yönelik)

Redis kullanarak sık erişilen verileri cache'leyin:

```bash
# Redis yükle
sudo apt install redis-server

# Redis başlat
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

## Ek Öneriler

### 1. Logging
Winston veya Morgan ile detaylı loglama:

```bash
npm install winston morgan
```

### 2. Email Bildirimleri
SendGrid veya Nodemailer ile email gönderimi:

```bash
npm install nodemailer
```

### 3. File Upload
Multer ile dosya yükleme (portfolio, sertifikalar):

```bash
npm install multer
```

### 4. Validation
Joi ile input validation:

```bash
npm install joi
```

### 5. API Rate Limiting (Gelişmiş)
Redis tabanlı rate limiting:

```bash
npm install rate-limit-redis
```

## Sonuç

✅ Bu rehber ile tam fonksiyonel bir Node.js + Express + MongoDB backend kurabilirsiniz.
✅ Frontend uygulamanız bu API'yi kullanarak tüm işlemleri gerçekleştirebilir.
✅ Production ortamında güvenli ve ölçeklenebilir bir yapı sağlar.

**Not:** Backend'inizi mutlaka test edin ve production'a geçmeden önce güvenlik kontrollerini yapın!

---

**Yardıma mı ihtiyacınız var?**
- Backend çalışmıyor mu? → `pm2 logs ustabul-api`
- MongoDB bağlantı sorunu mu? → `sudo systemctl status mongod`
- Nginx yapılandırma hatası mı? → `sudo nginx -t`
- API test etmek için → Postman veya `curl` kullanın

**İyi çalışmalar! 🚀**