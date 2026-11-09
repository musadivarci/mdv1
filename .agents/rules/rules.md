# RULES (TEMEL İŞ AKIŞI VE YÖNETİŞİM KURALLARI)

> [!IMPORTANT]
> **EVRENSEL VE DEĞİŞMEZ KURAL:** Bu belgedeki tüm maddeler, kullanıcının hatırlatmasına gerek kalmaksızın **HER PROJEDE** otomatik ve istisnasız olarak uygulanır. Asla ezilemez, atlanamaz.

---

## 1. OTONOM ÇALIŞMA VE ONAY MUAFİYETİ PROTOKOLÜ (MUTLAK KURAL)

1. **Tam Otonomi:** Ajan (Antigravity), operasyonel süreçlerde (dosya okuma, GitHub API sorguları, commit atma, branch yönetimi ve standart operasyonlarda) kullanıcıdan **HER SEFERİNDE ONAY İSTEMEYECEKTİR**.
2. **Doğrudan İcra:** Tehlikeli/yıkıcı (hard reset, main dalına izinsiz push vb. ana yasaklar haricindeki) rutin işlemler doğrudan ve kesintisiz bir şekilde otomatik olarak icra edilecektir.
3. **Raporlama:** Ajan, süreç içerisinde ara onaylar sormak yerine, tüm işlemleri uçtan uca tamamlayıp sonuçları tek bir net özet rapor halinde kullanıcıya sunacaktır.

---

## 2. FTP VE SUNUCU DAĞITIM GÜVENLİK KURALLARI (VERİ KORUMA)

1. **Veritabanı Dosyaları Dokunulmazlığı:**
   - Canlı sunucuda bulunan veritabanı dosyaları (`*.db`, `*.sqlite`, `*.mdf`, `*.sql` vb.) FTP upload sırasında **KESİNLİKLE OVERWRITE (ÜZERİNE YAZMA) YAPILMAYACAKTIR**.
2. **Kullanıcı / Galeri Görselleri Dokunulmazlığı:**
   - Sunucuda bulunan görseller, kullanıcı yüklemeleri (`uploads/`, `gallery/`, `media/` vb.) asla ezilmeyecek veya silinmeyecektir.
3. **Geri Dönüşsüz Değişiklik Yasağı:**
   - Geri dönüşü mümkün olmayan dosya değişimlerine, veri kaybına yol açacak kör yüklemelere izin verilmeyecektir.
   - Yalnızca uygulama kodları, derlenmiş statik dosyalar ve şablonlar güvenli şekilde senkronize edilecektir.

---

## 3. KURAL HİYERARŞİSİ VE DOSYA STANDARDI

- **Resmi Antigravity Kural Standardı:**
  - Tüm projelerde kurallar, projenin / git reposunun kök dizininde bulunan **`.agents/rules/`** klasörü altında tutulur (`.agents/rules/*.md`).
- **Genel Kurallar (Kırmızı Çizgiler):**
  - Her yeni proje reposu açıldığında doğrudan **`.agents/rules/rules.md`** dosyası oluşturularak bu evrensel kurallar repoya işlenir.
- **Projeye Özgü Kurallar:**
  - Projeye özel kurallar da aynı dizinde tutulur ve ana kırmızı çizgileri asla ezemez.

---

## 4. YEREL DİSK YASAĞI (GitHub-Only Çalışma)

- Yerel disklerde (`C:`, `D:`) veya Google Drive'da asla izinsiz dosya açılmayacak, klonlama veya kalıcı çalışma alanı klasörü oluşturma yapılmayacaktır.
- Tüm geliştirme, dosya oluşturma, commit ve versiyonlama doğrudan **GITHUB REPOLARINDA** veya repoya bağlı proje çalışma alanında yürütülür.
- Tek ve mutlak kaynak doğrudan GitHub Repository'sidir.

---

## 5. GİT VE DAĞITIM (DEPLOYMENT) AKIŞI

- **Dallar:**
  - `main`: Canlı (Production) ortamı temsil eden kararlı dal.
  - `staging`: Tüm geliştirmelerin, yeni özelliklerin ve güncellemelerin yapıldığı test dalı.
- **İlk Başlangıç:** Projeye doğrudan `main` dalında başlanır.
- **İlk Canlıya Çıkış:** Kullanıcı onayı alındıktan sonra `main` üzerinden canlı ortama dağıtılır.
- **Güncellemeler:** Canlıya çıktıktan sonraki tüm geliştirmeler istisnasız **`staging`** dalında yürütülür.
- **Test ve Önizleme:** Staging ortamındaki değişiklikler test URL'leri üzerinden kontrol edilir.
- **`main` Dalı Koruması:** Test edilip onay verilmeden `main` dalına doğrudan commit, push veya merge kesinlikle yasaktır.

---

## 6. GİZLİ BİLGİ (SECRET) VE GÜVENLİK KORUMASI

- Şifreler, API anahtarları, FTP bilgileri ve gizli belirteçler asla koda gömülmez ve GitHub'a push edilmez.
- `.env` ve yapılandırma dosyaları daima `.gitignore` içindedir. Repoda sadece boş/şablon değerli `.env.example` tutulur.
- Hassas ortam değişkenleri yalnızca barındırma sağlayıcısı (Vercel vb.) yönetim paneli üzerinden tanımlanır.

---

## 7. MDv1 PROJESİNE ÖZEL MİMARİ VE GELİŞTİRME STANDARTLARI

Bu repository, **Musa Divarcı**'nın kişisel teknoloji profili ve vitrin sitesidir (`https://www.musadivarci.com.tr`).

1. **Teknoloji Yığını ve Felsefe:**
   - Saf Statik Web (Vanilla HTML5, modern CSS3, yalın JavaScript).
   - Ağır harici framework/kütüphane bağımlılıklarından kaçınılır. Hız, sıfır gecikme ve yüksek Core Web Vitals skoru esastır.
2. **SEO ve Makine Okunabilirliği (Machine-Readable Identity):**
   - Tüm sayfalarda geçerli `Schema.org JSON-LD` (Person, ProfilePage, Article, SoftwareSourceCode vb.) yapılandırılmış verisi eksiksiz korunmalıdır.
   - `llms.txt`, `robots.txt`, `sitemap.xml` dosyaları içerik güncellemeleriyle senkronize tutulmalıdır.
   - Sosyal paylaşım etiketleri (OpenGraph, Twitter Cards, canonical URL) tam ve doğru olmalıdır.
3. **Görsel ve Medya Optimizasyonu:**
   - Görseller web standartlarına uygun şekilde optimize edilmiş `.webp` ve yedek `.jpg`/`.png` formatlarında tutulmalıdır.
4. **Vercel Dağıtım Yapılandırması:**
   - `vercel.json` içerisinde `cleanUrls`, yönlendirmeler (`redirects`), robots ve güvenlik başlıkları bozulmamalıdır.
