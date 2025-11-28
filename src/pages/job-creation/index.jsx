import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';

import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import JobBasicsForm from './components/JobBasicsForm';
import LocationSettingsForm from './components/LocationSettingsForm';
import RequirementsForm from './components/RequirementsForm';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import PaymentConfigForm from './components/PaymentConfigForm';
import AdvancedSettingsForm from './components/AdvancedSettingsForm';
import JobPreview from './components/JobPreview';

const JobCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  
  const [jobData, setJobData] = useState({
    // Job Basics
    title: '',
    category: '',
    subcategory: '',
    urgency: 'normal',
    
    // Location
    locationType: 'specific',
    address: '',
    city: '',
    district: '',
    isWorkshopBased: false,
    workshopRadius: 10,
    
    // Requirements
    primarySkills: [],
    experienceLevel: 'intermediate',
    requiredEquipment: [],
    additionalCertifications: [],
    
    // Project Details
    description: '',
    timeline: '',
    expectedDuration: '',
    deliverables: [],
    
    // Payment
    paymentType: 'hourly',
    hourlyRate: '',
    projectBudget: '',
    isNegotiable: false,
    paymentTerms: '',
    
    // Advanced Settings
    applicationDeadline: '',
    workerCapacity: 1,
    screeningQuestions: [],
    portfolioRequired: false,
    portfolioInstructions: ''
  });

  const steps = [
    { id: 1, name: 'İş Temelleri', icon: 'Briefcase' },
    { id: 2, name: 'Konum', icon: 'MapPin' },
    { id: 3, name: 'Gereksinimler', icon: 'CheckCircle' },
    { id: 4, name: 'Proje Detayları', icon: 'FileText' },
    { id: 5, name: 'Ödeme', icon: 'DollarSign' },
    { id: 6, name: 'Gelişmiş', icon: 'Settings' }
  ];

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdateJobData = (stepData) => {
    setJobData({ ...jobData, ...stepData });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleSaveDraft = () => {
    console.log('Save as draft:', jobData);
    alert('İlan taslak olarak kaydedildi');
    navigate('/employer-dashboard');
  };

  const handlePublish = () => {
    console.log('Publish job:', jobData);
    alert('İlan başarıyla yayınlandı!');
    navigate('/employer-dashboard');
  };

  const handleLogout = () => {
    navigate('/homepage');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <JobBasicsForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      case 2:
        return (
          <LocationSettingsForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      case 3:
        return (
          <RequirementsForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      case 4:
        return (
          <ProjectDetailsForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      case 5:
        return (
          <PaymentConfigForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      case 6:
        return (
          <AdvancedSettingsForm
            data={jobData}
            onUpdate={handleUpdateJobData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavigation
        userRole="employer"
        userName="Demir Metal A.Ş."
        notificationCount={3}
        onLogout={handleLogout}
      />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => navigate('/employer-dashboard')}
            className="mb-4"
          >
            Panele Dön
          </Button>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Yeni İş İlanı Oluştur
          </h1>
          <p className="text-muted-foreground">
            Kalifiye işçi bulmak için detaylı iş ilanı oluşturun
          </p>
        </div>

        <ProgressIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button
              variant="outline"
              iconName="Save"
              onClick={handleSaveDraft}
            >
              Taslak Kaydet
            </Button>
            <Button
              variant="ghost"
              iconName="Eye"
              onClick={handlePreview}
            >
              Önizle
            </Button>
          </div>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                iconName="ChevronLeft"
                onClick={handlePrevious}
              >
                Önceki
              </Button>
            )}
            {currentStep < steps?.length ? (
              <Button
                variant="default"
                iconName="ChevronRight"
                iconPosition="right"
                onClick={handleNext}
              >
                Sonraki
              </Button>
            ) : (
              <Button
                variant="default"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handlePublish}
              >
                İlanı Yayınla
              </Button>
            )}
          </div>
        </div>
      </main>
      {showPreview && (
        <JobPreview
          jobData={jobData}
          onClose={handleClosePreview}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};

export default JobCreation;