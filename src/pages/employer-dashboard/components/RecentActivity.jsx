import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return { name: 'UserPlus', color: 'var(--color-primary)' };
      case 'hire':
        return { name: 'UserCheck', color: 'var(--color-success)' };
      case 'checkin':
        return { name: 'MapPin', color: 'var(--color-accent)' };
      case 'completion':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'rating':
        return { name: 'Star', color: 'var(--color-warning)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Son Aktiviteler</h3>
      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities?.map((activity, index) => {
            const icon = getActivityIcon(activity?.type);
            return (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={icon?.name} size={20} color={icon?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground mb-1">{activity?.message}</p>
                  <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p className="text-muted-foreground">Henüz aktivite yok</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;