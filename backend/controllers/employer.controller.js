const EmployerProfile = require('../models/EmployerProfile.model');
const Job = require('../models/Job.model');

// @desc    Create or Update employer profile
// @route   PUT /api/employers/profile
exports.updateProfile = async (req, res) => {
  try {
    const { companyDetails, location, industry, companySize, website } = req?.body;

    // Validate required fields
    if (!companyDetails?.name || !companyDetails?.taxNumber || !companyDetails?.taxOffice) {
      return res?.status(400)?.json({
        success: false,
        message: 'Şirket adı, vergi numarası ve vergi dairesi gereklidir'
      });
    }

    if (!location?.city || !location?.district) {
      return res?.status(400)?.json({
        success: false,
        message: 'Şehir ve ilçe bilgisi gereklidir'
      });
    }

    // Try to find existing profile
    let profile = await EmployerProfile?.findOne({ userId: req?.user?.id });

    if (profile) {
      // Update existing profile
      profile.companyDetails = companyDetails;
      profile.location = location;
      profile.industry = industry;
      profile.companySize = companySize;
      profile.website = website;
      
      await profile?.save();
    } else {
      // Create new profile
      profile = await EmployerProfile?.create({
        userId: req?.user?.id,
        companyDetails,
        location,
        industry,
        companySize,
        website
      });
    }

    res?.json({
      success: true,
      message: 'Profil başarıyla kaydedildi',
      data: profile
    });
  } catch (error) {
    console.error('Profil kaydetme hatası:', error);
    
    // Handle validation errors
    if (error?.name === 'ValidationError') {
      const messages = Object?.values(error?.errors)?.map(err => err?.message);
      return res?.status(400)?.json({
        success: false,
        message: 'Profil doğrulama hatası',
        errors: messages
      });
    }

    res?.status(500)?.json({
      success: false,
      message: 'Profil kaydedilirken hata oluştu. Lütfen tekrar deneyin.',
      error: error?.message
    });
  }
};

// @desc    Get employer profile
// @route   GET /api/employers/profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await EmployerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName');

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Profil bulunamadı. Lütfen önce profil oluşturun.'
      });
    }

    res?.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Profil alma hatası:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Profil alınırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/employers/profile/me
exports.getCurrentProfile = async (req, res) => {
  try {
    let profile = await EmployerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName role');

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

// @desc    Get employer dashboard stats
// @route   GET /api/employers/dashboard
exports.getDashboard = async (req, res) => {
  try {
    let profile = await EmployerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Önce profil oluşturmalısınız'
      });
    }

    const jobs = await Job?.find({ employerId: req?.user?.id });
    const Application = require('../models/Application.model');
    const applications = await Application?.find({ 
      jobId: { $in: jobs?.map(j => j?._id) } 
    });

    const stats = {
      totalJobs: jobs?.length,
      activeJobs: jobs?.filter(j => j?.status === 'active')?.length,
      draftJobs: jobs?.filter(j => j?.status === 'draft')?.length,
      totalApplications: applications?.length,
      pendingApplications: applications?.filter(a => a?.status === 'pending')?.length,
      approvedApplications: applications?.filter(a => a?.status === 'approved')?.length
    };

    res?.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard verileri alınırken hata:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Dashboard verileri alınırken hata oluştu',
      error: error?.message
    });
  }
};