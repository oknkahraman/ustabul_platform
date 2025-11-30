const express = require('express');
const router = express?.Router();
const jobController = require('../controllers/job.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router?.get('/search', jobController?.searchJobs);
router?.get('/:jobId', jobController?.getJobById);

// Protected routes
router?.use(protect);

// Employer only routes
router?.post('/', authorize('employer'), jobController?.createJob);
router?.put('/:jobId', authorize('employer'), jobController?.updateJob);
router?.delete('/:jobId', authorize('employer'), jobController?.deleteJob);
router?.patch('/:jobId/status', authorize('employer'), jobController?.updateJobStatus);
router?.patch('/:jobId/publish', authorize('employer'), jobController?.publishJob);
router?.patch('/:jobId/close', authorize('employer'), jobController?.closeJob);

// Employer job management
router?.get('/employer/my-jobs', authorize('employer'), jobController?.getEmployerJobs);

// Worker job discovery
router?.get('/worker/available', authorize('worker'), jobController?.getAvailableJobs);

module.exports = router;