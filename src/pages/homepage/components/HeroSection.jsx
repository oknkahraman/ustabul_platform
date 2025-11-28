import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
              <Icon name="Wrench" size={20} />
              <span className="text-sm font-medium">Türkiye'nin Sanayi Usta Platformu</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Görsel Portfolyo ile
              <span className="text-primary block mt-2">Usta-İşveren Buluşması</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kaynak, CNC, torna ve imalat ustalarını organize sanayi bölgelerindeki atölyelerle buluşturan güvenilir platform. Görsel portfolyo sistemi ile yeteneklerinizi sergileyin, güvenilirlik skorları ile doğru işverenleri bulun.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => navigate('/login-registration?role=worker')}
                className="min-h-touch">

                Usta Olarak Kayıt Ol
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Briefcase"
                iconPosition="left"
                onClick={() => navigate('/login-registration?role=employer')}
                className="min-h-touch">

                İşveren Olarak Kayıt Ol
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-6 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-2xl font-bold text-foreground">2,500+</p>
                  <p className="text-sm text-muted-foreground">Kayıtlı Usta</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-2xl font-bold text-foreground">850+</p>
                  <p className="text-sm text-muted-foreground">Aktif İşveren</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
                <div>
                  <p className="text-2xl font-bold text-foreground">12,400+</p>
                  <p className="text-sm text-muted-foreground">Tamamlanan İş</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-shadow duration-150">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1648671921845-895549805092"
                      alt="Skilled welder in protective gear working with bright welding torch on metal structure in industrial workshop"
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Kaynak Ustası</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-accent)" />
                      <span className="text-sm font-bold text-foreground">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-shadow duration-150">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1601189571648-edbda757818d"
                      alt="CNC machine operator monitoring precision manufacturing equipment with digital control panel in modern factory"
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">CNC Operatörü</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-accent)" />
                      <span className="text-sm font-bold text-foreground">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-shadow duration-150">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1576142392214-a1794ffa0385"
                      alt="Experienced machinist operating industrial lathe machine with metal workpiece in professional workshop environment"
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Torna Ustası</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-accent)" />
                      <span className="text-sm font-bold text-foreground">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-modal transition-shadow duration-150">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1562045289-8e02d9a3a61f"
                      alt="Manufacturing technician inspecting precision metal parts with measuring tools in quality control station"
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">İmalat Ustası</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-accent)" />
                      <span className="text-sm font-bold text-foreground">4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-4 shadow-modal animate-pulse">
              <Icon name="TrendingUp" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;