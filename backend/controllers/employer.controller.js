const EmployerProfile = require('../models/EmployerProfile.model');
const User = require('../models/User.model');

// @desc    Get employer profile
// @route   GET /api/employers/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'fullName email phone');

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    res?.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get employer profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken bir hata oluştu'
    });
  }
};

// @desc    Create employer profile
// @route   POST /api/employers/profile
// @access  Private (Employer only)
exports.createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await EmployerProfile?.findOne({ userId: req?.user?.id });
    if (existingProfile) {
      return res?.status(400)?.json({
        success: false,
        message: 'Profil zaten mevcut'
      });
    }

    const profileData = {
      userId: req?.user?.id,
      ...req?.body
    };

    const profile = await EmployerProfile?.create(profileData);

    // Update user profile completed status
    await User?.findByIdAndUpdate(req?.user?.id, { profileCompleted: true });

    res?.status(201)?.json({
      success: true,
      message: 'Profil oluşturuldu',
      data: profile
    });
  } catch (error) {
    console.error('Create employer profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil oluşturulurken bir hata oluştu'
    });
  }
};

// @desc    Update employer profile
// @route   PUT /api/employers/profile
// @access  Private (Employer only)
exports.updateProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      req?.body,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    // Update user profile completed status
    await User?.findByIdAndUpdate(req?.user?.id, { profileCompleted: true });

    res?.json({
      success: true,
      message: 'Profil güncellendi',
      data: profile
    });
  } catch (error) {
    console.error('Update employer profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Get public employer profile
// @route   GET /api/employers/:employerId/public
// @access  Private
exports.getPublicProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile?.findOne({ userId: req?.params?.employerId })?.populate('userId', 'fullName phone createdAt')?.select('-verificationDocuments');

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    res?.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get public employer profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken bir hata oluştu'
    });
  }
};