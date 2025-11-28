import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobHeader = ({ job, viewMode, matchData, onApply }) => {
  const getUrgencyBadge = () => {
    if (!job?.urgency || job?.urgency === 'normal') return null;
    
    const urgencyConfig = {
      urgent: { label: 'Acil', color: 'error' },
      high: { label: 'Yüksek Öncelik', color: 'warning' },
      low: { label: 'Düşük Öncelik', color: 'muted' }
    };

    const config = urgencyConfig?.[job?.urgency];
    if (!config) return null;

    return (
      <span className={`px-2 py-1 bg-${config?.color} text-${config?.color}-foreground text-xs font-medium rounded`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {job?.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {getUrgencyBadge()}
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
              {job?.status === 'active' ? 'Aktif İlan' : 'Kapalı'}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="MapPin" size={16} color="currentColor" />
              <span className="text-sm">{job?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="DollarSign" size={16} color="currentColor" />
              <span className="text-sm">{job?.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Calendar" size={16} color="currentColor" />
              <span className="text-sm">Yayın: {job?.postedDate}</span>
            </div>
          </div>
        </div>

        {viewMode === 'worker' && matchData && (
          <div className="flex flex-col items-end gap-3">
            <div className="bg-success/10 border border-success rounded-lg px-4 py-2">
              <p className="text-xs text-success-foreground mb-1">Uygunluk Oranı</p>
              <p className="text-2xl font-bold text-success">{matchData?.skillMatch}%</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                <Icon name="MapPin" size={14} color="currentColor" />
                {matchData?.distance} uzaklıkta
              </p>
            </div>
            {!matchData?.hasApplied ? (
              <Button
                variant="default"
                iconName="Send"
                iconPosition="left"
                onClick={onApply}
                className="w-full md:w-auto"
              >
                Başvur
              </Button>
            ) : (
              <div className="bg-warning/10 border border-warning rounded-lg px-4 py-2">
                <p className="text-sm font-medium text-warning">Başvuru Gönderildi</p>
                <p className="text-xs text-warning-foreground mt-1">
                  Durum: {matchData?.applicationStatus || 'Değerlendiriliyor'}
                </p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'employer' && (
          <div className="flex flex-col items-end gap-3">
            <div className="bg-info/10 border border-info rounded-lg px-4 py-2 text-right">
              <p className="text-xs text-info-foreground mb-1">Toplam Başvuru</p>
              <p className="text-2xl font-bold text-info">{job?.applicationCount}</p>
            </div>
            <Button variant="outline" iconName="Edit" iconPosition="left">
              İlanı Düzenle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHeader;