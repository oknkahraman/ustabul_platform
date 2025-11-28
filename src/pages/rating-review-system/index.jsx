import React, { useState } from 'react';
import { Star, MessageSquare, Award } from 'lucide-react';
import RatingForm from './components/RatingForm';
import ReviewList from './components/ReviewList';
import RatingAnalytics from './components/RatingAnalytics';
import DisputeResolution from './components/DisputeResolution';

const RatingReviewSystem = () => {
  const [activeTab, setActiveTab] = useState('received'); // received, given, pending
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedJobForRating, setSelectedJobForRating] = useState(null);

  // Mock data for reviews received
  const reviewsReceived = [
    {
      id: 1,
      reviewerName: 'Mehmet Yılmaz',
      reviewerType: 'employer',
      reviewerAvatar: 'https://ui-avatars.com/api/?name=Mehmet+Yilmaz&background=0D8ABC&color=fff',
      jobTitle: 'Ofis Elektrik Tesisatı',
      rating: 5,
      paymentTimeliness: 5,
      communication: 5,
      workEnvironment: 4,
      comment: 'Çok profesyonel bir çalışma oldu. Zamanında ödeme yaptı, iletişim kusursuzdu.',
      date: '2025-01-20',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      reviewerName: 'Ayşe Kaya',
      reviewerType: 'employer',
      reviewerAvatar: 'https://ui-avatars.com/api/?name=Ayse+Kaya&background=059669&color=fff',
      jobTitle: 'Bahçe Peyzaj Düzenlemesi',
      rating: 4,
      paymentTimeliness: 4,
      communication: 5,
      workEnvironment: 4,
      comment: 'İletişim çok iyiydi. Tek sorun ödemenin biraz gecikmesiydi.',
      date: '2025-01-15',
      verified: true,
      helpful: 8
    }
  ];

  // Mock data for reviews given
  const reviewsGiven = [
    {
      id: 3,
      reviewedName: 'ABC İnşaat Ltd.',
      reviewedType: 'employer',
      reviewedAvatar: 'https://ui-avatars.com/api/?name=ABC+Insaat&background=7C3AED&color=fff',
      jobTitle: 'Bina Elektrik Revizyonu',
      rating: 3,
      skillQuality: 4,
      reliability: 3,
      professionalism: 3,
      comment: 'İş kalitesi iyiydi ama ödeme çok geç yapıldı.',
      date: '2025-01-18',
      response: {
        text: 'Özür dileriz, muhasebe departmanında yaşanan gecikme için. Durumu düzelttik.',
        date: '2025-01-19'
      }
    }
  ];

  // Mock data for pending reviews
  const pendingReviews = [
    {
      id: 4,
      jobTitle: 'Mutfak Dolabı Montajı',
      employerName: 'Zeynep Demir',
      completedDate: '2025-01-25',
      type: 'employer'
    },
    {
      id: 5,
      jobTitle: 'Villa Boya İşleri',
      employerName: 'Ahmet Şahin',
      completedDate: '2025-01-24',
      type: 'employer'
    }
  ];

  const overallStats = {
    averageRating: 4.6,
    totalReviews: 23,
    verifiedReviews: 20,
    responseRate: 95,
    recentTrend: '+0.3'
  };

  const handleStartRating = (job) => {
    setSelectedJobForRating(job);
    setShowRatingForm(true);
  };

  const handleSubmitRating = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    setShowRatingForm(false);
    setSelectedJobForRating(null);
    // In real app, this would update the backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Değerlendirme Sistemi</h1>
              <p className="text-gray-600 mt-1">Güven ve şeffaflık için karşılıklı değerlendirme</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
                <Star className="fill-yellow-400 text-yellow-400" size={24} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{overallStats?.averageRating}</p>
                  <p className="text-xs text-gray-600">{overallStats?.totalReviews} değerlendirme</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'received' ?'bg-blue-100 text-blue-700 font-medium' :'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star size={18} />
              Aldığım Değerlendirmeler ({reviewsReceived?.length})
            </button>
            <button
              onClick={() => setActiveTab('given')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'given' ?'bg-blue-100 text-blue-700 font-medium' :'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={18} />
              Verdiğim Değerlendirmeler ({reviewsGiven?.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'pending' ?'bg-blue-100 text-blue-700 font-medium' :'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Award size={18} />
              Bekleyen Değerlendirmeler ({pendingReviews?.length})
            </button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'received' && (
              <ReviewList 
                reviews={reviewsReceived}
                type="received"
                title="Aldığım Değerlendirmeler"
              />
            )}
            
            {activeTab === 'given' && (
              <ReviewList 
                reviews={reviewsGiven}
                type="given"
                title="Verdiğim Değerlendirmeler"
              />
            )}
            
            {activeTab === 'pending' && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Bekleyen Değerlendirmeler
                </h2>
                <div className="space-y-4">
                  {pendingReviews?.map((job) => (
                    <div key={job?.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{job?.jobTitle}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">{job?.employerName}</span> ile tamamlandı
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Tamamlanma: {new Date(job.completedDate)?.toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <button
                          onClick={() => handleStartRating(job)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-4"
                        >
                          Değerlendir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Analytics & Dispute */}
          <div className="lg:col-span-1">
            <RatingAnalytics stats={overallStats} />
            <DisputeResolution />
          </div>
        </div>
      </div>
      {/* Rating Form Modal */}
      {showRatingForm && (
        <RatingForm
          job={selectedJobForRating}
          onClose={() => {
            setShowRatingForm(false);
            setSelectedJobForRating(null);
          }}
          onSubmit={handleSubmitRating}
        />
      )}
    </div>
  );
};

export default RatingReviewSystem;