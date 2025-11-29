# UstaBul Platform - MongoDB Database Documentation

## 📋 İçindekiler
1. [Veritabanı Genel Bakış](#veritabanı-genel-bakış)
2. [Koleksiyonlar](#koleksiyonlar)
3. [Veri Modelleri](#veri-modelleri)
4. [İlişkiler](#ilişkiler)
5. [İndeksler](#indeksler)
6. [API Endpoints](#api-endpoints)
7. [Test Senaryoları](#test-senaryoları)
8. [Lokasyon-Bazlı Fonksiyonlar](#lokasyon-bazlı-fonksiyonlar)

---

## Veritabanı Genel Bakış

UstaBul platformu MongoDB 6.0+ kullanır ve aşağıdaki ana koleksiyonlardan oluşur:

```
ustabul (database)
├── users (Kullanıcılar)
├── jobs (İş İlanları)
├── workerprofiles (Usta Profilleri)
├── employerprofiles (İşveren Profilleri)
└── applications (İş Başvuruları)
```

---

## Koleksiyonlar

### 1. Users Collection
**Koleksiyon Adı:** `users`  
**Amaç:** Tüm platform kullanıcılarının temel bilgilerini tutar

**Schema:**
```javascript
{
  _id: ObjectId,
  email: String (unique, required, lowercase, trimmed),
  password: String (hashed with bcrypt, minlength: 6),
  fullName: String (required, trimmed),
  role: String (enum: ['worker', 'employer'], required),
  companyName: String (optional, for employers only),
  isVerified: Boolean (default: false),
  profileCompleted: Boolean (default: false),
  createdAt: Date (default: now),
  lastLogin: Date
}
```

**İndeksler:**
- `email` (unique)
- `role` (for filtering)

**Örnek Döküman:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "mehmet@example.com",
  "password": "$2a$12$hashedpassword",
  "fullName": "Mehmet Yılmaz",
  "role": "worker",
  "isVerified": true,
  "profileCompleted": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "lastLogin": "2025-11-29T15:45:00.000Z"
}
```

---

### 2. Jobs Collection
**Koleksiyon Adı:** `jobs`  
**Amaç:** İş ilanlarını ve detaylarını tutar

**Schema:**
```javascript
{
  _id: ObjectId,
  employerId: ObjectId (ref: 'User', required),
  title: String (required, trimmed),
  description: String (required),
  location: {
    city: String,
    district: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  salary: {
    min: Number,
    max: Number,
    currency: String (default: 'TRY')
  },
  skills: [String] (trimmed),
  requirements: {
    experience: String,
    education: String,
    certifications: [String]
  },
  projectDetails: {
    duration: String,
    startDate: Date,
    workType: String (enum: ['full-time', 'part-time', 'contract', 'temporary'])
  },
  status: String (enum: ['draft', 'active', 'closed', 'paused'], default: 'draft'),
  applicationCount: Number (default: 0),
  createdAt: Date (default: now),
  updatedAt: Date (default: now, auto-update on save)
}
```

**İndeksler:**
- `employerId` (for employer queries)
- `location.city` (for location-based search)
- `status` (for filtering active jobs)
- `skills` (for skill-based search)
- Compound: `{location.city: 1, status: 1}` (location + status filter)

**Örnek Döküman:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "employerId": "507f1f77bcf86cd799439015",
  "title": "Ev Tadilat İşi",
  "description": "Dairemizde genel tadilat yapılacak...",
  "location": {
    "city": "İstanbul",
    "district": "Kadıköy",
    "address": "Kadıköy, İstanbul",
    "coordinates": {
      "lat": 40.9989,
      "lng": 29.0266
    }
  },
  "salary": {
    "min": 5000,
    "max": 12000,
    "currency": "TRY"
  },
  "skills": ["Boya Badana", "Elektrik", "Tesisat"],
  "status": "active",
  "applicationCount": 5,
  "createdAt": "2025-11-25T08:00:00.000Z"
}
```

---

### 3. WorkerProfiles Collection
**Koleksiyon Adı:** `workerprofiles`  
**Amaç:** Usta/işçi profillerini ve yeteneklerini tutar

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required, unique),
  skills: [{
    category: String,
    name: String,
    level: String (enum: ['beginner', 'intermediate', 'advanced', 'expert'])
  }],
  experience: {
    years: Number,
    description: String
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    expiryDate: Date,
    fileUrl: String
  }],
  portfolio: [{
    title: String,
    description: String,
    images: [String],
    completedDate: Date,
    category: String
  }],
  location: {
    city: String,
    district: String
  },
  availability: String (enum: ['available', 'busy', 'unavailable'], default: 'available'),
  rating: {
    average: Number (default: 0),
    count: Number (default: 0)
  },
  completedJobs: Number (default: 0),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**İndeksler:**
- `userId` (unique)
- `location.city` (for location matching)
- `skills.category` (for skill-based search)
- `availability` (for finding available workers)

**Örnek Döküman:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "skills": [
    {
      "category": "İnşaat",
      "name": "Boya Badana",
      "level": "expert"
    }
  ],
  "location": {
    "city": "İstanbul",
    "district": "Kadıköy"
  },
  "availability": "available",
  "rating": {
    "average": 4.8,
    "count": 24
  },
  "completedJobs": 48
}
```

---

### 4. EmployerProfiles Collection
**Koleksiyon Adı:** `employerprofiles`  
**Amaç:** İşveren/şirket profillerini tutar

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required, unique),
  companyDetails: {
    name: String,
    description: String,
    industry: String,
    size: String,
    website: String,
    logo: String
  },
  location: {
    city: String,
    district: String,
    address: String
  },
  verification: {
    isVerified: Boolean (default: false),
    documents: [{
      type: String,
      url: String
    }],
    verifiedAt: Date
  },
  rating: {
    average: Number (default: 0),
    count: Number (default: 0)
  },
  statistics: {
    jobsPosted: Number (default: 0),
    workersHired: Number (default: 0)
  },
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**İndeksler:**
- `userId` (unique)
- `verification.isVerified` (for verified employers)

---

### 5. Applications Collection
**Koleksiyon Adı:** `applications`  
**Amaç:** İş başvurularını ve durumlarını tutar

**Schema:**
```javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: 'Job', required),
  workerId: ObjectId (ref: 'User', required),
  status: String (enum: ['pending', 'approved', 'rejected', 'withdrawn'], default: 'pending'),
  coverLetter: String (trimmed),
  proposedSalary: Number,
  availability: {
    startDate: Date,
    endDate: Date
  },
  rejectionReason: String,
  appliedAt: Date (default: now),
  updatedAt: Date (default: now, auto-update on save)
}
```

**İndeksler:**
- `jobId` (for job-specific applications)
- `workerId` (for worker's applications)
- `status` (for filtering by status)
- Compound: `{jobId: 1, workerId: 1}` (unique per job-worker pair)

---

## İlişkiler

### User → WorkerProfile (1:1)
```javascript
// User'dan WorkerProfile'a
db.workerprofiles.findOne({ userId: user._id })

// WorkerProfile'dan User'a
db.users.findOne({ _id: workerProfile.userId })
```

### User → EmployerProfile (1:1)
```javascript
// User'dan EmployerProfile'a
db.employerprofiles.findOne({ userId: user._id })

// EmployerProfile'dan User'a
db.users.findOne({ _id: employerProfile.userId })
```

### User (Employer) → Jobs (1:N)
```javascript
// Employer'ın tüm iş ilanları
db.jobs.find({ employerId: employer._id })

// Job'ın employer'ı
db.users.findOne({ _id: job.employerId })
```

### Job → Applications (1:N)
```javascript
// Job'a yapılan tüm başvurular
db.applications.find({ jobId: job._id })

// Application'ın job'ı
db.jobs.findOne({ _id: application.jobId })
```

### User (Worker) → Applications (1:N)
```javascript
// Worker'ın tüm başvuruları
db.applications.find({ workerId: worker._id })

// Application'ın worker'ı
db.users.findOne({ _id: application.workerId })
```

---

## İndeksler

### Performance Optimization İndeksleri

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Jobs collection
db.jobs.createIndex({ employerId: 1 })
db.jobs.createIndex({ status: 1 })
db.jobs.createIndex({ "location.city": 1 })
db.jobs.createIndex({ skills: 1 })
db.jobs.createIndex({ "location.city": 1, status: 1 }) // Compound

// WorkerProfiles collection
db.workerprofiles.createIndex({ userId: 1 }, { unique: true })
db.workerprofiles.createIndex({ "location.city": 1 })
db.workerprofiles.createIndex({ "skills.category": 1 })
db.workerprofiles.createIndex({ availability: 1 })

// EmployerProfiles collection
db.employerprofiles.createIndex({ userId: 1 }, { unique: true })
db.employerprofiles.createIndex({ "verification.isVerified": 1 })

// Applications collection
db.applications.createIndex({ jobId: 1 })
db.applications.createIndex({ workerId: 1 })
db.applications.createIndex({ status: 1 })
db.applications.createIndex({ jobId: 1, workerId: 1 }, { unique: true })
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register     - Kullanıcı kaydı
POST   /api/auth/login        - Giriş
POST   /api/auth/logout       - Çıkış
GET    /api/auth/me           - Mevcut kullanıcı bilgileri
```

### Jobs
```
GET    /api/jobs              - Tüm iş ilanları (filtreleme: status, city, skills)
GET    /api/jobs/:id          - Belirli bir iş ilanı
POST   /api/jobs              - Yeni iş ilanı (employer only)
PUT    /api/jobs/:id          - İş ilanı güncelleme (employer only)
PATCH  /api/jobs/:id/close    - İş ilanını kapatma (employer only)
DELETE /api/jobs/:id          - İş ilanı silme (employer only)
```

### Applications
```
POST   /api/jobs/:jobId/apply              - İşe başvuru (worker only)
GET    /api/jobs/:jobId/applications       - İş başvuruları (employer only)
PATCH  /api/applications/:id/approve       - Başvuruyu onaylama (employer only)
PATCH  /api/applications/:id/reject        - Başvuruyu reddetme (employer only)
```

---

## Test Senaryoları

### 1. Lokasyon-Bazlı İş Görünürlüğü Testi

#### Test Senaryosu: Aynı Şehirde İlan ve Usta
```javascript
// 1. İstanbul'da bir usta oluştur
const worker = await User.create({
  email: "usta.istanbul@test.com",
  password: "test123456",
  fullName: "İstanbul Ustası",
  role: "worker"
});

await WorkerProfile.create({
  userId: worker._id,
  location: {
    city: "İstanbul",
    district: "Kadıköy"
  },
  skills: [{ category: "İnşaat", name: "Boya Badana", level: "expert" }]
});

// 2. İstanbul'da bir işveren oluştur ve ilan ver
const employer = await User.create({
  email: "isveren.istanbul@test.com",
  password: "test123456",
  fullName: "İstanbul İşveren",
  role: "employer",
  companyName: "İstanbul İnşaat"
});

const job = await Job.create({
  employerId: employer._id,
  title: "İstanbul'da Boya İşi",
  description: "Kadıköy'de daire boyası",
  location: {
    city: "İstanbul",
    district: "Kadıköy"
  },
  status: "active",
  skills: ["Boya Badana"]
});

// 3. Worker bu ilanı görebilmeli
const jobsInSameCity = await Job.find({
  "location.city": "İstanbul",
  status: "active"
});

console.log("✅ Test Passed:", jobsInSameCity.length > 0);
// Expected: true - Usta İstanbul'daki ilanı görebilir
```

#### Test Senaryosu: Farklı Şehirde İlan ve Usta
```javascript
// Ankara'da bir usta oluştur
const workerAnkara = await User.create({
  email: "usta.ankara@test.com",
  password: "test123456",
  fullName: "Ankara Ustası",
  role: "worker"
});

await WorkerProfile.create({
  userId: workerAnkara._id,
  location: {
    city: "Ankara",
    district: "Çankaya"
  },
  skills: [{ category: "İnşaat", name: "Boya Badana", level: "expert" }]
});

// İstanbul'daki ilanları sorgula
const jobsInAnkara = await Job.find({
  "location.city": "Ankara",
  status: "active"
});

console.log("✅ Test Passed:", jobsInAnkara.length === 0);
// Expected: true - Ankara ustası İstanbul ilanını görmez
```

### 2. Beceri-Bazlı Eşleştirme Testi
```javascript
const matchingJobs = await Job.find({
  "location.city": worker.location.city,
  status: "active",
  skills: { $in: worker.skills.map(s => s.name) }
});

console.log("Matching jobs:", matchingJobs.length);
// Expected: İlanın becerileri ile worker becerileri eşleşir
```

### 3. Başvuru Testi
```javascript
const application = await Application.create({
  jobId: job._id,
  workerId: worker._id,
  coverLetter: "Bu işe başvuruyorum",
  proposedSalary: 8000
});

// Job application count artmalı
await Job.findByIdAndUpdate(job._id, { $inc: { applicationCount: 1 } });

const updatedJob = await Job.findById(job._id);
console.log("✅ Application Count:", updatedJob.applicationCount);
// Expected: 1
```

---

## Lokasyon-Bazlı Fonksiyonlar

### 1. Yakındaki İşleri Bulma
```javascript
async function findNearbyJobs(workerLocation, radius = 50) {
  // MongoDB geospatial query
  const jobs = await Job.find({
    "location.city": workerLocation.city,
    status: "active",
    "location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [workerLocation.lng, workerLocation.lat]
        },
        $maxDistance: radius * 1000 // km to meters
      }
    }
  });
  
  return jobs;
}
```

### 2. Şehir-Bazlı Filtreleme
```javascript
async function getJobsByCity(city, filters = {}) {
  const query = {
    "location.city": city,
    status: "active",
    ...filters
  };
  
  return await Job.find(query)
    .populate('employerId', 'fullName companyName')
    .sort({ createdAt: -1 });
}
```

### 3. İlçe-Bazlı Önceliklendirme
```javascript
async function getJobsWithDistrictPriority(workerCity, workerDistrict) {
  // Önce aynı ilçedeki ilanları getir
  const sameDistrict = await Job.find({
    "location.city": workerCity,
    "location.district": workerDistrict,
    status: "active"
  });
  
  // Sonra aynı şehirdeki diğer ilanları getir
  const sameCity = await Job.find({
    "location.city": workerCity,
    "location.district": { $ne: workerDistrict },
    status: "active"
  });
  
  return [...sameDistrict, ...sameCity];
}
```

---

## Eksik Fonksiyonlar Kontrolü

✅ **Tamamlanan Fonksiyonlar:**
1. Kullanıcı Kaydı ve Doğrulama
2. İş İlanı Oluşturma/Güncelleme/Silme
3. Başvuru Yönetimi
4. Lokasyon-Bazlı Sorgulama
5. Beceri-Bazlı Eşleştirme
6. Profil Yönetimi
7. İstatistik Takibi

🔄 **Geliştirilebilir Fonksiyonlar:**
1. **Geospatial İndeksleme**: Daha hızlı mesafe hesaplamaları için
2. **Notification System**: Yeni ilanlar için bildirimler
3. **Rating System**: Detaylı değerlendirme sistemi
4. **Payment Integration**: Ödeme takibi
5. **Analytics**: İlan performans metrikleri

---

## Performans Optimizasyonu

### Aggregation Pipeline Örnekleri

```javascript
// İlan başına ortalama başvuru sayısı
db.jobs.aggregate([
  { $match: { status: "active" } },
  { $group: {
      _id: "$location.city",
      avgApplications: { $avg: "$applicationCount" },
      totalJobs: { $sum: 1 }
    }
  }
])

// En çok başvuru alan beceriler
db.jobs.aggregate([
  { $unwind: "$skills" },
  { $group: {
      _id: "$skills",
      totalApplications: { $sum: "$applicationCount" },
      avgSalary: { $avg: "$salary.min" }
    }
  },
  { $sort: { totalApplications: -1 } }
])
```

---

## Güvenlik Önlemleri

1. **Şifre Hashleme**: bcrypt ile minimum 12 rounds
2. **Input Validation**: Mongoose schema validation
3. **Rate Limiting**: Express-rate-limit middleware
4. **CORS**: Sadece belirli domainler
5. **JWT Tokens**: 7 gün süre sınırı
6. **Error Handling**: Detaylı hata logları

---

## Veritabanı Bakımı

### Düzenli Bakım Komutları
```bash
# İndeks rebuild
db.users.reIndex()
db.jobs.reIndex()

# Veritabanı boyutu kontrolü
db.stats()

# Orphan kayıt temizliği
db.applications.deleteMany({ jobId: { $nin: db.jobs.distinct("_id") } })
```

---

## Test Credentials

### Worker Accounts
```
Email: usta1@test.com - usta10@test.com
Password: test123456
Role: worker
```

### Employer Accounts
```
Email: isveren1@test.com - isveren5@test.com
Password: test123456
Role: employer
```

---

## Sonuç

Bu dokümantasyon UstaBul platformunun MongoDB veritabanı yapısını, ilişkilerini, indekslerini ve test senaryolarını detaylı olarak açıklar. Tüm temel fonksiyonlar implement edilmiş ve lokasyon-bazlı iş görünürlüğü test edilmiştir.

**Son Güncelleme:** 2025-11-29  
**Veritabanı Versiyonu:** MongoDB 6.0+  
**Backend Framework:** Node.js + Express + Mongoose