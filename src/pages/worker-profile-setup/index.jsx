import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import ProgressIndicator from './components/ProgressIndicator';
import SkillCategoryTree from './components/SkillCategoryTree';
import PortfolioUpload from './components/PortfolioUpload';
import CertificationUpload from './components/CertificationUpload';
import ProfileOptions from './components/ProfileOptions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const WorkerProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [location, setLocation] = useState({
    city: '',
    district: '',
    industrialZone: ''
  });

  const steps = [
    { id: 1, label: 'Yetenekler' },
    { id: 2, label: 'Portfolyo' },
    { id: 3, label: 'Sertifikalar' },
    { id: 4, label: 'Ayarlar' }
  ];

  const handleSkillToggle = (skillKey, skillData) => {
    setSelectedSkills(prev => {
      const newSkills = { ...prev };
      if (newSkills?.[skillKey]) {
        delete newSkills?.[skillKey];
      } else {
        newSkills[skillKey] = skillData;
      }
      return newSkills;
    });
  };

  const handleImagesAdd = (newImages) => {
    setPortfolioImages(prev => [...prev, ...newImages]);
  };

  const handleImageRemove = (imageId) => {
    setPortfolioImages(prev => prev?.filter(img => img?.id !== imageId));
  };

  const handleImageUpdate = (imageId, updatedImage) => {
    setPortfolioImages(prev => 
      prev?.map(img => img?.id === imageId ? updatedImage : img)
    );
  };

  const handleCertificateAdd = (certificate) => {
    setCertificates(prev => {
      const existing = prev?.find(c => c?.id === certificate?.id);
      if (existing) {
        return prev?.map(c => c?.id === certificate?.id ? certificate : c);
      }
      return [...prev, certificate];
    });
  };

  const handleCertificateRemove = (certificateId) => {
    setCertificates(prev => prev?.filter(cert => cert?.id !== certificateId));
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveAndContinue = () => {
    navigate('/worker-dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(selectedSkills)?.length >= 2;
      case 2:
        return portfolioImages?.length >= 3;
      case 3:
        return true;
      case 4:
        return location?.city && location?.district;
      default:
        return false;
    }
  };

  const getStepValidationMessage = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(selectedSkills)?.length < 2 
          ? 'En az 2 yetenek seçmelisiniz' :'';
      case 2:
        return portfolioImages?.length < 3 
          ? 'En az 3 portfolyo fotoğrafı yüklemelisiniz' :'';
      case 4:
        return !location?.city || !location?.district 
          ? 'İl ve ilçe bilgisi zorunludur' :'';
      default:
        return '';
    }
  };

  const handleLogout = () => {
    navigate('/homepage');
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation 
        userRole="worker"
        userName="Mehmet Yılmaz"
        notificationCount={0}
        onLogout={handleLogout}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Usta Profili Oluştur</h1>
          <p className="text-muted-foreground">Profesyonel profilinizi tamamlayarak iş fırsatlarına erişin</p>
        </div>

        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={steps?.length} 
          steps={steps}
        />

        <div className="mb-6">
          {currentStep === 1 && (
            <SkillCategoryTree 
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
            />
          )}

          {currentStep === 2 && (
            <PortfolioUpload
              portfolioImages={portfolioImages}
              onImagesAdd={handleImagesAdd}
              onImageRemove={handleImageRemove}
              onImageUpdate={handleImageUpdate}
            />
          )}

          {currentStep === 3 && (
            <CertificationUpload
              certificates={certificates}
              onCertificateAdd={handleCertificateAdd}
              onCertificateRemove={handleCertificateRemove}
            />
          )}

          {currentStep === 4 && (
            <ProfileOptions
              anonymousMode={anonymousMode}
              onAnonymousModeChange={setAnonymousMode}
              location={location}
              onLocationChange={setLocation}
            />
          )}
        </div>

        {getStepValidationMessage() && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-2" />
              {getStepValidationMessage()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            variant="outline"
            iconName="ChevronLeft"
            iconPosition="left"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Önceki
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/worker-dashboard')}
            >
              Daha Sonra Tamamla
            </Button>

            {currentStep < steps?.length ? (
              <Button
                variant="default"
                iconName="ChevronRight"
                iconPosition="right"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Sonraki
              </Button>
            ) : (
              <Button
                variant="success"
                iconName="Check"
                iconPosition="left"
                onClick={handleSaveAndContinue}
                disabled={!isStepValid()}
              >
                Profili Tamamla
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Lightbulb" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-2">Profil Tamamlama İpuçları</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                  <span>Tamamlanmış profiller %70 daha fazla iş teklifi alır</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                  <span>Yüksek kaliteli portfolyo fotoğrafları işveren güvenini artırır</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                  <span>Sertifikalar profilinizi öncelikli gösterir</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-success)" />
                  <span>Detaylı etiketler algoritma eşleştirmesini iyileştirir</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileSetup;