import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const RatingForm = ({ job, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    paymentTimeliness: 0,
    communication: 0,
    workEnvironment: 0
  });
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState({});

  const ratingCategories = [
    { key: 'paymentTimeliness', label: 'Ödeme Zamanlaması', description: 'Ödemeler zamanında yapıldı mı?' },
    { key: 'communication', label: 'İletişim', description: 'İletişim kalitesi nasıldı?' },
    { key: 'workEnvironment', label: 'Çalışma Ortamı', description: 'Çalışma koşulları uygun muydu?' }
  ];

  const handleRatingClick = (category, value) => {
    const newRatings = { ...ratings, [category]: value };
    
    // Calculate overall as average
    if (category !== 'overall') {
      const sum = ratingCategories?.reduce((acc, cat) => acc + (newRatings?.[cat?.key] || 0), 0);
      newRatings.overall = Math.round(sum / ratingCategories?.length);
    }
    
    setRatings(newRatings);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (ratings?.overall === 0) {
      alert('Lütfen en az bir kategoriyi değerlendirin');
      return;
    }
    
    onSubmit({
      jobId: job?.id,
      ratings,
      comment,
      date: new Date()?.toISOString()
    });
  };

  const StarRating = ({ category, value, label, description }) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            {description && (
              <p className="text-xs text-gray-600 mt-1">{description}</p>
            )}
          </div>
          {value > 0 && (
            <span className="text-sm font-semibold text-gray-900">{value}/5</span>
          )}
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(category, star)}
              onMouseEnter={() => setHoveredRating({ ...hoveredRating, [category]: star })}
              onMouseLeave={() => setHoveredRating({ ...hoveredRating, [category]: 0 })}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={
                  star <= (hoveredRating?.[category] || value)
                    ? 'fill-yellow-400 text-yellow-400' :'text-gray-300'
                }
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">İşvereni Değerlendir</h2>
            <p className="text-sm text-gray-600 mt-1">{job?.jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Overall Rating */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <StarRating
              category="overall"
              value={ratings?.overall}
              label="Genel Değerlendirme"
              description="Bu işverenle çalışma deneyiminizi genel olarak nasıl değerlendirirsiniz?"
            />
          </div>

          {/* Category Ratings */}
          <div className="space-y-6 mb-6">
            {ratingCategories?.map((category) => (
              <StarRating
                key={category?.key}
                category={category?.key}
                value={ratings?.[category?.key]}
                label={category?.label}
                description={category?.description}
              />
            ))}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Yorumunuz (İsteğe Bağlı)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e?.target?.value)}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Deneyiminizi detaylı olarak paylaşın..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment?.length}/500 karakter
            </p>
          </div>

          {/* Guidelines */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Değerlendirme Kuralları</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Değerlendirmeler yalnızca tamamlanan işler için yapılabilir</li>
              <li>• Adil ve yapıcı değerlendirmeler yapın</li>
              <li>• Kişisel bilgi veya saldırgan içerik paylaşmayın</li>
              <li>• Değerlendirmeler moderasyon sürecinden geçecektir</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={ratings?.overall === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Değerlendirmeyi Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;