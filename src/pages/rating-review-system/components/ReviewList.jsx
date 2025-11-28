import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Award, MoreVertical } from 'lucide-react';

const ReviewList = ({ reviews, type, title }) => {
  const [expandedReview, setExpandedReview] = useState(null);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {reviews?.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">Henüz değerlendirme bulunmuyor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews?.map((review) => (
            <div key={review?.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                  <img
                    src={type === 'received' ? review?.reviewerAvatar : review?.reviewedAvatar}
                    alt={type === 'received' ? review?.reviewerName : review?.reviewedName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {type === 'received' ? review?.reviewerName : review?.reviewedName}
                      </h3>
                      {review?.verified && (
                        <Award size={16} className="text-blue-600" title="Doğrulanmış" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{review?.jobTitle}</p>
                    <p className="text-xs text-gray-500">{formatDate(review?.date)}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(review?.rating)}
                  <span className="text-sm font-semibold text-gray-900">{review?.rating}/5</span>
                </div>
                
                {/* Detailed Ratings */}
                {expandedReview === review?.id && (
                  <div className="grid grid-cols-3 gap-4 mt-3 p-3 bg-gray-50 rounded-lg">
                    {type === 'received' ? (
                      <>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Ödeme Zamanlaması</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.paymentTimeliness)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">İletişim</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.communication)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Çalışma Ortamı</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.workEnvironment)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">İş Kalitesi</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.skillQuality)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Güvenilirlik</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.reliability)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Profesyonellik</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review?.professionalism)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Comment */}
              {review?.comment && (
                <p className="text-gray-700 mb-3">{review?.comment}</p>
              )}

              {/* Response (if exists) */}
              {review?.response && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-gray-900 mb-1">Yanıt</p>
                  <p className="text-sm text-gray-700 mb-1">{review?.response?.text}</p>
                  <p className="text-xs text-gray-500">{formatDate(review?.response?.date)}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => setExpandedReview(expandedReview === review?.id ? null : review?.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {expandedReview === review?.id ? 'Daha Az Göster' : 'Detayları Göster'}
                </button>
                {type === 'received' && review?.helpful !== undefined && (
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                      <ThumbsUp size={14} />
                      <span>Yararlı ({review?.helpful})</span>
                    </button>
                  </div>
                )}
                {type === 'received' && !review?.response && (
                  <button className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                    Yanıtla
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;