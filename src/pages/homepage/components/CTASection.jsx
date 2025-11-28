import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Hemen Başlayın, İlk İşinizi Bulun
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Türkiye'nin en güvenilir sanayi usta-işveren platformuna katılın. Kayıt ücretsiz, komisyon yok.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-modal hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Wrench" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
              Usta Olarak Kayıt Ol
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Görsel portfolyo ile yeteneklerinizi sergileyin</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">50 KM yarıçapında iş fırsatları</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Güvenilirlik skorlama sistemi</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Ödeme güvencesi ve şeffaflık</span>
              </li>
            </ul>
            <Button 
              variant="default" 
              size="lg"
              fullWidth
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => navigate('/login-registration?role=worker')}
              className="min-h-touch"
            >
              Usta Kaydı Oluştur
            </Button>
          </div>

          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-modal hover:shadow-lg transition-all duration-150 hover:-translate-y-1">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Briefcase" size={32} color="var(--color-accent)" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
              İşveren Olarak Kayıt Ol
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">2,500+ nitelikli usta havuzu</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Görsel portfolyo ile yetenek doğrulama</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Hızlı eşleşme algoritması</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Otomatik onay mekanizması</span>
              </li>
            </ul>
            <Button 
              variant="default" 
              size="lg"
              fullWidth
              iconName="Building2"
              iconPosition="left"
              onClick={() => navigate('/login-registration?role=employer')}
              className="min-h-touch"
            >
              İşveren Kaydı Oluştur
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-primary-foreground/80 mb-4">
            Zaten hesabınız var mı?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            iconName="LogIn"
            iconPosition="left"
            onClick={() => navigate('/login-registration')}
            className="bg-card/20 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/30 min-h-touch"
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;