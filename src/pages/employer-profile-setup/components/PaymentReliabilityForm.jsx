import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentReliabilityForm = ({ formData, errors, onChange, onCheckboxChange }) => {
  const paymentMethodOptions = [
    { value: 'bank_transfer', label: 'Banka Havalesi' },
    { value: 'eft', label: 'EFT' },
    { value: 'cash', label: 'Nakit' },
    { value: 'check', label: 'Çek' }
  ];

  const paymentTermOptions = [
    { value: 'immediate', label: 'İş bitiminde anında' },
    { value: 'weekly', label: 'Haftalık' },
    { value: 'biweekly', label: '15 günlük' },
    { value: 'monthly', label: 'Aylık' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Ödeme Güvenilirliği</h2>
          <p className="text-sm text-muted-foreground">Ödeme bilgilerinizi tanımlayın</p>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Banka Adı"
          type="text"
          name="bankName"
          placeholder="Örn: Türkiye İş Bankası"
          value={formData?.bankName}
          onChange={onChange}
          error={errors?.bankName}
          required
          description="Ödeme yapacağınız banka"
        />

        <Input
          label="IBAN"
          type="text"
          name="iban"
          placeholder="TR00 0000 0000 0000 0000 0000 00"
          value={formData?.iban}
          onChange={onChange}
          error={errors?.iban}
          required
          maxLength={32}
          description="Şirket IBAN numarası"
        />

        <Select
          label="Tercih Edilen Ödeme Yöntemi"
          name="preferredPaymentMethod"
          options={paymentMethodOptions}
          value={formData?.preferredPaymentMethod}
          onChange={(value) => onChange({ target: { name: 'preferredPaymentMethod', value } })}
          error={errors?.preferredPaymentMethod}
          required
          multiple
          description="Birden fazla seçim yapabilirsiniz"
        />

        <Select
          label="Ödeme Vadesi"
          name="paymentTerm"
          options={paymentTermOptions}
          value={formData?.paymentTerm}
          onChange={(value) => onChange({ target: { name: 'paymentTerm', value } })}
          error={errors?.paymentTerm}
          required
          description="Standart ödeme süreniz"
        />

        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-foreground">Ödeme Taahhütleri</p>
          
          <Checkbox
            label="Zamanında ödeme garantisi veriyorum"
            description="İş bitiminden sonra belirlenen sürede ödeme yapacağımı taahhüt ediyorum"
            checked={formData?.guaranteeTimely}
            onChange={(e) => onCheckboxChange('guaranteeTimely', e?.target?.checked)}
          />

          <Checkbox
            label="Avans ödeme yapabilirim"
            description="İş başlangıcında %30-50 arası avans ödeme yapabilirim"
            checked={formData?.canPayAdvance}
            onChange={(e) => onCheckboxChange('canPayAdvance', e?.target?.checked)}
          />

          <Checkbox
            label="Sigorta primi ödemesi yapıyorum"
            description="Çalışan ustalar için SGK primi ödemeyi kabul ediyorum"
            checked={formData?.payInsurance}
            onChange={(e) => onCheckboxChange('payInsurance', e?.target?.checked)}
          />
        </div>

        <div className="bg-success/10 rounded-lg p-4 border border-success/20 mt-4">
          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={20} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Güvenilirlik Puanı</p>
              <p className="text-xs text-muted-foreground mt-1">Ödeme bilgilerinizi eksiksiz doldurarak ve taahhütleri kabul ederek güvenilirlik puanınızı artırabilir, daha fazla usta başvurusu alabilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReliabilityForm;