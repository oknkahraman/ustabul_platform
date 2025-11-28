import React from 'react';
import { CheckCircle, Image as ImageIcon, FileText } from 'lucide-react';

const QualityAssessment = ({ items }) => {
  const assessQuality = (item) => {
    const scores = {
      imageQuality: item?.imageQuality >= 90 ? 100 : item?.imageQuality,
      hasDescription: item?.description?.length >= 50 ? 100 : (item?.description?.length / 50) * 100,
      hasTags: (item?.tags?.length / 5) * 100,
      verified: item?.verified ? 100 : 0
    };

    const totalScore = Object.values(scores)?.reduce((a, b) => a + b, 0) / 4;
    return Math.round(totalScore);
  };

  const averageQuality = items?.length > 0
    ? Math.round(items?.reduce((sum, item) => sum + assessQuality(item), 0) / items?.length)
    : 0;

  const needsImprovement = items?.filter(item => assessQuality(item) < 70);
  const excellent = items?.filter(item => assessQuality(item) >= 90);

  const suggestions = [
    {
      id: 1,
      icon: ImageIcon,
      text: 'Yüksek çözünürlüklü fotoğraflar kullanın',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      icon: FileText,
      text: 'Detaylı açıklamalar ekleyin',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      id: 3,
      icon: CheckCircle,
      text: 'İşlerinizi doğrulatın',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Kalite Değerlendirmesi</h2>
      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Genel Kalite Skoru</span>
          <span className="text-2xl font-bold text-gray-900">%{averageQuality}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              averageQuality >= 80 ? 'bg-green-500' :
              averageQuality >= 60 ? 'bg-yellow-500': 'bg-red-500'
            }`}
            style={{ width: `${averageQuality}%` }}
          />
        </div>
      </div>
      {/* Quality Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Mükemmel Kalite</span>
          <span className="text-sm font-semibold text-green-600">{excellent?.length} iş</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">İyileştirme Gerekli</span>
          <span className="text-sm font-semibold text-orange-600">{needsImprovement?.length} iş</span>
        </div>
      </div>
      {/* Suggestions */}
      {needsImprovement?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">İyileştirme Önerileri</h3>
          <div className="space-y-2">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion?.id}
                className={`flex items-center gap-3 p-3 ${suggestion?.bg} rounded-lg`}
              >
                <suggestion.icon size={20} className={suggestion?.color} />
                <span className="text-sm text-gray-700">{suggestion?.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {needsImprovement?.length === 0 && items?.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
          <CheckCircle size={20} className="text-green-600" />
          <span className="text-sm text-green-700">Portfolyonuz harika durumda!</span>
        </div>
      )}
    </div>
  );
};

export default QualityAssessment;