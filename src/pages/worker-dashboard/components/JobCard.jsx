import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onViewDetails, onApply }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDistance = (distance) => {
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance?.toFixed(1)}km`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-150 ease-out">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={job?.companyLogo}
              alt={job?.companyLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1 truncate">
              {job?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{job?.companyName}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Navigation" size={16} />
                <span>{formatDistance(job?.distance)}</span>
              </div>
            </div>
          </div>
        </div>
        {job?.urgency !== 'normal' && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job?.urgency)}`}>
            {job?.urgency === 'urgent' ? 'Acil' : 'Yüksek Öncelik'}
          </span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {job?.requiredSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="text-sm text-foreground line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Ücret</p>
            <p className="text-lg font-heading font-bold text-foreground">{job?.payment}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Süre</p>
            <p className="text-sm font-medium text-foreground">{job?.duration}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Başlangıç</p>
            <p className="text-sm font-medium text-foreground">{job?.startDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(job)}>
            Detaylar
          </Button>
          <Button variant="default" size="sm" onClick={() => onApply(job)} iconName="Send" iconPosition="right">
            Başvur
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;