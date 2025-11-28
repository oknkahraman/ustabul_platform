import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ProfileOptions = ({ 
  anonymousMode, 
  onAnonymousModeChange, 
  location, 
  onLocationChange 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Profil Ayarları</h3>
      <div className="space-y-6">
        <div className="p-4 border border-border rounded-lg">
          <Checkbox
            label="Anonim Profil Modu"
            description="Adınız ve fotoğrafınız işverenlere gösterilmez. Sadece yetenekleriniz ve portfolyonuz görünür."
            checked={anonymousMode}
            onChange={(e) => onAnonymousModeChange(e?.target?.checked)}
          />
          
          {anonymousMode && (
            <div className="mt-3 p-3 bg-warning/10 rounded-lg">
              <p className="text-sm text-foreground flex items-start">
                <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-warning)" />
                <span>Anonim modda kimliğiniz gizli kalır ancak iş eşleşme oranınız %15-20 azalabilir</span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Konum Bilgisi</h4>
            <span className="text-xs text-muted-foreground">Manuel Giriş</span>
          </div>

          <Input
            label="İl"
            placeholder="Örn: İstanbul"
            value={location?.city}
            onChange={(e) => onLocationChange({ ...location, city: e?.target?.value })}
            required
          />

          <Input
            label="İlçe"
            placeholder="Örn: Tuzla"
            value={location?.district}
            onChange={(e) => onLocationChange({ ...location, district: e?.target?.value })}
            required
          />

          <Input
            label="Organize Sanayi Bölgesi (İsteğe Bağlı)"
            placeholder="Örn: Tuzla OSB"
            value={location?.industrialZone}
            onChange={(e) => onLocationChange({ ...location, industrialZone: e?.target?.value })}
          />

          <div className="p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-foreground flex items-start">
              <Icon name="MapPin" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-accent)" />
              <span>Konum bilginiz sadece 50km yarıçapındaki iş eşleştirmeleri için kullanılır. Tam adresiniz paylaşılmaz.</span>
            </p>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Shield" size={18} className="mr-2" color="var(--color-primary)" />
            Gizlilik Kontrolleri
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Telefon numaramı sadece işe alındığımda göster"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Portfolyo fotoğraflarımı sadece eşleşen işverenlere göster"
             
              onChange={() => {}}
            />
            <Checkbox
              label="Profil görüntüleme bildirimlerini al"
              checked
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;