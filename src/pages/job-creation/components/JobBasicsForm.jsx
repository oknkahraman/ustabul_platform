import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const JobBasicsForm = ({ data, onUpdate }) => {
  const categoryOptions = [
    { value: '', label: 'Kategori Seçin' },
    { value: 'welding', label: 'Kaynak İşleri' },
    { value: 'cnc', label: 'CNC İşleme' },
    { value: 'electrical', label: 'Elektrik İşleri' },
    { value: 'plumbing', label: 'Tesisat İşleri' },
    { value: 'carpentry', label: 'Marangozluk' },
    { value: 'painting', label: 'Boya-Badana' },
    { value: 'construction', label: 'İnşaat İşleri' },
    { value: 'maintenance', label: 'Bakım-Onarım' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Düşük Öncelik' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'Yüksek Öncelik' },
    { value: 'urgent', label: 'Acil' }
  ];

  const handleChange = (field, value) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          İş İlanı Başlığı *
        </label>
        <Input
          type="text"
          placeholder="Örn: Deneyimli Kaynak Ustası Aranıyor"
          value={data?.title || ''}
          onChange={(e) => handleChange('title', e?.target?.value)}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Net ve açıklayıcı bir başlık kullanın
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            İş Kategorisi *
          </label>
          <Select
            options={categoryOptions}
            value={data?.category || ''}
            onChange={(value) => handleChange('category', value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Öncelik Seviyesi *
          </label>
          <Select
            options={urgencyOptions}
            value={data?.urgency || 'normal'}
            onChange={(value) => handleChange('urgency', value)}
          />
        </div>
      </div>
      <div className="bg-info/10 border border-info rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-info mt-0.5">ℹ️</div>
          <div className="text-sm text-info-foreground">
            <p className="font-medium mb-1">İpucu:</p>
            <p>
              Detaylı ve net başlıklar daha fazla başvuru almanızı sağlar. Gereken
              yetkinlik ve deneyim seviyesini başlıkta belirtmek faydalı olacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBasicsForm;