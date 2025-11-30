const express = require('express');
const router = express?.Router();
const reviewController = require('../controllers/review.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router?.use(protect);

// Review CRUD
router?.post('/', reviewController?.createReview);
router?.get('/user/:userId', reviewController?.getUserReviews);
router?.get('/job/:jobId', reviewController?.getJobReviews);
router?.put('/:reviewId/response', reviewController?.addResponse);
router?.post('/:reviewId/report', reviewController?.reportReview);

module.exports = router;