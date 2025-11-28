import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationStatusCard = ({ application, onViewDetails }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Beklemede',
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'approved':
        return {
          label: 'Onaylandı',
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'in-progress':
        return {
          label: 'Devam Ediyor',
          icon: 'Activity',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20'
        };
      case 'completed':
        return {
          label: 'Tamamlandı',
          icon: 'CheckCircle2',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'rejected':
        return {
          label: 'Reddedildi',
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      default:
        return {
          label: 'Bilinmiyor',
          icon: 'HelpCircle',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border'
        };
    }
  };

  const statusConfig = getStatusConfig(application?.status);

  return (
    <div
      className={`bg-card border ${statusConfig?.borderColor} rounded-lg p-4 hover:shadow-md transition-all duration-150 ease-out cursor-pointer`}
      onClick={() => onViewDetails(application)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-heading font-semibold text-foreground mb-1 truncate">
            {application?.jobTitle}
          </h4>
          <p className="text-sm text-muted-foreground">{application?.companyName}</p>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${statusConfig?.bgColor} ${statusConfig?.color}`}>
          <Icon name={statusConfig?.icon} size={14} />
          <span className="text-xs font-medium">{statusConfig?.label}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>{application?.appliedDate}</span>
        </div>
        {application?.nextAction && (
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="AlertCircle" size={14} />
            <span className="text-xs font-medium">{application?.nextAction}</span>
          </div>
        )}
      </div>
      {application?.progress && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>İlerleme</span>
            <span>{application?.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${statusConfig?.bgColor} transition-all duration-300 ease-out`}
              style={{ width: `${application?.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusCard;