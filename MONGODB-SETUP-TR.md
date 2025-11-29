# UstaBul MongoDB Kurulum Rehberi (Türkçe)

## Hızlı Başlangıç

Bu rehber, UstaBul platformu için MongoDB veritabanını tamamen kurmak ve test verileriyle doldurmak için adım adım talimatlar içerir.

## Ön Gereksinimler

- ✅ Node.js v18+ yüklü
- ✅ MongoDB v6+ yüklü ve çalışır durumda
- ✅ Backend klasörü oluşturulmuş

## Adım 1: Backend Kurulumu

### Backend Klasörü Oluştur

```bash
# Backend klasörü oluştur
mkdir ustabul-backend
cd ustabul-backend

# Node.js projesi başlat
npm init -y
```

### Gerekli Paketleri Yükle

```bash
# Backend bağımlılıklarını yükle
npm install express mongoose bcryptjs jsonwebtoken cors dotenv helmet express-rate-limit

# Geliştirme araçlarını yükle
npm install -D nodemon
```

## Adım 2: Klasör Yapısını Oluştur

```bash
# Klasörleri oluştur
mkdir -p src/models src/routes src/middleware src/controllers src/utils

# Dosyaları oluştur
touch src/server.js .env
```

## Adım 3: Ortam Değişkenlerini Ayarla

`.env` dosyasını oluştur ve düzenle:

```env
# Sunucu Ayarları
PORT=5000
NODE_ENV=development

# MongoDB Bağlantısı
MONGODB_URI=mongodb://localhost:27017/ustabul

# JWT Ayarları
JWT_SECRET=gizli-jwt-anahtariniz-buraya
JWT_EXPIRE=7d

# CORS Ayarları
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Adım 4: Model Dosyalarını Oluştur

### User Model (src/models/User.js)

Detaylı kullanıcı modeli için `backend-setup-guide.md` dosyasına bakın.

### Job Model (src/models/Job.js)

Detaylı iş ilanı modeli için `backend-setup-guide.md` dosyasına bakın.

### Application Model (src/models/Application.js)

Detaylı başvuru modeli için `backend-setup-guide.md` dosyasına bakın.

### WorkerProfile Model (src/models/WorkerProfile.js)

Detaylı işçi profili modeli için `backend-setup-guide.md` dosyasına bakın.

### EmployerProfile Model (src/models/EmployerProfile.js)

Detaylı işveren profili modeli için `backend-setup-guide.md` dosyasına bakın.

## Adım 5: Controller ve Route Dosyalarını Oluştur

Detaylı controller ve route implementasyonları için `backend-setup-guide.md` dosyasına bakın.

## Adım 6: Ana Server Dosyasını Oluştur

`src/server.js` dosyasını `backend-setup-guide.md` dosyasındaki örneklere göre oluşturun.

## Adım 7: Veritabanını Test Verileriyle Doldurma

### Seed Script'i Kopyala

Proje kök dizinine `database-seed-script.js` dosyasını kopyalayın.

### Script'i Çalıştır

```bash
# Backend dizininde
node database-seed-script.js
```

### Oluşturulan Test Verileri

Script başarıyla çalıştığında şu veriler oluşturulur:

#### 📊 Kullanıcılar

**10 İşçi (Usta) Hesabı:**
- Email: `usta1@test.com` - `usta10@test.com`
- Şifre: `test123456`
- Rol: `worker`

Her işçi için otomatik olarak:
- Rastgele meslek kategorisi
- 1-15 yıl arası deneyim
- Farklı şehir ve ilçe
- Portföy bilgileri
- Puan ve değerlendirme

**5 İşveren Hesabı:**
- Email: `isveren1@test.com` - `isveren5@test.com`
- Şifre: `test123456`
- Rol: `employer`

Her işveren için otomatik olarak:
- Şirket bilgileri
- Sektör ve büyüklük
- Konum bilgileri
- Doğrulama durumu
- İstatistikler

#### 📍 Lokasyonlar

Veritabanında aşağıdaki şehir ve ilçeler bulunur:

**İstanbul:**
- Kadıköy, Beşiktaş, Şişli, Üsküdar, Beyoğlu, Sarıyer, Ataşehir, Maltepe

**Ankara:**
- Çankaya, Keçiören, Yenimahalle, Mamak, Etimesgut, Sincan

**İzmir:**
- Konak, Karşıyaka, Bornova, Buca, Balçova, Alsancak

**Bursa:**
- Osmangazi, Nilüfer, Yıldırım, Gemlik, Mudanya

**Antalya:**
- Muratpaşa, Kepez, Konyaaltı, Alanya, Manavgat

#### 💰 Fiyatlandırma

Her iş ilanı için:
- Minimum maaş: 3,000 - 8,000 TL
- Maksimum maaş: 8,000 - 15,000 TL
- Para birimi: TRY (Türk Lirası)

#### 🛠️ Meslek Kategorileri

**İnşaat:**
- Duvar Ustası, Boya Badana, Sıva, Fayans Döşeme, Çatı İşleri, Demir Doğrama

**Elektrik:**
- Ev Elektrikleri, Pano Montajı, Aydınlatma, Sigorta Sistemleri, Akıllı Ev Sistemleri

**Tesisat:**
- Su Tesisatı, Kalorifer, Kombi, Klima, Doğalgaz, Sıhhi Tesisat

**Marangozluk:**
- Mobilya Yapımı, Dolap Montajı, Kapı-Pencere, Ahşap İşleri, Mutfak Dolabı

**Tamir:**
- Beyaz Eşya Tamiri, Elektronik Tamir, Bilgisayar Tamiri, Cep Telefonu Tamiri

#### 📋 İş İlanları

Her işveren için 3-5 iş ilanı oluşturulur:
- Ev Tadilat İşi
- Banyo Yenileme
- Mutfak Dolabı Montajı
- Daire Boyası
- Klima Montajı
- Elektrik Tesisatı Yenileme
- Çatı Onarımı
- Parke Döşeme

Her iş ilanı için:
- Detaylı açıklama
- Gerekli yetenekler
- Konum bilgisi
- Maaş aralığı
- Proje detayları
- Başlangıç tarihi

#### 📨 Başvurular

Her aktif iş için 2-5 başvuru:
- Başvuru mektubu
- Teklif edilen maaş
- Müsaitlik tarihleri
- Başvuru durumu (pending/approved/rejected)

## Adım 8: Backend'i Başlat

### Geliştirme Modunda Çalıştır

```bash
# Backend dizininde
npm run dev
```

Server `http://localhost:5000` adresinde çalışacak.

### Package.json'a Script Ekle

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node database-seed-script.js"
  }
}
```

## Adım 9: Test Et

### API Health Check

```bash
curl http://localhost:5000/health
```

Beklenen yanıt:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Kullanıcı Girişi Test Et

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usta1@test.com",
    "password": "test123456"
  }'
```

Beklenen yanıt:
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "usta1@test.com",
    "fullName": "Usta 1 Test",
    "role": "worker"
  }
}
```

### İş İlanlarını Listele

```bash
curl http://localhost:5000/api/jobs
```

## Adım 10: Frontend'i Bağla

### React .env Dosyasını Güncelle

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Frontend'i Başlat

```bash
# Frontend dizininde
npm run dev
```

## Sorun Giderme

### MongoDB Çalışmıyor

```bash
# MongoDB durumunu kontrol et
systemctl status mongod

# MongoDB'yi başlat
sudo systemctl start mongod

# Otomatik başlatmayı etkinleştir
sudo systemctl enable mongod
```

### Port 5000 Kullanımda

```bash
# Port'u kullanan işlemi bul
lsof -i :5000

# İşlemi sonlandır
kill -9 <PID>
```

### Veritabanını Sıfırlama

```bash
# Seed script'i tekrar çalıştır (tüm verileri siler ve yeniden oluşturur)
node database-seed-script.js
```

### CORS Hatası

Backend `server.js` dosyasında CORS ayarlarını kontrol edin:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

## Hızlı Referans Komutları

```bash
# Backend'i başlat
npm run dev

# Veritabanını doldur
npm run seed

# Veritabanını sıfırla ve yeniden doldur
node database-seed-script.js

# MongoDB durumu
systemctl status mongod

# Backend loglarını gör
pm2 logs ustabul-backend
```

## Test Hesapları Özeti

| Kullanıcı Tipi | Email Format | Şifre | Sayı |
|---------------|--------------|-------|------|
| İşçi (Usta) | usta1@test.com - usta10@test.com | test123456 | 10 |
| İşveren | isveren1@test.com - isveren5@test.com | test123456 | 5 |

## Veritabanı İçeriği

- ✅ 15 Kullanıcı (10 işçi + 5 işveren)
- ✅ 15-25 İş İlanı (her işveren için 3-5 adet)
- ✅ 30-100+ Başvuru (her iş için 2-5 adet)
- ✅ 5 Şehir, 35+ İlçe
- ✅ 5 Meslek Kategorisi, 25+ Yetenek
- ✅ Gerçekçi maaş aralıkları (3,000 - 15,000 TL)

## Sonraki Adımlar

1. ✅ Backend'i VPS'e deploy et
2. ✅ Nginx ile reverse proxy ayarla
3. ✅ SSL sertifikası ekle (Let's Encrypt)
4. ✅ PM2 ile process management kur
5. ✅ MongoDB backup stratejisi oluştur
6. ✅ Frontend'i production için build et

## Daha Fazla Bilgi

Detaylı backend kurulum ve deployment bilgileri için `backend-setup-guide.md` dosyasına bakın.

---

✨ **Tebrikler!** UstaBul MongoDB veritabanınız tamamen kurulu ve test verileriyle dolu!