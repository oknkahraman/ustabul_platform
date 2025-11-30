const WorkerProfile = require('../models/WorkerProfile.model');
const User = require('../models/User.model');

// @desc    Get worker profile
// @route   GET /api/workers/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'fullName email phone');

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
    console.error('Get worker profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken bir hata oluştu'
    });
  }
};

// @desc    Create worker profile
// @route   POST /api/workers/profile
// @access  Private (Worker only)
exports.createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await WorkerProfile?.findOne({ userId: req?.user?.id });
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

    const profile = await WorkerProfile?.create(profileData);

    // Update user profile completed status
    await User?.findByIdAndUpdate(req?.user?.id, { profileCompleted: true });

    res?.status(201)?.json({
      success: true,
      message: 'Profil oluşturuldu',
      data: profile
    });
  } catch (error) {
    console.error('Create worker profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil oluşturulurken bir hata oluştu'
    });
  }
};

// @desc    Update worker profile
// @route   PUT /api/workers/profile
// @access  Private (Worker only)
exports.updateProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOneAndUpdate(
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
    console.error('Update worker profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Add portfolio item
// @route   POST /api/workers/portfolio
// @access  Private (Worker only)
exports.addPortfolioItem = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    profile?.portfolio?.push(req?.body);
    await profile?.save();

    res?.json({
      success: true,
      message: 'Portfolyo öğesi eklendi',
      data: profile
    });
  } catch (error) {
    console.error('Add portfolio item error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Portfolyo öğesi eklenirken bir hata oluştu'
    });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/workers/portfolio/:itemId
// @access  Private (Worker only)
exports.updatePortfolioItem = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    const item = profile?.portfolio?.id(req?.params?.itemId);
    if (!item) {
      return res?.status(404)?.json({
        success: false,
        message: 'Portfolyo öğesi bulunamadı'
      });
    }

    Object.assign(item, req?.body);
    await profile?.save();

    res?.json({
      success: true,
      message: 'Portfolyo öğesi güncellendi',
      data: profile
    });
  } catch (error) {
    console.error('Update portfolio item error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Portfolyo öğesi güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/workers/portfolio/:itemId
// @access  Private (Worker only)
exports.deletePortfolioItem = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    profile?.portfolio?.pull(req?.params?.itemId);
    await profile?.save();

    res?.json({
      success: true,
      message: 'Portfolyo öğesi silindi',
      data: profile
    });
  } catch (error) {
    console.error('Delete portfolio item error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Portfolyo öğesi silinirken bir hata oluştu'
    });
  }
};

// @desc    Add certificate
// @route   POST /api/workers/certificates
// @access  Private (Worker only)
exports.addCertificate = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    profile?.certificates?.push(req?.body);
    await profile?.save();

    res?.json({
      success: true,
      message: 'Sertifika eklendi',
      data: profile
    });
  } catch (error) {
    console.error('Add certificate error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Sertifika eklenirken bir hata oluştu'
    });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/workers/certificates/:certId
// @access  Private (Worker only)
exports.deleteCertificate = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı'
      });
    }

    profile?.certificates?.pull(req?.params?.certId);
    await profile?.save();

    res?.json({
      success: true,
      message: 'Sertifika silindi',
      data: profile
    });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Sertifika silinirken bir hata oluştu'
    });
  }
};

// @desc    Get public worker profile
// @route   GET /api/workers/:workerId/public
// @access  Private
exports.getPublicProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile?.findOne({ userId: req?.params?.workerId })?.populate('userId', 'fullName phone createdAt')?.select('-preferences');

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
    console.error('Get public worker profile error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken bir hata oluştu'
    });
  }
};

// @desc    Search workers
// @route   GET /api/workers/search
// @access  Private
exports.searchWorkers = async (req, res) => {
  try {
    const { skills, city, minRating, maxRate, availability } = req?.query;

    let query = { isAvailable: true };

    if (skills) {
      query['skills.skills'] = { $in: skills?.split(',') };
    }

    if (city) {
      query['location.city'] = city;
    }

    if (minRating) {
      query['rating.average'] = { $gte: parseFloat(minRating) };
    }

    if (maxRate) {
      query.hourlyRate = { $lte: parseFloat(maxRate) };
    }

    if (availability) {
      query.availability = availability;
    }

    const workers = await WorkerProfile?.find(query)?.populate('userId', 'fullName')?.select('-preferences')?.sort({ 'rating.average': -1 })?.limit(20);

    res?.json({
      success: true,
      count: workers?.length,
      data: workers
    });
  } catch (error) {
    console.error('Search workers error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Arama sırasında bir hata oluştu'
    });
  }
};