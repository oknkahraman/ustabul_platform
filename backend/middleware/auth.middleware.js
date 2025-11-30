const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in header
    if (req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer')) {
      token = req?.headers?.authorization?.split(' ')?.[1];
    }

    if (!token) {
      return res?.status(401)?.json({
        success: false,
        message: 'Erişim yetkiniz yok, lütfen giriş yapın'
      });
    }

    // Verify token
    const decoded = jwt?.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User?.findById(decoded?.id)?.select('-password');

    if (!req?.user) {
      return res?.status(401)?.json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }

    if (!req?.user?.isActive) {
      return res?.status(401)?.json({
        success: false,
        message: 'Hesabınız deaktif durumda'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res?.status(401)?.json({
      success: false,
      message: 'Geçersiz token'
    });
  }
};

// Check user type
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles?.includes(req?.user?.userType)) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }
    next();
  };
};

module.exports = { protect, authorize };