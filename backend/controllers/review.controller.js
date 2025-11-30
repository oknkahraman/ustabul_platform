const Review = require('../models/Review.model');
const Job = require('../models/Job.model');
const WorkerProfile = require('../models/WorkerProfile.model');
const EmployerProfile = require('../models/EmployerProfile.model');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { jobId, revieweeId, reviewerType, rating, aspects, comment } = req?.body;

    // Verify job is completed
    const job = await Job?.findById(jobId);
    if (!job || job?.status !== 'completed') {
      return res?.status(400)?.json({
        success: false,
        message: 'Sadece tamamlanmış işler için değerlendirme yapılabilir'
      });
    }

    // Verify reviewer is part of the job
    if (reviewerType === 'employer' && job?.employerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu iş için değerlendirme yapma yetkiniz yok'
      });
    }

    if (reviewerType === 'worker' && job?.selectedWorkerId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu iş için değerlendirme yapma yetkiniz yok'
      });
    }

    // Check if review already exists
    const existingReview = await Review?.findOne({
      jobId,
      reviewerId: req?.user?.id,
      revieweeId
    });

    if (existingReview) {
      return res?.status(400)?.json({
        success: false,
        message: 'Bu iş için zaten değerlendirme yaptınız'
      });
    }

    // Create review
    const review = await Review?.create({
      jobId,
      reviewerId: req?.user?.id,
      revieweeId,
      reviewerType,
      rating,
      aspects,
      comment
    });

    // Update reviewee's rating
    await updateUserRating(revieweeId, reviewerType === 'employer' ? 'worker' : 'employer');

    res?.status(201)?.json({
      success: true,
      message: 'Değerlendirme gönderildi',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Değerlendirme gönderilirken bir hata oluştu'
    });
  }
};

// @desc    Get user reviews
// @route   GET /api/reviews/user/:userId
// @access  Private
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review?.find({ revieweeId: req?.params?.userId, isPublic: true })?.populate('reviewerId', 'fullName')?.populate('jobId', 'title')?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: reviews?.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Değerlendirmeler alınırken bir hata oluştu'
    });
  }
};

// @desc    Get job reviews
// @route   GET /api/reviews/job/:jobId
// @access  Private
exports.getJobReviews = async (req, res) => {
  try {
    const reviews = await Review?.find({ jobId: req?.params?.jobId, isPublic: true })?.populate('reviewerId', 'fullName')?.populate('revieweeId', 'fullName')?.sort({ createdAt: -1 });

    res?.json({
      success: true,
      count: reviews?.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get job reviews error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Değerlendirmeler alınırken bir hata oluştu'
    });
  }
};

// @desc    Add response to review
// @route   PUT /api/reviews/:reviewId/response
// @access  Private
exports.addResponse = async (req, res) => {
  try {
    const { text } = req?.body;

    const review = await Review?.findById(req?.params?.reviewId);

    if (!review) {
      return res?.status(404)?.json({
        success: false,
        message: 'Değerlendirme bulunamadı'
      });
    }

    // Only reviewee can respond
    if (review?.revieweeId?.toString() !== req?.user?.id) {
      return res?.status(403)?.json({
        success: false,
        message: 'Bu değerlendirmeye yanıt verme yetkiniz yok'
      });
    }

    review.response = {
      text,
      createdAt: new Date()
    };
    await review?.save();

    res?.json({
      success: true,
      message: 'Yanıt eklendi',
      data: review
    });
  } catch (error) {
    console.error('Add response error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Yanıt eklenirken bir hata oluştu'
    });
  }
};

// @desc    Report review
// @route   POST /api/reviews/:reviewId/report
// @access  Private
exports.reportReview = async (req, res) => {
  try {
    const { reason } = req?.body;

    const review = await Review?.findById(req?.params?.reviewId);

    if (!review) {
      return res?.status(404)?.json({
        success: false,
        message: 'Değerlendirme bulunamadı'
      });
    }

    review.reported = true;
    review.reportReason = reason;
    await review?.save();

    res?.json({
      success: true,
      message: 'Değerlendirme raporlandı'
    });
  } catch (error) {
    console.error('Report review error:', error);
    res?.status(500)?.json({
      success: false,
      message: 'Değerlendirme raporlanırken bir hata oluştu'
    });
  }
};

// Helper function to update user rating
async function updateUserRating(userId, userType) {
  try {
    const reviews = await Review?.find({ revieweeId: userId });
    
    if (reviews?.length === 0) return;

    const totalRating = reviews?.reduce((sum, review) => sum + review?.rating, 0);
    const averageRating = totalRating / reviews?.length;

    const updateData = {
      'rating.average': averageRating,
      'rating.count': reviews?.length
    };

    if (userType === 'worker') {
      await WorkerProfile?.findOneAndUpdate({ userId }, updateData);
    } else {
      await EmployerProfile?.findOneAndUpdate({ userId }, updateData);
    }
  } catch (error) {
    console.error('Update user rating error:', error);
  }
}