import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationSettingsForm = ({ formData, errors, onChange }) => {
  const cityOptions = [
    { value: 'istanbul', label: 'İstanbul' },
    { value: 'ankara', label: 'Ankara' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'bursa', label: 'Bursa' },
    { value: 'kocaeli', label: 'Kocaeli' },
    { value: 'adana', label: 'Adana' },
    { value: 'gaziantep', label: 'Gaziantep' },
    { value: 'konya', label: 'Konya' }
  ];

  const radiusOptions = [
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '30', label: '30 km' },
    { value: '40', label: '40 km' },
    { value: '50', label: '50 km' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Konum Bilgileri</h2>
          <p className="text-sm text-muted-foreground">İşyeri konumunuzu belirleyin</p>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="İl"
          name="city"
          options={cityOptions}
          value={formData?.city}
          onChange={(value) => onChange({ target: { name: 'city', value } })}
          error={errors?.city}
          required
          searchable
          description="İşyerinizin bulunduğu il"
        />

        <Input
          label="İlçe"
          type="text"
          name="district"
          placeholder="Örn: Tuzla"
          value={formData?.district}
          onChange={onChange}
          error={errors?.district}
          required
        />

        <Input
          label="Mahalle"
          type="text"
          name="neighborhood"
          placeholder="Mahalle adı"
          value={formData?.neighborhood}
          onChange={onChange}
          error={errors?.neighborhood}
          required
        />

        <Input
          label="Cadde/Sokak"
          type="text"
          name="street"
          placeholder="Cadde veya sokak adı"
          value={formData?.street}
          onChange={onChange}
          error={errors?.street}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bina No"
            type="text"
            name="buildingNumber"
            placeholder="Bina numarası"
            value={formData?.buildingNumber}
            onChange={onChange}
            error={errors?.buildingNumber}
          />

          <Input
            label="Posta Kodu"
            type="text"
            name="postalCode"
            placeholder="5 haneli posta kodu"
            value={formData?.postalCode}
            onChange={onChange}
            error={errors?.postalCode}
            maxLength={5}
          />
        </div>

        <Select
          label="Arama Yarıçapı"
          name="searchRadius"
          options={radiusOptions}
          value={formData?.searchRadius}
          onChange={(value) => onChange({ target: { name: 'searchRadius', value } })}
          error={errors?.searchRadius}
          required
          description="Usta araması için maksimum mesafe (50 km'ye kadar)"
        />

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">Konum Eşleştirme</p>
              <p className="text-xs text-muted-foreground mt-1">Seçtiğiniz yarıçap içindeki ustalar iş ilanlarınızı görebilecek ve başvurabilecektir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSettingsForm;