const express = require('express');
const router = express?.Router();
const employerController = require('../controllers/employer.controller');
const { authenticate, authorizeEmployer } = require('../middleware/auth.middleware');

// Employer profile routes
router?.put('/profile', authenticate, authorizeEmployer, employerController?.updateProfile);
router?.get('/profile', authenticate, authorizeEmployer, employerController?.getProfile);
router?.get('/profile/me', authenticate, authorizeEmployer, employerController?.getCurrentProfile);

// Dashboard
router?.get('/dashboard', authenticate, authorizeEmployer, employerController?.getDashboard);

module.exports = router;