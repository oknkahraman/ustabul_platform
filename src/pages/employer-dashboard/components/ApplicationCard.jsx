import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onApprove, onReject, onViewProfile }) => {
  const getReliabilityColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 3.5) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-all duration-150 ease-out">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={application?.workerAvatar}
            alt={application?.workerAvatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          {application?.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="CheckCircle2" size={14} color="white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-base font-heading font-semibold text-foreground mb-1">
                {application?.workerName}
              </h4>
              <p className="text-sm text-muted-foreground">{application?.primarySkill}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {application?.appliedDate}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} color="var(--color-warning)" />
              <span className={`font-medium ${getReliabilityColor(application?.rating)}`}>
                {application?.rating?.toFixed(1)}
              </span>
              <span className="text-muted-foreground">({application?.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">{application?.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Briefcase" size={16} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">{application?.experience}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {application?.matchedSkills?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded border border-success/20"
              >
                <Icon name="Check" size={12} className="inline mr-1" />
                {skill}
              </span>
            ))}
          </div>

          {application?.portfolioSamples?.length > 0 && (
            <div className="flex gap-2 mb-4">
              {application?.portfolioSamples?.map((sample, index) => (
                <Image
                  key={index}
                  src={sample?.image}
                  alt={sample?.imageAlt}
                  className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onViewProfile(application?.workerId)}
                />
              ))}
              {application?.totalPortfolioCount > 3 && (
                <div
                  className="w-16 h-16 rounded bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => onViewProfile(application?.workerId)}
                >
                  <span className="text-xs font-medium text-foreground">
                    +{application?.totalPortfolioCount - 3}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              onClick={() => onViewProfile(application?.workerId)}
              className="flex-1"
            >
              Profili Görüntüle
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              onClick={() => onReject(application?.id)}
            >
              Reddet
            </Button>
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              onClick={() => onApprove(application?.id)}
            >
              Onayla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;