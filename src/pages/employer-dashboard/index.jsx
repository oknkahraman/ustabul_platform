import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import JobPostingCard from './components/JobPostingCard';
import ApplicationCard from './components/ApplicationCard';
import DashboardStats from './components/DashboardStats';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobFilter, setJobFilter] = useState('all');
  const [applicationFilter, setApplicationFilter] = useState('pending');

  const mockStats = {
    activeJobs: 8,
    activeJobsTrend: 12,
    totalApplications: 47,
    applicationsTrend: 23,
    hiredWorkers: 15,
    hiredTrend: 8,
    pendingApprovals: 12
  };

  const mockJobs = [
  {
    id: 1,
    title: "Deneyimli Kaynak Ustası",
    postedDate: "15 Kasım 2025",
    location: "Gebze OSB, Kocaeli",
    salary: "18.000 - 22.000 TL",
    status: "active",
    applicationCount: 12,
    newApplications: 3,
    skills: ["TIG Kaynağı", "MIG Kaynağı", "Paslanmaz Çelik"]
  },
  {
    id: 2,
    title: "CNC Torna Operatörü",
    postedDate: "18 Kasım 2025",
    location: "İkitelli OSB, İstanbul",
    salary: "16.000 - 20.000 TL",
    status: "active",
    applicationCount: 8,
    newApplications: 2,
    skills: ["CNC Torna", "Fanuc Kontrol", "Teknik Resim"]
  },
  {
    id: 3,
    title: "Endüstriyel Elektrikçi",
    postedDate: "20 Kasım 2025",
    location: "Tuzla OSB, İstanbul",
    salary: "15.000 - 19.000 TL",
    status: "active",
    applicationCount: 15,
    newApplications: 5,
    skills: ["Endüstriyel Elektrik", "PLC", "Otomasyon"]
  },
  {
    id: 4,
    title: "Kalıp Ustası",
    postedDate: "10 Kasım 2025",
    location: "Dudullu OSB, İstanbul",
    salary: "20.000 - 25.000 TL",
    status: "closed",
    applicationCount: 6,
    newApplications: 0,
    skills: ["Kalıp İmalatı", "Freze", "Taşlama"]
  }];


  const mockApplications = [
  {
    id: 1,
    workerId: 101,
    workerName: "Mehmet Yılmaz",
    workerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1daceec33-1763291968788.png",
    workerAvatarAlt: "Professional headshot of Turkish man with short black hair wearing blue work uniform and safety glasses",
    primarySkill: "TIG Kaynak Ustası",
    rating: 4.8,
    reviewCount: 24,
    distance: "8 km uzaklıkta",
    experience: "12 yıl deneyim",
    verified: true,
    appliedDate: "2 saat önce",
    matchedSkills: ["TIG Kaynağı", "MIG Kaynağı", "Paslanmaz Çelik"],
    portfolioSamples: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e567f25a-1764276054531.png",
      imageAlt: "Close-up of professional TIG welding work on stainless steel pipe showing clean weld bead and proper penetration"
    },
    {
      image: "https://images.unsplash.com/photo-1709244596060-bf1e732adf79",
      imageAlt: "Industrial welding project showing completed metal framework with multiple weld joints in workshop setting"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ad0441a-1764276055083.png",
      imageAlt: "Detailed view of MIG welding on thick steel plate with visible weld pool and protective gas coverage"
    }],

    totalPortfolioCount: 18
  },
  {
    id: 2,
    workerId: 102,
    workerName: "Ahmet Demir",
    workerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11b4446af-1763295185739.png",
    workerAvatarAlt: "Professional portrait of experienced Turkish craftsman with gray beard wearing orange safety vest and hard hat",
    primarySkill: "Kaynak ve Metal İşleme",
    rating: 4.6,
    reviewCount: 18,
    distance: "12 km uzaklıkta",
    experience: "15 yıl deneyim",
    verified: true,
    appliedDate: "5 saat önce",
    matchedSkills: ["TIG Kaynağı", "Paslanmaz Çelik"],
    portfolioSamples: [
    {
      image: "https://images.unsplash.com/photo-1587407646138-126dcca708e9",
      imageAlt: "Skilled welder performing overhead welding on industrial steel structure with bright welding arc and sparks"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e97fcc6f-1764276056461.png",
      imageAlt: "Completed metal fabrication project showing precision welded stainless steel components in modern workshop"
    }],

    totalPortfolioCount: 12
  },
  {
    id: 3,
    workerId: 103,
    workerName: "Mustafa Kaya",
    workerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12f111ea0-1763292998434.png",
    workerAvatarAlt: "Professional photo of middle-aged Turkish welder with mustache wearing blue coveralls and welding helmet",
    primarySkill: "Sertifikalı Kaynak Ustası",
    rating: 4.9,
    reviewCount: 31,
    distance: "6 km uzaklıkta",
    experience: "18 yıl deneyim",
    verified: true,
    appliedDate: "1 gün önce",
    matchedSkills: ["TIG Kaynağı", "MIG Kaynağı", "Paslanmaz Çelik"],
    portfolioSamples: [
    {
      image: "https://images.unsplash.com/photo-1688138276772-987d4b62318c",
      imageAlt: "Expert welder working on precision stainless steel pipe welding with TIG torch in industrial facility"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1c84560-1764276056313.png",
      imageAlt: "High-quality weld seam on thick metal plate showing professional craftsmanship and proper heat control"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1141f61-1764276056468.png",
      imageAlt: "Large-scale industrial welding project with multiple welded joints on heavy steel framework structure"
    }],

    totalPortfolioCount: 25
  }];


  const mockActivities = [
  {
    type: "application",
    message: "Mehmet Yılmaz \'Deneyimli Kaynak Ustası\' ilanınıza başvurdu",
    timestamp: "2 saat önce"
  },
  {
    type: "hire",
    message: "Ali Çelik ile iş sözleşmesi onaylandı",
    timestamp: "5 saat önce"
  },
  {
    type: "checkin",
    message: "Hasan Öztürk işe giriş yaptı - Gebze OSB",
    timestamp: "1 gün önce"
  },
  {
    type: "completion",
    message: "CNC Torna Operatörü işi tamamlandı",
    timestamp: "2 gün önce"
  },
  {
    type: "rating",
    message: "Yeni değerlendirme aldınız: 5 yıldız",
    timestamp: "3 gün önce"
  }];


  const jobFilterOptions = [
  { value: 'all', label: 'Tüm İlanlar' },
  { value: 'active', label: 'Aktif İlanlar' },
  { value: 'closed', label: 'Kapalı İlanlar' },
  { value: 'draft', label: 'Taslaklar' }];


  const applicationFilterOptions = [
  { value: 'pending', label: 'Bekleyen Başvurular' },
  { value: 'approved', label: 'Onaylanan' },
  { value: 'rejected', label: 'Reddedilen' },
  { value: 'all', label: 'Tümü' }];


  const handleCreateJob = () => {
    navigate('/job-creation');
  };

  const handleEditJob = (jobId) => {
    navigate(`/job-creation?id=${jobId}&mode=edit`);
  };

  const handleCloseJob = (jobId) => {
    console.log('Close job:', jobId);
  };

  const handleViewApplications = (jobId) => {
    navigate(`/job-detail-view?id=${jobId}&mode=employer`);
  };

  const handleApproveApplication = (applicationId) => {
    console.log('Approve application:', applicationId);
  };

  const handleRejectApplication = (applicationId) => {
    console.log('Reject application:', applicationId);
  };

  const handleViewWorkerProfile = (workerId) => {
    console.log('View worker profile:', workerId);
  };

  const handleViewAllApplications = () => {
    setActiveTab('applications');
  };

  const handleManageProfile = () => {
    navigate('/employer-profile-setup');
  };

  const handleLogout = () => {
    navigate('/homepage');
  };

  const filteredJobs = mockJobs?.filter((job) => {
    if (jobFilter === 'all') return true;
    return job?.status === jobFilter;
  });

  const filteredApplications = mockApplications?.filter((app) => {
    if (applicationFilter === 'all') return true;
    return applicationFilter === 'pending';
  });

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation
        userRole="employer"
        userName="Demir Metal A.Ş."
        notificationCount={5}
        onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            İşveren Paneli
          </h1>
          <p className="text-muted-foreground">
            İş ilanlarınızı yönetin ve başvuruları değerlendirin
          </p>
        </div>

        <DashboardStats stats={mockStats} />

        <QuickActions
          onCreateJob={handleCreateJob}
          onViewAllApplications={handleViewAllApplications}
          onManageProfile={handleManageProfile} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg mb-6">
              <div className="border-b border-border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out ${
                      activeTab === 'jobs' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`
                      }>

                      İş İlanları
                    </button>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out relative ${
                      activeTab === 'applications' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`
                      }>

                      Başvurular
                      {mockStats?.pendingApprovals > 0 &&
                      <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {mockStats?.pendingApprovals}
                        </span>
                      }
                    </button>
                  </div>

                  {activeTab === 'jobs' ?
                  <Select
                    options={jobFilterOptions}
                    value={jobFilter}
                    onChange={setJobFilter}
                    className="w-48" /> :


                  <Select
                    options={applicationFilterOptions}
                    value={applicationFilter}
                    onChange={setApplicationFilter}
                    className="w-48" />

                  }
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'jobs' ?
                <div className="space-y-4">
                    {filteredJobs?.length > 0 ?
                  filteredJobs?.map((job) =>
                  <JobPostingCard
                    key={job?.id}
                    job={job}
                    onEdit={handleEditJob}
                    onClose={handleCloseJob}
                    onViewApplications={handleViewApplications} />

                  ) :

                  <div className="text-center py-12">
                        <Icon name="Briefcase" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          İlan Bulunamadı
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Seçili filtreye uygun iş ilanı bulunmuyor
                        </p>
                        <Button variant="default" iconName="Plus" onClick={handleCreateJob}>
                          Yeni İlan Oluştur
                        </Button>
                      </div>
                  }
                  </div> :

                <div className="space-y-4">
                    {filteredApplications?.length > 0 ?
                  filteredApplications?.map((application) =>
                  <ApplicationCard
                    key={application?.id}
                    application={application}
                    onApprove={handleApproveApplication}
                    onReject={handleRejectApplication}
                    onViewProfile={handleViewWorkerProfile} />

                  ) :

                  <div className="text-center py-12">
                        <Icon name="Users" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          Başvuru Bulunamadı
                        </h3>
                        <p className="text-muted-foreground">
                          Henüz değerlendirilecek başvuru bulunmuyor
                        </p>
                      </div>
                  }
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RecentActivity activities={mockActivities} />
          </div>
        </div>
      </main>
    </div>);

};

export default EmployerDashboard;