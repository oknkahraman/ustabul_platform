import React from 'react';
import { TrendingUp, Users, Eye, Award } from 'lucide-react';

const PortfolioAnalytics = ({ items }) => {
  const totalViews = items?.reduce((sum, item) => sum + item?.views, 0);
  const totalApplications = items?.reduce((sum, item) => sum + item?.applications, 0);
  const conversionRate = totalViews > 0 ? ((totalApplications / totalViews) * 100)?.toFixed(1) : 0;
  
  const topPerforming = items?.length > 0 
    ? items?.reduce((prev, current) => (prev?.views > current?.views) ? prev : current)
    : null;

  const skillDemand = items?.reduce((acc, item) => {
    acc[item.category] = (acc?.[item?.category] || 0) + item?.applications;
    return acc;
  }, {});

  const topSkill = Object.entries(skillDemand)?.sort((a, b) => b?.[1] - a?.[1])?.[0];

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Performans Analizi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Eye size={20} />
            <span className="text-sm font-medium">Toplam Görüntülenme</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
          <p className="text-sm text-gray-600 mt-1">
            İş başına ortalama {items?.length > 0 ? Math.round(totalViews / items?.length) : 0}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Users size={20} />
            <span className="text-sm font-medium">Dönüşüm Oranı</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">%{conversionRate}</p>
          <p className="text-sm text-gray-600 mt-1">
            {totalApplications} başvuru / {totalViews} görüntülenme
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">En Çok Talep Gören</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {topSkill ? topSkill?.[0] : '-'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {topSkill ? `${topSkill?.[1]} başvuru` : 'Veri yok'}
          </p>
        </div>
      </div>
      {topPerforming && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-yellow-600" />
            <h3 className="font-semibold text-gray-900">En İyi Performans</h3>
          </div>
          <p className="text-gray-700">
            <span className="font-medium">{topPerforming?.title}</span> - {topPerforming?.views} görüntülenme, {topPerforming?.applications} başvuru
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Bu tür işlere odaklanmak daha fazla fırsat getirebilir
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalytics;