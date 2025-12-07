const express = require('express');
const router = express?.Router();
const { getCities, getDistricts } = require('../constants/turkeyLocations');

// @desc    Get all cities
// @route   GET /api/locations/cities
router?.get('/cities', (req, res) => {
  try {
    const cities = getCities();
    res?.json({
      success: true,
      data: cities
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'Şehirler alınırken hata oluştu',
      error: error?.message
    });
  }
});

// @desc    Get districts for a city
// @route   GET /api/locations/districts/:city
router?.get('/districts/:city', (req, res) => {
  try {
    const { city } = req?.params;
    const districts = getDistricts(city);
    
    if (districts?.length === 0) {
      return res?.status(404)?.json({
        success: false,
        message: 'Şehir bulunamadı'
      });
    }

    res?.json({
      success: true,
      data: districts
    });
  } catch (error) {
    res?.status(500)?.json({
      success: false,
      message: 'İlçeler alınırken hata oluştu',
      error: error?.message
    });
  }
});

module.exports = router;