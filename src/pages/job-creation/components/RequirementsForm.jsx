import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RequirementsForm = ({ data, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newEquipment, setNewEquipment] = useState('');

  const experienceLevelOptions = [
    { value: 'entry', label: 'Başlangıç (0-2 yıl)' },
    { value: 'intermediate', label: 'Orta (2-5 yıl)' },
    { value: 'advanced', label: 'İleri (5-10 yıl)' },
    { value: 'expert', label: 'Uzman (10+ yıl)' }
  ];

  const skillSuggestions = [
    'TIG Kaynağı',
    'MIG Kaynağı',
    'Paslanmaz Çelik İşleme',
    'CNC Torna',
    'CNC Freze',
    'Elektrik Tesisatı',
    'Endüstriyel Elektrik',
    'PLC Programlama',
    'Hidrolik Sistemler',
    'Pnömatik Sistemler'
  ];

  const handleAddSkill = () => {
    if (newSkill?.trim()) {
      const currentSkills = data?.primarySkills || [];
      onUpdate?.({ primarySkills: [...currentSkills, newSkill?.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = (data?.primarySkills || [])?.filter(
      (skill) => skill !== skillToRemove
    );
    onUpdate?.({ primarySkills: updatedSkills });
  };

  const handleAddEquipment = () => {
    if (newEquipment?.trim()) {
      const currentEquipment = data?.requiredEquipment || [];
      onUpdate?.({ requiredEquipment: [...currentEquipment, newEquipment?.trim()] });
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (equipmentToRemove) => {
    const updatedEquipment = (data?.requiredEquipment || [])?.filter(
      (equipment) => equipment !== equipmentToRemove
    );
    onUpdate?.({ requiredEquipment: updatedEquipment });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Gerekli Yetkinlikler *
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Yetkinlik ekle (örn: TIG Kaynağı)"
            value={newSkill}
            onChange={(e) => setNewSkill(e?.target?.value)}
            onKeyPress={(e) => {
              if (e?.key === 'Enter') {
                e?.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <Button
            variant="outline"
            iconName="Plus"
            onClick={handleAddSkill}
          >
            Ekle
          </Button>
        </div>

        {data?.primarySkills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {data?.primarySkills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-error"
                >
                  <Icon name="X" size={14} color="currentColor" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs font-medium text-foreground mb-2">Önerilen Yetkinlikler:</p>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setNewSkill(suggestion);
                  handleAddSkill();
                }}
                className="px-2 py-1 bg-background border border-border rounded text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-150 ease-out"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Deneyim Seviyesi *
        </label>
        <Select
          options={experienceLevelOptions}
          value={data?.experienceLevel || 'intermediate'}
          onChange={(value) => onUpdate?.({ experienceLevel: value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Gerekli Ekipman
        </label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Ekipman ekle (örn: Kaynak Makinesi)"
            value={newEquipment}
            onChange={(e) => setNewEquipment(e?.target?.value)}
            onKeyPress={(e) => {
              if (e?.key === 'Enter') {
                e?.preventDefault();
                handleAddEquipment();
              }
            }}
          />
          <Button
            variant="outline"
            iconName="Plus"
            onClick={handleAddEquipment}
          >
            Ekle
          </Button>
        </div>

        {data?.requiredEquipment?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data?.requiredEquipment?.map((equipment, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
              >
                {equipment}
                <button
                  onClick={() => handleRemoveEquipment(equipment)}
                  className="hover:text-error"
                >
                  <Icon name="X" size={14} color="currentColor" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-info/10 border border-info rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-info mt-0.5">💡</div>
          <div className="text-sm text-info-foreground">
            <p className="font-medium mb-1">İpucu:</p>
            <p>
              Detaylı yetkinlik listesi daha uygun işçilerle eşleşmenizi sağlar.
              Her yetkinlik için ayrı etiket ekleyin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsForm;