const User = require('../models/User.model');
const EmployerProfile = require('../models/EmployerProfile.model');
const WorkerProfile = require('../models/WorkerProfile.model');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt?.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req?.body;

    // Check if user exists
    const userExists = await User?.findOne({ email });
    if (userExists) {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu email adresi zaten kullanılıyor'
      });
    }

    // Create user
    const user = await User?.create({
      email,
      password,
      fullName,
      role
    });

    // Create corresponding profile
    if (role === 'employer') {
      await EmployerProfile?.create({ userId: user?._id });
    } else if (role === 'worker') {
      await WorkerProfile?.create({ userId: user?._id });
    }

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
          role: user?.role
        },
        token
      }
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Kayıt sırasında hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
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
          role: user?.role
        },
        token
      }
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Giriş sırasında hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User?.findById(req?.user?.id);

    let profile = null;
    if (user?.role === 'employer') {
      profile = await EmployerProfile?.findOne({ userId: user?._id });
    } else if (user?.role === 'worker') {
      profile = await WorkerProfile?.findOne({ userId: user?._id });
    }

    res?.json({
      success: true,
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          fullName: user?.fullName,
          role: user?.role,
          isVerified: user?.isVerified
        },
        profile
      }
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Kullanıcı bilgileri alınırken hata oluştu',
      error: error?.message
    });
  }
};