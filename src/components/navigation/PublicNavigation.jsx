import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const PublicNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login-registration');
    setIsMobileMenuOpen(false);
  };

  const handleWorkerRegisterClick = () => {
    navigate('/login-registration?role=worker');
    setIsMobileMenuOpen(false);
  };

  const handleEmployerRegisterClick = () => {
    navigate('/login-registration?role=employer');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-150 ease-out hover:bg-primary/20">
                <Icon name="Wrench" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">UstaBul</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={handleLoginClick}>
              Giriş Yap
            </Button>
            <Button variant="outline" onClick={handleWorkerRegisterClick}>
              Usta Kaydı
            </Button>
            <Button variant="default" onClick={handleEmployerRegisterClick}>
              İşveren Kaydı
            </Button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-150 ease-out"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" fullWidth onClick={handleLoginClick}>
                Giriş Yap
              </Button>
              <Button variant="outline" fullWidth onClick={handleWorkerRegisterClick}>
                Usta Kaydı
              </Button>
              <Button variant="default" fullWidth onClick={handleEmployerRegisterClick}>
                İşveren Kaydı
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default PublicNavigation;