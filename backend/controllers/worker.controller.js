const WorkerProfile = require('../models/WorkerProfile.model');
const Job = require('../models/Job.model');

// @desc    Create or Update worker profile
// @route   PUT /api/workers/profile
exports.updateProfile = async (req, res) => {
  try {
    const { skills, experience, location, preferences, hourlyRate, availability } = req?.body;

    // Validate required fields
    if (!skills || skills?.length === 0) {
      return res?.status(400)?.json({
        success: false,
        message: 'En az bir yetenek seçmelisiniz'
      });
    }

    if (!location?.city || !location?.district) {
      return res?.status(400)?.json({
        success: false,
        message: 'Şehir ve ilçe bilgisi gereklidir'
      });
    }

    // Try to find existing profile
    let profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (profile) {
      // Update existing profile
      profile.skills = skills;
      profile.experience = experience;
      profile.location = location;
      profile.preferences = preferences;
      profile.hourlyRate = hourlyRate;
      profile.availability = availability;
      
      await profile?.save();
    } else {
      // Create new profile
      profile = await WorkerProfile?.create({
        userId: req?.user?.id,
        skills,
        experience,
        location,
        preferences,
        hourlyRate,
        availability
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

// @desc    Get worker profile
// @route   GET /api/workers/profile
exports.getProfile = async (req, res) => {
  try {
    let profile = await WorkerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName');

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
// @route   GET /api/workers/profile/me
exports.getCurrentProfile = async (req, res) => {
  try {
    let profile = await WorkerProfile?.findOne({ userId: req?.user?.id })?.populate('userId', 'email fullName role');

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

// @desc    Search jobs with filters
// @route   GET /api/workers/jobs?city=İstanbul&district=Kadıköy&category=KAYNAK
exports.searchJobs = async (req, res) => {
  try {
    const { city, district, category, minSalary, maxSalary } = req?.query;

    // Build query
    let query = { status: 'active' };

    if (city) {
      query['location.city'] = city;
    }

    if (district) {
      query['location.district'] = district;
    }

    if (category) {
      query.category = category;
    }

    if (minSalary) {
      query['salary.min'] = { $gte: parseInt(minSalary) };
    }

    if (maxSalary) {
      query['salary.max'] = { $lte: parseInt(maxSalary) };
    }

    const jobs = await Job?.find(query)
      ?.populate('employerId', 'fullName email')
      ?.sort({ createdAt: -1 })
      ?.limit(50);

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İşler aranırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get worker's applications
// @route   GET /api/workers/applications
exports.getMyApplications = async (req, res) => {
  try {
    const Application = require('../models/Application.model');
    
    const applications = await Application?.find({ workerId: req?.user?.id })
      ?.populate('jobId', 'title description location salary status')
      ?.populate({
        path: 'jobId',
        populate: {
          path: 'employerId',
          select: 'fullName email'
        }
      })
      ?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: applications?.length,
      data: applications
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Başvurular alınırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get matched jobs based on worker skills and location
// @route   GET /api/workers/matched-jobs
exports.getMatchedJobs = async (req, res) => {
  try {
    let profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Önce profil oluşturmalısınız'
      });
    }

    // Extract worker's subcategories for matching
    const workerSubCategories = profile?.skills?.map(skill => skill?.subCategory);

    // Build matching query
    const matchingJobs = await Job?.find({
      status: 'active',
      $or: [
        // Match by job category (subcategory)
        { category: { $in: workerSubCategories } },
        // Match by location
        {
          'location.city': profile?.location?.city,
          'location.district': profile?.location?.district
        }
      ]
    })
    ?.populate('employerId', 'fullName email')
    ?.sort({ createdAt: -1 })
    ?.limit(20);

    res?.json({
      success: true,
      count: matchingJobs?.length,
      data: matchingJobs
    });
  } catch (error) {
    console.error('Eşleşen işler alınırken hata:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Eşleşen işler alınırken hata oluştu',
      error: error?.message
    });
  }
};