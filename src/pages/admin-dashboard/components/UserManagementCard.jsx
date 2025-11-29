import React from 'react';
import { Users, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const UserManagementCard = ({ users, totalWorkers, totalEmployers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Users className="w-6 h-6 text-blue-600 mr-2" />
        Kullanıcı Yönetimi
      </h2>

      {/* User Type Distribution */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">İşçiler</span>
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalWorkers}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">İşverenler</span>
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{totalEmployers}</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Son Kayıtlar</h3>
        {users?.map((user, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user?.role === 'worker' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <Users className={`w-5 h-5 ${
                  user?.role === 'worker' ? 'text-blue-600' : 'text-green-600'
                }`} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{user?.fullName || 'Unknown'}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs px-2 py-1 rounded-full ${
                user?.role === 'worker' ?'bg-blue-100 text-blue-800' :'bg-green-100 text-green-800'
              }`}>
                {user?.role === 'worker' ? 'Usta' : 'İşveren'}
              </span>
              {user?.isVerified ? (
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementCard;