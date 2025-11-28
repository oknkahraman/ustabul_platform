import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { authAPI } from '../../../utils/api';

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi girin';
    }

    if (!formData?.password || formData?.password?.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      console.log('🚀 Attempting login with:', { 
        email: formData?.email, 
        password: '***HIDDEN***' 
      });

      const response = await authAPI?.login({
        email: formData?.email,
        password: formData?.password,
      });

      console.log('✅ Login successful:', response?.data);

      // Store auth token and user info
      localStorage.setItem('authToken', response?.data?.token);
      localStorage.setItem('userRole', response?.data?.user?.role);
      localStorage.setItem('userId', response?.data?.user?.id);

      // Navigate based on role
      if (response?.data?.user?.role === 'worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/employer-dashboard');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      let errorMessage = 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.';
      
      if (error?.response) {
        console.error('Server error response:', {
          status: error?.response?.status,
          data: error?.response?.data
        });
        
        errorMessage = error?.response?.data?.message || 
                      error?.response?.data?.error ||
                      `Sunucu hatası: ${error?.response?.status}`;
        
        if (error?.response?.status === 401) {
          errorMessage = 'E-posta veya şifre hatalı.';
        } else if (error?.response?.status === 404) {
          errorMessage = 'Kullanıcı bulunamadı. Lütfen önce kayıt olun.';
        } else if (error?.response?.status === 500) {
          errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
        }
      } else if (error?.request) {
        console.error('No response from server:', error?.request);
        errorMessage = '🔌 Sunucuya bağlanılamıyor. Backend API\'nin çalıştığından emin olun.';
      } else {
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
          label="Şifre"
          type="password"
          placeholder="Şifrenizi girin"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Beni Hatırla"
           
            onChange={(e) => {}} // Placeholder - not used in current implementation
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150 ease-out"
          >
            Şifremi Unuttum
          </button>
        </div>

        <Button
          variant="default"
          fullWidth
          onClick={handleLogin}
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
        >
          Giriş Yap
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;