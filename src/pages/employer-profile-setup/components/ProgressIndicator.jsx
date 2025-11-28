import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, label: 'Şirket Bilgileri', icon: 'Building2' },
    { id: 2, label: 'Konum', icon: 'MapPin' },
    { id: 3, label: 'Doğrulama', icon: 'ShieldCheck' },
    { id: 4, label: 'Ödeme', icon: 'CreditCard' },
    { id: 5, label: 'Tanıtım', icon: 'FileText' },
    { id: 6, label: 'Uzmanlık', icon: 'Target' }
  ];

  const progressPercentage = (completedSections / totalSteps) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground">Profil Tamamlama</h3>
          <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {steps?.map((step) => {
          const isCompleted = completedSections >= step?.id;
          const isCurrent = currentStep === step?.id;

          return (
            <div
              key={step?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-150 ${
                isCurrent
                  ? 'bg-primary/10 border border-primary/20'
                  : isCompleted
                  ? 'bg-success/10 border border-success/20' :'bg-muted/50 border border-transparent'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step?.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">İpucu</p>
              <p className="text-xs text-muted-foreground mt-1">
                Eksiksiz profil oluşturan işverenler %60 daha fazla başvuru alır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;