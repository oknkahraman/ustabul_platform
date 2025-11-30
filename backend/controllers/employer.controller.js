const EmployerProfile = require('../models/EmployerProfile.model');
const User = require('../models/User.model');

// @desc    Update employer profile
// @route   PUT /api/employers/profile
exports.updateProfile = async (req, res) => {
  try {
    const { companyDetails, location, industry, companySize, website } = req?.body;

    const profile = await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      {
        companyDetails,
        location,
        industry,
        companySize,
        website
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    res?.json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      data: profile
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Profil güncellenirken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get employer profile
// @route   GET /api/employers/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName');

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
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken hata oluştu',
      error: error?.message
    });
  }
};