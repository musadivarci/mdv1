# Project Agent Rules & Governance

Bu proje için bağlayıcı ve evrensel tüm yönetişim kuralları, kırmızı çizgiler ve mimari standartlar [`.agents/rules/rules.md`](.agents/rules/rules.md) dosyasında tanımlanmıştır.

## Özet Kırmızı Çizgiler:
1. **Otonom Çalışma:** Rutin operasyonlarda her adımda ara onay sorulmaz; süreç uçtan uca yürütülüp özet rapor sunulur.
2. **Git & Branch Stratejisi:** Canlı ortam `main` dalıdır. Tüm geliştirme, güncelleme ve testler `staging` dalında yapılır. Test edilip onaylanmadan `main` dalına doğrudan commit/merge yasaktır.
3. **Gizli Bilgi (Secret) Koruması:** `.env` ve hassas anahtarlar asla commit edilmez, repoda yalnızca `.env.example` tutulur.
4. **Veri ve Sunucu Güvenliği:** FTP/Deploy sırasında canlı sunucudaki veritabanı dosyaları ve kullanıcı medya yüklemeleri asla ezilmez.
5. **MDv1 Standartları:** Saf HTML5, modern CSS3, Schema.org JSON-LD, SEO ve Vercel optimizasyonları korunur.

Ayrıntılı kural metni için bkz: [`.agents/rules/rules.md`](.agents/rules/rules.md)
