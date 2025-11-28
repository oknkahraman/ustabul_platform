import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedNavigation from '../../components/navigation/AuthenticatedNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CompanyDetailsForm from './components/CompanyDetailsForm';
import LocationSettingsForm from './components/LocationSettingsForm';
import BusinessVerificationForm from './components/BusinessVerificationForm';
import PaymentReliabilityForm from './components/PaymentReliabilityForm';
import CompanyDescriptionForm from './components/CompanyDescriptionForm';
import IndustrySpecializationForm from './components/IndustrySpecializationForm';
import ProgressIndicator from './components/ProgressIndicator';

const EmployerProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    taxNumber: '',
    sector: '',
    companySize: '',
    tradeRegistryNumber: '',
    foundedYear: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    buildingNumber: '',
    postalCode: '',
    searchRadius: '30',
    chamberMembershipNumber: '',
    authorizedPersonName: '',
    authorizedPersonId: '',
    bankName: '',
    iban: '',
    preferredPaymentMethod: [],
    paymentTerm: '',
    guaranteeTimely: false,
    canPayAdvance: false,
    payInsurance: false,
    companyDescription: '',
    facilityType: '',
    projectTypes: [],
    employeeCount: '',
    productionArea: '',
    workEnvironment: '',
    requiredSkills: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (docType, file) => {
    console.log(`Uploading ${docType}:`, file?.name);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.companyName?.trim()) newErrors.companyName = 'Şirket adı zorunludur';
        if (!formData?.taxNumber?.trim()) newErrors.taxNumber = 'Vergi numarası zorunludur';
        if (formData?.taxNumber?.length !== 10) newErrors.taxNumber = 'Vergi numarası 10 haneli olmalıdır';
        if (!formData?.sector) newErrors.sector = 'Sektör seçimi zorunludur';
        if (!formData?.companySize) newErrors.companySize = 'Şirket büyüklüğü seçimi zorunludur';
        break;

      case 2:
        if (!formData?.city) newErrors.city = 'İl seçimi zorunludur';
        if (!formData?.district?.trim()) newErrors.district = 'İlçe zorunludur';
        if (!formData?.neighborhood?.trim()) newErrors.neighborhood = 'Mahalle zorunludur';
        if (!formData?.street?.trim()) newErrors.street = 'Cadde/Sokak zorunludur';
        if (!formData?.searchRadius) newErrors.searchRadius = 'Arama yarıçapı seçimi zorunludur';
        break;

      case 3:
        if (!formData?.authorizedPersonName?.trim()) newErrors.authorizedPersonName = 'Yetkili kişi adı zorunludur';
        if (!formData?.authorizedPersonId?.trim()) newErrors.authorizedPersonId = 'TC kimlik numarası zorunludur';
        if (formData?.authorizedPersonId?.length !== 11) newErrors.authorizedPersonId = 'TC kimlik numarası 11 haneli olmalıdır';
        break;

      case 4:
        if (!formData?.bankName?.trim()) newErrors.bankName = 'Banka adı zorunludur';
        if (!formData?.iban?.trim()) newErrors.iban = 'IBAN zorunludur';
        if (!formData?.preferredPaymentMethod?.length) newErrors.preferredPaymentMethod = 'En az bir ödeme yöntemi seçmelisiniz';
        if (!formData?.paymentTerm) newErrors.paymentTerm = 'Ödeme vadesi seçimi zorunludur';
        break;

      case 5:
        if (!formData?.companyDescription?.trim()) newErrors.companyDescription = 'Şirket açıklaması zorunludur';
        if (formData?.companyDescription?.length < 100) newErrors.companyDescription = 'Şirket açıklaması en az 100 karakter olmalıdır';
        if (!formData?.facilityType) newErrors.facilityType = 'Tesis tipi seçimi zorunludur';
        if (!formData?.projectTypes?.length) newErrors.projectTypes = 'En az bir proje türü seçmelisiniz';
        break;

      case 6:
        if (!formData?.requiredSkills?.length) newErrors.requiredSkills = 'En az bir yetenek seçmelisiniz';
        if (formData?.requiredSkills?.length < 3) newErrors.requiredSkills = 'En az 3 yetenek seçmeniz önerilir';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(6)) {
      console.log('Form submitted:', formData);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/employer-dashboard');
      }, 2000);
    }
  };

  const getCompletedSections = () => {
    let completed = 0;
    if (formData?.companyName && formData?.taxNumber && formData?.sector) completed++;
    if (formData?.city && formData?.district && formData?.searchRadius) completed++;
    if (formData?.authorizedPersonName && formData?.authorizedPersonId) completed++;
    if (formData?.bankName && formData?.iban && formData?.paymentTerm) completed++;
    if (formData?.companyDescription && formData?.facilityType) completed++;
    if (formData?.requiredSkills?.length >= 3) completed++;
    return completed;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyDetailsForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <LocationSettingsForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <BusinessVerificationForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onFileUpload={handleFileUpload}
          />
        );
      case 4:
        return (
          <PaymentReliabilityForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
          />
        );
      case 5:
        return (
          <CompanyDescriptionForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 6:
        return (
          <IndustrySpecializationForm
            formData={formData}
            errors={errors}
            onCheckboxChange={handleCheckboxChange}
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
        userName="Demir Çelik A.Ş."
        notificationCount={0}
        onLogout={() => navigate('/homepage')}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">İşveren Profili Oluştur</h1>
          <p className="text-muted-foreground">Şirket bilgilerinizi tamamlayarak kalifiye ustalara ulaşın</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {renderStepContent()}

            <div className="flex items-center justify-between bg-card rounded-lg border border-border p-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Önceki
              </Button>

              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5, 6]?.map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-150 ${
                      step === currentStep
                        ? 'bg-primary w-8'
                        : step < currentStep
                        ? 'bg-success' :'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 6 ? (
                <Button
                  variant="default"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Sonraki
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  iconName="Check"
                  iconPosition="right"
                >
                  Profili Tamamla
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={6}
              completedSections={getCompletedSections()}
            />
          </div>
        </div>
      </main>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">Profil Oluşturuldu!</h3>
              <p className="text-muted-foreground mb-6">
                Profiliniz başarıyla oluşturuldu. Belgeleriniz 2-3 iş günü içinde incelenecek ve onaylanacaktır.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Gösterge paneline yönlendiriliyorsunuz...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfileSetup;