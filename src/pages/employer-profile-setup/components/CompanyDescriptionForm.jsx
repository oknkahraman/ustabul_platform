import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CompanyDescriptionForm = ({ formData, errors, onChange }) => {
  const facilityTypeOptions = [
    { value: 'workshop', label: 'Atölye' },
    { value: 'factory', label: 'Fabrika' },
    { value: 'production_facility', label: 'Üretim Tesisi' },
    { value: 'maintenance_center', label: 'Bakım Merkezi' },
    { value: 'assembly_line', label: 'Montaj Hattı' }
  ];

  const projectTypeOptions = [
    { value: 'serial_production', label: 'Seri Üretim' },
    { value: 'custom_manufacturing', label: 'Özel İmalat' },
    { value: 'repair_maintenance', label: 'Tamir ve Bakım' },
    { value: 'prototype', label: 'Prototip Üretimi' },
    { value: 'assembly', label: 'Montaj İşleri' },
    { value: 'welding', label: 'Kaynak İşleri' },
    { value: 'machining', label: 'Talaşlı İmalat' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Şirket Tanıtımı</h2>
          <p className="text-sm text-muted-foreground">Şirketinizi ustalara tanıtın</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Şirket Açıklaması <span className="text-error">*</span>
          </label>
          <textarea
            name="companyDescription"
            value={formData?.companyDescription}
            onChange={onChange}
            placeholder="Şirketinizin faaliyet alanı, üretim kapasitesi ve çalışma ortamı hakkında bilgi verin..."
            rows={5}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 resize-none"
            maxLength={1000}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">Minimum 100 karakter önerilir</p>
            <p className="text-xs text-muted-foreground">{formData?.companyDescription?.length || 0}/1000</p>
          </div>
          {errors?.companyDescription && (
            <p className="text-xs text-error mt-1">{errors?.companyDescription}</p>
          )}
        </div>

        <Select
          label="Tesis Tipi"
          name="facilityType"
          options={facilityTypeOptions}
          value={formData?.facilityType}
          onChange={(value) => onChange({ target: { name: 'facilityType', value } })}
          error={errors?.facilityType}
          required
          description="İşyerinizin türü"
        />

        <Select
          label="Tipik Proje Türleri"
          name="projectTypes"
          options={projectTypeOptions}
          value={formData?.projectTypes}
          onChange={(value) => onChange({ target: { name: 'projectTypes', value } })}
          error={errors?.projectTypes}
          required
          multiple
          searchable
          description="Genellikle yaptığınız iş türleri (Birden fazla seçebilirsiniz)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Çalışan Sayısı"
            type="number"
            name="employeeCount"
            placeholder="Toplam çalışan sayısı"
            value={formData?.employeeCount}
            onChange={onChange}
            error={errors?.employeeCount}
            min={1}
          />

          <Input
            label="Üretim Alanı (m²)"
            type="number"
            name="productionArea"
            placeholder="Üretim alanı metrekare"
            value={formData?.productionArea}
            onChange={onChange}
            error={errors?.productionArea}
            min={1}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Çalışma Ortamı ve Olanaklar
          </label>
          <textarea
            name="workEnvironment"
            value={formData?.workEnvironment}
            onChange={onChange}
            placeholder="Örn: Modern CNC makineleri, klimatize çalışma ortamı, yemek servisi, servis aracı..."
            rows={4}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 resize-none"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-2">{formData?.workEnvironment?.length || 0}/500</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">İpucu</p>
              <p className="text-xs text-muted-foreground mt-1">Detaylı ve açıklayıcı bir şirket tanıtımı, kalifiye ustaların başvuru yapma olasılığını %40 artırır. Çalışma koşullarınızı, ekipmanlarınızı ve sağladığınız imkanları belirtin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDescriptionForm;