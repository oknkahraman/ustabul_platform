import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNavigation from '../../components/navigation/PublicNavigation';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustSignals from './components/TrustSignals';
import MockCredentialsInfo from './components/MockCredentialsInfo';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <Link to="/homepage" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out">
                <Icon name="ArrowLeft" size={16} />
                <span>Ana Sayfaya Dön</span>
              </Link>

              <div className="space-y-2">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Hoş Geldiniz
                </h1>
                <p className="text-lg text-muted-foreground">
                  Türkiye'nin en güvenilir sanayi usta-işveren eşleştirme platformu
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <TrustSignals />
            </div>

            <div className="hidden lg:block space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">Görsel Portfolyo Sistemi</h3>
                  <p className="text-sm text-muted-foreground">
                    Yeteneklerinizi fotoğraflarla sergileyin, işverenler gerçek işlerinizi görsün
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">50 km Yarıçapında Eşleştirme</h3>
                  <p className="text-sm text-muted-foreground">
                    Konumunuza yakın iş fırsatlarını otomatik olarak keşfedin
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Star" size={20} color="var(--color-accent)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">Çift Yönlü Değerlendirme</h3>
                  <p className="text-sm text-muted-foreground">
                    Hem ustalar hem işverenler birbirini değerlendirir, güvenilir topluluk oluşur
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
              <div className="border-b border-border">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-150 ease-out ${
                      activeTab === 'login' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="LogIn" size={18} />
                      <span>Giriş Yap</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-150 ease-out ${
                      activeTab === 'register' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon name="UserPlus" size={18} />
                      <span>Kayıt Ol</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>

            <MockCredentialsInfo />

            <div className="lg:hidden">
              <TrustSignals />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Hesap oluşturarak{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-150 ease-out">
                  Kullanım Şartları
                </button>
                {' '}ve{' '}
                <button className="text-primary hover:text-primary/80 transition-colors duration-150 ease-out">
                  Gizlilik Politikası
                </button>
                'nı kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-8 space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">Görsel Portfolyo Sistemi</h3>
              <p className="text-sm text-muted-foreground">
                Yeteneklerinizi fotoğraflarla sergileyin, işverenler gerçek işlerinizi görsün
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">50 km Yarıçapında Eşleştirme</h3>
              <p className="text-sm text-muted-foreground">
                Konumunuza yakın iş fırsatlarını otomatik olarak keşfedin
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Star" size={20} color="var(--color-accent)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">Çift Yönlü Değerlendirme</h3>
              <p className="text-sm text-muted-foreground">
                Hem ustalar hem işverenler birbirini değerlendirir, güvenilir topluluk oluşur
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginRegistration;