const express = require('express');
const router = express?.Router();
const workerController = require('../controllers/worker.controller');
const { authenticate, authorizeWorker } = require('../middleware/auth.middleware');

// Worker profile routes (requires authentication + worker role)
router?.put('/profile', authenticate, authorizeWorker, workerController?.updateProfile);
router?.get('/profile', authenticate, authorizeWorker, workerController?.getProfile);
router?.get('/profile/me', authenticate, authorizeWorker, workerController?.getCurrentProfile);

// Job search with filters
router?.get('/jobs', authenticate, authorizeWorker, workerController?.searchJobs);

// Application management
router?.get('/applications', authenticate, authorizeWorker, workerController?.getMyApplications);

// Get matched jobs based on worker skills
router?.get('/matched-jobs', authenticate, authorizeWorker, workerController?.getMatchedJobs);

module.exports = router;