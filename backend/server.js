const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv?.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const workerRoutes = require('./routes/worker.routes');
const employerRoutes = require('./routes/employer.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const reviewRoutes = require('./routes/review.routes');

// Initialize Express app
const app = express();

// Middleware
app?.use(cors());
app?.use(express?.json());
app?.use(express?.urlencoded({ extended: true }));

// MongoDB Connection
mongoose?.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})?.then(() => console.log('✅ MongoDB connected successfully'))?.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app?.use('/api/auth', authRoutes);
app?.use('/api/workers', workerRoutes);
app?.use('/api/employers', employerRoutes);
app?.use('/api/jobs', jobRoutes);
app?.use('/api/applications', applicationRoutes);
app?.use('/api/reviews', reviewRoutes);

// Health check route
app?.get('/api/health', (req, res) => {
  res?.json({ 
    status: 'OK', 
    message: 'UstaBul API is running',
    timestamp: new Date()?.toISOString()
  });
});

// Error handling middleware
app?.use((err, req, res, next) => {
  console.error(err?.stack);
  res?.status(err?.status || 500)?.json({
    success: false,
    message: err?.message || 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app?.use((req, res) => {
  res?.status(404)?.json({
    success: false,
    message: 'Endpoint bulunamadı'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app?.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;