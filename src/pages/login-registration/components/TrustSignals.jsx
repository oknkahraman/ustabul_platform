import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Güvenli Veri Koruması',
      description: 'KVKK uyumlu veri güvenliği'
    },
    {
      icon: 'Lock',
      title: 'SSL Şifreleme',
      description: '256-bit güvenli bağlantı'
    },
    {
      icon: 'CheckCircle',
      title: 'Doğrulanmış Platform',
      description: 'Sanayi odası onaylı'
    },
    {
      icon: 'Users',
      title: '10,000+ Kullanıcı',
      description: 'Güvenilir topluluk'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={24} color="var(--color-success)" />
        <h3 className="font-heading font-semibold text-foreground">Güvenlik ve Gizlilik</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">SMS Doğrulama</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">Veri Şifreleme</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FileCheck" size={16} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">KVKK Uyumlu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;