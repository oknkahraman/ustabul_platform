import React from 'react';
import { Filter } from 'lucide-react';

const FilterPanel = ({ categories, selectedFilter, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filtreler</h2>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedFilter === 'all' ?'bg-blue-50 text-blue-700 font-medium' :'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Tümü
        </button>
        
        {categories?.filter(cat => cat !== 'Tümü')?.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === category
                ? 'bg-blue-50 text-blue-700 font-medium' :'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;