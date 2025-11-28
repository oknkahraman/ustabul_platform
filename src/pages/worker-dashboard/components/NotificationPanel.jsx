import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onViewAll }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job-match':
        return { name: 'Briefcase', color: 'var(--color-accent)' };
      case 'application-response':
        return { name: 'CheckCircle', color: 'var(--color-success)' };
      case 'rating-request':
        return { name: 'Star', color: 'var(--color-warning)' };
      case 'message':
        return { name: 'MessageSquare', color: 'var(--color-primary)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Az önce';
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`;
    return `${Math.floor(diffInMinutes / 1440)} gün önce`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">Bildirimler</h3>
          {notifications?.filter(n => !n?.read)?.length > 0 && (
            <span className="bg-error text-error-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {notifications?.filter(n => !n?.read)?.length}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          Tümünü Gör
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications?.map((notification) => {
            const iconConfig = getNotificationIcon(notification?.type);
            return (
              <div
                key={notification?.id}
                className={`p-4 rounded-lg border transition-all duration-150 ease-out cursor-pointer ${
                  notification?.read
                    ? 'bg-card border-border hover:bg-muted' :'bg-accent/5 border-accent/20 hover:bg-accent/10'
                }`}
                onClick={() => onMarkAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification?.read ? 'bg-muted' : 'bg-accent/10'
                  }`}>
                    <Icon name={iconConfig?.name} size={20} color={iconConfig?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">{notification?.title}</p>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{notification?.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{getTimeAgo(notification?.timestamp)}</span>
                      {!notification?.read && (
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p className="text-muted-foreground">Yeni bildirim yok</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;