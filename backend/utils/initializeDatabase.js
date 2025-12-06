const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const WorkerProfile = require('../models/WorkerProfile.model');
const EmployerProfile = require('../models/EmployerProfile.model');

/**
 * UstaBul Platform - Complete Database Initialization Script
 * Bu script tüm veritabanı yapısını oluşturur ve admin kullanıcısı ekler
 */

const initializeDatabase = async () => {
  try {
    console.log('🚀 UstaBul Veritabanı Başlatılıyor...\n');

    // 1. Check MongoDB Connection
    if (mongoose?.connection?.readyState !== 1) {
      console.error('❌ MongoDB bağlantısı yok! Önce server.js üzerinden bağlantı kurun.');
      process.exit(1);
    }

    console.log('✅ MongoDB bağlantısı aktif\n');

    // 2. Create Admin User
    console.log('👤 Admin Kullanıcısı Oluşturuluyor...');
    
    const adminEmail = 'admin@ustabul.com';
    const adminPassword = 'Admin123!';

    // Check if admin already exists
    let adminUser = await User?.findOne({ email: adminEmail });

    if (adminUser) {
      console.log('ℹ️  Admin kullanıcısı zaten mevcut');
    } else {
      // Hash password
      const salt = await bcrypt?.genSalt(10);
      const hashedPassword = await bcrypt?.hash(adminPassword, salt);

      // Create admin user
      adminUser = await User?.create({
        email: adminEmail,
        password: hashedPassword,
        fullName: 'UstaBul Admin',
        role: 'admin',
        isVerified: true
      });

      console.log('✅ Admin kullanıcısı oluşturuldu');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Şifre: ${adminPassword}`);
    }

    // 3. Create Indexes
    console.log('\n📊 İndeksler Oluşturuluyor...');
    
    await Promise.all([
      User?.createIndexes(),
      WorkerProfile?.createIndexes(),
      EmployerProfile?.createIndexes(),
      mongoose?.model('Job')?.createIndexes(),
      mongoose?.model('Application')?.createIndexes()
    ]);

    console.log('✅ Tüm indeksler oluşturuldu\n');

    // 4. Create Skill Categories Reference Data
    console.log('📚 Beceri Kategorileri Referans Verisi:');
    const skillCategories = {
      'Kaynak': ['TIG Kaynağı', 'MIG/MAG Kaynağı', 'Elektrik Kaynağı', 'Oksijen Kaynağı', 'Argon Kaynağı'],
      'Elektrik': ['Ev Elektriği', 'Endüstriyel Elektrik', 'Jeneratör Kurulumu', 'Pano Montajı', 'Otomasyon'],
      'Tesisat': ['Su Tesisatı', 'Doğalgaz Tesisatı', 'Klima Tesisatı', 'Kalorifer Tesisatı'],
      'İnşaat': ['Duvar Örme', 'Sıva', 'Mantolama', 'Fayans Döşeme', 'Parke Döşeme'],
      'Boya': ['İç Cephe Boyası', 'Dış Cephe Boyası', 'Ahşap Boyası', 'Dekoratif Boya'],
      'Döküm': ['Beton Dökümü', 'Temel Dökümü', 'Kolon Dökümü', 'Demir Bağlama'],
      'Marangozluk': ['Mobilya Üretimi', 'Kapı-Pencere', 'Mutfak Dolabı', 'Onarım']
    };

    console.log('✅ Beceri kategorileri sisteme yüklenmeye hazır');
    Object.entries(skillCategories)?.forEach(([category, subcategories]) => {
      console.log(`   - ${category}: ${subcategories?.length} alt kategori`);
    });

    // 5. Summary
    console.log('\n' + '='?.repeat(50));
    console.log('✨ VERİTABANI BAŞLATMA TAMAMLANDI ✨');
    console.log('='?.repeat(50));
    console.log('\n📋 ADMIN GİRİŞ BİLGİLERİ:');
    console.log(`   Email    : ${adminEmail}`);
    console.log(`   Şifre    : ${adminPassword}`);
    console.log('\n🔗 API Base URL: http://localhost:5000/api');
    console.log('\n📚 Mevcut Endpoints:');
    console.log('   🔐 Auth:');
    console.log('      POST   /api/auth/register');
    console.log('      POST   /api/auth/login');
    console.log('      GET    /api/auth/me');
    console.log('\n   👷 Worker:');
    console.log('      PUT    /api/workers/profile');
    console.log('      GET    /api/workers/profile');
    console.log('      GET    /api/workers/matching-jobs');
    console.log('\n   🏢 Employer:');
    console.log('      PUT    /api/employers/profile');
    console.log('      GET    /api/employers/profile');
    console.log('\n   📋 Jobs:');
    console.log('      POST   /api/jobs');
    console.log('      GET    /api/jobs');
    console.log('      GET    /api/jobs/:id');
    console.log('      PUT    /api/jobs/:id');
    console.log('      DELETE /api/jobs/:id');
    console.log('      PATCH  /api/jobs/:id/publish');
    console.log('      PATCH  /api/jobs/:id/close');
    console.log('      GET    /api/jobs/my-jobs');
    console.log('      GET    /api/jobs/:id/matching-workers');
    console.log('\n   📝 Applications:');
    console.log('      POST   /api/applications');
    console.log('      GET    /api/applications');
    console.log('      PATCH  /api/applications/:id/approve');
    console.log('      PATCH  /api/applications/:id/reject');
    console.log('\n' + '='?.repeat(50) + '\n');

    return {
      success: true,
      adminEmail,
      adminPassword,
      skillCategories
    };

  } catch (error) {
    console.error('\n❌ Veritabanı başlatma hatası:', error);
    throw error;
  }
};

// Export for use in server.js
module.exports = initializeDatabase;

// Run directly if called as script
if (require.main === module) {
  const connectDB = require('../config/db');
  
  connectDB()?.then(() => {
    initializeDatabase()?.then(() => {
        console.log('✅ Script başarıyla tamamlandı');
        process.exit(0);
      })?.catch((error) => {
        console.error('❌ Script hatası:', error);
        process.exit(1);
      });
  });
}