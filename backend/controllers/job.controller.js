const Job = require('../models/Job.model');

// @desc    Create new job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, salary, skills } = req?.body;

    const job = await Job?.create({
      employerId: req?.user?.id,
      title,
      description,
      location,
      salary,
      skills
    });

    res?.status(201)?.json({
      success: true,
      message: 'İlan başarıyla oluşturuldu',
      data: job
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan oluşturulurken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get all jobs with filters
// @route   GET /api/jobs
exports.getJobs = async (req, res) => {
  try {
    const { city, district, skills, status } = req?.query;

    // Build filter object
    const filter = {};
    
    if (city) filter['location.city'] = city;
    if (district) filter['location.district'] = district;
    if (skills) filter.skills = { $in: skills?.split(',') };
    if (status) filter.status = status;
    else filter.status = 'active'; // Default to active jobs

    const jobs = await Job?.find(filter)?.populate('employerId', 'fullName email')?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlanlar alınırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.id)?.populate('employerId', 'fullName email');

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Increment view count
    job.viewCount += 1;
    await job?.save();

    res?.json({
      success: true,
      data: job
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan alınırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.id);

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Check if user is the employer who created the job
    if (job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    await job?.deleteOne();

    res?.json({
      success: true,
      message: 'İlan başarıyla silindi'
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan silinirken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/my-jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job?.find({ employerId: req?.user?.id })?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlanlar alınırken hata oluştu',
      error: error?.message
    });
  }
};