import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const workerSteps = [
    {
      step: "1",
      icon: "UserPlus",
      title: "Kayıt Ol & Profil Oluştur",
      description: "Telefon numaranızla SMS doğrulama yapın. Uzmanlık alanlarınızı seçin ve portfolyonuzu oluşturun.",
      color: "var(--color-primary)"
    },
    {
      step: "2",
      icon: "Camera",
      title: "İşlerinizi Sergileyin",
      description: "Yaptığınız işlerin fotoğraflarını yükleyin. Sertifikalarınızı ekleyin ve doğrulayın.",
      color: "var(--color-accent)"
    },
    {
      step: "3",
      icon: "Search",
      title: "İş Fırsatlarını Görün",
      description: "50 KM yarıçapındaki size uygun iş ilanlarını inceleyin. Algoritma sizin için en uygun işleri önerir.",
      color: "var(--color-success)"
    },
    {
      step: "4",
      icon: "Send",
      title: "Başvuru Yapın",
      description: "İlgilendiğiniz işlere başvurun. Portfolyonuz otomatik olarak işverene iletilir.",
      color: "var(--color-primary)"
    },
    {
      step: "5",
      icon: "CheckCircle2",
      title: "İşe Başlayın",
      description: "İşveren onayladıktan sonra lokasyon doğrulama ile işe başlayın. Tamamlama sonrası otomatik onay.",
      color: "var(--color-accent)"
    },
    {
      step: "6",
      icon: "Star",
      title: "Değerlendirin & Kazanın",
      description: "İşvereni değerlendirin, puanınızı artırın. Güvenilirlik skorunuz arttıkça daha fazla iş fırsatı.",
      color: "var(--color-success)"
    }
  ];

  const employerSteps = [
    {
      step: "1",
      icon: "Building2",
      title: "Şirket Kaydı Oluştur",
      description: "Telefon doğrulama ile kayıt olun. Şirket bilgilerinizi ve lokasyonunuzu ekleyin.",
      color: "var(--color-primary)"
    },
    {
      step: "2",
      icon: "FileText",
      title: "İş İlanı Yayınla",
      description: "İhtiyacınız olan uzmanlık alanını, lokasyonu ve iş detaylarını belirtin. Ücret aralığını girin.",
      color: "var(--color-accent)"
    },
    {
      step: "3",
      icon: "Users",
      title: "Başvuruları İncele",
      description: "Sistem size uygun ustaları önerir. Portfolyolarını görsel olarak inceleyin, sertifikalarını kontrol edin.",
      color: "var(--color-success)"
    },
    {
      step: "4",
      icon: "UserCheck",
      title: "Usta Seçin & Onayla",
      description: "En uygun ustayı seçin ve başvurusunu onaylayın. Usta bilgilendirilir ve iş başlar.",
      color: "var(--color-primary)"
    },
    {
      step: "5",
      icon: "Clock",
      title: "İş Takibi Yapın",
      description: "Lokasyon doğrulama ile işin başladığından emin olun. İş sürecini takip edin.",
      color: "var(--color-accent)"
    },
    {
      step: "6",
      icon: "ThumbsUp",
      title: "Onayla & Değerlendir",
      description: "İş tamamlandığında 48 saat içinde onaylayın. Ustayı değerlendirin, güvenilirlik skorunuzu artırın.",
      color: "var(--color-success)"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Basit ve güvenli süreç ile usta-işveren buluşması. Her adımda şeffaflık ve güvenilirlik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Ustalar İçin Süreç</h3>
            </div>

            <div className="space-y-6">
              {workerSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center font-heading font-bold text-lg text-primary shadow-card">
                      {step?.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-shadow duration-150">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={step?.icon} size={20} color={step?.color} />
                      </div>
                      <h4 className="text-lg font-heading font-semibold text-foreground">
                        {step?.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">İşverenler İçin Süreç</h3>
            </div>

            <div className="space-y-6">
              {employerSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center font-heading font-bold text-lg text-accent shadow-card">
                      {step?.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-shadow duration-150">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={step?.icon} size={20} color={step?.color} />
                      </div>
                      <h4 className="text-lg font-heading font-semibold text-foreground">
                        {step?.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step?.description}
                    </p>
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

export default HowItWorksSection;