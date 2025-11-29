import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const AnalyticsCard = ({ stats }) => {
  const conversionRate = stats?.totalApplications > 0 
    ? ((stats?.totalApplications / stats?.totalJobs) * 100)?.toFixed(1)
    : 0;

  const workerToEmployerRatio = stats?.totalEmployers > 0
    ? (stats?.totalWorkers / stats?.totalEmployers)?.toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
        Platform Analitiği
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Application Rate */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-800 font-semibold">BAŞVURU ORANI</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{conversionRate}%</p>
          <p className="text-xs text-blue-700 mt-1">İlan başına ortalama başvuru</p>
        </div>

        {/* Worker/Employer Ratio */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-800 font-semibold">USTA/İŞVEREN</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{workerToEmployerRatio}:1</p>
          <p className="text-xs text-green-700 mt-1">Usta-işveren oranı</p>
        </div>

        {/* Average Applications Per Job */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-purple-800 font-semibold">ORT. BAŞVURU</span>
          </div>
          <p className="text-3xl font-bold text-purple-900">
            {stats?.totalJobs > 0 ? (stats?.totalApplications / stats?.totalJobs)?.toFixed(1) : 0}
          </p>
          <p className="text-xs text-purple-700 mt-1">İlan başına başvuru</p>
        </div>

        {/* Active Job Ratio */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-yellow-600" />
            <span className="text-xs text-yellow-800 font-semibold">AKTİF ORAN</span>
          </div>
          <p className="text-3xl font-bold text-yellow-900">
            {stats?.totalJobs > 0 ? ((stats?.activeJobs / stats?.totalJobs) * 100)?.toFixed(0) : 0}%
          </p>
          <p className="text-xs text-yellow-700 mt-1">Aktif ilan oranı</p>
        </div>
      </div>
      {/* Detailed Metrics */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers}</p>
          <p className="text-xs text-gray-600">Toplam Kullanıcı</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats?.totalJobs}</p>
          <p className="text-xs text-gray-600">Toplam İlan</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats?.totalApplications}</p>
          <p className="text-xs text-gray-600">Toplam Başvuru</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats?.averageRating}</p>
          <p className="text-xs text-gray-600">Ortalama Rating</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;