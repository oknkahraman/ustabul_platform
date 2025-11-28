import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Profil Tamamlama</h2>
        <span className="text-sm text-muted-foreground">{currentStep}/{totalSteps} Adım</span>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index + 1 < currentStep 
                  ? 'bg-success text-success-foreground' 
                  : index + 1 === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1 < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-2 text-center ${
                index + 1 <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {step?.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
        <p className="text-sm text-foreground flex items-start">
          <Icon name="Info" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-accent)" />
          <span>Profil kalitesi iş eşleştirme algoritmasını ve işveren seçimini doğrudan etkiler</span>
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;