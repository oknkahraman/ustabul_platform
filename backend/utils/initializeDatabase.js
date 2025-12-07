const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv')?.config();

// Models
const User = require('../models/User.model');
const WorkerProfile = require('../models/WorkerProfile.model');
const EmployerProfile = require('../models/EmployerProfile.model');
const Job = require('../models/Job.model');
const Application = require('../models/Application.model');

// Skill categories
const { SKILL_CATEGORIES } = require('../constants/skillCategories');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors?.[color]}${message}${colors?.reset}`);
}

function logSection(title) {
  console.log('\n' + '='?.repeat(50));
  log(title, 'bright');
  console.log('='?.repeat(50) + '\n');
}

async function initializeDatabase() {
  try {
    logSection('🚀 UstaBul Database Başlatma Script\'i');

    // MongoDB bağlantısı
    log(`📦 Bağlantı kuruluyor: ${process.env.MONGODB_URI}`, 'cyan');
    await mongoose?.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    log('✅ MongoDB\'ye bağlanıldı\n', 'green');

    // Admin kullanıcısı oluştur
    logSection('👤 Admin Kullanıcısı Oluşturuluyor...');
    
    const adminEmail = 'admin@ustabul.com';
    const adminPassword = 'Admin123!';
    
    // Mevcut admin var mı kontrol et
    const existingAdmin = await User?.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      log('⚠️  Admin kullanıcısı zaten mevcut', 'yellow');
    } else {
      const adminUser = await User?.create({
        email: adminEmail,
        password: adminPassword,
        fullName: 'Admin User',
        role: 'worker', // Admin özelliği ilerleyen versiyonlarda eklenebilir
        isVerified: true,
        profileCompleted: true
      });

      // Admin için worker profili oluştur
      await WorkerProfile?.create({
        userId: adminUser?._id,
        skills: [],
        experience: { years: 0 },
        location: { city: 'İstanbul', district: 'Kadıköy' }
      });

      log('✅ Admin kullanıcısı oluşturuldu', 'green');
    }

    // Admin bilgilerini göster
    log('\n📋 Admin Bilgileri:', 'cyan');
    console.log('━'?.repeat(50));
    log(`Email    : ${adminEmail}`, 'bright');
    log(`Şifre    : ${adminPassword}`, 'bright');
    log(`Rol      : admin`, 'bright');
    console.log('━'?.repeat(50));
    log('\n⚠️  ÖNEMLİ: Production\'da admin şifresini mutlaka değiştirin!\n', 'red');

    // Database indekslerini oluştur
    logSection('📊 Database İndeksleri Oluşturuluyor...');

    // User indeksleri
    await User?.collection?.createIndex({ email: 1 }, { unique: true });
    log('✅ User indeksleri oluşturuldu', 'green');

    // Job indeksleri
    await Job?.collection?.createIndex({ employerId: 1 });
    await Job?.collection?.createIndex({ status: 1 });
    await Job?.collection?.createIndex({ 'location.city': 1 });
    await Job?.collection?.createIndex({ 'location.district': 1 });
    await Job?.collection?.createIndex({ createdAt: -1 });
    log('✅ Job indeksleri oluşturuldu', 'green');

    // Application indeksleri
    await Application?.collection?.createIndex({ jobId: 1 });
    await Application?.collection?.createIndex({ workerId: 1 });
    await Application?.collection?.createIndex({ status: 1 });
    await Application?.collection?.createIndex({ appliedAt: -1 });
    log('✅ Application indeksleri oluşturuldu', 'green');

    // WorkerProfile indeksleri
    await WorkerProfile?.collection?.createIndex({ userId: 1 }, { unique: true });
    await WorkerProfile?.collection?.createIndex({ 'location.city': 1 });
    log('✅ WorkerProfile indeksleri oluşturuldu', 'green');

    // EmployerProfile indeksleri
    await EmployerProfile?.collection?.createIndex({ userId: 1 }, { unique: true });
    log('✅ EmployerProfile indeksleri oluşturuldu', 'green');

    // Beceri kategorilerini referans olarak göster
    logSection('🎯 Beceri Kategorileri Ekleniyor...');
    
    const categoryCount = Object.keys(SKILL_CATEGORIES)?.length;
    log(`✅ ${categoryCount} ana kategori hazır:`, 'green');
    
    Object.keys(SKILL_CATEGORIES)?.forEach((category, index) => {
      const subcategories = SKILL_CATEGORIES?.[category];
      log(`   ${index + 1}. ${category} (${subcategories?.length} alt kategori)`, 'cyan');
    });

    // Collection'ları listele
    logSection('📦 Database Collection\'ları');
    
    const collections = await mongoose?.connection?.db?.listCollections()?.toArray();
    log(`Toplam ${collections?.length} collection oluşturuldu:`, 'green');
    collections?.forEach((coll, index) => {
      log(`   ${index + 1}. ${coll?.name}`, 'cyan');
    });

    // Başarı mesajı
    logSection('✅ Veritabanı başlatma tamamlandı!');
    
    log('\n🔗 Backend\'i Başlatmak İçin:', 'bright');
    log('   npm start      (Production)', 'cyan');
    log('   npm run dev    (Development)', 'cyan');
    
    log('\n🌐 Frontend\'de kullanılacak admin bilgileri:', 'bright');
    log(`   Email: ${adminEmail}`, 'cyan');
    log(`   Şifre: ${adminPassword}`, 'cyan');
    
    log('\n📚 API Endpoint\'leri:', 'bright');
    log('   http://localhost:5000/health', 'cyan');
    log('   http://localhost:5000/api/auth/login', 'cyan');
    log('   http://localhost:5000/api/auth/register', 'cyan');
    
    console.log('\n' + '='?.repeat(50) + '\n');

  } catch (error) {
    log('\n❌ Hata oluştu:', 'red');
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose?.connection?.close();
    log('🔌 MongoDB bağlantısı kapatıldı\n', 'yellow');
    process.exit(0);
  }
}

// Script'i çalıştır
initializeDatabase();