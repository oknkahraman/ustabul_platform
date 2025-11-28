# UstaBul Platform - Backend API Setup Guide

## Overview
This guide will help you set up the Node.js + Express + MongoDB backend for the UstaBul platform on your VPS.

## Prerequisites
- Node.js v18+ installed on your VPS
- MongoDB v6+ installed and running
- PM2 for process management (optional but recommended)
- Nginx for reverse proxy (optional but recommended)

## Step 1: Initialize Backend Project

```bash
# Create backend directory
mkdir ustabul-backend
cd ustabul-backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express mongoose bcryptjs jsonwebtoken cors dotenv helmet express-rate-limit
npm install -D nodemon
```

## Step 2: Create Directory Structure

```bash
mkdir -p src/models src/routes src/middleware src/controllers src/utils
touch src/server.js .env
```

## Step 3: Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ustabul

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Step 4: MongoDB Models

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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
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
    logo: String
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

## Step 5: Authentication Controller (src/controllers/authController.js)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const WorkerProfile = require('../models/WorkerProfile');
const EmployerProfile = require('../models/EmployerProfile');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role, companyName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      fullName,
      role,
      companyName: role === 'employer' ? companyName : undefined
    });

    // Create profile based on role
    if (role === 'worker') {
      await WorkerProfile.create({ userId: user._id });
    } else {
      await EmployerProfile.create({ userId: user._id });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Kayıt işlemi başarısız', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Giriş işlemi başarısız', error: error.message });
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı bilgileri alınamadı', error: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Başarıyla çıkış yapıldı'
  });
};
```

## Step 6: Job Controller (src/controllers/jobController.js)

```javascript
const Job = require('../models/Job');
const Application = require('../models/Application');

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employerId: req.user.id
    });

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'İş ilanı oluşturulamadı', error: error.message });
  }
};

// Get All Jobs
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
    res.status(500).json({ message: 'İş ilanları getirilemedi', error: error.message });
  }
};

// Get Job By ID
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
    res.status(500).json({ message: 'İş ilanı getirilemedi', error: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    // Check ownership
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
    res.status(500).json({ message: 'İş ilanı güncellenemedi', error: error.message });
  }
};

// Close Job
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
    res.status(500).json({ message: 'İş ilanı kapatılamadı', error: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'İş ilanı bulunamadı' });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    await job.remove();

    res.status(200).json({
      success: true,
      message: 'İş ilanı silindi'
    });
  } catch (error) {
    res.status(500).json({ message: 'İş ilanı silinemedi', error: error.message });
  }
};
```

## Step 7: Application Controller (src/controllers/applicationController.js)

```javascript
const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Check if already applied
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

    // Update job application count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationCount: 1 }
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Başvuru yapılamadı', error: error.message });
  }
};

// Get Applications by Job
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const applications = await Application.find({ jobId })
      .populate('workerId', 'fullName email')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ message: 'Başvurular getirilemedi', error: error.message });
  }
};

// Approve Application
exports.approveApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }

    res.status(200).json({
      success: true,
      message: 'Başvuru onaylandı',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Başvuru onaylanamadı', error: error.message });
  }
};

// Reject Application
exports.rejectApplication = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        rejectionReason: reason
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }

    res.status(200).json({
      success: true,
      message: 'Başvuru reddedildi',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Başvuru reddedilemedi', error: error.message });
  }
};
```

## Step 8: Authentication Middleware (src/middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Giriş yapmanız gerekiyor' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token', error: error.message });
  }
};

// Role-based access control
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

## Step 9: Routes (src/routes/*.js)

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

router.post('/jobs/:jobId/apply', protect, authorize('worker'), applicationController.applyForJob);
router.get('/jobs/:jobId/applications', protect, authorize('employer'), applicationController.getApplicationsByJob);
router.patch('/:id/approve', protect, authorize('employer'), applicationController.approveApplication);
router.patch('/:id/reject', protect, authorize('employer'), applicationController.rejectApplication);

module.exports = router;
```

## Step 10: Main Server File (src/server.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api', applicationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
```

## Step 11: Package.json Scripts

Add to your package.json:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

## Running the Backend

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 5000 by default.

## Common Issues and Troubleshooting

### Issue: "Registration failed. Please try again."

**Symptoms:**
- Registration form shows generic error message
- No detailed error in console
- Backend might not be responding

**Solutions:**

1. **Check if Backend is Running:**
   ```bash
   # Navigate to your backend directory
   cd /path/to/backend
   
   # Check if server is running
   npm run dev
   
   # You should see: Server running on http://localhost:5000
   ```

2. **Verify MongoDB Connection:**
   ```bash
   # Check MongoDB status on VPS
   systemctl status mongod
   
   # If not running, start it
   sudo systemctl start mongod
   ```

3. **Check Backend Logs:**
   - Look for error messages in your terminal where backend is running
   - Common errors:
     - MongoDB connection failed
     - Port already in use
     - Missing environment variables

4. **Test Backend Endpoints:**
   ```bash
   # Test if backend is accessible
   curl http://localhost:5000/api/health
   
   # Test registration endpoint
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "test123",
       "fullName": "Test User",
       "role": "worker"
     }'
   ```

5. **Check Frontend Configuration:**
   - Open `.env` file in your React project
   - Verify `VITE_API_BASE_URL` is correctly set
   - For local development: `VITE_API_BASE_URL=http://localhost:5000/api`
   - For VPS: `VITE_API_BASE_URL=https://your-vps-domain.com/api`

6. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Look for network errors in Console tab
   - Check Network tab for failed API requests
   - Red errors indicate connection issues

7. **Common Error Messages:**

   **"ERR_CONNECTION_REFUSED"**
   - Backend server is not running
   - Solution: Start backend with `npm run dev`

   **"ERR_NAME_NOT_RESOLVED"**
   - Invalid API URL in .env
   - Solution: Check VITE_API_BASE_URL configuration

   **"MongoDB Connection Error"**
   - MongoDB is not running or wrong connection string
   - Solution: Start MongoDB and verify MONGODB_URI in backend .env

   **"Port 5000 already in use"**
   - Another process is using port 5000
   - Solution: Kill process or use different port

8. **Enable Debug Mode:**
   - The updated RegisterForm now shows debug information in development
   - Check the blue debug panel for API URL and environment
   - Console logs show detailed request/response information

### Issue: CORS Errors

If you see CORS errors in browser console:

1. Update backend `server.js` CORS configuration:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://your-vps-domain.com'],
  credentials: true
}));
```

2. Restart backend after changes

### Issue: MongoDB Authentication Failed

1. Check MongoDB connection string in backend `.env`
2. Verify MongoDB user credentials
3. Ensure database name exists or can be created

## Production Deployment on VPS

### 1. Setup MongoDB on VPS
```bash
# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Setup Node.js Backend
```bash
# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Navigate to your project
cd /path/to/ustabul-backend

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Start backend with PM2
pm2 start server.js --name ustabul-backend
pm2 save
pm2 startup
```

### 3. Configure Nginx (Reverse Proxy)
```bash
# Install Nginx
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/ustabul
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend (if serving from same domain)
    location / {
        root /path/to/ustabul-frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ustabul /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 4. Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Step 13: Nginx Configuration (Optional)

Create `/etc/nginx/sites-available/ustabul-api`:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ustabul-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 14: SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

## Step 15: Frontend Environment Variables

Update your React app's `.env` file:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## Testing the API

### Register User:
```bash
curl -X POST https://api.yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "role": "worker"
  }'
```

### Login:
```bash
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Monitoring & Logs

```bash
# View PM2 logs
pm2 logs ustabul-api

# Monitor application
pm2 monit

# View status
pm2 status
```

## Security Checklist

- ✅ Use HTTPS in production
- ✅ Set strong JWT_SECRET
- ✅ Enable rate limiting
- ✅ Use helmet for security headers
- ✅ Validate all user inputs
- ✅ Hash passwords with bcrypt
- ✅ Use environment variables for sensitive data
- ✅ Enable CORS only for your frontend domain
- ✅ Regular security updates (npm audit fix)
- ✅ Use PM2 for process management

## Troubleshooting

### MongoDB Connection Issues:
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB on boot
sudo systemctl enable mongod
```

### Port Already in Use:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## Additional Recommendations

1. **Database Backups**: Set up automated MongoDB backups
2. **Monitoring**: Use services like PM2 Plus or New Relic
3. **Logging**: Implement Winston or Morgan for better logging
4. **File Upload**: Use Multer for handling file uploads (portfolios, certifications)
5. **Email Service**: Integrate SendGrid or Nodemailer for email notifications
6. **Search**: Implement Elasticsearch for advanced job search
7. **Caching**: Use Redis for caching frequently accessed data

---

Your backend is now ready! The frontend will automatically connect to your MongoDB-powered API.