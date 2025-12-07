@echo off
REM UstaBul - Otomatik Kurulum Scripti (Windows)
REM Bu script projenizi otomatik olarak kurar ve calistirir

setlocal enabledelayedexpansion

echo ==================================================
echo. 🚀 UstaBul - Otomatik Kurulum Baslatiliyor...
echo ==================================================
echo.

REM Hata durumunda durdur
if errorlevel 1 goto :error

echo [1/6] Sistem Kontrolleri
echo -----------------------------------

REM Node.js kontrolu
echo. ℹ️  Node.js versiyonu kontrol ediliyor...
where node >nul 2>nul
if errorlevel 1 (
    echo. ❌ Hata: Node.js bulunamadi! 
    echo. Lutfen Node.js v18+ yukleyin: https://nodejs.org
    goto :error
)

for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_MAJOR=%%a
set NODE_MAJOR=!NODE_MAJOR:v=!
if !NODE_MAJOR! LSS 18 (
    echo. ❌ Hata: Node.js v18 veya uzeri gerekli. 
    node -v
    goto :error
)
echo. ✅ Node.js bulundu
node -v

REM npm kontrolu
echo. ℹ️  npm kontrol ediliyor...
where npm >nul 2>nul
if errorlevel 1 (
    echo. ❌ Hata: npm bulunamadi!
    goto :error
)
echo. ✅ npm bulundu
npm -v

REM MongoDB kontrolu
echo. ℹ️  MongoDB kontrol ediliyor...
where mongosh >nul 2>nul
if errorlevel 1 (
    echo. ⚠️  Uyari: MongoDB shell (mongosh) bulunamadi!
    echo. ⚠️  MongoDB'nin yuklu ve calisir oldugunu kontrol edin.
    echo. ⚠️  Yukleme: https://www.mongodb.com/try/download/community
    set /p MONGO_CONFIRM="MongoDB yuklu mu? (Y/N): "
    if /i not "!MONGO_CONFIRM!"=="Y" (
        echo. ❌ MongoDB kurulumu gerekli. Script sonlandiriliyor.
        goto :error
    )
) else (
    echo. ✅ MongoDB shell bulundu
    
    REM MongoDB calisiyormu kontrol et
    mongosh --eval "db.version()" >nul 2>nul
    if errorlevel 1 (
        echo. ⚠️  MongoDB calismiyor olabilir. Baslat: net start MongoDB
        net start MongoDB >nul 2>nul
        timeout /t 3 >nul
        
        mongosh --eval "db.version()" >nul 2>nul
        if errorlevel 1 (
            echo. ⚠️  MongoDB baslatilamadi. Manuel baslatin: net start MongoDB
        ) else (
            echo. ✅ MongoDB baslatildi
        )
    ) else (
        echo. ✅ MongoDB calisiyor
    )
)

echo.
echo [2/6] Frontend Kurulumu
echo -----------------------------------

REM Frontend bagimliliklari yukle
echo. ℹ️  Frontend bagimliliklari yukleniyor...
call npm install
if errorlevel 1 (
    echo. ❌ Frontend bagimliliklari yuklenemedi
    goto :error
)
echo. ✅ Frontend bagimliliklari yuklendi

REM Frontend .env kontrolu
echo. ℹ️  Frontend .env dosyasi kontrol ediliyor...
if not exist ".env" (
    echo. ⚠️  .env dosyasi bulunamadi, olusturuluyor...
    (
        echo # Backend API URL
        echo VITE_API_BASE_URL=http://localhost:5000
        echo.
        echo # Supabase ^(Opsiyonel^)
        echo VITE_SUPABASE_URL=https://dummy.supabase.co
        echo VITE_SUPABASE_ANON_KEY=dummykey.updateyourkkey.here
    ) > .env
    echo. ✅ .env dosyasi olusturuldu
) else (
    echo. ✅ .env dosyasi mevcut
)

echo.
echo [3/6] Backend Kurulumu
echo -----------------------------------

REM Backend dizinine git
cd backend
if errorlevel 1 (
    echo. ❌ backend\ dizini bulunamadi
    goto :error
)

REM Backend bagimliliklari yukle
echo. ℹ️  Backend bagimliliklari yukleniyor...
call npm install
if errorlevel 1 (
    echo. ❌ Backend bagimliliklari yuklenemedi
    cd ..
    goto :error
)
echo. ✅ Backend bagimliliklari yuklendi

REM Backend .env kontrolu
echo. ℹ️  Backend .env dosyasi kontrol ediliyor...
if not exist ".env" (
    echo. ⚠️  .env dosyasi bulunamadi, olusturuluyor...
    (
        echo # Sunucu Portu
        echo PORT=5000
        echo.
        echo # MongoDB Baglanti String'i
        echo MONGODB_URI=mongodb://127.0.0.1:27017/ustabul
        echo.
        echo # JWT Gizli Anahtar
        echo JWT_SECRET=ustabul-super-secret-key-change-this-in-production-2024
        echo.
        echo # JWT Token Suresi
        echo JWT_EXPIRE=7d
        echo.
        echo # Ortam
        echo NODE_ENV=development
        echo.
        echo # Frontend URL ^(CORS^)
        echo CLIENT_URL=http://localhost:5173
        echo.
        echo # Rate Limiting
        echo RATE_LIMIT_WINDOW_MS=900000
        echo RATE_LIMIT_MAX_REQUESTS=100
    ) > .env
    echo. ✅ Backend .env dosyasi olusturuldu
) else (
    echo. ✅ Backend .env dosyasi mevcut
)

echo.
echo [4/6] Database Baslatma
echo -----------------------------------

REM Database initialization script'ini calistir
echo. ℹ️  Database baslatiliyor...
node utils/initializeDatabase.js
if errorlevel 1 (
    echo. ⚠️  Database baslatilamadi. MongoDB calisiyormu kontrol edin.
) else (
    echo. ✅ Database basarili baslatildi
)

REM Ana dizine geri don
cd ..

echo.
echo ==================================================
echo. 🎉 Kurulum Tamamlandi!
echo ==================================================
echo.
echo. 📋 Sonraki Adimlar:
echo.
echo. 1️⃣  Backend'i baslatin:
echo.    cd backend
echo.    npm run dev
echo.
echo. 2️⃣  Yeni bir terminal acin ve Frontend'i baslatin:
echo.    npm run dev
echo.
echo. 3️⃣  Tarayicinizda acin:
echo.    Frontend: http://localhost:5173
echo.    Backend:  http://localhost:5000
echo.
echo. 👤 Admin Bilgileri:
echo.    Email: admin@ustabul.com
echo.    Sifre: Admin123!
echo.
echo ==================================================
echo.

REM Servisleri baslatmak ister misiniz?
set /p START_SERVICES="🚀 Servisleri simdi baslatmak ister misiniz? (Y/N): "
if /i "!START_SERVICES!"=="Y" (
    echo.
    echo. ✅ Servisler baslatiliyor...
    echo.
    
    REM Backend'i yeni bir pencerede baslat
    start "UstaBul Backend" cmd /k "cd backend && npm run dev"
    
    timeout /t 3 >nul
    
    REM Frontend'i baslat
    echo. ℹ️  Frontend baslatiliyor...
    echo. ℹ️  Kapatmak icin Ctrl+C kullanin
    echo.
    call npm run dev
) else (
    echo.
    echo. ℹ️  Manuel olarak baslatmak icin yukaridaki komutlari kullanin.
    echo.
)

goto :end

:error
echo.
echo. ❌ Kurulum sirasinda bir hata olustu!
echo. ⚠️  Lutfen yukaridaki hata mesajlarini kontrol edin.
echo.
pause
exit /b 1

:end
pause
exit /b 0