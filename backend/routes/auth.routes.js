const express = require('express');
const router = express?.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Validation rules
const registerValidation = [
  body('email')?.isEmail()?.withMessage('Geçerli bir email adresi giriniz'),
  body('password')?.isLength({ min: 6 })?.withMessage('Şifre en az 6 karakter olmalıdır'),
  body('fullName')?.notEmpty()?.withMessage('Ad Soyad gereklidir'),
  body('phone')?.notEmpty()?.withMessage('Telefon numarası gereklidir'),
  body('userType')?.isIn(['worker', 'employer'])?.withMessage('Geçerli bir kullanıcı tipi seçiniz')
];

const loginValidation = [
  body('email')?.isEmail()?.withMessage('Geçerli bir email adresi giriniz'),
  body('password')?.notEmpty()?.withMessage('Şifre gereklidir')
];

// Routes
router?.post('/register', registerValidation, authController?.register);
router?.post('/login', loginValidation, authController?.login);
router?.get('/me', protect, authController?.getMe);
router?.put('/update-profile', protect, authController?.updateProfile);
router?.post('/change-password', protect, authController?.changePassword);

module.exports = router;