const express = require('express');
const router = express?.Router();
const { updateProfile, getProfile } = require('../controllers/employer.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router?.put('/profile', protect, authorize('employer'), updateProfile);
router?.get('/profile', protect, authorize('employer'), getProfile);

module.exports = router;