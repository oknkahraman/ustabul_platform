import React from 'react';
import Icon from '../../../components/AppIcon';

const JobTimeline = ({ postedDate, deadline, timeline }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Zaman Çizelgesi
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">İlan Tarihi</p>
            <p className="text-sm text-muted-foreground">{postedDate}</p>
          </div>
        </div>

        {deadline && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Başvuru Son</p>
              <p className="text-sm text-muted-foreground">{deadline}</p>
            </div>
          </div>
        )}

        {timeline && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Proje Süresi</p>
              <p className="text-sm text-muted-foreground">{timeline}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTimeline;