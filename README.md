# 🚀 UstaBul - Usta Bulma Platformu

UstaBul, mavi yakalı işçileri (ustalari) işverenler/şirketlerle buluşturan modern bir web platformudur.

## 📖 Hakkında

UstaBul platformu, metal işçiliği, elektrik, tesisat gibi alanlarda çalışan yetenekli ustalarin iş bulmasını ve işverenlerin doğru ustayı bulmasını kolaylaştırır.

### ✨ Özellikler

**İşçi (Usta) Özellikleri:**
- 🎯 Detaylı yetenek kategorileri (Kaynak, CNC, Talaşlı İmalat, vb.)
- 📁 Portfolio yönetimi
- 🔍 İş ilanı arama ve filtreleme
- 📊 Kişisel dashboard
- ⭐ Değerlendirme sistemi

**İşveren Özellikleri:**
- 📝 İş ilanı oluşturma
- 👥 Başvuru yönetimi
- 🏢 Firma profili
- 📊 İşveren dashboard
- ⭐ Usta değerlendirme

**Yönetici Özellikleri:**
- 📈 Sistem analitikleri
- 👤 Kullanıcı yönetimi
- 🔧 Platform yönetimi

## 🛠️ Teknoloji Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Framer Motion** - Animasyonlar
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Kurulum

### Hızlı Başlangıç

**Windows:**
```powershell
.\setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Manuel Kurulum

Detaylı kurulum talimatları için [KURULUM.md](KURULUM.md) dosyasına bakın.

**Kısa Özet:**

1. **MongoDB'yi Yükleyin ve Başlatın**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Frontend Kurulumu**
   ```bash
   npm install
   ```

3. **Backend Kurulumu**
   ```bash
   cd backend
   npm install
   ```

4. **Database Başlatma**
   ```bash
   cd backend
   node utils/initializeDatabase.js
   ```

5. **Servisleri Başlatın**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   npm run dev
   ```

## 🌐 Erişim

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

## 👤 Varsayılan Admin Hesabı

```
Email: admin@ustabul.com
Şifre: Admin123!
```

## 📁 Proje Yapısı

```
ustabul/
├── backend/                # Node.js + Express + MongoDB
│   ├── controllers/       # API controller'ları
│   ├── models/           # MongoDB modelleri
│   ├── routes/           # API route'ları
│   ├── middleware/       # Auth, validation
│   ├── utils/            # Yardımcı fonksiyonlar
│   └── server.js         # Ana server
│
├── src/                  # React Frontend
│   ├── components/       # UI bileşenleri
│   ├── pages/           # Sayfa bileşenleri
│   ├── utils/           # Frontend utilities
│   ├── styles/          # CSS ve Tailwind
│   └── App.jsx          # Ana component
│
├── public/              # Statik dosyalar
├── KURULUM.md          # Detaylı kurulum rehberi
├── setup.sh            # Linux/Mac kurulum scripti
└── setup.bat           # Windows kurulum scripti
```

## 🧪 Test

### Backend Test
```bash
cd backend
npm test
```

### Frontend Test
```bash
npm test
```

### API Endpoint Test
```bash
# Health check
curl http://localhost:5000/health

# Login test
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ustabul.com","password":"Admin123!"}'
```

## 📚 Dokümantasyon

- **[KURULUM.md](KURULUM.md)** - Komple kurulum rehberi
- **[backend/KURULUM-REHBERI.md](backend/KURULUM-REHBERI.md)** - Backend detaylı rehber
- **API Dokümantasyonu** - Backend endpoint'leri için backend/KURULUM-REHBERI.md

## 🔧 Geliştirme

### Environment Variables

**Frontend (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul
JWT_SECRET=your-secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Scripts

**Frontend:**
- `npm run dev` - Development server başlat
- `npm run build` - Production build
- `npm run preview` - Build'i önizle

**Backend:**
- `npm run dev` - Development mode (nodemon)
- `npm start` - Production mode
- `node utils/initializeDatabase.js` - Database başlat
- `node utils/seedDatabase.js` - Test data ekle

## 🐛 Sorun Giderme

Yaygın sorunlar ve çözümleri için [KURULUM.md](KURULUM.md) dosyasındaki "Sorun Giderme" bölümüne bakın.

**Hızlı Kontrol Listesi:**
- ✅ MongoDB çalışıyor mu? → `mongosh --eval "db.version()"`
- ✅ Node.js v18+? → `node -v`
- ✅ Port 5000 boş mu? → `lsof -i :5000` (Mac/Linux)
- ✅ .env dosyaları var mı?
- ✅ npm install tamamlandı mı?

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## 🎯 Yol Haritası

- [ ] Mobil uygulama (React Native)
- [ ] Gerçek zamanlı bildirimler (Socket.io)
- [ ] Ödeme entegrasyonu
- [ ] Gelişmiş arama filtreleri
- [ ] Video görüşme entegrasyonu
- [ ] SMS doğrulama

## 📞 İletişim

Sorularınız için:
- GitHub Issues kullanın
- Dokümantasyonu kontrol edin

## 🙏 Teşekkürler

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

**UstaBul ile doğru ustayı bulun! 🔧**

Built with ❤️ by UstaBul Team