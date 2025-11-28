import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobPostingCard = ({ job, onEdit, onClose, onViewApplications }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'closed':
        return 'Kapalı';
      case 'draft':
        return 'Taslak';
      default:
        return status;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-all duration-150 ease-out">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {job?.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              <span>{job?.postedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={16} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Banknote" size={16} />
              <span>{job?.salary}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job?.status)}`}>
          {getStatusText(job?.status)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.skills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">
              {job?.applicationCount} Başvuru
            </span>
          </div>
          {job?.newApplications > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">
                {job?.newApplications} Yeni
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={() => onViewApplications(job?.id)}
          >
            Başvuruları Gör
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(job?.id)}
          >
            Düzenle
          </Button>
          {job?.status === 'active' && (
            <Button
              variant="destructive"
              size="sm"
              iconName="XCircle"
              onClick={() => onClose(job?.id)}
            >
              Kapat
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingCard;