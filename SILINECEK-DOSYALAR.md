# ⚠️ SİLİNECEK DOSYALAR

Bu dosyalar eski setup dökümanlarıdır ve artık kullanılmayacaktır.
Yeni kurulum için **SADECE** `backend/KURULUM-REHBERI.md` dosyasını takip edin.

## Silinmesi Gereken Dosyalar:

### 1. backend/SETUP-INSTRUCTIONS.md
**Neden?** Eski setup talimatları, yeni KURULUM-REHBERI.md ile değiştirildi

### 2. backend/README.md  
**Neden?** Kısmi bilgi içeriyor, KURULUM-REHBERI.md çok daha kapsamlı

### 3. BACKEND-SETUP-GUIDE.md
**Neden?** Root seviyesinde gereksiz duplikasyon, backend klasöründeki yeni rehber kullanılacak

### 4. backend-setup-guide.md (eğer varsa)
**Neden?** Küçük harfli versiyon, büyük harfli BACKEND-SETUP-GUIDE.md ile aynı

### 5. MONGODB-SETUP-TR.md (eğer varsa)
**Neden?** MongoDB kurulumu artık KURULUM-REHBERI.md içinde

### 6. database-seed-script.js (root seviyesinde, eğer varsa)
**Neden?** Database initialization artık backend/utils/initializeDatabase.js tarafından yapılıyor

## Manuel Silme Komutları:

```bash
# Windows (PowerShell)
Remove-Item backend/SETUP-INSTRUCTIONS.md -Force
Remove-Item backend/README.md -Force
Remove-Item BACKEND-SETUP-GUIDE.md -Force
Remove-Item backend-setup-guide.md -Force -ErrorAction SilentlyContinue
Remove-Item MONGODB-SETUP-TR.md -Force -ErrorAction SilentlyContinue
Remove-Item database-seed-script.js -Force -ErrorAction SilentlyContinue

# macOS/Linux
rm -f backend/SETUP-INSTRUCTIONS.md
rm -f backend/README.md
rm -f BACKEND-SETUP-GUIDE.md
rm -f backend-setup-guide.md
rm -f MONGODB-SETUP-TR.md
rm -f database-seed-script.js
```

## Git'ten Kaldırma (eğer commit edilmişse):

```bash
git rm backend/SETUP-INSTRUCTIONS.md
git rm backend/README.md
git rm BACKEND-SETUP-GUIDE.md
git rm backend-setup-guide.md
git rm MONGODB-SETUP-TR.md
git rm database-seed-script.js

git commit -m "refactor: remove old setup documentation files, use new KURULUM-REHBERI.md"
git push
```

## Yeni Dosyalar (BUNLARI SAKLAYIN):

✅ `backend/KURULUM-REHBERI.md` - **YENİ ve TEK kurulum rehberi**  
✅ `backend/utils/initializeDatabase.js` - **YENİ database başlatma scripti**  
✅ Bu dosya (`SILINECEK-DOSYALAR.md`) - Silme sonrası bu da silinebilir

---

**NOT:** Bu dosyaları sildikten sonra, tüm ekip üyelerine yeni kurulum rehberinin `backend/KURULUM-REHBERI.md` olduğunu bildirin.