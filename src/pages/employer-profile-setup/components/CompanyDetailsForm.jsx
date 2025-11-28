import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompanyDetailsForm = ({ formData, errors, onChange }) => {
  const sectorOptions = [
    { value: 'metal', label: 'Metal İşleme ve Kaynak' },
    { value: 'manufacturing', label: 'İmalat ve Üretim' },
    { value: 'electrical', label: 'Elektrik ve Elektronik' },
    { value: 'maintenance', label: 'Bakım ve Onarım' },
    { value: 'automotive', label: 'Otomotiv Yan Sanayi' },
    { value: 'machinery', label: 'Makine İmalatı' }
  ];

  const companySizeOptions = [
    { value: 'small', label: '1-10 çalışan' },
    { value: 'medium', label: '11-50 çalışan' },
    { value: 'large', label: '51-250 çalışan' },
    { value: 'enterprise', label: '250+ çalışan' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Şirket Bilgileri</h2>
          <p className="text-sm text-muted-foreground">Temel şirket bilgilerinizi girin</p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Şirket Adı"
          type="text"
          name="companyName"
          placeholder="Örn: Demir Çelik Sanayi A.Ş."
          value={formData?.companyName}
          onChange={onChange}
          error={errors?.companyName}
          required
          description="Resmi şirket ünvanınızı girin"
        />

        <Input
          label="Vergi Numarası"
          type="text"
          name="taxNumber"
          placeholder="10 haneli vergi numarası"
          value={formData?.taxNumber}
          onChange={onChange}
          error={errors?.taxNumber}
          required
          maxLength={10}
          description="Şirket vergi kimlik numaranız"
        />

        <Select
          label="Ana Sektör"
          name="sector"
          options={sectorOptions}
          value={formData?.sector}
          onChange={(value) => onChange({ target: { name: 'sector', value } })}
          error={errors?.sector}
          required
          description="Şirketinizin faaliyet gösterdiği ana sektör"
        />

        <Select
          label="Şirket Büyüklüğü"
          name="companySize"
          options={companySizeOptions}
          value={formData?.companySize}
          onChange={(value) => onChange({ target: { name: 'companySize', value } })}
          error={errors?.companySize}
          required
        />

        <Input
          label="Ticaret Sicil Numarası"
          type="text"
          name="tradeRegistryNumber"
          placeholder="Ticaret sicil numaranız"
          value={formData?.tradeRegistryNumber}
          onChange={onChange}
          error={errors?.tradeRegistryNumber}
          description="Ticaret odasından alınan sicil numarası (opsiyonel)"
        />

        <Input
          label="Kuruluş Yılı"
          type="number"
          name="foundedYear"
          placeholder="Örn: 2010"
          value={formData?.foundedYear}
          onChange={onChange}
          error={errors?.foundedYear}
          min={1900}
          max={new Date()?.getFullYear()}
          description="Şirketinizin kuruluş yılı"
        />
      </div>
    </div>
  );
};

export default CompanyDetailsForm;