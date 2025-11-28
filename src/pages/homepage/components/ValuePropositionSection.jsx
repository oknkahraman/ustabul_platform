import React from 'react';
import Icon from '../../../components/AppIcon';

const ValuePropositionSection = () => {
  const workerBenefits = [
    {
      icon: "Camera",
      title: "Görsel Portfolyo Sistemi",
      description: "CV yerine işlerinizi fotoğraflarla sergileyin. Yeteneklerinizi görsel olarak kanıtlayın ve öne çıkın.",
      color: "var(--color-primary)"
    },
    {
      icon: "MapPin",
      title: "50 KM Yarıçapında İş Fırsatları",
      description: "Konumunuza yakın organize sanayi bölgelerindeki iş ilanlarını otomatik olarak görün.",
      color: "var(--color-accent)"
    },
    {
      icon: "Star",
      title: "Güvenilirlik Skorlama",
      description: "İş tamamlama oranınız, puanlarınız ve sertifikalarınızla güvenilirliğinizi artırın.",
      color: "var(--color-success)"
    },
    {
      icon: "Shield",
      title: "Ödeme Güvencesi Sistemi",
      description: "İşverenlerin ödeme geçmişini görün. Güvenilir işverenlerle çalışın, ghosting'den korunun.",
      color: "var(--color-primary)"
    },
    {
      icon: "Clock",
      title: "Esnek Çalışma İmkanı",
      description: "Kendi programınıza göre iş seçin. Tam zamanlı veya proje bazlı çalışma seçenekleri.",
      color: "var(--color-accent)"
    },
    {
      icon: "Award",
      title: "Sertifika Doğrulama",
      description: "Mesleki sertifikalarınızı yükleyin ve doğrulayın. Öncelikli eşleşme avantajı kazanın.",
      color: "var(--color-success)"
    }
  ];

  const employerBenefits = [
    {
      icon: "Users",
      title: "Nitelikli Usta Havuzu",
      description: "Kaynak, CNC, torna ve imalat alanlarında uzman 2,500+ usta arasından seçim yapın.",
      color: "var(--color-primary)"
    },
    {
      icon: "Eye",
      title: "Görsel Yetenek Doğrulama",
      description: "Ustaların gerçek işlerini fotoğraflarla inceleyin. CV\'den daha güvenilir değerlendirme.",
      color: "var(--color-accent)"
    },
    {
      icon: "Zap",
      title: "Hızlı Eşleşme Algoritması",
      description: "İş ilanınıza uygun ustaları otomatik olarak bulun. 50 KM yarıçapında akıllı eşleşme.",
      color: "var(--color-success)"
    },
    {
      icon: "CheckCircle2",
      title: "Otomatik Onay Mekanizması",
      description: "48 saat içinde iş tamamlama onayı. Anlaşmazlık durumunda admin desteği.",
      color: "var(--color-primary)"
    },
    {
      icon: "TrendingUp",
      title: "Çift Yönlü Değerlendirme",
      description: "Ustaları değerlendirin, kendi güvenilirlik skorunuzu artırın. Şeffaf sistem.",
      color: "var(--color-accent)"
    },
    {
      icon: "FileCheck",
      title: "Sertifika Kontrolü",
      description: "Sertifikalı ustaları öncelikli görün. Kalite garantisi için doğrulanmış yetenekler.",
      color: "var(--color-success)"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Neden UstaBul?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Türkiye'nin ilk görsel portfolyo tabanlı sanayi usta-işveren eşleştirme platformu. Güvenilirlik ve şeffaflık odaklı sistem.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Ustalar İçin</h3>
            </div>

            <div className="space-y-4">
              {workerBenefits?.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-all duration-150 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                      <Icon name={benefit?.icon} size={24} color={benefit?.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {benefit?.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">İşverenler İçin</h3>
            </div>

            <div className="space-y-4">
              {employerBenefits?.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-all duration-150 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-150">
                      <Icon name={benefit?.icon} size={24} color={benefit?.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                        {benefit?.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;