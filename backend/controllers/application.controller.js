const Application = require('../models/Application.model');
const Job = require('../models/Job.model');

// @desc    Apply for a job
// @route   POST /api/applications
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req?.body;

    // Check if job exists
    const job = await Job?.findById(jobId);
    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Check if already applied
    const existingApplication = await Application?.findOne({
      jobId,
      workerId: req?.user?.id
    });

    if (existingApplication) {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu ilana zaten başvuru yaptınız'
      });
    }

    // Create application
    const application = await Application?.create({
      jobId,
      workerId: req?.user?.id,
      coverLetter
    });

    // Increment application count
    job.applicationCount += 1;
    await job?.save();

    res?.status(201)?.json({
      success: true,
      message: 'Başvuru başarıyla oluşturuldu',
      data: application
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru oluşturulurken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Get applications for a job (employer)
// @route   GET /api/applications/job/:jobId
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job?.findById(req?.params?.jobId);

    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    // Check if user is the employer
    if (job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    const applications = await Application?.find({ jobId: req?.params?.jobId })?.populate('workerId', 'fullName email')?.sort({ createdAt: -1 });

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

// @desc    Get worker's applications
// @route   GET /api/applications/my-applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application?.find({ workerId: req?.user?.id })?.populate('jobId', 'title description location salary')?.sort({ createdAt: -1 });

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

// @desc    Approve application
// @route   PUT /api/applications/:id/approve
exports.approveApplication = async (req, res) => {
  try {
    const application = await Application?.findById(req?.params?.id)?.populate('jobId');

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı'
      });
    }

    // Check if user is the employer
    if (application?.jobId?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    application.status = 'approved';
    await application?.save();

    res?.json({
      success: true,
      message: 'Başvuru onaylandı',
      data: application
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru onaylanırken hata oluştu',
      error: error?.message
    });
  }
};

// @desc    Reject application
// @route   PUT /api/applications/:id/reject
exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application?.findById(req?.params?.id)?.populate('jobId');

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı'
      });
    }

    // Check if user is the employer
    if (application?.jobId?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }

    application.status = 'rejected';
    await application?.save();

    res?.json({
      success: true,
      message: 'Başvuru reddedildi',
      data: application
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru reddedilirken hata oluştu',
      error: error?.message
    });
  }
};