# 🚀 UstaBul - Komple Lokal Kurulum Rehberi

Bu rehber, UstaBul projesini bilgisayarınızda sıfırdan kurmak için gereken TÜM adımları içerir.

## 📋 İçindekiler
1. [Hızlı Başlangıç (Otomatik Kurulum)](#hızlı-başlangıç-otomatik-kurulum)
2. [Manuel Kurulum](#manuel-kurulum)
3. [Sistem Gereksinimleri](#sistem-gereksinimleri)
4. [Frontend Kurulumu](#frontend-kurulumu)
5. [Backend Kurulumu](#backend-kurulumu)
6. [İlk Çalıştırma](#ilk-çalıştırma)
7. [Sorun Giderme](#sorun-giderme)

---

## ⚡ Hızlı Başlangıç (Otomatik Kurulum)

### Windows Kullanıcıları

```powershell
# PowerShell'i yönetici olarak açın ve proje klasöründe çalıştırın
.\setup.bat
```

### macOS/Linux Kullanıcıları

```bash
# Terminal'de proje klasöründe çalıştırın
chmod +x setup.sh
./setup.sh
```

**Otomatik setup script şunları yapacak:**
- ✅ MongoDB kontrolü
- ✅ Node.js versiyonu kontrolü  
- ✅ Bağımlılıkları yükleme
- ✅ Environment dosyalarını oluşturma
- ✅ Database'i başlatma
- ✅ Servisleri başlatma

**Script tamamlandığında:**
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## 🛠️ Manuel Kurulum

Manuel olarak kurmak isterseniz aşağıdaki adımları takip edin.

---

## 🔧 Sistem Gereksinimleri

### Zorunlu Yazılımlar

| Yazılım | Minimum Versiyon | İndirme Linki |
|---------|-----------------|---------------|
| Node.js | v18.x | https://nodejs.org |
| MongoDB | v6.x | https://www.mongodb.com/try/download/community |
| npm | v9.x | Node.js ile gelir |

### İşletim Sistemi Desteği
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 20.04+ / Debian 11+

---

## 📦 MongoDB Kurulumu

### Windows

```powershell
# 1. MongoDB Community Server'ı indirin
# https://www.mongodb.com/try/download/community

# 2. .msi dosyasını çalıştırın
# - "Complete" kurulum seçin
# - "Install MongoDB as a Service" işaretli olsun

# 3. MongoDB'yi başlatın
net start MongoDB

# 4. Kontrol edin
mongosh --eval "db.version()"
```

### macOS

```bash
# Homebrew ile kurulum
brew tap mongodb/brew
brew install mongodb-community@6.0

# Başlatın
brew services start mongodb-community@6.0

# Kontrol edin
mongosh --eval "db.version()"
```

### Linux (Ubuntu/Debian)

```bash
# MongoDB repository ekleyin
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] \
  https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Yükleyin
sudo apt update
sudo apt install -y mongodb-org

# Başlatın
sudo systemctl start mongod
sudo systemctl enable mongod

# Kontrol edin
mongosh --eval "db.version()"
```

---

## 🎨 Frontend Kurulumu

### 1. Frontend Bağımlılıklarını Yükleyin

```bash
# Proje ana dizininde
npm install

# Yükleme tamamlanınca:
# "added XXX packages" mesajını görmelisiniz
```

### 2. Frontend Environment Ayarları

`.env` dosyasını kontrol edin (zaten oluşturulmuş olmalı):

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# Supabase (eğer kullanılıyorsa)
VITE_SUPABASE_URL=https://dummy.supabase.co
VITE_SUPABASE_ANON_KEY=dummykey.updateyourkkey.here
```

**Not:** Şu an backend'i lokalde çalıştıracağınız için sadece `VITE_API_BASE_URL` önemli.

### 3. Frontend'i Test Edin

```bash
# Development server'ı başlatın
npm run dev

# Tarayıcınızda açın:
# http://localhost:5173
```

**Başarılı çıktı:**
```
  VITE v5.0.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🖥️ Backend Kurulumu

### 1. Backend Bağımlılıklarını Yükleyin

```bash
# Backend dizinine gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# Ana dizine geri dönün
cd ..
```

### 2. Backend Environment Ayarları

`backend/.env` dosyasını oluşturun:

```bash
# Windows
cd backend
copy .env.example .env
cd ..

# macOS/Linux
cd backend
cp .env.example .env
cd ..
```

`backend/.env` içeriği:

```env
# Sunucu Portu
PORT=5000

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul

# JWT Ayarları
JWT_SECRET=ustabul-super-secret-key-change-this-in-production-2024
JWT_EXPIRE=7d

# Ortam
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database'i Başlatın

```bash
# Backend dizininde
cd backend
node utils/initializeDatabase.js
cd ..
```

**Script çıktısı:**
```
🚀 UstaBul Database Başlatma Script'i
====================================

✅ MongoDB'ye bağlanıldı
✅ Admin kullanıcısı oluşturuldu

📋 Admin Bilgileri:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email    : admin@ustabul.com
Şifre    : Admin123!
Rol      : admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Database indeksleri oluşturuldu
✅ Beceri kategorileri eklendi
✅ Veritabanı başlatma tamamlandı!
```

### 4. Backend'i Test Edin

```bash
# Backend dizininde
cd backend
npm run dev
```

**Başarılı çıktı:**
```
🚀 Sunucu 5000 portunda çalışıyor
✅ MongoDB bağlantısı başarılı
📍 API: http://localhost:5000/api
🏥 Health: http://localhost:5000/health
```

---

## 🎯 İlk Çalıştırma

### Her İki Servisi Birlikte Çalıştırma

**İki terminal penceresi açın:**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Erişim Noktaları

| Servis | URL | Açıklama |
|--------|-----|----------|
| **Frontend** | http://localhost:5173 | Ana uygulama |
| **Backend API** | http://localhost:5000/api | REST API |
| **Health Check** | http://localhost:5000/health | Backend sağlık kontrolü |

### İlk Giriş

**Admin Hesabı:**
- Email: `admin@ustabul.com`
- Şifre: `Admin123!`

**Test Hesapları Oluşturma:**

Frontend'e gidin → "Kayıt Ol" tıklayın → Formu doldurun:
- İşçi (Usta) hesabı için: `role: "worker"`
- İşveren hesabı için: `role: "employer"`

---

## 🧪 Kurulum Doğrulama

### Backend Kontrolü

```bash
# Health endpoint test
curl http://localhost:5000/health

# Beklenen yanıt:
# {"status":"OK","message":"Server çalışıyor"}

# Login endpoint test
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ustabul.com","password":"Admin123!"}'

# Beklenen: JWT token içeren başarılı yanıt
```

### Frontend Kontrolü

1. Tarayıcınızda http://localhost:5173 açın
2. Ana sayfa yüklenmeli
3. "Giriş Yap" butonuna tıklayın
4. Admin bilgileriyle giriş yapın
5. Dashboard görüntülenmeli

### Database Kontrolü

```bash
# MongoDB shell'e girin
mongosh

# Database'e bağlanın
use ustabul

# Collection'ları listeleyin
show collections

# Çıktı:
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

## 📊 Proje Yapısı

```
ustabul/
├── backend/                    # Node.js + Express + MongoDB
│   ├── controllers/           # API controller'ları
│   ├── models/                # MongoDB modelleri
│   ├── routes/                # API route'ları
│   ├── middleware/            # Auth, validation middleware
│   ├── utils/                 # Yardımcı fonksiyonlar
│   │   └── initializeDatabase.js  # DB başlatma scripti
│   ├── .env                   # Backend environment değişkenleri
│   ├── server.js              # Ana server dosyası
│   └── package.json           # Backend bağımlılıkları
│
├── src/                       # React Frontend
│   ├── components/           # UI bileşenleri
│   ├── pages/                # Sayfa bileşenleri
│   ├── utils/                # Frontend yardımcı fonksiyonları
│   ├── styles/               # CSS ve Tailwind
│   ├── App.jsx               # Ana React component
│   └── Routes.jsx            # Route tanımları
│
├── public/                   # Statik dosyalar
├── .env                      # Frontend environment değişkenleri
├── package.json              # Frontend bağımlılıkları
├── KURULUM.md                # Bu dosya
├── setup.sh                  # Linux/Mac kurulum scripti
└── setup.bat                 # Windows kurulum scripti
```

---

## 🔍 Sorun Giderme

### MongoDB Bağlantı Hatası

**Hata:** `MongoServerError: connect ECONNREFUSED`

**Çözümler:**

```bash
# 1. MongoDB çalışıyor mu?
# Windows
net start | findstr MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# 2. MongoDB'yi başlat
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod
```

### Port Çakışması

**Hata:** `EADDRINUSE: address already in use`

**Çözümler:**

```bash
# Port 5000'i kullanan process'i bul ve kapat
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Veya .env'de farklı port kullan
PORT=5001
```

### npm install Hataları

**Hata:** `EACCES` veya permission denied

**Çözümler:**

```bash
# npm cache'i temizle
npm cache clean --force

# node_modules ve package-lock.json'ı sil
rm -rf node_modules package-lock.json

# Tekrar yükle
npm install

# Hala sorun varsa, Node.js'i tekrar yükleyin
```

### Frontend Backend'e Bağlanamıyor

**Hata:** Network error veya CORS error

**Kontrol Edin:**

1. Backend çalışıyor mu? → `curl http://localhost:5000/health`
2. Frontend `.env` dosyasında `VITE_API_BASE_URL=http://localhost:5000` var mı?
3. Backend `.env` dosyasında `CLIENT_URL=http://localhost:5173` var mı?
4. Her iki servisi de yeniden başlatın

### Database Script Hatası

**Hata:** Admin kullanıcısı zaten var

**Çözüm:**

```bash
mongosh
use ustabul
db.users.deleteOne({ email: "admin@ustabul.com" })
exit

cd backend
node utils/initializeDatabase.js
```

---

## 🚀 Gelişmiş Kullanım

### Test Data Ekleme

```bash
# Backend dizininde
cd backend

# Seed script'i çalıştır (5 işveren, 10 işçi, 20 iş)
node utils/seedDatabase.js

cd ..
```

### Production Build

```bash
# Frontend build
npm run build

# Build dosyaları dist/ klasöründe oluşur
# Bu dosyaları bir web server'da host edebilirsiniz
```

### Debugging

**Backend Debug:**
```bash
cd backend
npm run dev  # nodemon ile otomatik restart
```

**Frontend Debug:**
```bash
npm run dev  # Vite HMR (Hot Module Replacement)
```

---

## 📚 Ek Kaynaklar

### API Dokümantasyonu

Backend çalıştırıldığında kullanılabilir endpoint'ler:

**Authentication:**
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap
- `GET /api/auth/me` - Profil bilgileri

**Jobs:**
- `GET /api/jobs` - İş ilanları
- `POST /api/jobs` - İş ilanı oluştur
- `GET /api/jobs/:id` - İlan detayı

**Applications:**
- `POST /api/applications/jobs/:jobId/apply` - İşe başvur
- `GET /api/applications/my-applications` - Başvurularım

Tüm endpoint'ler için: `backend/KURULUM-REHBERI.md` dosyasına bakın.

### Teknoloji Stack

**Frontend:**
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.1
- React Router 6.0.2
- Redux Toolkit 2.6.1
- Lucide React (iconlar)
- Framer Motion (animasyonlar)

**Backend:**
- Node.js (v18+)
- Express 4.21.2
- MongoDB 6.x
- Mongoose 8.9.3
- JWT (jsonwebtoken)
- bcryptjs (şifreleme)

---

## ✅ Kurulum Checklist

Tüm adımları tamamladınız mı kontrol edin:

- [ ] MongoDB yüklü ve çalışıyor
- [ ] Node.js v18+ yüklü
- [ ] Frontend `npm install` tamamlandı
- [ ] Backend `npm install` tamamlandı
- [ ] Frontend `.env` dosyası var
- [ ] Backend `.env` dosyası var
- [ ] Database initialize script'i çalıştırıldı
- [ ] Backend başlatıldı (http://localhost:5000)
- [ ] Frontend başlatıldı (http://localhost:5173)
- [ ] Admin girişi test edildi
- [ ] Health endpoint test edildi

---

## 🎉 Kurulum Tamamlandı!

Artık UstaBul platformunu lokal olarak kullanabilirsiniz.

**Yapabilecekleriniz:**
1. ✨ İşçi (usta) hesabı oluşturun ve becerilerinizi ekleyin
2. 🏢 İşveren hesabı oluşturun ve iş ilanları yayınlayın
3. 🔍 İş ilanlarını arayın ve başvuruda bulunun
4. 📊 Dashboard'ları kullanarak istatistikleri görün
5. 👤 Profil yönetimi yapın

**İyi Çalışmalar! 🚀**

---

## 📞 Destek

Sorunlarla karşılaşırsanız:

1. 📖 Bu dokümandaki "Sorun Giderme" bölümünü kontrol edin
2. 📋 `backend/KURULUM-REHBERI.md` dosyasındaki detaylı backend rehberini okuyun
3. 🔧 Console loglarını kontrol edin (hem backend hem frontend)
4. 💾 MongoDB loglarını kontrol edin

**Başarılı bir kurulum dileriz! 🎊**