import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import MetricsCard from './components/MetricsCard';
import FilterPanel from './components/FilterPanel';
import JobCard from './components/JobCard';
import NotificationPanel from './components/NotificationPanel';
import PortfolioQuickView from './components/PortfolioQuickView';
import ApplicationStatusCard from './components/ApplicationStatusCard';
import Button from '../../components/ui/Button';
import { jobsAPI, workersAPI, applicationsAPI } from '../../utils/api';
import Icon from '../../components/AppIcon';


const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    nearbyJobs: [],
    applications: [],
    stats: {
      totalApplications: 0,
      pendingApplications: 0,
      acceptedApplications: 0,
      profileViews: 0
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

        console.log('📊 Fetching dashboard data for worker:', userId);

        // Fetch worker profile and dashboard data
        const [profileRes, jobsRes, applicationsRes] = await Promise.all([
          workersAPI?.getWorkerProfile(userId)?.catch(err => {
            console.warn('⚠️ Profile fetch failed:', err?.message);
            return null;
          }),
          jobsAPI?.getAllJobs({ limit: 20, nearby: true })?.catch(err => {
            console.warn('⚠️ Jobs fetch failed:', err?.message);
            return { data: [] };
          }),
          applicationsAPI?.getApplicationsByWorker(userId)?.catch(err => {
            console.warn('⚠️ Applications fetch failed:', err?.message);
            return { data: [] };
          })
        ]);

        const profile = profileRes?.data;
        const jobs = jobsRes?.data || [];
        const applications = applicationsRes?.data || [];

        // Calculate stats
        const stats = {
          totalApplications: applications?.length || 0,
          pendingApplications: applications?.filter(app => app?.status === 'pending')?.length || 0,
          acceptedApplications: applications?.filter(app => app?.status === 'accepted')?.length || 0,
          profileViews: profile?.profileViews || 0
        };

        setDashboardData({
          profile,
          nearbyJobs: jobs,
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
    localStorage.removeItem('userEmail');
    navigate('/homepage');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedNavigation
          userRole="worker"
          userName={localStorage.getItem('userName') || 'Kullanıcı'}
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
          userRole="worker"
          userName={localStorage.getItem('userName') || 'Kullanıcı'}
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
        userRole="worker"
        userName={localStorage.getItem('userName') || 'Kullanıcı'}
        notificationCount={dashboardData?.applications?.filter(app => app?.status === 'pending')?.length || 0}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Hoş Geldiniz, {localStorage.getItem('userName') || 'Kullanıcı'}
          </h1>
          <p className="text-muted-foreground">
            Becerilerinize uygun iş fırsatlarını keşfedin ve başvurularınızı yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            icon="Briefcase"
            label="Aktif Başvurular"
            value={dashboardData?.applications?.filter(a => a?.status === 'pending')?.length?.toString() || "0"}
            subValue={`${dashboardData?.applications?.filter(a => a?.status === 'pending')?.length || 0} onay bekliyor`}
            color="primary"
            trend={0}
          />

          <MetricsCard
            icon="CheckCircle2"
            label="Tamamlanan İşler"
            value={dashboardData?.applications?.filter(a => a?.status === 'completed')?.length?.toString() || "0"}
            subValue="Son 6 ay"
            trend={0}
            color="success"
          />

          <MetricsCard
            icon="Star"
            label="Güvenilirlik Skoru"
            value="0.0"
            subValue="Henüz değerlendirme yok"
            trend={0}
            color="warning"
          />

          <MetricsCard
            icon="TrendingUp"
            label="Ortalama Kazanç"
            value="0 TL"
            subValue="Aylık ortalama"
            trend={0}
            color="accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <FilterPanel
              filters={dashboardData?.stats || {}}
              onFilterChange={() => {}}
              onResetFilters={() => {}}
            />

            <div className="mb-4">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Size Uygun İş İlanları
              </h2>
              {dashboardData?.nearbyJobs?.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {dashboardData?.nearbyJobs?.map((job) => (
                      <JobCard
                        key={job?.id}
                        job={job}
                        onViewDetails={() => {}}
                        onApply={() => {}}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" iconName="ChevronDown">
                      Daha Fazla İlan Göster
                    </Button>
                  </div>
                </>
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Icon name="Briefcase" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Henüz İş İlanı Bulunmuyor
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Şu anda size uygun aktif iş ilanı bulunmamaktadır. Lütfen daha sonra tekrar kontrol edin.
                  </p>
                  <Button variant="outline" onClick={() => {}}>
                    Filtreleri Sıfırla
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {dashboardData?.applications?.length > 0 && (
              <NotificationPanel
                notifications={dashboardData?.applications?.filter(app => app?.status === 'pending')}
                onMarkAsRead={() => {}}
                onViewAll={() => {}}
              />
            )}

            <PortfolioQuickView
              portfolio={dashboardData?.profile?.portfolio || {
                totalImages: 0,
                verifiedImages: 0,
                pendingVerification: 0,
                completionRate: 0,
                recentImages: []
              }}
              onManagePortfolio={() => {}}
            />

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Başvuru Durumları
              </h3>
              {dashboardData?.applications?.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData?.applications?.map((application) => (
                    <ApplicationStatusCard
                      key={application?.id}
                      application={application}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="FileText" size={40} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Henüz başvuru yapmadınız
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-semibold text-foreground mb-1">
                    Portfolyonuzu Güçlendirin
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Daha fazla doğrulanmış fotoğraf ekleyerek iş bulma şansınızı artırın
                  </p>
                  <Button variant="default" size="sm" onClick={() => {}} iconName="Upload">
                    Fotoğraf Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerDashboard;