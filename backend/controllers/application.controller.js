const Application = require('../models/Application.model');
const Job = require('../models/Job.model');
const WorkerProfile = require('../models/WorkerProfile.model');

// @desc    Create application
// @route   POST /api/applications
// @access  Private (Worker only)
exports.createApplication = async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget, proposedDuration, startDate } = req?.body;

    // Check if job exists and is active
    const job = await Job?.findById(jobId);
    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı'
      });
    }

    if (job?.status !== 'active') {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu ilana başvuru yapılamaz'
      });
    }

    // Check if worker already applied
    const existingApplication = await Application?.findOne({
      jobId,
      workerId: req?.user?.id
    });

    if (existingApplication) {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu ilana zaten başvurdunuz'
      });
    }

    // Create application
    const application = await Application?.create({
      jobId,
      workerId: req?.user?.id,
      employerId: job?.employerId,
      coverLetter,
      proposedBudget,
      proposedDuration,
      startDate
    });

    // Update job applications count
    job.applicationsCount += 1;
    await job?.save();

    res?.status(201)?.json({
      success: true,
      message: 'Başvurunuz gönderildi',
      data: application
    });
  } catch (error) {
    console.error('Create application error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru gönderilirken bir hata oluştu'
    });
  }
};

// @desc    Get worker's applications
// @route   GET /api/applications/worker/my-applications
// @access  Private (Worker only)
exports.getWorkerApplications = async (req, res) => {
  try {
    const { status } = req?.query;

    let query = { workerId: req?.user?.id };
    if (status) {
      query.status = status;
    }

    const applications = await Application?.find(query)?.populate('jobId', 'title category budget status')?.populate('employerId', 'fullName')?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: applications?.length,
      data: applications
    });
  } catch (error) {
    console.error('Get worker applications error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvurular alınırken bir hata oluştu'
    });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/employer/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res) => {
  try {
    // Verify job belongs to employer
    const job = await Job?.findOne({ _id: req?.params?.jobId, employerId: req?.user?.id });
    if (!job) {
      return res?.status(404)?.json({
        success: false,
        message: 'İlan bulunamadı veya yetkiniz yok'
      });
    }

    const applications = await Application?.find({ jobId: req?.params?.jobId })?.populate('workerId', 'fullName phone')?.populate({
        path: 'workerId',
        populate: {
          path: 'workerId',
          model: 'WorkerProfile',
          select: 'skills experience hourlyRate rating portfolio'
        }
      })?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: applications?.length,
      data: applications
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvurular alınırken bir hata oluştu'
    });
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:applicationId/status
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, employerNotes } = req?.body;

    const application = await Application?.findOne({
      _id: req?.params?.applicationId,
      employerId: req?.user?.id
    });

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı veya yetkiniz yok'
      });
    }

    application.status = status;
    if (employerNotes) application.employerNotes = employerNotes;
    application.reviewedAt = new Date();
    await application?.save();

    res?.json({
      success: true,
      message: 'Başvuru durumu güncellendi',
      data: application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru durumu güncellenirken bir hata oluştu'
    });
  }
};

// @desc    Accept application
// @route   POST /api/applications/:applicationId/accept
// @access  Private (Employer only)
exports.acceptApplication = async (req, res) => {
  try {
    const application = await Application?.findOne({
      _id: req?.params?.applicationId,
      employerId: req?.user?.id
    });

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı veya yetkiniz yok'
      });
    }

    // Update application status
    application.status = 'accepted';
    application.respondedAt = new Date();
    await application?.save();

    // Update job status and selected worker
    await Job?.findByIdAndUpdate(application?.jobId, {
      status: 'in_progress',
      selectedWorkerId: application?.workerId
    });

    // Reject other applications
    await Application?.updateMany(
      { jobId: application?.jobId, _id: { $ne: application?._id } },
      { status: 'rejected', respondedAt: new Date() }
    );

    res?.json({
      success: true,
      message: 'Başvuru kabul edildi',
      data: application
    });
  } catch (error) {
    console.error('Accept application error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru kabul edilirken bir hata oluştu'
    });
  }
};

// @desc    Reject application
// @route   POST /api/applications/:applicationId/reject
// @access  Private (Employer only)
exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application?.findOne({
      _id: req?.params?.applicationId,
      employerId: req?.user?.id
    });

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı veya yetkiniz yok'
      });
    }

    application.status = 'rejected';
    application.respondedAt = new Date();
    await application?.save();

    res?.json({
      success: true,
      message: 'Başvuru reddedildi',
      data: application
    });
  } catch (error) {
    console.error('Reject application error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru reddedilirken bir hata oluştu'
    });
  }
};

// @desc    Withdraw application
// @route   PATCH /api/applications/:applicationId/withdraw
// @access  Private (Worker only)
exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application?.findOne({
      _id: req?.params?.applicationId,
      workerId: req?.user?.id
    });

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı'
      });
    }

    if (application?.status !== 'pending') {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu başvuru geri çekilemez'
      });
    }

    application.status = 'withdrawn';
    await application?.save();

    // Decrement job applications count
    await Job?.findByIdAndUpdate(application?.jobId, {
      $inc: { applicationsCount: -1 }
    });

    res?.json({
      success: true,
      message: 'Başvuru geri çekildi',
      data: application
    });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru geri çekilirken bir hata oluştu'
    });
  }
};

// @desc    Get application by ID
// @route   GET /api/applications/:applicationId
// @access  Private
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application?.findById(req?.params?.applicationId)?.populate('jobId')?.populate('workerId', 'fullName phone')?.populate('employerId', 'fullName phone');

    if (!application) {
      return res?.status(404)?.json({
        success: false,
        message: 'Başvuru bulunamadı'
      });
    }

    // Check if user has permission to view
    if (
      application?.workerId?._id?.toString() !== req?.user?.id &&
      application?.employerId?._id?.toString() !== req?.user?.id
    ) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu başvuruyu görüntüleme yetkiniz yok'
      });
    }

    res?.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application by ID error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Başvuru alınırken bir hata oluştu'
    });
  }
};