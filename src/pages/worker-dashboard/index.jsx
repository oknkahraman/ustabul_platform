import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import JobCard from './components/JobCard';
import ApplicationStatusCard from './components/ApplicationStatusCard';
import MetricsCard from './components/MetricsCard';
import FilterPanel from './components/FilterPanel';
import PortfolioQuickView from './components/PortfolioQuickView';
import NotificationPanel from './components/NotificationPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    skillCategory: 'all',
    sortBy: 'distance',
    urgency: 'all',
    maxDistance: '50',
    resultCount: 12
  });

  const [notifications, setNotifications] = useState([
  {
    id: 1,
    type: 'job-match',
    title: 'Yeni İş Eşleşmesi',
    message: 'Becerilerinize uygun 3 yeni iş ilanı bulundu. Hemen inceleyin!',
    timestamp: new Date(Date.now() - 300000),
    read: false
  },
  {
    id: 2,
    type: 'application-response',
    title: 'Başvurunuz Onaylandı',
    message: 'Demir Çelik A.Ş. - Kaynak Ustası pozisyonu için başvurunuz onaylandı.',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: 3,
    type: 'rating-request',
    title: 'Değerlendirme Bekleniyor',
    message: 'Tamamladığınız iş için işvereni değerlendirmeniz bekleniyor.',
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: 4,
    type: 'message',
    title: 'Yeni Mesaj',
    message: 'Makina Sanayi Ltd. şirketinden yeni bir mesajınız var.',
    timestamp: new Date(Date.now() - 86400000),
    read: true
  }]
  );

  const mockJobs = [
  {
    id: 1,
    title: 'Kaynak Ustası',
    companyName: 'Demir Çelik Sanayi A.Ş.',
    companyLogo: "https://images.unsplash.com/photo-1660138118832-fcc61dcb28fa",
    companyLogoAlt: 'Modern industrial steel manufacturing facility with blue and silver company branding logo',
    location: 'Gebze OSB, Kocaeli',
    distance: 3.2,
    requiredSkills: ['TIG Kaynak', 'MIG Kaynak', 'Paslanmaz Çelik'],
    description: 'Paslanmaz çelik konstrüksiyon projesi için deneyimli kaynak ustası aranmaktadır. TIG ve MIG kaynak sertifikası gereklidir.',
    payment: '450-550 TL/gün',
    duration: '2 hafta',
    startDate: '02.12.2025',
    urgency: 'urgent'
  },
  {
    id: 2,
    title: 'CNC Torna Operatörü',
    companyName: 'Hassas Makina Ltd.',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1b55d95-1764276056698.png",
    companyLogoAlt: 'High-tech precision machinery workshop with modern CNC equipment and professional company logo',
    location: 'İkitelli OSB, İstanbul',
    distance: 8.5,
    requiredSkills: ['CNC Torna', 'Fanuc Kontrol', 'Teknik Resim'],
    description: 'Otomotiv yan sanayi parçaları üretimi için CNC torna operatörü alınacaktır. Fanuc kontrol deneyimi şarttır.',
    payment: '400-500 TL/gün',
    duration: '1 ay',
    startDate: '04.12.2025',
    urgency: 'high'
  },
  {
    id: 3,
    title: 'Elektrik Teknisyeni',
    companyName: 'Enerji Sistemleri A.Ş.',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff91c12a-1764276057467.png",
    companyLogoAlt: 'Professional electrical systems company office with modern technology and energy-focused branding',
    location: 'Tuzla OSB, İstanbul',
    distance: 12.3,
    requiredSkills: ['Endüstriyel Elektrik', 'PLC', 'Pano Montajı'],
    description: 'Fabrika elektrik tesisatı bakım ve onarım işleri için deneyimli elektrik teknisyeni aranıyor.',
    payment: '380-450 TL/gün',
    duration: '3 hafta',
    startDate: '05.12.2025',
    urgency: 'normal'
  },
  {
    id: 4,
    title: 'Freze Ustası',
    companyName: 'Metal İşleme San. Tic.',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1927f3370-1764276055077.png",
    companyLogoAlt: 'Industrial metal processing workshop with traditional milling machines and craftsmanship-focused logo',
    location: 'Dudullu OSB, İstanbul',
    distance: 15.7,
    requiredSkills: ['Konvansiyonel Freze', 'Ölçü Aleti Kullanımı', 'Kalıp İmalatı'],
    description: 'Kalıp imalatı için konvansiyonel freze ustası alınacaktır. En az 5 yıl deneyim şartı aranmaktadır.',
    payment: '420-520 TL/gün',
    duration: '2 ay',
    startDate: '10.12.2025',
    urgency: 'normal'
  },
  {
    id: 5,
    title: 'Hidrolik Teknisyeni',
    companyName: 'Hidrolik Sistemler Ltd.',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ceec91ed-1764276056318.png",
    companyLogoAlt: 'Modern hydraulic systems company facility with blue and orange industrial equipment branding',
    location: 'Gebze OSB, Kocaeli',
    distance: 4.8,
    requiredSkills: ['Hidrolik Sistemler', 'Bakım-Onarım', 'Arıza Tespiti'],
    description: 'Endüstriyel hidrolik sistemlerin bakım ve onarımı için deneyimli teknisyen aranmaktadır.',
    payment: '350-430 TL/gün',
    duration: '1 hafta',
    startDate: '28.11.2025',
    urgency: 'urgent'
  },
  {
    id: 6,
    title: 'Boru Kaynakçısı',
    companyName: 'Petrokimya Tesisat A.Ş.',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19d0c2cea-1764276056432.png",
    companyLogoAlt: 'Petrochemical industrial facility with large pipeline infrastructure and professional company emblem',
    location: 'Çayırova OSB, Kocaeli',
    distance: 6.2,
    requiredSkills: ['Boru Kaynağı', 'Argon Kaynağı', 'X-Ray Testi'],
    description: 'Petrokimya tesisatı projesi için boru kaynağı konusunda uzman kaynak ustası alınacaktır.',
    payment: '500-600 TL/gün',
    duration: '1.5 ay',
    startDate: '15.12.2025',
    urgency: 'high'
  }];


  const mockApplications = [
  {
    id: 1,
    jobTitle: 'Kaynak Ustası',
    companyName: 'Demir Çelik A.Ş.',
    status: 'approved',
    appliedDate: '25.11.2025',
    nextAction: 'Check-in Yapın',
    progress: 75
  },
  {
    id: 2,
    jobTitle: 'CNC Operatörü',
    companyName: 'Hassas Makina Ltd.',
    status: 'pending',
    appliedDate: '26.11.2025',
    nextAction: null,
    progress: 25
  },
  {
    id: 3,
    jobTitle: 'Elektrik Teknisyeni',
    companyName: 'Enerji Sistemleri',
    status: 'in-progress',
    appliedDate: '20.11.2025',
    nextAction: 'İşi Tamamlayın',
    progress: 60
  },
  {
    id: 4,
    jobTitle: 'Freze Ustası',
    companyName: 'Metal İşleme',
    status: 'completed',
    appliedDate: '15.11.2025',
    nextAction: 'Değerlendirme Yapın',
    progress: 100
  }];


  const mockPortfolio = {
    totalImages: 24,
    verifiedImages: 18,
    pendingVerification: 3,
    completionRate: 75,
    recentImages: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1ada9e919-1764276060053.png",
      alt: 'Professional TIG welding work on stainless steel pipe joint showing precise bead formation and clean finish',
      verified: true
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_120d90f65-1764276057754.png",
      alt: 'CNC machining operation on precision metal part with visible cutting tool and metal chips',
      verified: true
    },
    {
      url: "https://images.unsplash.com/photo-1703441307505-a97ce40a31a0",
      alt: 'Completed industrial metal fabrication project showing welded steel frame structure in workshop setting',
      verified: false
    }]

  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      skillCategory: 'all',
      sortBy: 'distance',
      urgency: 'all',
      maxDistance: '50',
      resultCount: 12
    });
  };

  const handleViewJobDetails = (job) => {
    console.log('Viewing job details:', job);
  };

  const handleApplyToJob = (job) => {
    console.log('Applying to job:', job);
  };

  const handleViewApplicationDetails = (application) => {
    console.log('Viewing application details:', application);
  };

  const handleManagePortfolio = () => {
    navigate('/worker-profile-setup');
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
    prev?.map((notification) =>
    notification?.id === notificationId ?
    { ...notification, read: true } :
    notification
    )
    );
  };

  const handleViewAllNotifications = () => {
    console.log('Viewing all notifications');
  };

  const handleLogout = () => {
    navigate('/homepage');
  };

  const unreadNotificationCount = notifications?.filter((n) => !n?.read)?.length;

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation
        userRole="worker"
        userName="Mehmet Yılmaz"
        notificationCount={unreadNotificationCount}
        onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Hoş Geldiniz, Mehmet Yılmaz
          </h1>
          <p className="text-muted-foreground">
            Becerilerinize uygun iş fırsatlarını keşfedin ve başvurularınızı yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            icon="Briefcase"
            label="Aktif Başvurular"
            value="3"
            subValue="2 onay bekliyor"
            color="primary"
            trend={0} />

          <MetricsCard
            icon="CheckCircle2"
            label="Tamamlanan İşler"
            value="47"
            subValue="Son 6 ay"
            trend={12}
            color="success" />

          <MetricsCard
            icon="Star"
            label="Güvenilirlik Skoru"
            value="4.8"
            subValue="5 üzerinden"
            trend={5}
            color="warning" />

          <MetricsCard
            icon="TrendingUp"
            label="Ortalama Kazanç"
            value="18.500 TL"
            subValue="Aylık ortalama"
            trend={8}
            color="accent" />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters} />


            <div className="mb-4">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Size Uygun İş İlanları
              </h2>
              <div className="space-y-4">
                {mockJobs?.map((job) =>
                <JobCard
                  key={job?.id}
                  job={job}
                  onViewDetails={handleViewJobDetails}
                  onApply={handleApplyToJob} />

                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline" iconName="ChevronDown">
                Daha Fazla İlan Göster
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onViewAll={handleViewAllNotifications} />


            <PortfolioQuickView
              portfolio={mockPortfolio}
              onManagePortfolio={handleManagePortfolio} />


            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Başvuru Durumları
              </h3>
              <div className="space-y-3">
                {mockApplications?.map((application) =>
                <ApplicationStatusCard
                  key={application?.id}
                  application={application}
                  onViewDetails={handleViewApplicationDetails} />

                )}
              </div>
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
                    Daha fazla doğrulanmış fotoğraf ekleyerek iş bulma şansınızı %40 artırın
                  </p>
                  <Button variant="default" size="sm" onClick={handleManagePortfolio} iconName="Upload">
                    Fotoğraf Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default WorkerDashboard;