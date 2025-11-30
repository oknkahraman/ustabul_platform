const express = require('express');
const router = express?.Router();
const employerController = require('../controllers/employer.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router?.use(protect);

// Employer profile routes
router?.get('/profile', employerController?.getProfile);
router?.post('/profile', authorize('employer'), employerController?.createProfile);
router?.put('/profile', authorize('employer'), employerController?.updateProfile);

// Public employer profile (visible to workers)
router?.get('/:employerId/public', employerController?.getPublicProfile);

module.exports = router;