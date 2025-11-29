import React from 'react';
import Icon from '../../../components/AppIcon';

const MockCredentialsInfo = () => {
  return (
    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-start gap-3">
        <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-foreground mb-3">
            Hesap Oluşturma
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Yeni bir hesap oluşturmak için yukarıdaki formu doldurun. Kayıt olduktan sonra profilinizi tamamlayabilir ve iş aramaya başlayabilirsiniz.
          </p>

          <div className="mt-3 pt-3 border-t border-primary/10">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Icon name="AlertCircle" size={14} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
              <span>
                Kayıt olurken girdiğiniz tam ad ve şirket adı bilgileriniz profilinizde görünecektir. Lütfen doğru bilgileri girdiğinizden emin olun.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockCredentialsInfo;