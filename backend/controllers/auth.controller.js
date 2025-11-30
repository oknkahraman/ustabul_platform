const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User.model');

// Generate JWT token
const generateToken = (id) => {
  return jwt?.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors?.isEmpty()) {
      return res?.status(400)?.json({
        success: false,
        message: 'Geçersiz veri',
        errors: errors?.array()
      });
    }

    const { email, password, fullName, phone, userType } = req?.body;

    // Check if user already exists
    const existingUser = await User?.findOne({ email });
    if (existingUser) {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu email adresi zaten kayıtlı'
      });
    }

    // Create user
    const user = await User?.create({
      email,
      password,
      fullName,
      phone,
      userType
    });

    // Generate token
    const token = generateToken(user?._id);

    res?.status(201)?.json({
      success: true,
      message: 'Kayıt başarılı',
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
          phone: user?.phone,
          userType: user?.userType,
          profileCompleted: user?.profileCompleted
        },
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Kayıt sırasında bir hata oluştu'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors?.isEmpty()) {
      return res?.status(400)?.json({
        success: false,
        message: 'Geçersiz veri',
        errors: errors?.array()
      });
    }

    const { email, password } = req?.body;

    // Check if user exists
    const user = await User?.findOne({ email });
    if (!user) {
      return res?.status(401)?.json({
        success: false,
        message: 'Geçersiz email veya şifre'
      });
    }

    // Check password
    const isPasswordMatch = await user?.comparePassword(password);
    if (!isPasswordMatch) {
      return res?.status(401)?.json({
        success: false,
        message: 'Geçersiz email veya şifre'
      });
    }

    // Check if user is active
    if (!user?.isActive) {
      return res?.status(401)?.json({
        success: false,
        message: 'Hesabınız deaktif durumda'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user?.save();

    // Generate token
    const token = generateToken(user?._id);

    res?.json({
      success: true,
      message: 'Giriş başarılı',
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
          phone: user?.phone,
          userType: user?.userType,
          profileCompleted: user?.profileCompleted
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Giriş sırasında bir hata oluştu'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User?.findById(req?.user?.id);

    res?.json({
      success: true,
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
          phone: user?.phone,
          userType: user?.userType,
          profileCompleted: user?.profileCompleted,
          isVerified: user?.isVerified,
          createdAt: user?.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Kullanıcı bilgileri alınırken bir hata oluştu'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone } = req?.body;

    const user = await User?.findById(req?.user?.id);

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;

    await user?.save();

    res?.json({
      success: true,
      message: 'Profil güncellendi',
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
          phone: user?.phone,
          userType: user?.userType
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req?.body;

    if (!currentPassword || !newPassword) {
      return res?.status(400)?.json({
        success: false,
        message: 'Mevcut şifre ve yeni şifre gereklidir'
      });
    }

    if (newPassword?.length < 6) {
      return res?.status(400)?.json({
        success: false,
        message: 'Yeni şifre en az 6 karakter olmalıdır'
      });
    }

    const user = await User?.findById(req?.user?.id);

    // Check current password
    const isPasswordMatch = await user?.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      return res?.status(401)?.json({
        success: false,
        message: 'Mevcut şifre yanlış'
      });
    }

    // Update password
    user.password = newPassword;
    await user?.save();

    res?.json({
      success: true,
      message: 'Şifre başarıyla değiştirildi'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Şifre değiştirilirken bir hata oluştu'
    });
  }
};