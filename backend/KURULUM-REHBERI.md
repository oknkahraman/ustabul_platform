# 🚀 UstaBul Backend - Komple Kurulum Rehberi

Bu rehber, UstaBul backend'ini sıfırdan kurmak için gereken TÜM adımları içerir.

## 📋 İçindekiler
1. [Sistem Gereksinimleri](#sistem-gereksinimleri)
2. [MongoDB Kurulumu](#mongodb-kurulumu)
3. [Backend Kurulumu](#backend-kurulumu)
4. [Database Başlatma](#database-başlatma)
5. [Çalıştırma](#çalıştırma)
6. [Sorun Giderme](#sorun-giderme)

---

## 🔧 Sistem Gereksinimleri

### Gerekli Yazılımlar:
- **Node.js**: v18.x veya üzeri
- **MongoDB**: v6.x veya üzeri  
- **npm**: v9.x veya üzeri (Node.js ile gelir)

### İşletim Sistemi:
- Windows 10/11
- macOS 10.15+
- Ubuntu 20.04+ / Debian 11+

---

## 📦 MongoDB Kurulumu

### Windows (MongoDB Community Edition)

```powershell
# 1. MongoDB Community Server'ı indirin
# https://www.mongodb.com/try/download/community

# 2. İndirilen .msi dosyasını çalıştırın
# - "Complete" kurulum seçin
# - "Install MongoDB as a Service" seçili olsun
# - "Install MongoDB Compass" (GUI aracı) seçili olsun

# 3. Kurulum sonrası kontrol
mongod --version
# MongoDB shell version v6.0.x görmelisiniz

# 4. MongoDB servisini başlatın
net start MongoDB

# 5. MongoDB bağlantısını test edin
mongosh
# MongoDB shell açılmalı, çıkmak için: exit
```

### macOS (Homebrew ile)

```bash
# 1. Homebrew yüklü değilse yükleyin
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. MongoDB'yi yükleyin
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0

# 3. MongoDB servisini başlatın
brew services start mongodb-community@6.0

# 4. Bağlantıyı test edin
mongosh
# exit ile çıkın
```

### Ubuntu/Debian (Linux)

```bash
# 1. MongoDB GPG anahtarını içe aktarın
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# 2. MongoDB repository'sini ekleyin (Ubuntu 22.04 için)
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# 3. Paket listesini güncelleyin
sudo apt update

# 4. MongoDB'yi yükleyin
sudo apt install -y mongodb-org

# 5. MongoDB servisini başlatın
sudo systemctl start mongod
sudo systemctl enable mongod

# 6. Durumu kontrol edin
sudo systemctl status mongod

# 7. Bağlantıyı test edin
mongosh
# exit ile çıkın
```

### MongoDB Kurulum Doğrulaması

Tüm işletim sistemleri için:

```bash
# MongoDB versiyonunu kontrol edin
mongod --version

# MongoDB bağlantısını test edin
mongosh --eval "db.version()"

# Beklenen çıktı: 6.0.x gibi bir versiyon numarası
```

---

## 🖥️ Backend Kurulumu

### 1. Projeyi İndirin/Klonlayın

```bash
# GitHub'dan klonlayın (eğer henüz yapmadıysanız)
git clone <repository-url>
cd <project-name>/backend

# VEYA zaten indirdiyseniz backend klasörüne gidin
cd backend
```

### 2. Bağımlılıkları Yükleyin

```bash
# Backend dizinindeyken:
npm install

# Yükleme tamamlandığında şu mesajı görmelisiniz:
# "added XXX packages"
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını oluşturun veya güncelleyin:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

`.env` dosyasının içeriği:

```env
# Sunucu Portu
PORT=5000

# MongoDB Bağlantı String'i
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul

# JWT Gizli Anahtar (Production'da mutlaka değiştirin!)
JWT_SECRET=ustabul-super-secret-key-change-this-in-production-2024

# JWT Token Süresi
JWT_EXPIRE=7d

# Ortam (development veya production)
NODE_ENV=development

# Frontend URL (CORS için)
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ ÖNEMLİ NOTLAR:**
- `JWT_SECRET`: Production ortamında mutlaka güçlü bir şifre kullanın (min. 32 karakter)
- `MONGODB_URI`: Eğer MongoDB farklı bir portta çalışıyorsa, port numarasını değiştirin
- `CLIENT_URL`: Frontend'iniz farklı bir portta çalışıyorsa güncelleyin

---

## 🗄️ Database Başlatma

### Otomatik Kurulum Scripti

Backend projesinde database'i otomatik başlatan bir script var.

```bash
# Backend dizinindeyken:
node utils/initializeDatabase.js
```

**Script Ne Yapar?**
✅ Admin kullanıcısı oluşturur  
✅ Database indekslerini kurar  
✅ Beceri kategorilerini ekler  
✅ Tüm collection'ları başlatır  
✅ Bağlantıyı doğrular  

**Script Çıktısı:**

```
🚀 UstaBul Database Başlatma Script'i
====================================

📦 Bağlantı kuruluyor: mongodb://127.0.0.1:27017/ustabul
✅ MongoDB'ye bağlanıldı

👤 Admin Kullanıcısı Oluşturuluyor...
✅ Admin kullanıcısı oluşturuldu

📋 Admin Bilgileri:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email    : admin@ustabul.com
Şifre    : Admin123!
Rol      : admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  ÖNEMLİ: Production'da admin şifresini mutlaka değiştirin!

📊 Database İndeksleri Oluşturuluyor...
✅ User indeksleri oluşturuldu
✅ Job indeksleri oluşturuldu
✅ Application indeksleri oluşturuldu
✅ WorkerProfile indeksleri oluşturuldu
✅ EmployerProfile indeksleri oluşturuldu

🎯 Beceri Kategorileri Ekleniyor...
✅ 8 ana kategori eklendi

✅ Veritabanı başlatma tamamlandı!

🔗 Backend'i Başlatmak İçin:
   npm start      (Production)
   npm run dev    (Development)

🌐 Frontend'de kullanılacak admin bilgileri:
   Email: admin@ustabul.com
   Şifre: Admin123!
```

### Manuel Database Kontrolü

Database'in doğru kurulup kurulmadığını kontrol edin:

```bash
# MongoDB shell'e girin
mongosh

# ustabul database'ine geçin
use ustabul

# Collection'ları listeleyin
show collections

# Beklenen çıktı:
# applications
# employerprofiles
# jobs
# users
# workerprofiles

# Admin kullanıcısını kontrol edin
db.users.findOne({ email: "admin@ustabul.com" })

# Çıkış
exit
```

---

## ▶️ Backend'i Çalıştırma

### Development Modu (Önerilen - Geliştirme İçin)

```bash
# Backend dizinindeyken:
npm run dev

# Başarılı çıktı:
# 🚀 Sunucu 5000 portunda çalışıyor
# ✅ MongoDB bağlantısı başarılı
# 📍 API: http://localhost:5000/api
# 🏥 Health: http://localhost:5000/health
```

**Development Modu Özellikleri:**
- Kod değişikliklerinde otomatik yeniden başlar (nodemon)
- Detaylı hata mesajları gösterir
- Debug bilgileri konsola yazdırır

### Production Modu

```bash
npm start

# Başarılı çıktı:
# 🚀 Sunucu 5000 portunda çalışıyor
# ✅ MongoDB bağlantısı başarılı
```

**Production Modu Özellikleri:**
- Optimize edilmiş çalışma
- Minimal log çıktısı
- Daha iyi performans

### Backend Çalışma Kontrolü

Tarayıcınızda veya terminal'de test edin:

```bash
# Health check endpoint
curl http://localhost:5000/health

# Beklenen yanıt:
# {"status":"OK","message":"Server çalışıyor","timestamp":"..."}

# API endpoint test
curl http://localhost:5000/api/auth/login

# Beklenen yanıt (hata değil - auth gerektiriyor):
# {"message":"E-posta ve şifre alanları zorunludur"}
```

---

## 🧪 Test Senaryoları

### 1. Admin Girişi Testi

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ustabul.com",
    "password": "Admin123!"
  }'

# Başarılı yanıt:
# {
#   "success": true,
#   "token": "eyJhbGciOiJIUzI1NiIs...",
#   "user": {
#     "id": "...",
#     "email": "admin@ustabul.com",
#     "fullName": "Admin User",
#     "role": "admin"
#   }
# }
```

### 2. İşçi Kaydı Testi

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usta@test.com",
    "password": "Test123!",
    "fullName": "Test Usta",
    "role": "worker"
  }'

# Başarılı yanıt:
# {
#   "success": true,
#   "token": "...",
#   "user": { ... }
# }
```

### 3. İşveren Kaydı Testi

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "isveren@test.com",
    "password": "Test123!",
    "fullName": "Test İşveren",
    "role": "employer",
    "companyName": "Test Şirketi"
  }'
```

---

## 🔍 Sorun Giderme

### MongoDB Bağlanamıyor

**Semptom:** `MongoServerError: connect ECONNREFUSED`

**Çözümler:**

```bash
# 1. MongoDB çalışıyor mu kontrol et
# Windows
net start | findstr MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# 2. MongoDB başlatılmamışsa başlat
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod

# 3. Port çakışması var mı kontrol et
# Windows
netstat -ano | findstr :27017

# macOS/Linux
lsof -i :27017

# 4. Farklı port kullanıyorsanız .env dosyasını güncelleyin
MONGODB_URI=mongodb://127.0.0.1:27018/ustabul
```

### Backend Portu Zaten Kullanımda

**Semptom:** `Error: listen EADDRINUSE: address already in use :::5000`

**Çözümler:**

```bash
# 1. Hangi process port 5000'i kullanıyor bul
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# 2. Process'i kapat
# Windows (PID'yi yukarıdan alın)
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>

# 3. VEYA .env dosyasında farklı port kullanın
PORT=5001
```

### Admin Kullanıcısı Oluşturulamıyor

**Semptom:** `E11000 duplicate key error`

**Çözüm:** Admin zaten var, doğrudan giriş yapabilirsiniz.

```bash
# Admin'i yeniden oluşturmak için:
mongosh

use ustabul
db.users.deleteOne({ email: "admin@ustabul.com" })
exit

# Script'i tekrar çalıştır
node utils/initializeDatabase.js
```

### JWT Token Hataları

**Semptom:** `jwt malformed` veya `invalid signature`

**Çözüm:**

```bash
# .env dosyasında JWT_SECRET doğru ayarlandığından emin olun
JWT_SECRET=ustabul-super-secret-key-change-this-in-production-2024

# Backend'i yeniden başlatın
# Development
npm run dev

# Production
npm start
```

### CORS Hataları (Frontend Bağlantısında)

**Semptom:** Browser console'da `CORS policy` hatası

**Çözüm:**

```bash
# .env dosyasında CLIENT_URL'i doğru ayarlayın
CLIENT_URL=http://localhost:5173

# Frontend farklı portta çalışıyorsa güncelleyin
CLIENT_URL=http://localhost:3000

# Backend'i yeniden başlatın
```

### Database İndeksleri Oluşturulmuyor

**Semptom:** Yavaş sorgular veya performans sorunları

**Çözüm:**

```bash
# İndeksleri manuel oluştur
mongosh

use ustabul

# User indeksleri
db.users.createIndex({ email: 1 }, { unique: true })

# Job indeksleri
db.jobs.createIndex({ employerId: 1 })
db.jobs.createIndex({ status: 1 })
db.jobs.createIndex({ "location.city": 1 })

# Application indeksleri
db.applications.createIndex({ jobId: 1 })
db.applications.createIndex({ workerId: 1 })

exit
```

---

## 📚 API Endpoint'leri

Backend çalıştırıldığında kullanılabilir endpoint'ler:

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yap
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri
- `POST /api/auth/logout` - Çıkış yap

### Profil Yönetimi
- `PUT /api/profiles/worker` - İşçi profili güncelle
- `PUT /api/profiles/employer` - İşveren profili güncelle
- `GET /api/profiles/worker/:userId` - İşçi profilini getir
- `GET /api/profiles/employer/:userId` - İşveren profilini getir

### İş İlanları
- `POST /api/jobs` - İş ilanı oluştur
- `GET /api/jobs` - İş ilanlarını listele
- `GET /api/jobs/:id` - İş ilanı detayı
- `PUT /api/jobs/:id` - İş ilanı güncelle
- `DELETE /api/jobs/:id` - İş ilanı sil
- `PATCH /api/jobs/:id/close` - İş ilanı kapat

### Başvurular
- `POST /api/applications/jobs/:jobId/apply` - İşe başvur
- `GET /api/applications/my-applications` - Başvurularım
- `GET /api/applications/jobs/:jobId/applications` - İş başvuruları
- `PATCH /api/applications/:id/approve` - Başvuru onayla
- `PATCH /api/applications/:id/reject` - Başvuru reddet

### Dashboard
- `GET /api/dashboard/worker` - İşçi dashboard
- `GET /api/dashboard/employer` - İşveren dashboard

### Lokasyon ve Beceriler
- `GET /api/locations/cities` - İl listesi
- `GET /api/locations/districts/:city` - İlçe listesi
- `GET /api/skills/categories` - Beceri kategorileri

---

## 🔒 Güvenlik Notları

### Development Ortamı (Şu an)
✅ Test için varsayılan ayarlar kullanılabilir  
✅ Admin şifresi basit olabilir  
✅ JWT_SECRET basit olabilir  

### Production Ortamı (Canlıya Alırken)
⚠️ Admin şifresini MUTLAKA değiştirin  
⚠️ JWT_SECRET en az 32 karakter, karmaşık olmalı  
⚠️ CORS'u sadece kendi domain'inizle sınırlayın  
⚠️ Rate limiting ayarlarını sıkılaştırın  
⚠️ HTTPS kullanın (SSL sertifikası)  
⚠️ MongoDB authentication aktif edin  
⚠️ Environment variable'ları güvenli yönetin  

---

## 📊 Performans İpuçları

### MongoDB Optimizasyonu

```javascript
// İndeksler zaten script'te oluşturuluyor
// Ekstra optimizasyon gerekirse:

// 1. Connection pool ayarları (.env)
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul?maxPoolSize=50

// 2. Query projection kullanın (sadece gerekli alanları seçin)
const user = await User.findById(id).select('fullName email role');

// 3. Lean queries (daha hızlı, document yerine plain object)
const jobs = await Job.find().lean();
```

### Node.js Optimizasyonu

```bash
# Production'da PM2 ile çalıştırın (process yöneticisi)
npm install -g pm2

pm2 start backend/server.js --name ustabul-api
pm2 save
pm2 startup
```

---

## 🎉 Kurulum Tamamlandı!

Backend başarıyla kuruldu ve çalışıyor. Şimdi yapabilecekleriniz:

1. **Frontend'i başlatın** ve test edin
2. **API endpoint'lerini** Postman ile test edin
3. **Admin panelinden** sistemi yönetin
4. **İşçi ve işveren hesapları** oluşturun
5. **İş ilanları** ekleyin ve başvurular yapın

### Hızlı Başlangıç Checklist

- [ ] MongoDB yüklü ve çalışıyor
- [ ] Node.js v18+ yüklü
- [ ] `npm install` tamamlandı
- [ ] `.env` dosyası yapılandırıldı
- [ ] `node utils/initializeDatabase.js` çalıştırıldı
- [ ] `npm run dev` ile backend başlatıldı
- [ ] Health endpoint test edildi
- [ ] Admin girişi test edildi

### İletişim ve Destek

**Sorun yaşarsanız:**
1. Bu rehberdeki "Sorun Giderme" bölümünü kontrol edin
2. Backend console loglarını inceleyin
3. MongoDB loglarını kontrol edin
4. Browser network tab'ını kontrol edin (frontend testlerinde)

**Başarılı bir kurulum! 🎊**