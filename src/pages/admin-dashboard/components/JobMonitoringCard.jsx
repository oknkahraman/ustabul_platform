import React from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, AlertCircle } from 'lucide-react';

const JobMonitoringCard = ({ jobs, activeCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
        İş İlanı İzleme
      </h2>

      {/* Job Status Distribution */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Aktif</p>
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Beklemede</p>
          <p className="text-2xl font-bold text-yellow-600">{jobs?.filter(j => j?.status === 'draft')?.length || 0}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Kapalı</p>
          <p className="text-2xl font-bold text-gray-600">{jobs?.filter(j => j?.status === 'closed')?.length || 0}</p>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Son İlanlar</h3>
        {jobs?.map((job, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 flex-1">{job?.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                job?.status === 'active' ?'bg-green-100 text-green-800' 
                  : job?.status === 'draft' ?'bg-yellow-100 text-yellow-800' :'bg-gray-100 text-gray-800'
              }`}>
                {job?.status === 'active' ? 'Aktif' : job?.status === 'draft' ? 'Taslak' : 'Kapalı'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {job?.location?.city}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                {job?.salary?.min}-{job?.salary?.max} TL
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(job?.createdAt)?.toLocaleDateString('tr-TR')}
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {job?.applicationCount || 0} başvuru
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobMonitoringCard;