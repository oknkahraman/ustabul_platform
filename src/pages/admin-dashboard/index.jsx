import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, AlertCircle, TrendingUp, MapPin, Activity } from 'lucide-react';
import AuthenticatedNavigation from 'components/navigation/AuthenticatedNavigation';
import SystemHealthCard from './components/SystemHealthCard';
import UserManagementCard from './components/UserManagementCard';
import JobMonitoringCard from './components/JobMonitoringCard';
import AnalyticsCard from './components/AnalyticsCard';
import api from 'utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWorkers: 0,
    totalEmployers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    averageRating: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [locationStats, setLocationStats] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login-registration');
  };

  useEffect(() => {
    // Check admin authorization
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.role || user?.role !== 'admin') {
      navigate('/login-registration');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data
      const [usersRes, jobsRes, applicationsRes] = await Promise.all([
        api?.get('/admin/users'),
        api?.get('/admin/jobs'),
        api?.get('/admin/applications')
      ]);

      // Calculate stats
      const users = usersRes?.data?.users || [];
      const jobs = jobsRes?.data?.jobs || [];
      const applications = applicationsRes?.data?.applications || [];

      const workers = users?.filter(u => u?.role === 'worker');
      const employers = users?.filter(u => u?.role === 'employer');
      const activeJobs = jobs?.filter(j => j?.status === 'active');
      const pendingApps = applications?.filter(a => a?.status === 'pending');

      // Calculate location stats
      const locationMap = {};
      jobs?.forEach(job => {
        const city = job?.location?.city || 'Unknown';
        locationMap[city] = (locationMap?.[city] || 0) + 1;
      });

      const locationStatsData = Object.entries(locationMap)?.map(([city, count]) => ({ city, count }))?.sort((a, b) => b?.count - a?.count)?.slice(0, 5);

      setStats({
        totalUsers: users?.length || 0,
        totalWorkers: workers?.length || 0,
        totalEmployers: employers?.length || 0,
        totalJobs: jobs?.length || 0,
        activeJobs: activeJobs?.length || 0,
        totalApplications: applications?.length || 0,
        pendingApplications: pendingApps?.length || 0,
        averageRating: 4.5 // Mock data - calculate from actual ratings
      });

      setRecentUsers(users?.slice(0, 5) || []);
      setRecentJobs(jobs?.slice(0, 5) || []);
      setLocationStats(locationStatsData);

    } catch (error) {
      console.error('Dashboard data loading error:', error);
      if (error?.response?.status === 401) {
        navigate('/login-registration');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedNavigation onLogout={handleLogout} />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavigation onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform yönetimi ve sistem izleme paneli</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Toplam Kullanıcı"
            value={stats?.totalUsers}
            icon={<Users className="w-8 h-8 text-blue-600" />}
            trend="+12%"
            trendUp={true}
          />
          <MetricCard
            title="Aktif İlanlar"
            value={stats?.activeJobs}
            icon={<Briefcase className="w-8 h-8 text-green-600" />}
            trend="+8%"
            trendUp={true}
          />
          <MetricCard
            title="Bekleyen Başvurular"
            value={stats?.pendingApplications}
            icon={<AlertCircle className="w-8 h-8 text-yellow-600" />}
            trend="-5%"
            trendUp={false}
          />
          <MetricCard
            title="Ortalama Rating"
            value={stats?.averageRating?.toFixed(1)}
            icon={<TrendingUp className="w-8 h-8 text-purple-600" />}
            trend="+0.3"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Health */}
          <div className="lg:col-span-1">
            <SystemHealthCard />
          </div>

          {/* Location Analytics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                Lokasyon Dağılımı
              </h2>
              <div className="space-y-4">
                {locationStats?.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{location?.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-4">{location?.count} ilan</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(location?.count / stats?.totalJobs) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Management & Job Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UserManagementCard users={recentUsers} totalWorkers={stats?.totalWorkers} totalEmployers={stats?.totalEmployers} />
          <JobMonitoringCard jobs={recentJobs} activeCount={stats?.activeJobs} />
        </div>

        {/* Analytics */}
        <AnalyticsCard stats={stats} />

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="w-6 h-6 text-blue-600 mr-2" />
            Son Aktiviteler
          </h2>
          <div className="space-y-4">
            {recentJobs?.slice(0, 3)?.map((job, index) => (
              <div key={index} className="flex items-start justify-between border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{job?.title}</h3>
                    <p className="text-sm text-gray-600">{job?.location?.city} - {job?.applicationCount || 0} başvuru</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{new Date(job?.createdAt)?.toLocaleDateString('tr-TR')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="ml-4">{icon}</div>
    </div>
    <div className={`flex items-center text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
      <TrendingUp className={`w-4 h-4 mr-1 ${!trendUp && 'transform rotate-180'}`} />
      <span>{trend} son 30 gün</span>
    </div>
  </div>
);

export default AdminDashboard;