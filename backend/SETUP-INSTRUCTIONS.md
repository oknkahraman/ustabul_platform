# UstaBul Backend - Kurulum ve Çalıştırma Kılavuzu

## 🎯 4 Sorun İçin Çözümler

### ✅ Sorun 1: Usta Kaynak Seçince Yöntem Seçebilmeli
**Çözüm:** Hiyerarşik beceri yapısı eklendi
- Ana kategori: Kaynak
- Alt kategoriler: TIG, MIG/MAG, Elektrik Kaynağı, Oksijen Kaynağı, Argon Kaynağı

**Kullanım:**
```javascript
// Worker profile oluştururken
{
  skills: [
    {
      category: "Kaynak",
      subcategories: ["TIG Kaynağı", "MIG/MAG Kaynağı"]
    },
    {
      category: "Elektrik",
      subcategories: ["Ev Elektriği", "Pano Montajı"]
    }
  ]
}
```

### ✅ Sorun 2: İş İlanı ve Usta Verileri Eşleşmeli
**Çözüm:** Akıllı eşleştirme algoritması eklendi

**Yeni Endpoints:**
- `GET /api/workers/matching-jobs` - Usta için uygun işleri getirir
- `GET /api/jobs/:id/matching-workers` - İş için uygun ustaları getirir

**Eşleştirme Mantığı:**
- Kategori bazlı eşleştirme (Kaynak = Kaynak)
- Alt kategori bazlı eşleştirme (TIG = TIG)
- Her iki seviyede de eşleşme sağlanır

### ✅ Sorun 3: Profil Kaydetme Sorunları
**Çözüm:** Profil controller tamamen yeniden yazıldı

**Düzeltmeler:**
- Create ve Update aynı endpoint'te birleştirildi
- Hata logları eklendi
- Validation hataları detaylı raporlanıyor

**Test:**
```bash
# Profil oluştur/güncelle
PUT /api/workers/profile
Authorization: Bearer YOUR_TOKEN
{
  "skills": [...],
  "location": {...},
  ...
}
```

### ✅ Sorun 4: Database ve Admin Setup Script
**Çözüm:** Otomatik başlatma scripti oluşturuldu

**Özellikler:**
- Admin kullanıcısı otomatik oluşturulur
- Tüm indeksler kurulur
- Beceri kategorileri referans verisi sağlanır
- Tüm API endpoint'leri listelenir

## 📦 Kurulum

### 1. Bağımlılıkları Yükle
```bash
cd backend
npm install
```

### 2. MongoDB'yi Çalıştır
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### 3. Backend'i Başlat
```bash
npm start
```

### 4. Admin Bilgileri
Backend başladığında konsola yazdırılır:
```
Email    : admin@ustabul.com
Şifre    : Admin123!
```

## 🔧 Manuel Script Çalıştırma

Eğer database'i manuel olarak başlatmak isterseniz:

```bash
cd backend
node utils/initializeDatabase.js
```

## 📋 Beceri Kategorileri

### Kullanılabilir Kategoriler ve Alt Kategoriler:

**Kaynak**
- TIG Kaynağı
- MIG/MAG Kaynağı
- Elektrik Kaynağı
- Oksijen Kaynağı
- Argon Kaynağı

**Elektrik**
- Ev Elektriği
- Endüstriyel Elektrik
- Jeneratör Kurulumu
- Pano Montajı
- Otomasyon

**Tesisat**
- Su Tesisatı
- Doğalgaz Tesisatı
- Klima Tesisatı
- Kalorifer Tesisatı

**İnşaat**
- Duvar Örme
- Sıva
- Mantolama
- Fayans Döşeme
- Parke Döşeme

**Boya**
- İç Cephe Boyası
- Dış Cephe Boyası
- Ahşap Boyası
- Dekoratif Boya

**Döküm**
- Beton Dökümü
- Temel Dökümü
- Kolon Dökümü
- Demir Bağlama

**Marangozluk**
- Mobilya Üretimi
- Kapı-Pencere
- Mutfak Dolabı
- Onarım

## 🧪 Test Senaryoları

### Senaryo 1: Kaynak Ustası Profili
```javascript
PUT /api/workers/profile
{
  "skills": [
    {
      "category": "Kaynak",
      "subcategories": ["TIG Kaynağı", "MIG/MAG Kaynağı"]
    }
  ],
  "experience": "5-10",
  "location": {
    "city": "Istanbul",
    "district": "Kadıköy"
  }
}
```

### Senaryo 2: Kaynak İşi İlanı
```javascript
POST /api/jobs
{
  "title": "TIG Kaynakçısı Aranıyor",
  "description": "Paslanmaz çelik kaynak işleri",
  "requiredSkills": [
    {
      "category": "Kaynak",
      "subcategories": ["TIG Kaynağı"]
    }
  ],
  "location": {
    "city": "Istanbul",
    "district": "Kadıköy"
  },
  "salary": {
    "min": 15000,
    "max": 25000
  },
  "status": "active"
}
```

### Senaryo 3: Eşleşen İşleri Bul
```javascript
GET /api/workers/matching-jobs
Authorization: Bearer WORKER_TOKEN
```

### Senaryo 4: Eşleşen Ustaları Bul
```javascript
GET /api/jobs/JOB_ID/matching-workers
Authorization: Bearer EMPLOYER_TOKEN
```

## 🐛 Hata Ayıklama

### Profil Kaydetme Hataları
Backend konsolu hataları detaylı gösterir:
```
Profil kaydetme hatası: [Detaylı hata mesajı]
```

### MongoDB Bağlantı Hataları
```bash
# MongoDB durumunu kontrol et
mongosh
> db.runCommand({ ping: 1 })
```

### Port Çakışması
Eğer port 5000 kullanımdaysa:
```bash
# .env dosyasında değiştir
PORT=5001
```

## 📚 API Dokümantasyonu

Tüm endpoint'ler ve kullanım örnekleri için:
- Backend başladığında konsola yazdırılır
- Veya `backend/SETUP-INSTRUCTIONS.md` dosyasına bakın

## 🎉 Başarılı Kurulum Kontrolü

Backend doğru çalışıyorsa göreceksiniz:
```
✅ Server running on port 5000
✅ MongoDB connected
✅ Veritabanı başlatma tamamlandı
```

## 💡 İpuçları

1. **Her zaman kategori + alt kategori kullanın** - Daha iyi eşleşme sağlar
2. **Draft olarak kaydedin** - İş ilanını kontrol edin, sonra publish edin
3. **Matching endpoint'lerini kullanın** - Manuel arama yerine akıllı eşleştirme
4. **Admin paneli için** - admin@ustabul.com ile giriş yapın

## 🔐 Güvenlik Notları

- Production'da admin şifresini mutlaka değiştirin
- JWT_SECRET değerini güçlü bir değer ile değiştirin
- CORS ayarlarını production için kısıtlayın
- Rate limiting ekleyin (önerilir)

## 📞 Destek

Sorun yaşarsanız:
1. Backend konsolunu kontrol edin
2. MongoDB loglarını inceleyin
3. Network tab'ı kontrol edin (Frontend)
4. `backend/SETUP-INSTRUCTIONS.md` dosyasını okuyun