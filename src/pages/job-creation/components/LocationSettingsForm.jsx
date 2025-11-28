import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const LocationSettingsForm = ({ data, onUpdate }) => {
  const locationTypeOptions = [
    { value: 'specific', label: 'Belirli Adres' },
    { value: 'workshop', label: 'Atölyemde' },
    { value: 'remote', label: 'Uzaktan' }
  ];

  const cityOptions = [
    { value: '', label: 'Şehir Seçin' },
    { value: 'istanbul', label: 'İstanbul' },
    { value: 'ankara', label: 'Ankara' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'bursa', label: 'Bursa' },
    { value: 'kocaeli', label: 'Kocaeli' }
  ];

  const radiusOptions = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 15, label: '15 km' },
    { value: 20, label: '20 km' },
    { value: 30, label: '30 km' },
    { value: 50, label: '50 km' }
  ];

  const handleChange = (field, value) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Konum Türü *
        </label>
        <Select
          options={locationTypeOptions}
          value={data?.locationType || 'specific'}
          onChange={(value) => handleChange('locationType', value)}
        />
      </div>
      {data?.locationType === 'specific' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Şehir *
              </label>
              <Select
                options={cityOptions}
                value={data?.city || ''}
                onChange={(value) => handleChange('city', value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                İlçe *
              </label>
              <Input
                type="text"
                placeholder="İlçe adı girin"
                value={data?.district || ''}
                onChange={(e) => handleChange('district', e?.target?.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tam Adres
            </label>
            <Input
              type="text"
              placeholder="Sokak, mahalle, bina no"
              value={data?.address || ''}
              onChange={(e) => handleChange('address', e?.target?.value)}
            />
          </div>
        </>
      )}
      {data?.locationType === 'workshop' && (
        <>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Atölye Konumu *
            </label>
            <Input
              type="text"
              placeholder="Atölye adresi"
              value={data?.address || ''}
              onChange={(e) => handleChange('address', e?.target?.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Çalışma Yarıçapı
            </label>
            <Select
              options={radiusOptions}
              value={data?.workshopRadius || 10}
              onChange={(value) => handleChange('workshopRadius', value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Atölyenizden ne kadar uzaklıktaki işçileri görmek istersiniz?
            </p>
          </div>
        </>
      )}
      <div className="bg-warning/10 border border-warning rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-warning mt-0.5">⚠️</div>
          <div className="text-sm text-warning-foreground">
            <p className="font-medium mb-1">Dikkat:</p>
            <p>
              Konum bilgileriniz işçilerle eşleşme algoritmasında kullanılacaktır.
              Doğru bilgi sağlamak daha iyi eşleşmeler almanızı sağlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSettingsForm;