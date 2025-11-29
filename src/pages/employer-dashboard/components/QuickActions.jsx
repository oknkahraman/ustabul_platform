import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'Kullanıcı';
  const companyName = localStorage.getItem('companyName') || 'Şirket';

  const actions = [
    {
      id: 'new-job',
      icon: 'Plus',
      label: 'Yeni İş İlanı',
      description: 'Hemen yeni bir iş ilanı oluşturun',
      color: 'primary',
      onClick: () => onAction?.('new-job')
    },
    {
      id: 'review-applications',
      icon: 'Users',
      label: 'Başvuruları İncele',
      description: 'Bekleyen başvuruları değerlendirin',
      color: 'accent',
      onClick: () => onAction?.('review-applications')
    },
    {
      id: 'messages',
      icon: 'MessageSquare',
      label: 'Mesajlar',
      description: 'Adaylarla iletişime geçin',
      color: 'warning',
      onClick: () => onAction?.('messages')
    },
    {
      id: 'analytics',
      icon: 'TrendingUp',
      label: 'Performans',
      description: 'İlan performansınızı görün',
      color: 'success',
      onClick: () => onAction?.('analytics')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Hoş Geldiniz, {userName}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {companyName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="default"
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            fullWidth
            className={`${action?.color} ${action?.color === 'primary' ? 'hover:bg-primary/90' : action?.color === 'accent' ? 'hover:bg-accent/90' : action?.color === 'warning' ? 'hover:bg-warning/90' : 'hover:bg-success/90'}`}
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;