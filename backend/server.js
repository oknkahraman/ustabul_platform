const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const initializeDatabase = require('./utils/initializeDatabase');

// Load environment variables
dotenv?.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const workerRoutes = require('./routes/worker.routes');
const employerRoutes = require('./routes/employer.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const reviewRoutes = require('./routes/review.routes');
const locationRoutes = require('./routes/location.routes');
const skillsRoutes = require('./routes/skills.routes');

// Initialize Express app
const app = express();

// Middleware
app?.use(cors());
app?.use(express?.json());
app?.use(express?.urlencoded({ extended: true }));

// Request logging middleware (development)
if (process.env.NODE_ENV === 'development') {
  app?.use((req, res, next) => {
    console.log(`${req?.method} ${req?.path}`);
    next();
  });
}

// Connect to MongoDB and initialize database
connectDB()?.then(async () => {
  console.log('MongoDB bağlantısı kuruldu\n');
  
  // Initialize database on first run
  try {
    await initializeDatabase();
    console.log('✅ Veritabanı başlatma tamamlandı\n');
  } catch (error) {
    console.error('⚠️  Veritabanı başlatma uyarısı:', error?.message);
  }
});

// MongoDB Connection
mongoose?.connect(process.env.MONGODB_URI)?.then(() => console.log('✅ MongoDB connected successfully'))?.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app?.use('/api/auth', require('./routes/auth.routes'));
app?.use('/api/workers', require('./routes/worker.routes'));
app?.use('/api/employers', require('./routes/employer.routes'));
app?.use('/api/jobs', require('./routes/job.routes'));
app?.use('/api/applications', require('./routes/application.routes'));
app?.use('/api/reviews', require('./routes/review.routes'));
app?.use('/api/locations', require('./routes/location.routes'));
app?.use('/api/skills', require('./routes/skills.routes'));

// Health check route
app?.get('/api/health', (req, res) => {
  res?.json({ 
    status: 'OK', 
    message: 'UstaBul API is running',
    timestamp: new Date()?.toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app?.use((req, res) => {
  res?.status(404)?.json({
    success: false,
    message: 'Endpoint bulunamadı'
  });
});

// Error handling middleware
app?.use((err, req, res, next) => {
  console.error('Error:', err);
  res?.status(err?.status || 500)?.json({
    success: false,
    message: err?.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err?.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app?.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;