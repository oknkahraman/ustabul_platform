#!/bin/bash

# UstaBul - Otomatik Kurulum Scripti (Linux/macOS)
# Bu script projenizi otomatik olarak kurar ve çalıştırır

echo "==================================================" echo"🚀 UstaBul - Otomatik Kurulum Başlatılıyor..." echo"==================================================" echo""

# Renkli çıktı için kod tanımları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'# No Color # Hata durumunda script'i durdur
set -e

# Hata yakalama fonksiyonu
error_exit() {
    echo -e "${RED}❌ Hata: $1${NC}" 1>&2
    exit 1
}

# Başarı mesajı
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Bilgi mesajı
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Uyarı mesajı
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo -e "${BLUE}1. Sistem Kontrolleri${NC}"
echo "-----------------------------------"

# Node.js kontrolü
info "Node.js versiyonu kontrol ediliyor..."
if ! command -v node &> /dev/null; then
    error_exit "Node.js bulunamadı! Lütfen Node.js v18+ yükleyin: https://nodejs.org"
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error_exit "Node.js v18 veya üzeri gerekli. Mevcut versiyon: $(node -v)"
fi
success "Node.js $(node -v) bulundu"

# npm kontrolü
if ! command -v npm &> /dev/null; then
    error_exit "npm bulunamadı! Node.js ile birlikte yüklenmelidir."
fi
success "npm $(npm -v) bulundu"

# MongoDB kontrolü
info "MongoDB kontrol ediliyor..."
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    warning "MongoDB shell (mongosh) bulunamadı!"
    warning "MongoDB'nin yüklü ve çalışır olduğundan emin olun." warning"Yükleme: https://www.mongodb.com/try/download/community"
    read -p "MongoDB yüklü mü? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error_exit "MongoDB kurulumu gerekli. Script sonlandırılıyor."
    fi
else
    success "MongoDB shell bulundu"
    
    # MongoDB çalışıyor mu kontrol et
    if mongosh --eval "db.version()" &> /dev/null || mongo --eval "db.version()" &> /dev/null; then
        success "MongoDB çalışıyor"
    else
        warning "MongoDB çalışmıyor olabilir. Başlatılıyor..."
        
        # İşletim sistemine göre MongoDB'yi başlat
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            brew services start mongodb-community@6.0 2>/dev/null || \
            brew services start mongodb-community 2>/dev/null || \
            warning "MongoDB otomatik başlatılamadı. Manuel olarak başlatın: brew services start mongodb-community"
        else
            # Linux
            sudo systemctl start mongod 2>/dev/null || \
            warning "MongoDB otomatik başlatılamadı. Manuel olarak başlatın: sudo systemctl start mongod"
        fi
        
        sleep 3
        
        if mongosh --eval "db.version()" &> /dev/null || mongo --eval "db.version()" &> /dev/null; then
            success "MongoDB başarıyla başlatıldı"
        else
            warning "MongoDB başlatılamadı. Devam etmeden önce MongoDB'yi manuel olarak başlatın."
        fi
    fi
fi

echo "" echo -e"${BLUE}2. Frontend Kurulumu${NC}" echo"-----------------------------------"

# Frontend bağımlılıklarını yükle
info "Frontend bağımlılıkları yükleniyor..."
if npm install; then
    success "Frontend bağımlılıkları yüklendi"
else
    error_exit "Frontend bağımlılıkları yüklenemedi"
fi

# Frontend .env kontrolü
info "Frontend .env dosyası kontrol ediliyor..."
if [ ! -f ".env" ]; then
    warning ".env dosyası bulunamadı, oluşturuluyor..."
    cat > .env << EOF
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# Supabase (Opsiyonel)
VITE_SUPABASE_URL=https://dummy.supabase.co
VITE_SUPABASE_ANON_KEY=dummykey.updateyourkkey.here
EOF
    success ".env dosyası oluşturuldu"
else
    success ".env dosyası mevcut"
fi

echo "" echo -e"${BLUE}3. Backend Kurulumu${NC}" echo"-----------------------------------"

# Backend dizinine git
cd backend || error_exit "backend/ dizini bulunamadı"

# Backend bağımlılıklarını yükle
info "Backend bağımlılıkları yükleniyor..."
if npm install; then
    success "Backend bağımlılıkları yüklendi"
else
    error_exit "Backend bağımlılıkları yüklenemedi"
fi

# Backend .env kontrolü
info "Backend .env dosyası kontrol ediliyor..."
if [ ! -f ".env" ]; then
    warning ".env dosyası bulunamadı, oluşturuluyor..."
    cat > .env << EOF
# Sunucu Portu
PORT=5000

# MongoDB Bağlantı String'i
MONGODB_URI=mongodb://127.0.0.1:27017/ustabul

# JWT Gizli Anahtar
JWT_SECRET=ustabul-super-secret-key-change-this-in-production-2024

# JWT Token Süresi
JWT_EXPIRE=7d

# Ortam
NODE_ENV=development

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
    success "Backend .env dosyası oluşturuldu"
else
    success "Backend .env dosyası mevcut"
fi

echo "" echo -e"${BLUE}4. Database Başlatma${NC}" echo"-----------------------------------"

# Database initialization script'ini çalıştır
info "Database başlatılıyor..."
if node utils/initializeDatabase.js; then
    success "Database başarıyla başlatıldı"
else
    warning "Database başlatılamadı. MongoDB çalışıyor mu kontrol edin."
fi

# Ana dizine geri dön
cd ..

echo "" echo"==================================================" echo -e"${GREEN}🎉 Kurulum Tamamlandı!${NC}" echo"==================================================" echo"" echo -e"${BLUE}📋 Sonraki Adımlar:${NC}" echo"" echo"1️⃣  Backend'i başlatın:" echo"   cd backend" echo"   npm run dev" echo"" echo"2️⃣  Yeni bir terminal açın ve Frontend'i başlatın:" echo"   npm run dev" echo"" echo"3️⃣  Tarayıcınızda açın:" echo"   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo "" echo -e"${BLUE}👤 Admin Bilgileri:${NC}" echo"   Email: admin@ustabul.com" echo"   Şifre: Admin123!" echo"" echo"==================================================" echo""

# Servisleri başlatmak ister misiniz?
read -p "🚀 Servisleri şimdi başlatmak ister misiniz? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "" echo -e"${GREEN}Servisler başlatılıyor...${NC}" echo""
    
    # Backend'i arka planda başlat
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    sleep 3
    
    # Frontend'i başlat (ön planda - bu terminal'de kalacak)
    npm run dev
    
    # Ctrl+C ile kapatıldığında backend'i de kapat
    trap "kill $BACKEND_PID 2>/dev/null" EXIT
else
    echo "" echo -e"${BLUE}Manuel olarak başlatmak için yukarıdaki komutları kullanın.${NC}" echo""
fi