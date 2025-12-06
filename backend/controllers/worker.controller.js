const WorkerProfile = require('../models/WorkerProfile.model');

// @desc    Create or Update worker profile
// @route   PUT /api/workers/profile
exports.updateProfile = async (req, res) => {
  try {
    const { skills, experience, location, preferences, hourlyRate, availability } = req?.body;

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
    res?.status(500)?.json({
      success: false,
      message: 'Profil kaydedilirken hata oluştu',
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

// @desc    Get matching jobs for worker based on skills
// @route   GET /api/workers/matching-jobs
exports.getMatchingJobs = async (req, res) => {
  try {
    let profile = await WorkerProfile?.findOne({ userId: req?.user?.id });

    if (!profile) {
      return res?.status(404)?.json({
        success: false,
        message: 'Önce profil oluşturmalısınız'
      });
    }

    const Job = require('../models/Job.model');

    // Build matching query based on worker's skills
    const matchingJobs = await Job?.find({
      status: 'active',
      $or: [
        // Match by category
        { 'requiredSkills.category': { $in: profile?.skills?.map(s => s?.category) } },
        // Match by subcategories
        { 'requiredSkills.subcategories': { 
            $in: profile?.skills?.flatMap(s => s?.subcategories || []) 
          } 
        }
      ]
    })
    ?.populate('employerId', 'fullName email')
    ?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: matchingJobs?.length,
      data: matchingJobs
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Eşleşen işler alınırken hata oluştu',
      error: error?.message
    });
  }
};