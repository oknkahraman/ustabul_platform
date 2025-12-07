// Hierarchical Skill Category Structure for Metal Works Platform
const SKILL_CATEGORIES = {
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
    'TESVİYE': null, // No subcategories - directly selectable
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

// Flatten for job category dropdown (all subcategories)
const JOB_CATEGORIES = [
  'KAYNAK', 'ABKANT BÜKÜM', 'TESVİYE', 'İMALAT', 'TALAŞLI İMALAT',
  'LAZER KESİM', 'PLAZMA KESİM', 'ŞERİT TESTERE',
  'PANO MONTAJI', 'KABLAJ', 'OTOMASYONCU', 'BAKIM ONARIM',
  'HİDROLİK', 'PNOMATİK'
];

module.exports = {
  SKILL_CATEGORIES,
  JOB_CATEGORIES
};