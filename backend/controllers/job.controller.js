const Job = require('../models/Job.model');
const EmployerProfile = require('../models/EmployerProfile.model');

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      employerId: req?.user?.id,
      ...req?.body
    };

    const job = await Job?.create(jobData);

    // Update employer's job count
    await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      { $inc: { jobsPosted: 1 } }
    );

    res?.status(201)?.json({
      success: true,
      message: 'İlan oluşturuldu',
      data: job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan oluşturulurken bir hata oluştu'
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:jobId
// @access  Private (Employer only)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job?.findOne({ _id: req?.params?.jobId, employerId: req?.user?.id });

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    Object.assign(job, req?.body);
    await job?.save();

    res?.json({
      success: true,
      message: 'İlan güncellendi',
      data: job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:jobId
// @access  Private (Employer only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job?.findOneAndDelete({ _id: req?.params?.jobId, employerId: req?.user?.id });

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    // Update employer's job count
    await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      { $inc: { jobsPosted: -1 } }
    );

    res?.json({
      success: true,
      message: 'İlan silindi'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan silinirken bir hata oluştu'
    });
  }
};

// @desc    Update job status
// @route   PATCH /api/jobs/:jobId/status
// @access  Private (Employer only)
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req?.body;

    const job = await Job?.findOne({ _id: req?.params?.jobId, employerId: req?.user?.id });

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    job.status = status;
    await job?.save();

    // Update active jobs count for employer
    const activeCount = await Job?.countDocuments({ employerId: req?.user?.id, status: 'active' });
    await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      { activeJobs: activeCount }
    );

    res?.json({
      success: true,
      message: 'İlan durumu güncellendi',
      data: job
    });
  } catch (error) {
    console.error('Update job status error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan durumu güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Publish job
// @route   PATCH /api/jobs/:jobId/publish
// @access  Private (Employer only)
exports.publishJob = async (req, res) => {
  try {
    const job = await Job?.findOne({ _id: req?.params?.jobId, employerId: req?.user?.id });

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    job.status = 'active';
    job.publishedAt = new Date();
    await job?.save();

    // Update active jobs count
    const activeCount = await Job?.countDocuments({ employerId: req?.user?.id, status: 'active' });
    await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      { activeJobs: activeCount }
    );

    res?.json({
      success: true,
      message: 'İlan yayınlandı',
      data: job
    });
  } catch (error) {
    console.error('Publish job error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan yayınlanırken bir hata oluştu'
    });
  }
};

// @desc    Close job
// @route   PATCH /api/jobs/:jobId/close
// @access  Private (Employer only)
exports.closeJob = async (req, res) => {
  try {
    const job = await Job?.findOne({ _id: req?.params?.jobId, employerId: req?.user?.id });

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    job.status = 'closed';
    await job?.save();

    // Update active jobs count
    const activeCount = await Job?.countDocuments({ employerId: req?.user?.id, status: 'active' });
    await EmployerProfile?.findOneAndUpdate(
      { userId: req?.user?.id },
      { activeJobs: activeCount }
    );

    res?.json({
      success: true,
      message: 'İlan kapatıldı',
      data: job
    });
  } catch (error) {
    console.error('Close job error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan kapatılırken bir hata oluştu'
    });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/employer/my-jobs
// @access  Private (Employer only)
exports.getEmployerJobs = async (req, res) => {
  try {
    const { status } = req?.query;

    let query = { employerId: req?.user?.id };
    if (status) {
      query.status = status;
    }

    const jobs = await Job?.find(query)?.sort({ createdAt: -1 })?.populate('selectedWorkerId', 'fullName');

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    console.error('Get employer jobs error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlanlar alınırken bir hata oluştu'
    });
  }
};

// @desc    Get available jobs for workers
// @route   GET /api/jobs/worker/available
// @access  Private (Worker only)
exports.getAvailableJobs = async (req, res) => {
  try {
    const jobs = await Job?.find({ status: 'active' })?.sort({ publishedAt: -1 })?.populate('employerId', 'fullName')?.limit(50);

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    console.error('Get available jobs error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlanlar alınırken bir hata oluştu'
    });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:jobId
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.jobId)?.populate('employerId', 'fullName phone')?.populate('selectedWorkerId', 'fullName');

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Increment views count
    job.viewsCount += 1;
    await job?.save();

    res?.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Get job by ID error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'İlan alınırken bir hata oluştu'
    });
  }
};

// @desc    Search jobs
// @route   GET /api/jobs/search
// @access  Public
exports.searchJobs = async (req, res) => {
  try {
    const { category, city, budgetMin, budgetMax, skills, urgency } = req?.query;

    let query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (city) {
      query['location.address.city'] = city;
    }

    if (budgetMin || budgetMax) {
      query['budget.amount'] = {};
      if (budgetMin) query['budget.amount'].$gte = parseFloat(budgetMin);
      if (budgetMax) query['budget.amount'].$lte = parseFloat(budgetMax);
    }

    if (skills) {
      query.skills = { $in: skills?.split(',') };
    }

    if (urgency) {
      query.urgency = urgency;
    }

    const jobs = await Job?.find(query)?.sort({ publishedAt: -1 })?.populate('employerId', 'fullName')?.limit(50);

    res?.json({
      success: true,
      count: jobs?.length,
      data: jobs
    });
  } catch (error) {
    console.error('Search jobs error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Arama sırasında bir hata oluştu'
    });
  }
};