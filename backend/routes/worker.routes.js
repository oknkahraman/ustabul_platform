const express = require('express');
const router = express?.Router();
const workerController = require('../controllers/worker.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// All routes require authentication
router?.use(protect);

// Worker profile routes
router?.get('/profile', workerController?.getProfile);
router?.post('/profile', authorize('worker'), workerController?.createProfile);
router?.put('/profile', authorize('worker'), workerController?.updateProfile);

// Portfolio routes
router?.post('/portfolio', authorize('worker'), workerController?.addPortfolioItem);
router?.put('/portfolio/:itemId', authorize('worker'), workerController?.updatePortfolioItem);
router?.delete('/portfolio/:itemId', authorize('worker'), workerController?.deletePortfolioItem);

// Certificate routes
router?.post('/certificates', authorize('worker'), workerController?.addCertificate);
router?.delete('/certificates/:certId', authorize('worker'), workerController?.deleteCertificate);

// Public worker profile (visible to employers)
router?.get('/:workerId/public', workerController?.getPublicProfile);

// Search workers
router?.get('/search', workerController?.searchWorkers);

module.exports = router;