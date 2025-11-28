import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateJob, onViewAllApplications, onManageProfile }) => {
  const actions = [
    {
      icon: 'Plus',
      label: 'Yeni İlan Oluştur',
      description: 'İş ilanı oluştur',
      action: onCreateJob,
      color: 'bg-primary text-primary-foreground',
      hoverColor: 'hover:bg-primary/90'
    },
    {
      icon: 'Users',
      label: 'Başvuruları Görüntüle',
      description: 'Tüm başvurular',
      action: onViewAllApplications,
      color: 'bg-accent text-accent-foreground',
      hoverColor: 'hover:bg-accent/90'
    },
    {
      icon: 'Settings',
      label: 'Profil Ayarları',
      description: 'Şirket bilgileri',
      action: onManageProfile,
      color: 'bg-secondary text-secondary-foreground',
      hoverColor: 'hover:bg-secondary/80'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Hızlı İşlemler</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="default"
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.action}
            fullWidth
            className={`${action?.color} ${action?.hoverColor}`}
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;