const express = require('express');
const router = express?.Router();
const {
  createJob,
  getJobs,
  getJob,
  deleteJob,
  getMyJobs
} = require('../controllers/job.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router?.post('/', protect, authorize('employer'), createJob);
router?.get('/', getJobs);
router?.get('/my-jobs', protect, authorize('employer'), getMyJobs);
router?.get('/:id', getJob);
router?.delete('/:id', protect, authorize('employer'), deleteJob);

module.exports = router;