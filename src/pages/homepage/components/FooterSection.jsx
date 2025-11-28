import React from 'react';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    platform: [
      { label: "Hakkımızda", href: "#" },
      { label: "Nasıl Çalışır?", href: "#" },
      { label: "Güvenlik", href: "#" },
      { label: "Blog", href: "#" }
    ],
    support: [
      { label: "Yardım Merkezi", href: "#" },
      { label: "İletişim", href: "#" },
      { label: "SSS", href: "#" },
      { label: "Geri Bildirim", href: "#" }
    ],
    legal: [
      { label: "Kullanım Koşulları", href: "#" },
      { label: "Gizlilik Politikası", href: "#" },
      { label: "KVKK", href: "#" },
      { label: "Çerez Politikası", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: "Facebook", href: "#", label: "Facebook" },
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Instagram", href: "#", label: "Instagram" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">UstaBul</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Türkiye'nin ilk görsel portfolyo tabanlı sanayi usta-işveren eşleştirme platformu. Güvenilir, şeffaf ve komisyonsuz.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.href}
                  aria-label={social?.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks?.platform?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Destek</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Yasal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} color="var(--color-primary)" />
                <span className="text-sm text-muted-foreground">TSE Sertifikalı</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground">ISO 27001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} color="var(--color-accent)" />
                <span className="text-sm text-muted-foreground">KVKK Uyumlu</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} UstaBul. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;