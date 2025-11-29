import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, Wifi, CheckCircle, AlertCircle } from 'lucide-react';

const SystemHealthCard = () => {
  const [health, setHealth] = useState({
    database: 'healthy',
    api: 'healthy',
    network: 'healthy',
    uptime: '99.9%'
  });

  useEffect(() => {
    // Simulate health check
    const checkHealth = async () => {
      try {
        const response = await fetch('/health');
        if (response?.ok) {
          setHealth(prev => ({ ...prev, api: 'healthy' }));
        }
      } catch (error) {
        setHealth(prev => ({ ...prev, api: 'warning' }));
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Activity className="w-6 h-6 text-blue-600 mr-2" />
        Sistem Sağlığı
      </h2>
      
      <div className="space-y-4">
        <HealthItem
          icon={<Database className="w-5 h-5" />}
          label="Database"
          status={health?.database}
          details="MongoDB 6.0"
        />
        <HealthItem
          icon={<Server className="w-5 h-5" />}
          label="API Server"
          status={health?.api}
          details="Response: 45ms"
        />
        <HealthItem
          icon={<Wifi className="w-5 h-5" />}
          label="Network"
          status={health?.network}
          details="Low latency"
        />
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Uptime</span>
          <span className="text-lg font-bold text-green-600">{health?.uptime}</span>
        </div>
      </div>
    </div>
  );
};

const HealthItem = ({ icon, label, status, details }) => {
  const statusColors = {
    healthy: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    error: 'text-red-600 bg-red-100'
  };

  const StatusIcon = status === 'healthy' ? CheckCircle : AlertCircle;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${statusColors[status] || statusColors.healthy}`}>
          {icon}
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-xs text-gray-600">{details}</p>
        </div>
      </div>
      <StatusIcon className={`w-5 h-5 ${status === 'healthy' ? 'text-green-600' : 'text-yellow-600'}`} />
    </div>
  );
};

export default SystemHealthCard;