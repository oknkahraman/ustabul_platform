const express = require('express');
const router = express?.Router();
const { updateProfile, getProfile, getMatchingJobs } = require('../controllers/worker.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router?.put('/profile', protect, authorize('worker'), updateProfile);
router?.get('/profile', protect, authorize('worker'), getProfile);
router?.get('/matching-jobs', protect, authorize('worker'), getMatchingJobs);

module.exports = router;