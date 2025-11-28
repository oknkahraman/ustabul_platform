import React from 'react';
import Icon from '../../../components/AppIcon';

const JobMap = ({ location, coordinates }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Konum
      </h3>
      <div className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
          {/* Placeholder for map - in real implementation, use Google Maps or similar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapPin" size={48} color="var(--color-muted-foreground)" />
              <p className="text-sm text-muted-foreground mt-2">{location}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Navigation" size={16} color="currentColor" />
          <span>Yol tarifi al</span>
        </div>
      </div>
    </div>
  );
};

export default JobMap;