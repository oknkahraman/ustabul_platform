const WorkerProfile = require('../models/WorkerProfile.model');

// @desc    Update worker profile
// @route   PUT /api/workers/profile
exports.updateProfile = async (req, res) => {
  try {
    const { skills, experience, location, preferences, hourlyRate, availability } = req?.body;

    const profile = await WorkerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      {
        skills,
        experience,
        location,
        preferences,
        hourlyRate,
        availability
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

// @desc    Get worker profile
// @route   GET /api/workers/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName');

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