import React from 'react';
import { TrendingUp, Star, Award, CheckCircle } from 'lucide-react';

const RatingAnalytics = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Değerlendirme İstatistikleri</h2>
      {/* Overall Rating */}
      <div className="mb-6 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Genel Puan</span>
          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <span className="text-2xl font-bold text-gray-900">{stats?.averageRating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{stats?.totalReviews} değerlendirme</span>
          <span className="flex items-center gap-1 text-green-600">
            <TrendingUp size={14} />
            {stats?.recentTrend}
          </span>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-blue-600" />
            <span className="text-sm text-gray-700">Doğrulanmış</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {stats?.verifiedReviews}/{stats?.totalReviews}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm text-gray-700">Yanıt Oranı</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">%{stats?.responseRate}</span>
        </div>
      </div>
      {/* Rating Distribution */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Puan Dağılımı</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((rating) => {
            const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-8">{rating} yıldız</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-10 text-right">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Trust Badge */}
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Award size={24} className="text-blue-600" />
          <span className="font-semibold text-gray-900">Güvenilir Çalışan</span>
        </div>
        <p className="text-xs text-gray-600">
          Yüksek puanınız sayesinde platform güven rozetine sahipsiniz
        </p>
      </div>
    </div>
  );
};

export default RatingAnalytics;