import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { authAPI } from '../../../utils/api';


const RegisterForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams?.get('role') || '';

  const [formData, setFormData] = useState({
    role: initialRole,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking', 'online', 'offline'

  const roleOptions = [
    { value: 'worker', label: 'Usta - İş Arıyorum' },
    { value: 'employer', label: 'İşveren - Usta Arıyorum' }
  ];

  // Check backend connectivity on mount
  React.useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const apiUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${apiUrl}/health`, { 
          method: 'GET',
          signal: AbortSignal?.timeout(3000) // 3 second timeout
        });
        
        if (response?.ok) {
          setBackendStatus('online');
          console.log('✅ Backend API is online');
        } else {
          setBackendStatus('offline');
          console.warn('⚠️ Backend API returned non-OK status:', response?.status);
        }
      } catch (error) {
        setBackendStatus('offline');
        console.error('❌ Backend API is offline or unreachable:', error?.message);
      }
    };

    checkBackendConnection();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.role) {
      newErrors.role = 'Lütfen bir rol seçin';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi girin';
    }

    if (!formData?.password || formData?.password?.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    if (!formData?.fullName || formData?.fullName?.length < 3) {
      newErrors.fullName = 'Lütfen tam adınızı girin (en az 3 karakter)';
    }

    if (formData?.role === 'employer' && (!formData?.companyName || formData?.companyName?.length < 2)) {
      newErrors.companyName = 'Lütfen şirket adını girin (en az 2 karakter)';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'Devam etmek için şartları kabul etmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleRegister = async () => {
    // Check backend status first
    if (backendStatus === 'offline') {
      setErrors({
        general: '❌ Backend sunucusu çalışmıyor!\n\n' + 'Lütfen aşağıdaki adımları kontrol edin:\n\n'+ '1. Backend API sunucusunu başlatın:\n'+ '   cd backend && npm start\n\n'+ '2. Backend URL\'yi kontrol edin:\n' +
                `   ${import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'}\n\n` +
                '3. VPS sunucunuzun çalıştığından emin olun\n\n'+ '4. MongoDB bağlantısını kontrol edin\n\n'+ 'Detaylı kurulum için backend-setup-guide.md dosyasına bakın.'
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const registerData = {
        email: formData?.email,
        password: formData?.password,
        fullName: formData?.fullName,
        role: formData?.role,
      };

      if (formData?.role === 'employer') {
        registerData.companyName = formData?.companyName;
      }

      console.log('🚀 Attempting registration with:', { 
        ...registerData, 
        password: '***HIDDEN***' 
      });

      const response = await authAPI?.register(registerData);
      
      console.log('✅ Registration successful:', response?.data);
      
      // Store auth token and user info
      localStorage.setItem('authToken', response?.data?.token);
      localStorage.setItem('userRole', response?.data?.user?.role);
      localStorage.setItem('userId', response?.data?.user?.id);

      // Navigate to profile setup
      if (formData?.role === 'worker') {
        navigate('/worker-profile-setup');
      } else {
        navigate('/employer-profile-setup');
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      let errorMessage = 'Kayıt yapılamadı. Lütfen tekrar deneyin.';
      
      if (error?.response) {
        // Server responded with error status
        console.error('Server error response:', {
          status: error?.response?.status,
          data: error?.response?.data,
          headers: error?.response?.headers
        });
        
        errorMessage = error?.response?.data?.message || 
                      error?.response?.data?.error ||
                      `Sunucu hatası: ${error?.response?.status}`;
        
        // Specific error messages based on status
        if (error?.response?.status === 409) {
          errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
        } else if (error?.response?.status === 400) {
          errorMessage = 'Girilen bilgiler geçersiz. Lütfen kontrol edin.';
        } else if (error?.response?.status === 500) {
          errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
        }
      } else if (error?.request) {
        // Enhanced connection error message
        console.error('No response from server:', error?.request);
        setBackendStatus('offline'); // Update status
        errorMessage = '❌ BACKEND SUNUCUSU ÇALIŞMIYOR!\n\n'+ 'Backend API\'ye bağlanılamadı. Lütfen kontrol edin:\n\n' + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'+ '📍 BACKEND KURULUM ADIMLARI:\n'+ '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'+ '1️⃣ BACKEND KLASÖRÜ OLUŞTURUN:\n'+ '   mkdir backend && cd backend\n\n'+ '2️⃣ PACKAGE.JSON OLUŞTURUN:\n'+ '   npm init -y\n\n'+ '3️⃣ GEREKLİ PAKETLERİ YÜKLEYİN:\n'+ '   npm install express mongoose cors dotenv bcryptjs jsonwebtoken\n\n'+ '4️⃣ SERVER.JS DOSYASI OLUŞTURUN:\n'+ '   (backend-setup-guide.md dosyasındaki kodu kullanın)\n\n'+ '5️⃣ .ENV DOSYASI OLUŞTURUN:\n'+ '   MONGODB_URI=your_mongodb_connection_string\n'+ '   JWT_SECRET=your_secret_key\n'+ '   PORT=5000\n\n'+ '6️⃣ BACKEND\'İ BAŞLATIN:\n' + '   node server.js\n\n'+ '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'+ '📖 Detaylı kurulum: backend-setup-guide.md\n'+ '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
                      `🔗 Beklenen URL: ${import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'}\n` +
                      '🔌 Durum: ÇEVRIMDIŞI (Backend çalışmıyor)';
      } else {
        // Error in request setup
        console.error('Request setup error:', error?.message);
        errorMessage = `İstek hatası: ${error?.message}`;
      }
      
      setErrors({ 
        general: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Backend status indicator */}
      {backendStatus !== 'checking' && (
        <div className={`p-4 rounded-lg border ${
          backendStatus === 'online' ?'bg-green-50 border-green-200 text-green-800' :'bg-error/10 border-error/20 text-error'
        }`}>
          <div className="flex items-center gap-2 font-medium mb-2">
            {backendStatus === 'online' ? (
              <>
                <span className="text-xl">✅</span>
                <span>Backend Bağlantısı: AKTİF</span>
              </>
            ) : (
              <>
                <span className="text-xl">❌</span>
                <span>Backend Bağlantısı: KAPALI</span>
              </>
            )}
          </div>
          <div className="text-sm">
            {backendStatus === 'online' ? (
              <span>Sunucu: {import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'}</span>
            ) : (
              <>
                <div className="font-medium mb-2">Backend sunucusu çalışmıyor!</div>
                <div className="space-y-1">
                  <div>1. Backend klasöründe: <code className="px-1 bg-white/50 rounded">npm start</code></div>
                  <div>2. MongoDB bağlantısını kontrol edin</div>
                  <div>3. Detaylar için: backend-setup-guide.md</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm whitespace-pre-line">
          {errors?.general}
        </div>
      )}

      {/* Debug information in development */}
      {import.meta.env?.DEV && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
          <strong>🔍 Debug Info:</strong>
          <div>API URL: {import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'}</div>
          <div>Environment: {import.meta.env?.MODE}</div>
        </div>
      )}

      <div className="space-y-4">
        <Select
          label="Hesap Türü"
          placeholder="Rol seçin"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
        />

        <Input
          label="E-posta Adresi"
          type="email"
          placeholder="ornek@email.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Ad Soyad"
          type="text"
          placeholder="Tam adınızı girin"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        {formData?.role === 'employer' && (
          <Input
            label="Şirket Adı"
            type="text"
            placeholder="Şirket adını girin"
            value={formData?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />
        )}

        <Input
          label="Şifre"
          type="password"
          placeholder="En az 6 karakter"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />

        <Input
          label="Şifre Tekrar"
          type="password"
          placeholder="Şifrenizi tekrar girin"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />

        <Checkbox
          label="Kullanım Şartları ve Gizlilik Politikası'nı kabul ediyorum"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Button
          variant="default"
          fullWidth
          onClick={handleRegister}
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="right"
        >
          Hesap Oluştur
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;