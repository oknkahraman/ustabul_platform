import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AuthenticatedNavigation = ({ userRole = 'worker', userName = 'Kullanıcı', notificationCount = 0, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const workerNavItems = [
    { path: '/worker-dashboard', label: 'Gösterge Paneli', labelTR: 'Gösterge Paneli', icon: 'LayoutDashboard', tooltip: 'İş fırsatlarını görüntüle' },
    { path: '/worker-profile-setup', label: 'Profilim', labelTR: 'Profilim', icon: 'User', tooltip: 'Profilinizi düzenleyin' },
  ];

  const employerNavItems = [
    { path: '/employer-dashboard', label: 'Gösterge Paneli', labelTR: 'Gösterge Paneli', icon: 'Briefcase', tooltip: 'İş ilanlarınızı yönetin' },
    { path: '/employer-profile-setup', label: 'Şirket Profili', labelTR: 'Şirket Profili', icon: 'Building2', tooltip: 'Şirket bilgilerinizi düzenleyin' },
  ];

  const navItems = userRole === 'worker' ? workerNavItems : employerNavItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to={userRole === 'worker' ? '/worker-dashboard' : '/employer-dashboard'} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-150 ease-out hover:bg-primary/20">
                <Icon name="Wrench" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">UstaBul</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 ease-out ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.labelTR}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-150 ease-out"
                aria-label="Bildirimler"
              >
                <Icon name="Bell" size={20} color="var(--color-foreground)" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-semibold text-foreground">Bildirimler</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notificationCount > 0 ? (
                      <div className="p-4">
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-150 ease-out cursor-pointer">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-pulse"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Yeni iş başvurusu</p>
                            <p className="text-xs text-muted-foreground mt-1">5 dakika önce</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Icon name="Bell" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
                        <p className="text-muted-foreground">Yeni bildirim yok</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole === 'worker' ? 'Usta' : 'İşveren'}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} iconName="LogOut" />
            </div>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-150 ease-out relative"
            aria-label="Menüyü aç"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-foreground/50 z-40 md:hidden" onClick={toggleMobileMenu}></div>
            <div className="fixed inset-y-0 right-0 w-64 bg-card border-l border-border z-50 md:hidden overflow-y-auto">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-foreground">Menü</h3>
                  <button onClick={toggleMobileMenu} className="p-2 rounded-lg hover:bg-muted">
                    <Icon name="X" size={20} color="var(--color-foreground)" />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole === 'worker' ? 'Usta' : 'İşveren'}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {navItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={toggleMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-150 ease-out min-h-touch ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.labelTR}</span>
                  </Link>
                ))}

                <button
                  onClick={toggleNotifications}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-150 ease-out min-h-touch"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Bell" size={20} />
                    <span className="font-medium">Bildirimler</span>
                  </div>
                  {notificationCount > 0 && (
                    <span className="bg-error text-error-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-all duration-150 ease-out min-h-touch"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default AuthenticatedNavigation;