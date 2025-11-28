import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SkillCategoryTree = ({ selectedSkills, onSkillToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState(['metal-works']);

  const skillCategories = [
    {
      id: 'metal-works',
      name: 'Metal İşleri',
      icon: 'Wrench',
      subcategories: [
        { id: 'welding', name: 'Kaynak', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'sheet-metal', name: 'Sac Metal İşleme', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'pipe-welding', name: 'Boru Kaynağı', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'tig-welding', name: 'TIG Kaynağı', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] }
      ]
    },
    {
      id: 'manufacturing',
      name: 'İmalat',
      icon: 'Cog',
      subcategories: [
        { id: 'cnc-operator', name: 'CNC Operatörü', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'lathe-operator', name: 'Torna Tezgahı', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'milling', name: 'Freze İşleme', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'machining', name: 'Talaşlı İmalat', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] }
      ]
    },
    {
      id: 'electrical',
      name: 'Elektrik',
      icon: 'Zap',
      subcategories: [
        { id: 'industrial-electrician', name: 'Endüstriyel Elektrikçi', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'panel-assembly', name: 'Pano Montajı', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'automation', name: 'Otomasyon Sistemleri', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] }
      ]
    },
    {
      id: 'maintenance',
      name: 'Bakım-Onarım',
      icon: 'Settings',
      subcategories: [
        { id: 'mechanical-maintenance', name: 'Mekanik Bakım', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'hydraulic-systems', name: 'Hidrolik Sistemler', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] },
        { id: 'pneumatic-systems', name: 'Pnömatik Sistemler', levels: ['Başlangıç', 'Orta', 'İleri', 'Uzman'] }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev?.includes(categoryId) 
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSkillSelect = (categoryId, subcategoryId, level) => {
    const skillKey = `${categoryId}-${subcategoryId}-${level}`;
    onSkillToggle(skillKey, { categoryId, subcategoryId, level });
  };

  const isSkillSelected = (categoryId, subcategoryId, level) => {
    const skillKey = `${categoryId}-${subcategoryId}-${level}`;
    return selectedSkills?.hasOwnProperty(skillKey);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Yetenek Seçimi</h3>
        <span className="text-sm text-muted-foreground">{Object.keys(selectedSkills)?.length} yetenek seçildi</span>
      </div>
      <div className="space-y-3">
        {skillCategories?.map((category) => (
          <div key={category?.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category?.id)}
              className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                <span className="font-medium text-foreground">{category?.name}</span>
              </div>
              <Icon 
                name={expandedCategories?.includes(category?.id) ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </button>

            {expandedCategories?.includes(category?.id) && (
              <div className="p-4 space-y-4 bg-background">
                {category?.subcategories?.map((subcategory) => (
                  <div key={subcategory?.id} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">{subcategory?.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {subcategory?.levels?.map((level) => (
                        <button
                          key={level}
                          onClick={() => handleSkillSelect(category?.id, subcategory?.id, level)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                            isSkillSelected(category?.id, subcategory?.id, level)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-warning/10 rounded-lg">
        <p className="text-sm text-foreground flex items-start">
          <Icon name="AlertCircle" size={16} className="mr-2 mt-0.5 flex-shrink-0" color="var(--color-warning)" />
          <span>En az 2 yetenek seçmeniz önerilir. Daha fazla yetenek daha iyi iş eşleşmesi sağlar.</span>
        </p>
      </div>
    </div>
  );
};

export default SkillCategoryTree;