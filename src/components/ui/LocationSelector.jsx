import React, { useState, useEffect } from 'react';
import Select from './Select';
import Input from './Input';
import { TURKEY_CITIES, getDistrictsForCity } from '../../utils/locationData';
import api from '../../utils/api';

const LocationSelector = ({ 
  value = {}, 
  onChange, 
  showNeighborhood = false,
  showStreetAndBuilding = false,
  className = '' 
}) => {
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Fetch districts when city changes
  useEffect(() => {
    if (value?.city) {
      fetchDistricts(value?.city);
    } else {
      setDistricts([]);
    }
  }, [value?.city]);

  const fetchDistricts = async (city) => {
    try {
      setLoadingDistricts(true);
      
      // Try to get from API first
      const response = await api?.get(`/locations/districts/${city}`);
      if (response?.data?.success) {
        setDistricts(response?.data?.data);
      } else {
        // Fallback to local data
        setDistricts(getDistrictsForCity(city));
      }
    } catch (error) {
      // Fallback to local data on error
      setDistricts(getDistrictsForCity(city));
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handleCityChange = (city) => {
    onChange?.({
      ...value,
      city,
      district: '', // Reset district when city changes
      neighborhood: '',
      street: '',
      buildingNo: ''
    });
  };

  const handleDistrictChange = (district) => {
    onChange?.({
      ...value,
      district
    });
  };

  const handleNeighborhoodChange = (e) => {
    onChange?.({
      ...value,
      neighborhood: e?.target?.value
    });
  };

  const handleStreetChange = (e) => {
    onChange?.({
      ...value,
      street: e?.target?.value
    });
  };

  const handleBuildingNoChange = (e) => {
    onChange?.({
      ...value,
      buildingNo: e?.target?.value
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* City Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İl <span className="text-red-500">*</span>
        </label>
        <Select
          value={value?.city || ''}
          onChange={handleCityChange}
          placeholder="İl seçiniz"
          options={TURKEY_CITIES?.map(city => ({ value: city, label: city }))}
        />
      </div>

      {/* District Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İlçe <span className="text-red-500">*</span>
        </label>
        <Select
          value={value?.district || ''}
          onChange={handleDistrictChange}
          placeholder={loadingDistricts ? "Yükleniyor..." : "İlçe seçiniz"}
          options={districts?.map(district => ({ value: district, label: district }))}
          disabled={!value?.city || loadingDistricts}
        />
      </div>

      {/* Neighborhood Input */}
      {showNeighborhood && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mahalle
          </label>
          <Input
            type="text"
            placeholder="Mahalle adı"
            value={value?.neighborhood || ''}
            onChange={handleNeighborhoodChange}
          />
        </div>
      )}

      {/* Street and Building Number */}
      {showStreetAndBuilding && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sokak/Cadde
            </label>
            <Input
              type="text"
              placeholder="Sokak/Cadde"
              value={value?.street || ''}
              onChange={handleStreetChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bina No
            </label>
            <Input
              type="text"
              placeholder="Bina No"
              value={value?.buildingNo || ''}
              onChange={handleBuildingNoChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;