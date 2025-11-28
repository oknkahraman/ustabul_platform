import React from 'react';
import Icon from '../../../components/AppIcon';

const MockCredentialsInfo = () => {
  return (
    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-start gap-3">
        <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-foreground mb-2">
            Sistemle İletişim Kurulacak
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Giriş yapmak için önce kayıt olmanız gerekmektedir. Backend API'niz ile otomatik olarak bağlantı kurulacaktır.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>✓ E-posta ve şifre ile kayıt olun</p>
            <p>✓ Rol seçimi: Usta veya İşveren</p>
            <p>✓ Profil bilgilerinizi tamamlayın</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockCredentialsInfo;