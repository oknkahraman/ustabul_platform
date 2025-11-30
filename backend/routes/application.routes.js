const express = require('express');
const router = express?.Router();
const applicationController = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router?.use(protect);

// Worker routes
router?.post('/', authorize('worker'), applicationController?.createApplication);
router?.get('/worker/my-applications', authorize('worker'), applicationController?.getWorkerApplications);
router?.patch('/:applicationId/withdraw', authorize('worker'), applicationController?.withdrawApplication);

// Employer routes
router?.get('/employer/job/:jobId', authorize('employer'), applicationController?.getJobApplications);
router?.patch('/:applicationId/status', authorize('employer'), applicationController?.updateApplicationStatus);
router?.post('/:applicationId/accept', authorize('employer'), applicationController?.acceptApplication);
router?.post('/:applicationId/reject', authorize('employer'), applicationController?.rejectApplication);

// Common routes
router?.get('/:applicationId', applicationController?.getApplicationById);

module.exports = router;