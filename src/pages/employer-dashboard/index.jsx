import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import JobPostingCard from './components/JobPostingCard';

import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import { jobsAPI, employersAPI, applicationsAPI } from '../../utils/api';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    jobs: [],
    applications: [],
    stats: {
      activeJobs: 0,
      totalApplications: 0,
      pendingReviews: 0,
      hiredWorkers: 0
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          throw new Error('Kullanıcı oturumu bulunamadı');
        }

        console.log('📊 Fetching dashboard data for employer:', userId);

        // Fetch employer profile and dashboard data
        const [profileRes, jobsRes, statsRes] = await Promise.all([
          employersAPI?.getEmployerProfile(userId)?.catch(err => {
            console.warn('⚠️ Profile fetch failed:', err?.message);
            return null;
          }),
          jobsAPI?.getJobsByEmployer(userId)?.catch(err => {
            console.warn('⚠️ Jobs fetch failed:', err?.message);
            return { data: [] };
          }),
          employersAPI?.getDashboardStats(userId)?.catch(err => {
            console.warn('⚠️ Stats fetch failed:', err?.message);
            return { data: { activeJobs: 0, totalApplications: 0, pendingReviews: 0, hiredWorkers: 0 } };
          })
        ]);

        const profile = profileRes?.data;
        const jobs = jobsRes?.data || [];
        const stats = statsRes?.data || {
          activeJobs: jobs?.filter(j => j?.status === 'active')?.length || 0,
          totalApplications: 0,
          pendingReviews: 0,
          hiredWorkers: 0
        };

        // Get all applications for employer's jobs
        const applications = [];
        for (const job of jobs) {
          try {
            const appRes = await applicationsAPI?.getApplicationsByJob(job?._id || job?.id);
            if (appRes?.data) {
              applications?.push(...appRes?.data);
            }
          } catch (err) {
            console.warn(`⚠️ Failed to fetch applications for job ${job?._id}:`, err?.message);
          }
        }

        setDashboardData({
          profile,
          jobs,
          applications,
          stats
        });

        console.log('✅ Dashboard data loaded:', {
          profileExists: !!profile,
          jobsCount: jobs?.length,
          applicationsCount: applications?.length
        });

      } catch (err) {
        console.error('❌ Dashboard data fetch error:', err);
        setError(
          err?.response?.data?.message || 
          err?.userMessage ||
          'Veriler yüklenirken bir hata oluştu'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('companyName');
    localStorage.removeItem('userEmail');
    navigate('/homepage');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedNavigation
          userRole="employer"
          userName={localStorage.getItem('companyName') || localStorage.getItem('userName') || 'İşveren'}
          notificationCount={0}
          onLogout={handleLogout}
        />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedNavigation
          userRole="employer"
          userName={localStorage.getItem('companyName') || localStorage.getItem('userName') || 'İşveren'}
          notificationCount={0}
          onLogout={handleLogout}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
            <p className="text-error mb-4">{error}</p>
            <Button onClick={() => window.location?.reload()}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation
        userRole="employer"
        userName={localStorage.getItem('companyName') || localStorage.getItem('userName') || 'İşveren'}
        notificationCount={dashboardData?.applications?.filter(app => app?.status === 'pending')?.length || 0}
        onLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            İşveren Paneli
          </h1>
          <p className="text-muted-foreground">
            İş ilanlarınızı yönetin ve başvuruları değerlendirin
          </p>
        </div>

        <DashboardStats stats={dashboardData?.stats} />

        <QuickActions
          onCreateJob={() => navigate('/job-creation')}
          onViewAllApplications={() => navigate('/job-detail-view')}
          onManageProfile={() => navigate('/employer-profile-setup')}
          onAction={() => {}} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg mb-6">
              <div className="border-b border-border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/job-creation')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out ${
                      'bg-primary text-primary-foreground' }`}>
                      Yeni İlan
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {dashboardData?.jobs?.length > 0 ? (
                  dashboardData?.jobs?.map((job) => (
                    <JobPostingCard
                      key={job?._id}
                      job={{
                        id: job?._id,
                        title: job?.title,
                        postedDate: new Date(job?.createdAt)?.toLocaleDateString('tr-TR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        }),
                        location: `${job?.location?.city}, ${job?.location?.district}`,
                        salary: `${job?.budget?.min?.toLocaleString()} - ${job?.budget?.max?.toLocaleString()} TL`,
                        status: job?.status,
                        applicationCount: job?.applicationCount || 0,
                        newApplications: job?.newApplications || 0,
                        skills: job?.requiredSkills || []
                      }}
                      onEdit={() => navigate(`/job-creation?id=${job?._id}&mode=edit`)}
                      onClose={() => console.log('Close job:', job?._id)}
                      onViewApplications={() => navigate(`/job-detail-view?id=${job?._id}&mode=employer`)} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Briefcase" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      İlan Bulunamadı
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Henüz hiç iş ilanı oluşturmadınız
                    </p>
                    <Button variant="default" iconName="Plus" onClick={() => navigate('/job-creation')}>
                      Yeni İlan Oluştur
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RecentActivity activities={[]} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;