import React, { useState, useEffect } from 'react';
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

import { jobsAPI } from '../../utils/api';

const JobCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  useEffect(() => {
    // Check if we're in edit mode
    const params = new URLSearchParams(window.location.search);
    const id = params?.get('id');
    const mode = params?.get('mode');
    
    if (id && mode === 'edit') {
      setIsEditMode(true);
      setJobId(id);
      loadJobData(id);
    }
  }, []);

  const loadJobData = async (id) => {
    try {
      setLoading(true);
      const response = await jobsAPI?.getJobById(id);
      if (response?.data) {
        setJobData(response?.data);
      }
    } catch (err) {
      console.error('Failed to load job data:', err);
      setError('İş ilanı yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Kullanıcı oturumu bulunamadı');
      }

      const jobPayload = {
        ...jobData,
        employerId: userId,
        status: 'draft'
      };

      if (isEditMode && jobId) {
        await jobsAPI?.updateJob(jobId, jobPayload);
        alert('İlan taslak olarak güncellendi');
      } else {
        await jobsAPI?.createJob(jobPayload);
        alert('İlan taslak olarak kaydedildi');
      }
      
      navigate('/employer-dashboard');
    } catch (err) {
      console.error('Save draft error:', err);
      setError(err?.response?.data?.message || 'Taslak kaydedilemedi');
      alert('Hata: ' + (err?.response?.data?.message || 'Taslak kaydedilemedi'));
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('Kullanıcı oturumu bulunamadı');
      }

      const jobPayload = {
        ...jobData,
        employerId: userId,
        status: 'active'
      };

      if (isEditMode && jobId) {
        await jobsAPI?.updateJob(jobId, jobPayload);
        alert('İlan başarıyla güncellendi!');
      } else {
        await jobsAPI?.createJob(jobPayload);
        alert('İlan başarıyla yayınlandı!');
      }
      
      navigate('/employer-dashboard');
    } catch (err) {
      console.error('Publish error:', err);
      setError(err?.response?.data?.message || 'İlan yayınlanamadı');
      alert('Hata: ' + (err?.response?.data?.message || 'İlan yayınlanamadı'));
    } finally {
      setLoading(false);
    }
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

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticatedNavigation
          userRole="employer"
          userName="Demir Metal A.Ş."
          notificationCount={3}
          onLogout={handleLogout}
        />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">İlan yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

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
            {isEditMode ? 'İş İlanını Düzenle' : 'Yeni İş İlanı Oluştur'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? 'İlan bilgilerini güncelleyin' : 'Kalifiye işçi bulmak için detaylı iş ilanı oluşturun'}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-error/10 border border-error/20 rounded-lg p-4">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

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
              disabled={loading}
            >
              {loading ? 'Kaydediliyor...' : 'Taslak Kaydet'}
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
                disabled={loading}
              >
                Sonraki
              </Button>
            ) : (
              <Button
                variant="default"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handlePublish}
                disabled={loading}
              >
                {loading ? 'Yayınlanıyor...' : (isEditMode ? 'Güncelle' : 'İlanı Yayınla')}
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