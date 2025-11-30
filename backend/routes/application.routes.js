const express = require('express');
const router = express?.Router();
const {
  applyForJob,
  getJobApplications,
  getMyApplications,
  approveApplication,
  rejectApplication
} = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router?.post('/', protect, authorize('worker'), applyForJob);
router?.get('/job/:jobId', protect, authorize('employer'), getJobApplications);
router?.get('/my-applications', protect, authorize('worker'), getMyApplications);
router?.put('/:id/approve', protect, authorize('employer'), approveApplication);
router?.put('/:id/reject', protect, authorize('employer'), rejectApplication);

module.exports = router;