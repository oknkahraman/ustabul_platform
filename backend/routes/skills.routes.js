const express = require('express');
const router = express?.Router();
const { SKILL_CATEGORIES, JOB_CATEGORIES } = require('../constants/skillCategories');

// @desc    Get complete skill category hierarchy
// @route   GET /api/skills/categories
router?.get('/categories', (req, res) => {
  try {
    res?.json({
      success: true,
      data: SKILL_CATEGORIES
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Kategoriler alınırken hata oluştu',
      error: error?.message
    });
  }
});

// @desc    Get job categories (flat list for employer job creation)
// @route   GET /api/skills/job-categories
router?.get('/job-categories', (req, res) => {
  try {
    res?.json({
      success: true,
      data: JOB_CATEGORIES
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İş kategorileri alınırken hata oluştu',
      error: error?.message
    });
  }
});

// @desc    Get subcategories for a main category
// @route   GET /api/skills/subcategories/:mainCategory
router?.get('/subcategories/:mainCategory', (req, res) => {
  try {
    const { mainCategory } = req?.params;
    const subcategories = SKILL_CATEGORIES?.[mainCategory];
    
    if (!subcategories) {
      return res?.status(404)?.json({
        success: false,
        message: 'Ana kategori bulunamadı'
      });
    }

    res?.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Alt kategoriler alınırken hata oluştu',
      error: error?.message
    });
  }
});

module.exports = router;