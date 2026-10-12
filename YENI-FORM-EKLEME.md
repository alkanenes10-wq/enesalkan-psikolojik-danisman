# Yeni form nasıl eklenir?

Tüm formlar tek dosyada durur: `formlar.js`. Başka hiçbir dosyaya dokunmanız gerekmez.
Yeni form eklediğinizde linki, ana sayfadaki kartı ve puan hesabı kendiliğinden oluşur.

## Adımlar

1. `formlar.js` dosyasını açın.
2. Mevcut form bloklarından birini, başındaki `{` işaretinden sonundaki `}` işaretine kadar kopyalayın.
3. Son form bloğunun kapanan `}` işaretinden sonra bir **virgül** koyun ve kopyayı yapıştırın.
4. Aşağıdaki alanları yeni konuya göre değiştirin.
5. Dosyayı kaydedip GitHub'a gönderin; Vercel siteyi kendiliğinden günceller.

## Alanlar

| Alan | Ne işe yarar | Örnek |
|---|---|---|
| `slug` | Linkin sonu. Küçük harf, boşluksuz, Türkçe karakter kullanmayın. | `"sinav-kaygisi"` → `siteniz.com/sinav-kaygisi` |
| `kod` | Sonuç kodunun başındaki iki büyük harf. Her formda **farklı** olmalı. | `"SK"` |
| `surum` | Maddeleri, sırasını ya da ters puanlamayı değiştirdiğinizde bir artırın. Eski kodlar o zaman uyarı verir. | `2` |
| `amac` | Danışman ekranında görünen ön test ve son test amaçları. | `{ on: "...", son: "..." }` |
| `baslik` | Formun adı | `"Sınav Kaygısı"` |
| `altBaslik` | Başlığın altındaki küçük yazı | `"BDT temelli kendini değerlendirme formu"` |
| `kisaAciklama` | Ana sayfadaki kartta görünen cümle | |
| `sure` | Tahmini süre | `"2 dakika"` |
| `giris` | Başlamadan önce gösterilen açıklama | |
| `secenekler` | Yanıt seçenekleri. `SECENEKLER_UYUM` yazarsanız hazır 1-5 seçenekleri kullanılır. | |
| `maddeler` | Sorular. Her biri `{ metin: "..." }` biçimindedir. | |
| `sonuclar` | Puan aralıkları ve her aralığın metni | |

## Puan aralıklarını belirleme

- En düşük puan = madde sayısı (herkes 1 işaretlerse).
- En yüksek puan = madde sayısı × 5.
- Aralıklar bu iki sayı arasını **boşluk bırakmadan** kaplamalı.

12 maddelik form için: 12-28, 29-44, 45-60.
10 maddelik form için: 10-23, 24-37, 38-50.

## Alt alanlar (isteğe bağlı)

Sınav kaygısı formundaki gibi, sonucu alanlara bölerek göstermek isterseniz forma bir `alanlar`
listesi ekleyin ve her maddeye o listedeki kodlardan birini `alan` olarak yazın.
Sonuç ekranında her alan için bir çubuk çıkar; en yüksek alanın `not` metni gösterilir.
`alanlar` yazmazsanız form yalnızca toplam puanla çalışır (erteleme formu böyledir).

Yanıt seçenekleri için `SECENEKLER_UYUM` (bana uyuyor/uymuyor) ya da `SECENEKLER_SIKLIK`
(hiçbir zaman/her zaman) kullanabilirsiniz.

## Danışman notu

Her alanın `not` metnini öğrenci görür; `danisman` metnini yalnızca siz danışman ekranında görürsünüz.
Danışman notuna o alan yüksek çıktığında hangi çalışmaya odaklanacağınızı yazın.

## Sonuç kodu ve danışman ekranı

- Öğrenci formu bitirince ekranda `SK2-421354213542-37` gibi bir sonuç kodu görür ve kopyalayabilir.
- Öğrenci bu kodu size Instagram'dan gönderir.
- `siteniz/danisman` adresini açıp kodu yapıştırın. Son test kodunu da girerseniz iki uygulama karşılaştırılır.
- Kodlar yalnızca sizin tarayıcınızda çözülür; hiçbir yere kaydedilmez. Bu sayfa arama motorlarına kapalıdır.
- Puanların tamamı “zorlanma” yönündedir: yüksek puan daha çok zorlanma, son testteki düşüş iyileşme demektir.

## Ters puanlanan madde

Olumlu yönde yazılmış bir madde eklerseniz (örneğin "Planladığım saatte çalışmaya başlarım"),
sonuna `ters: true` ekleyin; puanı kendiliğinden tersine çevrilir:

```js
{ metin: "Planladığım saatte çalışmaya başlarım.", ters: true }
```

## Dikkat edilecekler

- Metinlerin içinde çift tırnak kullanacaksanız önüne ters eğik çizgi koyun: `\"böyle\"`.
- Her maddenin ve her sonuç bloğunun arasında virgül olmalı; sonuncudan sonra virgül olmaz.
- Maddeleri mevcut ölçeklerin metinlerinden kopyalamayın; kendi cümlelerinizle yazın.
- Sonuç metinlerinde tanı koyan ifadeler ("kaygı bozukluğun var" gibi) kullanmayın.

## Instagram hesabını ya da anahtar kelimeyi değiştirme

Aynı dosyanın en üstündeki `window.SITE` bölümünde `instagram` ve `dmKelimesi` alanlarını değiştirin.
