import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectDetailsForm = ({ data, onUpdate }) => {
  const timelineOptions = [
    { value: '', label: 'Süre Seçin' },
    { value: '1-3days', label: '1-3 gün' },
    { value: '1week', label: '1 hafta' },
    { value: '2weeks', label: '2 hafta' },
    { value: '1month', label: '1 ay' },
    { value: '2-3months', label: '2-3 ay' },
    { value: '3-6months', label: '3-6 ay' },
    { value: '6+months', label: '6+ ay' }
  ];

  const handleChange = (field, value) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          İş Açıklaması *
        </label>
        <textarea
          className="w-full min-h-[150px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
          placeholder="İşin detaylı açıklamasını yazın...
          
Örnek:
- Çelik konstrüksiyon kaynak işleri
- Paslanmaz çelik malzeme kullanımı
- TIG ve MIG kaynağı gerektiren projeler
- Otomasyon sistemleri kurulumu"
          value={data?.description || ''}
          onChange={(e) => handleChange('description', e?.target?.value)}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Minimum 100 karakter (Mevcut: {data?.description?.length || 0})
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahmini Süre *
          </label>
          <Select
            options={timelineOptions}
            value={data?.timeline || ''}
            onChange={(value) => handleChange('timeline', value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Başlangıç Tarihi
          </label>
          <Input
            type="date"
            value={data?.expectedDuration || ''}
            onChange={(e) => handleChange('expectedDuration', e?.target?.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Beklenen Çıktılar
        </label>
        <textarea
          className="w-full min-h-[100px] px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground resize-y"
          placeholder="İşçiden beklenen sonuçları listeleyin...
          
Örnek:
- 50 adet kaynak dikişi tamamlanması
- Kalite kontrol belgelerinin hazırlanması
- İş teslim fotoğrafları"
          value={data?.deliverables || ''}
          onChange={(e) => handleChange('deliverables', e?.target?.value)}
        />
      </div>
      <div className="bg-success/10 border border-success rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-success mt-0.5">✓</div>
          <div className="text-sm text-success-foreground">
            <p className="font-medium mb-1">İyi Uygulama:</p>
            <p>
              Detaylı proje açıklaması ve net beklentiler, kaliteli başvurular
              almanızı sağlar. Teknik detayları ve özel gereksinimleri belirtin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;