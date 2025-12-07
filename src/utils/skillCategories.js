// Hierarchical Skill Category Structure - Frontend Version
export const SKILL_CATEGORIES = {
  'METAL İŞLERİ': {
    'KAYNAK': {
      'MİG-MAG': ['Alüminyum', 'Çelik', 'Paslanmaz'],
      'TIG': ['Alüminyum', 'Çelik', 'Paslanmaz'],
      'ELEKTRİK ARK': ['Alüminyum', 'Çelik', 'Paslanmaz'],
      'OKSİ-ASETİLEN': ['Alüminyum', 'Çelik', 'Paslanmaz'],
      'LAZER': ['Alüminyum', 'Çelik', 'Paslanmaz'],
      'PUNTA KAYNAĞI': ['Alüminyum', 'Çelik', 'Paslanmaz']
    },
    'ABKANT BÜKÜM': {
      'CNC ABKANT BÜKÜM': [],
      'NC ABKANT BÜKÜM': []
    },
    'TESVİYE': null,
    'İMALAT': {
      '': ['Paslanmaz', 'Alüminyum', 'Çelik', 'Ağır Çelik', 'Makine İmalatı']
    },
    'TALAŞLI İMALAT': {
      'CNC TORNA': ['2 Eksen', '3 Eksen', '4 Eksen', '5 Eksen'],
      'CNC DİK İŞLEM': ['2 Eksen', '3 Eksen', '4 Eksen', '5 Eksen'],
      'ÜNİVERSAL TORNA': [],
      'ÜNİVERSAL FREZE': [],
      'MATKAP TEZGAHI': [],
      'PLANYA': []
    },
    'LAZER KESİM': {
      '': [
        'Durmazlar',
        'Çin Üreticiler (Bodor vs.)',
        'Ermaksan',
        'Ajan',
        'Mekotek',
        'Nukon',
        'Amada',
        'Trumpf',
        'Bystronic',
        'Diğer'
      ]
    },
    'PLAZMA KESİM': {
      '': ['Ajan', 'Durmazlar', 'Diğer']
    },
    'ŞERİT TESTERE': {
      '': ['Düz Kesim', 'Açılı Kesim']
    }
  },
  'ELEKTRİK': {
    'PANO MONTAJI': null,
    'KABLAJ': null,
    'OTOMASYONCU': {
      'PLC': ['Schindler', 'Siemens', 'Delta', 'Diğer']
    },
    'BAKIM ONARIM': null
  },
  'TESİSAT': {
    'HİDROLİK': null,
    'PNOMATİK': null
  }
};

// Job categories for employer job creation
export const JOB_CATEGORIES = [
  'KAYNAK', 'ABKANT BÜKÜM', 'TESVİYE', 'İMALAT', 'TALAŞLI İMALAT',
  'LAZER KESİM', 'PLAZMA KESİM', 'ŞERİT TESTERE',
  'PANO MONTAJI', 'KABLAJ', 'OTOMASYONCU', 'BAKIM ONARIM',
  'HİDROLİK', 'PNOMATİK'
];

// Get main categories
export const getMainCategories = () => {
  return Object.keys(SKILL_CATEGORIES);
};

// Get subcategories for a main category
export const getSubCategories = (mainCategory) => {
  const category = SKILL_CATEGORIES?.[mainCategory];
  if (!category) return [];
  return Object.keys(category);
};

// Get details for a subcategory
export const getSubCategoryDetails = (mainCategory, subCategory) => {
  const category = SKILL_CATEGORIES?.[mainCategory];
  if (!category || !category?.[subCategory]) return null;
  return category?.[subCategory];
};

// Check if "Diğer" option exists in a list
export const hasOtherOption = (options) => {
  return options?.includes('Diğer');
};

// Format skill data for API submission
export const formatSkillsForAPI = (selectedSkills) => {
  return selectedSkills?.map(skill => ({
    mainCategory: skill?.mainCategory,
    subCategory: skill?.subCategory,
    details: skill?.details?.map(detail => ({
      type: detail?.type,
      options: detail?.options,
      other: detail?.other || ''
    }))
  }));
};

// Parse API skill data for UI display
export const parseSkillsFromAPI = (apiSkills) => {
  if (!apiSkills || !Array.isArray(apiSkills)) return [];
  
  return apiSkills?.map(skill => ({
    mainCategory: skill?.mainCategory,
    subCategory: skill?.subCategory,
    details: skill?.details?.map(detail => ({
      type: detail?.type,
      options: detail?.options || [],
      other: detail?.other || ''
    })) || []
  }));
};