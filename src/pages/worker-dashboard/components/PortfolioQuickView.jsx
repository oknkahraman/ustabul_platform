import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PortfolioQuickView = ({ portfolio, onManagePortfolio }) => {
  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return {
          icon: 'CheckCircle2',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Doğrulandı'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Beklemede'
        };
      default:
        return {
          icon: 'AlertCircle',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          label: 'Doğrulanmadı'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Portfolyo</h3>
        <Button variant="outline" size="sm" onClick={onManagePortfolio} iconName="Edit">
          Düzenle
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {portfolio?.recentImages?.map((image, index) => (
          <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
            <Image
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-150 ease-out flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                {image?.verified && (
                  <div className="bg-success text-success-foreground rounded-full p-2">
                    <Icon name="CheckCircle2" size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Image" size={20} color="var(--color-muted-foreground)" />
            <div>
              <p className="text-sm font-medium text-foreground">Toplam Fotoğraf</p>
              <p className="text-xs text-muted-foreground">{portfolio?.totalImages} adet</p>
            </div>
          </div>
          <span className="text-lg font-heading font-bold text-foreground">{portfolio?.totalImages}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
            <div>
              <p className="text-sm font-medium text-foreground">Doğrulanmış</p>
              <p className="text-xs text-muted-foreground">{portfolio?.verifiedImages} adet</p>
            </div>
          </div>
          <span className="text-lg font-heading font-bold text-success">{portfolio?.verifiedImages}</span>
        </div>

        {portfolio?.pendingVerification > 0 && (
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium text-foreground">Doğrulama Bekliyor</p>
                <p className="text-xs text-muted-foreground">{portfolio?.pendingVerification} adet</p>
              </div>
            </div>
            <span className="text-lg font-heading font-bold text-warning">{portfolio?.pendingVerification}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Portfolyo Tamamlanma</span>
          <span className="font-medium text-foreground">{portfolio?.completionRate}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-success transition-all duration-300 ease-out"
            style={{ width: `${portfolio?.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioQuickView;