import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentConfigForm = ({ data, onUpdate }) => {
  const paymentTypeOptions = [
    { value: 'hourly', label: 'Saatlik Ücret' },
    { value: 'project', label: 'Proje Bazlı' },
    { value: 'negotiable', label: 'Pazarlık Edilebilir' }
  ];

  const handleChange = (field, value) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Ödeme Türü *
        </label>
        <Select
          options={paymentTypeOptions}
          value={data?.paymentType || 'hourly'}
          onChange={(value) => handleChange('paymentType', value)}
        />
      </div>
      {data?.paymentType === 'hourly' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Saatlik Ücret (TL) *
          </label>
          <Input
            type="number"
            placeholder="Örn: 150"
            value={data?.hourlyRate || ''}
            onChange={(e) => handleChange('hourlyRate', e?.target?.value)}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Piyasa ortalaması: 120-200 TL/saat
          </p>
        </div>
      )}
      {data?.paymentType === 'project' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Proje Bütçesi (TL) *
          </label>
          <Input
            type="number"
            placeholder="Örn: 15000"
            value={data?.projectBudget || ''}
            onChange={(e) => handleChange('projectBudget', e?.target?.value)}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Toplam proje maliyeti
          </p>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Checkbox
          id="negotiable"
          checked={data?.isNegotiable || false}
          onCheckedChange={(checked) => handleChange('isNegotiable', checked)}
        />
        <label
          htmlFor="negotiable"
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          Ücret pazarlık edilebilir
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Ödeme Koşulları
        </label>
        <textarea
          className="w-full min-h-[100px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
          placeholder="Ödeme planını ve koşullarını belirtin...
          
Örnek:
- %50 avans, %50 iş bitiminde
- Haftalık ödeme
- İş tesliminden 7 gün içinde"
          value={data?.paymentTerms || ''}
          onChange={(e) => handleChange('paymentTerms', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted rounded-lg p-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Piyasa Ortalamaları</p>
          <div className="space-y-1">
            <p className="text-sm text-foreground">Kaynak Ustası: 150-200 TL/saat</p>
            <p className="text-sm text-foreground">CNC Operatörü: 120-180 TL/saat</p>
            <p className="text-sm text-foreground">Elektrikçi: 130-190 TL/saat</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Önerilen Ödeme</p>
          <div className="space-y-1">
            <p className="text-sm text-foreground">✓ Avans sistemi</p>
            <p className="text-sm text-foreground">✓ Net ödeme tarihleri</p>
            <p className="text-sm text-foreground">✓ Performans bonusu</p>
          </div>
        </div>
      </div>
      <div className="bg-warning/10 border border-warning rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-warning mt-0.5">💰</div>
          <div className="text-sm text-warning-foreground">
            <p className="font-medium mb-1">Ödeme İpucu:</p>
            <p>
              Rekabetçi ücret ve net ödeme koşulları daha fazla kaliteli başvuru almanızı sağlar.
              Piyasa ortalamalarını göz önünde bulundurun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfigForm;