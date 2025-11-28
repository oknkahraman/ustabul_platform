import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onResetFilters }) => {
  const skillCategories = [
    { value: 'all', label: 'Tüm Beceriler' },
    { value: 'welding', label: 'Kaynak' },
    { value: 'cnc', label: 'CNC İşleme' },
    { value: 'machining', label: 'Torna/Freze' },
    { value: 'electrical', label: 'Elektrik' },
    { value: 'maintenance', label: 'Bakım-Onarım' }
  ];

  const sortOptions = [
    { value: 'distance', label: 'Mesafeye Göre' },
    { value: 'payment', label: 'Ücrete Göre' },
    { value: 'date', label: 'Tarihe Göre' },
    { value: 'urgency', label: 'Aciliyete Göre' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'Tüm İlanlar' },
    { value: 'urgent', label: 'Acil' },
    { value: 'high', label: 'Yüksek Öncelik' },
    { value: 'normal', label: 'Normal' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Filtreler</h3>
        <Button variant="ghost" size="sm" onClick={onResetFilters} iconName="RotateCcw">
          Sıfırla
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Beceri Kategorisi"
          options={skillCategories}
          value={filters?.skillCategory}
          onChange={(value) => onFilterChange('skillCategory', value)}
        />

        <Select
          label="Sıralama"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />

        <Select
          label="Aciliyet"
          options={urgencyOptions}
          value={filters?.urgency}
          onChange={(value) => onFilterChange('urgency', value)}
        />

        <Input
          label="Maksimum Mesafe (km)"
          type="number"
          placeholder="50"
          value={filters?.maxDistance}
          onChange={(e) => onFilterChange('maxDistance', e?.target?.value)}
          min="1"
          max="100"
        />
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>{filters?.resultCount} iş ilanı bulundu</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>50km yarıçap içinde</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;