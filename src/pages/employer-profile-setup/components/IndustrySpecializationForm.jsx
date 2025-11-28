import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const IndustrySpecializationForm = ({ formData, errors, onCheckboxChange }) => {
  const skillCategories = [
    {
      id: 'metal_works',
      name: 'Metal İşleme ve Kaynak',
      icon: 'Flame',
      skills: [
        { id: 'mig_welding', label: 'MIG Kaynak' },
        { id: 'tig_welding', label: 'TIG Kaynak' },
        { id: 'arc_welding', label: 'Elektrik Ark Kaynağı' },
        { id: 'gas_welding', label: 'Gaz Kaynağı' },
        { id: 'spot_welding', label: 'Punta Kaynağı' },
        { id: 'sheet_metal', label: 'Sac İşleme' }
      ]
    },
    {
      id: 'manufacturing',
      name: 'İmalat ve Üretim',
      icon: 'Cog',
      skills: [
        { id: 'cnc_milling', label: 'CNC Freze' },
        { id: 'cnc_lathe', label: 'CNC Torna' },
        { id: 'conventional_lathe', label: 'Konvansiyonel Torna' },
        { id: 'drilling', label: 'Delme İşlemleri' },
        { id: 'grinding', label: 'Taşlama' },
        { id: 'assembly', label: 'Montaj' }
      ]
    },
    {
      id: 'electrical',
      name: 'Elektrik ve Elektronik',
      icon: 'Zap',
      skills: [
        { id: 'industrial_electrical', label: 'Endüstriyel Elektrik' },
        { id: 'panel_assembly', label: 'Pano Montajı' },
        { id: 'automation', label: 'Otomasyon Sistemleri' },
        { id: 'plc_programming', label: 'PLC Programlama' },
        { id: 'motor_maintenance', label: 'Motor Bakımı' }
      ]
    },
    {
      id: 'maintenance',
      name: 'Bakım ve Onarım',
      icon: 'Wrench',
      skills: [
        { id: 'mechanical_maintenance', label: 'Mekanik Bakım' },
        { id: 'hydraulic_systems', label: 'Hidrolik Sistemler' },
        { id: 'pneumatic_systems', label: 'Pnömatik Sistemler' },
        { id: 'bearing_replacement', label: 'Rulman Değişimi' },
        { id: 'preventive_maintenance', label: 'Önleyici Bakım' }
      ]
    }
  ];

  const isSkillSelected = (skillId) => {
    return formData?.requiredSkills?.includes(skillId) || false;
  };

  const handleSkillToggle = (skillId) => {
    const currentSkills = formData?.requiredSkills || [];
    const newSkills = currentSkills?.includes(skillId)
      ? currentSkills?.filter(id => id !== skillId)
      : [...currentSkills, skillId];
    
    onCheckboxChange('requiredSkills', newSkills);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Target" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Sektör Uzmanlığı</h2>
          <p className="text-sm text-muted-foreground">İhtiyaç duyduğunuz yetenek alanlarını seçin</p>
        </div>
      </div>
      <div className="space-y-6">
        {skillCategories?.map((category) => (
          <div key={category?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={18} color="var(--color-primary)" />
              </div>
              <h3 className="text-base font-heading font-semibold text-foreground">{category?.name}</h3>
            </div>

            <CheckboxGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category?.skills?.map((skill) => (
                  <Checkbox
                    key={skill?.id}
                    label={skill?.label}
                    checked={isSkillSelected(skill?.id)}
                    onChange={() => handleSkillToggle(skill?.id)}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </div>
        ))}

        {errors?.requiredSkills && (
          <p className="text-sm text-error">{errors?.requiredSkills}</p>
        )}

        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Eşleştirme Algoritması</p>
              <p className="text-xs text-muted-foreground mt-1">Seçtiğiniz yetenekler, iş ilanlarınızda uygun ustaları otomatik olarak eşleştirmek için kullanılacaktır. En az 3 yetenek seçmeniz önerilir.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
            <span className="text-sm font-medium text-foreground">Seçilen Yetenek Sayısı</span>
          </div>
          <span className="text-lg font-bold text-primary">{formData?.requiredSkills?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default IndustrySpecializationForm;