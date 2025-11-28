import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JobHeader from './components/JobHeader';
import JobRequirements from './components/JobRequirements';
import JobTimeline from './components/JobTimeline';
import ApplicationForm from './components/ApplicationForm';
import ApplicationsList from './components/ApplicationsList';
import JobMap from './components/JobMap';

const JobDetailView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams?.get('id') || '1';
  const viewMode = searchParams?.get('mode') || 'worker'; // 'worker' or 'employer'

  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Mock job data
  const mockJobData = {
    id: parseInt(jobId),
    title: "Deneyimli Kaynak Ustası",
    company: "Demir Metal A.Ş.",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1709755b0-1764307450020.png",
    companyLogoAlt: "Demir Metal company logo with blue shield and welding symbol",
    location: "Gebze OSB, Kocaeli",
    coordinates: { lat: 40.7982, lng: 29.4334 },
    salary: "18.000 - 22.000 TL",
    postedDate: "15 Kasım 2025",
    applicationDeadline: "30 Kasım 2025",
    status: "active",
    urgency: "normal",
    description: `Firmamız için paslanmaz çelik ve karbon çelik malzemelerle çalışabilecek, TIG ve MIG kaynak teknolojilerinde deneyimli kaynak ustaları arıyoruz.

İş Kapsamı:
- Çelik konstrüksiyon kaynak işleri
- Paslanmaz çelik tank ve boru kaynağı
- Kalite kontrol ve test prosedürlerinin takibi
- İş güvenliği kurallarına uygun çalışma

Çalışma Koşulları:
- Tam zamanlı pozisyon
- SSK, yemek ve servis imkanı
- Modern atölye ve ekipman
- İş güvenliği ekipmanları firma tarafından sağlanır`,
    primarySkills: ["TIG Kaynağı", "MIG Kaynağı", "Paslanmaz Çelik"],
    experienceLevel: "intermediate",
    requiredEquipment: ["Kaynak Maskesi", "Eldiven", "İş Ayakkabısı"],
    timeline: "2-3 ay",
    workerCapacity: 3,
    applicationCount: 12,
    verifiedCompany: true,
    companyRating: 4.7,
    companyReviews: 34
  };

  // Mock worker match data (for worker view)
  const mockWorkerMatchData = {
    skillMatch: 92,
    distance: "8 km",
    hasApplied: false,
    applicationStatus: null
  };

  // Mock applications data (for employer view)
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
    status: "pending",
    matchedSkills: ["TIG Kaynağı", "MIG Kaynağı", "Paslanmaz Çelik"],
    coverMessage: "Merhaba, 12 yıldır kaynak sektöründe çalışıyorum. Özellikle paslanmaz çelik işlerinde uzmanım.",
    portfolioSamples: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e567f25a-1764276054531.png",
      imageAlt: "Close-up of professional TIG welding work on stainless steel pipe showing clean weld bead and proper penetration"
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
    status: "pending",
    matchedSkills: ["TIG Kaynağı", "Paslanmaz Çelik"],
    coverMessage: "İlanınızla ilgiliyim. Benzer projelerde çalıştım.",
    portfolioSamples: [
    {
      image: "https://images.unsplash.com/photo-1587407646138-126dcca708e9",
      imageAlt: "Skilled welder performing overhead welding on industrial steel structure with bright welding arc and sparks"
    }],

    totalPortfolioCount: 12
  }];


  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleCloseApplicationForm = () => {
    setShowApplicationForm(false);
  };

  const handleSubmitApplication = (applicationData) => {
    console.log('Submit application:', applicationData);
    alert('Başvurunuz başarıyla gönderildi!');
    setShowApplicationForm(false);
  };

  const handleApproveApplication = (applicationId) => {
    console.log('Approve application:', applicationId);
    alert('Başvuru onaylandı');
  };

  const handleRejectApplication = (applicationId) => {
    console.log('Reject application:', applicationId);
    alert('Başvuru reddedildi');
  };

  const handleContactWorker = (workerId) => {
    console.log('Contact worker:', workerId);
    navigate(`/messages?workerId=${workerId}`);
  };

  const handleViewWorkerProfile = (workerId) => {
    console.log('View worker profile:', workerId);
    navigate(`/worker-profile?id=${workerId}`);
  };

  const handleLogout = () => {
    navigate('/homepage');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation
        userRole={viewMode}
        userName={viewMode === 'employer' ? 'Demir Metal A.Ş.' : 'Mehmet Yılmaz'}
        notificationCount={viewMode === 'employer' ? 5 : 8}
        onLogout={handleLogout} />


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => navigate(viewMode === 'employer' ? '/employer-dashboard' : '/worker-dashboard')}
          className="mb-6">

          {viewMode === 'employer' ? 'Panele Dön' : 'İş İlanlarına Dön'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <JobHeader
              job={mockJobData}
              viewMode={viewMode}
              matchData={viewMode === 'worker' ? mockWorkerMatchData : null}
              onApply={viewMode === 'worker' ? handleApply : null} />


            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                İş Açıklaması
              </h3>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {mockJobData?.description}
              </p>
            </div>

            <JobRequirements
              skills={mockJobData?.primarySkills}
              experienceLevel={mockJobData?.experienceLevel}
              equipment={mockJobData?.requiredEquipment} />


            {viewMode === 'employer' &&
            <ApplicationsList
              applications={mockApplications}
              onApprove={handleApproveApplication}
              onReject={handleRejectApplication}
              onContact={handleContactWorker}
              onViewProfile={handleViewWorkerProfile} />

            }
          </div>

          <div className="lg:col-span-1 space-y-6">
            <JobTimeline
              postedDate={mockJobData?.postedDate}
              deadline={mockJobData?.applicationDeadline}
              timeline={mockJobData?.timeline} />


            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Firma Bilgileri
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={mockJobData?.companyLogo}
                    alt={mockJobData?.companyLogoAlt}
                    className="w-12 h-12 rounded object-cover" />

                  <div>
                    <p className="font-medium text-foreground">{mockJobData?.company}</p>
                    {mockJobData?.verifiedCompany &&
                    <div className="flex items-center gap-1 text-xs text-success">
                        <Icon name="CheckCircle" size={14} color="currentColor" />
                        <span>Onaylı Firma</span>
                      </div>
                    }
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={16} color="var(--color-warning)" />
                  <span className="text-sm text-foreground font-medium">
                    {mockJobData?.companyRating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({mockJobData?.companyReviews} değerlendirme)
                  </span>
                </div>
              </div>
            </div>

            <JobMap location={mockJobData?.location} coordinates={mockJobData?.coordinates} />

            {viewMode === 'employer' &&
            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  İlan İstatistikleri
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Toplam Görüntülenme</span>
                    <span className="text-sm font-medium text-foreground">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Başvuru Sayısı</span>
                    <span className="text-sm font-medium text-foreground">
                      {mockJobData?.applicationCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ortalama Yetkinlik Eşleşmesi</span>
                    <span className="text-sm font-medium text-success">87%</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </main>

      {showApplicationForm &&
      <ApplicationForm
        jobTitle={mockJobData?.title}
        onClose={handleCloseApplicationForm}
        onSubmit={handleSubmitApplication} />

      }
    </div>);

};

export default JobDetailView;