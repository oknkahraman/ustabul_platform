import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { getMainCategories, getSubCategories, getSubCategoryDetails } from '../../utils/skillCategories';
import { Checkbox } from './Checkbox';
import Input from './Input';
import Button from './Button';

const SkillCategorySelector = ({ selectedSkills = [], onChange, className = '' }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [otherInputs, setOtherInputs] = useState({});

  // Toggle main category expansion
  const toggleMainCategory = (mainCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [mainCategory]: !prev?.[mainCategory]
    }));
  };

  // Toggle subcategory expansion
  const toggleSubCategory = (mainCategory, subCategory) => {
    const key = `${mainCategory}-${subCategory}`;
    setExpandedSubCategories(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  // Check if a skill is selected
  const isSkillSelected = (mainCategory, subCategory, detailType = null, option = null) => {
    return selectedSkills?.some(skill => {
      if (skill?.mainCategory !== mainCategory || skill?.subCategory !== subCategory) {
        return false;
      }

      if (detailType === null && option === null) {
        return true; // Just checking if subcategory is selected
      }

      if (option === null) {
        return skill?.details?.some(d => d?.type === detailType);
      }

      return skill?.details?.some(d => 
        d?.type === detailType && d?.options?.includes(option)
      );
    });
  };

  // Handle subcategory selection (for categories without details)
  const handleSubCategorySelect = (mainCategory, subCategory) => {
    const skillIndex = selectedSkills?.findIndex(
      s => s?.mainCategory === mainCategory && s?.subCategory === subCategory
    );

    let newSkills;
    if (skillIndex >= 0) {
      // Remove skill
      newSkills = selectedSkills?.filter((_, idx) => idx !== skillIndex);
    } else {
      // Add skill
      newSkills = [...selectedSkills, { mainCategory, subCategory, details: [] }];
    }

    onChange?.(newSkills);
  };

  // Handle detail type selection
  const handleDetailTypeSelect = (mainCategory, subCategory, detailType, hasOptions) => {
    const skillIndex = selectedSkills?.findIndex(
      s => s?.mainCategory === mainCategory && s?.subCategory === subCategory
    );

    let newSkills = [...selectedSkills];

    if (skillIndex < 0) {
      // Add new skill with this detail type
      newSkills?.push({
        mainCategory,
        subCategory,
        details: [{ type: detailType, options: [], other: '' }]
      });
    } else {
      const skill = { ...newSkills?.[skillIndex] };
      const detailIndex = skill?.details?.findIndex(d => d?.type === detailType);

      if (detailIndex >= 0) {
        // Remove detail type
        skill.details = skill?.details?.filter((_, idx) => idx !== detailIndex);
        
        // If no details left, remove the whole skill
        if (skill?.details?.length === 0) {
          newSkills = newSkills?.filter((_, idx) => idx !== skillIndex);
        } else {
          newSkills[skillIndex] = skill;
        }
      } else {
        // Add detail type
        skill.details = [...(skill?.details || []), { type: detailType, options: [], other: '' }];
        newSkills[skillIndex] = skill;
      }
    }

    onChange?.(newSkills);
  };

  // Handle option selection within a detail type
  const handleOptionSelect = (mainCategory, subCategory, detailType, option) => {
    const skillIndex = selectedSkills?.findIndex(
      s => s?.mainCategory === mainCategory && s?.subCategory === subCategory
    );

    if (skillIndex < 0) return;

    let newSkills = [...selectedSkills];
    const skill = { ...newSkills?.[skillIndex] };
    const detailIndex = skill?.details?.findIndex(d => d?.type === detailType);

    if (detailIndex < 0) return;

    const detail = { ...skill?.details?.[detailIndex] };
    const optionIndex = detail?.options?.indexOf(option);

    if (optionIndex >= 0) {
      // Remove option
      detail.options = detail?.options?.filter((_, idx) => idx !== optionIndex);
    } else {
      // Add option
      detail.options = [...(detail?.options || []), option];
    }

    skill.details[detailIndex] = detail;
    newSkills[skillIndex] = skill;

    onChange?.(newSkills);
  };

  // Handle "Diğer" text input
  const handleOtherInput = (mainCategory, subCategory, detailType, value) => {
    const key = `${mainCategory}-${subCategory}-${detailType}`;
    setOtherInputs(prev => ({
      ...prev,
      [key]: value
    }));

    const skillIndex = selectedSkills?.findIndex(
      s => s?.mainCategory === mainCategory && s?.subCategory === subCategory
    );

    if (skillIndex < 0) return;

    let newSkills = [...selectedSkills];
    const skill = { ...newSkills?.[skillIndex] };
    const detailIndex = skill?.details?.findIndex(d => d?.type === detailType);

    if (detailIndex < 0) return;

    const detail = { ...skill?.details?.[detailIndex] };
    detail.other = value;

    skill.details[detailIndex] = detail;
    newSkills[skillIndex] = skill;

    onChange?.(newSkills);
  };

  // Clear all selections
  const handleClearAll = () => {
    onChange?.([]);
    setOtherInputs({});
  };

  // Get selected skills count
  const getSelectedCount = () => {
    return selectedSkills?.length || 0;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          Seçili Yetkinlik: {getSelectedCount()}
        </div>
        {getSelectedCount() > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Tümünü Temizle
          </Button>
        )}
      </div>
      {/* Category Tree */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto border border-gray-200 rounded-lg p-4">
        {getMainCategories()?.map(mainCategory => {
          const isExpanded = expandedCategories?.[mainCategory];
          const subCategories = getSubCategories(mainCategory);

          return (
            <div key={mainCategory} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
              {/* Main Category Header */}
              <button
                type="button"
                onClick={() => toggleMainCategory(mainCategory)}
                className="flex items-center w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 mr-2 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                {mainCategory}
              </button>
              {/* Subcategories */}
              {isExpanded && (
                <div className="ml-7 mt-2 space-y-2">
                  {subCategories?.map(subCategory => {
                    const details = getSubCategoryDetails(mainCategory, subCategory);
                    const hasDetails = details && (typeof details === 'object' && Object.keys(details)?.length > 0);
                    const subCategoryKey = `${mainCategory}-${subCategory}`;
                    const isSubExpanded = expandedSubCategories?.[subCategoryKey];

                    if (!hasDetails) {
                      // Simple checkbox for categories without details (TESVİYE, PANO MONTAJI, etc.)
                      return (
                        <div key={subCategory} className="flex items-center py-1">
                          <Checkbox
                            checked={isSkillSelected(mainCategory, subCategory)}
                            onCheckedChange={() => handleSubCategorySelect(mainCategory, subCategory)}
                            id={`${mainCategory}-${subCategory}`}
                          />
                          <label
                            htmlFor={`${mainCategory}-${subCategory}`}
                            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {subCategory}
                          </label>
                        </div>
                      );
                    }

                    // Subcategory with details
                    return (
                      <div key={subCategory} className="border-l-2 border-gray-200 pl-4">
                        <button
                          type="button"
                          onClick={() => toggleSubCategory(mainCategory, subCategory)}
                          className="flex items-center w-full text-left text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors py-1"
                        >
                          {isSubExpanded ? (
                            <ChevronDown className="w-4 h-4 mr-2 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                          )}
                          {subCategory}
                        </button>
                        {/* Detail Types */}
                        {isSubExpanded && (
                          <div className="ml-6 mt-2 space-y-3">
                            {Object.entries(details)?.map(([detailType, options]) => {
                              const displayType = detailType || subCategory; // Use subcategory name if detailType is empty
                              const detailKey = `${mainCategory}-${subCategory}-${detailType}`;
                              
                              if (!options || options?.length === 0) {
                                // Detail type without options (ÜNİVERSAL TORNA, etc.)
                                return (
                                  <div key={detailType} className="flex items-center py-1">
                                    <Checkbox
                                      checked={isSkillSelected(mainCategory, subCategory, detailType)}
                                      onCheckedChange={() => handleDetailTypeSelect(mainCategory, subCategory, detailType, false)}
                                      id={detailKey}
                                    />
                                    <label
                                      htmlFor={detailKey}
                                      className="ml-2 text-sm text-gray-700 cursor-pointer"
                                    >
                                      {displayType}
                                    </label>
                                  </div>
                                );
                              }

                              // Detail type with options
                              return (
                                <div key={detailType} className="space-y-2">
                                  <div className="text-sm font-medium text-gray-700">{displayType}</div>
                                  <div className="ml-4 space-y-2">
                                    {options?.map(option => {
                                      const optionKey = `${detailKey}-${option}`;
                                      const isOtherOption = option === 'Diğer';

                                      return (
                                        <div key={option}>
                                          <div className="flex items-center py-1">
                                            <Checkbox
                                              checked={isSkillSelected(mainCategory, subCategory, detailType, option)}
                                              onCheckedChange={() => handleOptionSelect(mainCategory, subCategory, detailType, option)}
                                              id={optionKey}
                                            />
                                            <label
                                              htmlFor={optionKey}
                                              className="ml-2 text-sm text-gray-600 cursor-pointer"
                                            >
                                              {option}
                                            </label>
                                          </div>
                                          {/* "Diğer" text input */}
                                          {isOtherOption && isSkillSelected(mainCategory, subCategory, detailType, option) && (
                                            <div className="ml-6 mt-2">
                                              <Input
                                                type="text"
                                                placeholder="Belirtiniz..."
                                                value={otherInputs?.[detailKey] || ''}
                                                onChange={(e) => handleOtherInput(mainCategory, subCategory, detailType, e?.target?.value)}
                                                className="text-sm"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Selected Skills Summary */}
      {getSelectedCount() > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm font-medium text-blue-900 mb-2">Seçili Yetkinlikler:</div>
          <div className="space-y-1">
            {selectedSkills?.map((skill, idx) => (
              <div key={idx} className="text-sm text-blue-800">
                • {skill?.mainCategory} → {skill?.subCategory}
                {skill?.details?.length > 0 && (
                  <span className="text-blue-600">
                    {' '}({skill?.details?.map(d => `${d?.type || skill?.subCategory}${d?.options?.length > 0 ? `: ${d?.options?.join(', ')}` : ''}`)?.join('; ')})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillCategorySelector;