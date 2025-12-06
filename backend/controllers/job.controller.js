const Job = require('../models/Job.model');
const WorkerProfile = require('../models/WorkerProfile.model');

// @desc    Create new job
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, salary, requiredSkills, status } = req?.body;

    const job = await Job?.create({
      employerId: req?.user?.id,
      title,
      description,
      location,
      salary,
      requiredSkills,
      status: status || 'draft' // Save as draft by default
    });

    res?.status(201)?.json({
      success: true,
      message: status === 'active' ? 'İlan başarıyla yayınlandı' : 'İlan taslak olarak kaydedildi',
      data: job
    });
  } catch (error) {
    console.error('İlan oluşturma hatası:', error);
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
    const { city, district, category, subcategories, status } = req?.query;

    // Build filter object
    const filter = {};
    
    if (city) filter['location.city'] = city;
    if (district) filter['location.district'] = district;
    if (status) filter.status = status;
    else filter.status = 'active'; // Default to active jobs
    
    // Skill-based filtering
    if (category) {
      filter['requiredSkills.category'] = category;
    }
    if (subcategories) {
      const subcategoriesArray = subcategories?.split(',');
      filter['requiredSkills.subcategories'] = { $in: subcategoriesArray };
    }

    const jobs = await Job?.find(filter)
      ?.populate('employerId', 'fullName email')
      ?.sort({ createdAt: -1 });

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

// @desc    Update job
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
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

    const updatedJob = await Job?.findByIdAndUpdate(
      req?.params?.id,
      req?.body,
      { new: true, runValidators: true }
    );

    res?.json({
      success: true,
      message: 'İlan başarıyla güncellendi',
      data: updatedJob
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan güncellenirken hata oluştu',
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

// @desc    Publish job (change from draft to active)
// @route   PATCH /api/jobs/:id/publish
exports.publishJob = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.id);

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    if (job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    job.status = 'active';
    await job?.save();

    res?.json({
      success: true,
      message: 'İlan başarıyla yayınlandı',
      data: job
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan yayınlanırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Close job
// @route   PATCH /api/jobs/:id/close
exports.closeJob = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.id);

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    if (job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    job.status = 'closed';
    await job?.save();

    res?.json({
      success: true,
      message: 'İlan başarıyla kapatıldı',
      data: job
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlan kapatılırken hata oluştu',
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

// @desc    Get matching workers for a job
// @route   GET /api/jobs/:id/matching-workers
exports.getMatchingWorkers = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.id);

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Check authorization
    if (job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    // Find workers with matching skills
    const matchingWorkers = await WorkerProfile?.find({
      $or: [
        // Match by category
        { 'skills.category': { $in: job?.requiredSkills?.map(s => s?.category) } },
        // Match by subcategories
        { 'skills.subcategories': { 
            $in: job?.requiredSkills?.flatMap(s => s?.subcategories || []) 
          } 
        }
      ]
    })
    ?.populate('userId', 'fullName email')
    ?.sort({ 'rating.average': -1 });

    res?.json({
      success: true,
      count: matchingWorkers?.length,
      data: matchingWorkers
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Eşleşen ustalar alınırken hata oluştu',
      error: error?.message
    });
  }
};