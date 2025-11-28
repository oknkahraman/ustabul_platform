import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onStepClick?.(step?.id)}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-150 ease-out ${
                  currentStep === step?.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step?.id
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-muted-foreground/20'
                }`}
              >
                <Icon
                  name={currentStep > step?.id ? 'Check' : step?.icon}
                  size={24}
                  color="currentColor"
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  currentStep === step?.id
                    ? 'text-primary'
                    : currentStep > step?.id
                    ? 'text-success' :'text-muted-foreground'
                }`}
              >
                {step?.name}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mt-[-24px]">
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    currentStep > step?.id ? 'bg-success' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;