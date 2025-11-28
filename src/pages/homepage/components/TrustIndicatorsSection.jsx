import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicatorsSection = () => {
  const certifications = [
  {
    icon: "Award",
    title: "TSE Sertifikası",
    description: "Türk Standartları Enstitüsü onaylı platform güvenliği",
    color: "var(--color-primary)"
  },
  {
    icon: "Shield",
    title: "ISO 27001",
    description: "Bilgi güvenliği yönetim sistemi sertifikası",
    color: "var(--color-success)"
  },
  {
    icon: "FileCheck",
    title: "TOBB Üyesi",
    description: "Türkiye Odalar ve Borsalar Birliği kayıtlı",
    color: "var(--color-accent)"
  },
  {
    icon: "Lock",
    title: "KVKK Uyumlu",
    description: "Kişisel Verilerin Korunması Kanunu\'na tam uyum",
    color: "var(--color-primary)"
  }];


  const testimonials = [
  {
    name: "Mehmet Yılmaz",
    role: "Kaynak Ustası",
    company: "İstanbul OSB",
    rating: 5,
    comment: "3 yıldır UstaBul kullanıyorum. Portfolyo sistemi sayesinde yeteneklerimi gösterebildim ve sürekli iş buluyorum. Ödeme güvenilirliği çok önemli, hiç sorun yaşamadım.",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1daceec33-1763291968788.png",
    avatarAlt: "Professional headshot of middle-aged Turkish man with short dark hair wearing blue work uniform in industrial setting"
  },
  {
    name: "Ayşe Demir",
    role: "CNC Operatörü",
    company: "Bursa Teknoloji OSB",
    rating: 5,
    comment: "Kadın usta olarak bu platformda kendimi güvende hissediyorum. Sertifikalarımı doğrulattım ve öncelikli eşleşme sayesinde kaliteli işverenlerle çalışıyorum.",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff14a2e5-1763297300689.png",
    avatarAlt: "Professional headshot of young Turkish woman with tied back dark hair wearing safety glasses and industrial work attire"
  },
  {
    name: "Ahmet Kaya",
    role: "Atölye Sahibi",
    company: "Kaya Metal İmalat",
    rating: 5,
    comment: "İşveren olarak en büyük sorunum nitelikli usta bulmaktı. UstaBul\'un görsel portfolyo sistemi sayesinde ustaların gerçek yeteneklerini görebiliyorum. Çok memnunum.",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b005a178-1763301105728.png",
    avatarAlt: "Professional headshot of experienced Turkish businessman with gray hair wearing formal suit in modern office environment"
  }];


  const stats = [
  {
    icon: "TrendingUp",
    value: "98%",
    label: "İş Tamamlama Oranı",
    description: "Başlayan işlerin başarıyla tamamlanma oranı"
  },
  {
    icon: "Clock",
    value: "24 Saat",
    label: "Ortalama Eşleşme Süresi",
    description: "İş ilanından usta eşleşmesine kadar geçen süre"
  },
  {
    icon: "Users",
    value: "2,500+",
    label: "Aktif Usta",
    description: "Platformda kayıtlı ve aktif çalışan usta sayısı"
  },
  {
    icon: "Star",
    value: "4.8/5",
    label: "Ortalama Memnuniyet",
    description: "Kullanıcı değerlendirme ortalaması"
  }];


  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Güvenilir ve Sertifikalı Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Türkiye'nin önde gelen kurumları tarafından onaylı ve sertifikalandırılmış platform. Kullanıcılarımızın güvenliği bizim önceliğimiz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications?.map((cert, index) =>
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 text-center shadow-card hover:shadow-modal transition-all duration-150 hover:-translate-y-1">

              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={cert?.icon} size={32} color={cert?.color} />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                {cert?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cert?.description}
              </p>
            </div>
          )}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-12">
            Kullanıcılarımız Ne Diyor?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) =>
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-shadow duration-150">

                <div className="flex items-center space-x-4 mb-4">
                  <img
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover border-2 border-border" />

                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{testimonial?.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial?.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="Star" size={16} color="var(--color-accent)" />
                )}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  "{testimonial?.comment}"
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-12">
            Rakamlarla UstaBul
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4 shadow-card">
                  <Icon name={stat?.icon} size={28} color="var(--color-primary)" />
                </div>
                <p className="text-4xl font-heading font-bold text-foreground mb-2">
                  {stat?.value}
                </p>
                <p className="text-lg font-medium text-foreground mb-1">
                  {stat?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TrustIndicatorsSection;