/* ==========================================================
   SİTE AYARLARI VE FORMLAR
   Yeni form eklemek için bu dosyanın en altındaki açıklamayı
   ya da YENI-FORM-EKLEME.md dosyasını okuyun.
   ========================================================== */

window.SITE = {
  ad: "Enes Alkan",
  unvan: "Psk. Danışman",
  slogan: "İrade değil, yöntem.",
  instagram: "enesalkan.pskdan",   // başında @ olmadan
  dmKelimesi: "GÖRÜŞME"
};

/* Tüm formlarda ortak kullanılan 1-5 yanıt seçenekleri */
var SECENEKLER_UYUM = [
  "Bana hiç uymuyor",
  "Pek uymuyor",
  "Biraz uyuyor",
  "Çoğunlukla uyuyor",
  "Tamamen uyuyor"
];

/* Sıklık soran formlar için 1-5 yanıt seçenekleri */
var SECENEKLER_SIKLIK = [
  "Hiçbir zaman",
  "Nadiren",
  "Bazen",
  "Sık sık",
  "Neredeyse her zaman"
];

window.FORMLAR = [

  /* ================= ERTELEME (Genel Erteleme ve Tuckman'dan esinlenildi) ================= */
  {
    slug: "erteleme", kod: "ER", surum: 2,
    baslik: "Erteleme",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Ertelemenin sende başlamakta mı, son ana bırakmakta mı yoksa dikkat dağınıklığında mı yoğunlaştığını gör.",
    sure: "3 dakika",
    amac: { on: "Erteleme şiddetini ve hangi biçimde yaşandığını belirlemek.", son: "Eyleme geçme hızındaki değişimi görmek." },
    giris: "Aşağıdaki 12 ifade, YKS'ye hazırlanırken yaşanan erteleme davranışlarını anlatıyor. Her birini son iki haftada ne sıklıkla yaşadığını işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_SIKLIK,
    alanlar: [
      { kod: "baslama", ad: "Başlamayı geciktirme",
        not: "En çok başlamakta zorlanıyorsun. Başlangıç eşiğini küçültmek, yani işi ilk beş dakikalık bir adıma indirmek bu döngüyü kırmanın en etkili yoludur.",
        danisman: "Odak: başlangıç eşiği. Beş dakika kuralı, ilk adımın somutlaştırılması, hazırlık ritüellerinin kısaltılması; “hazır hissetme” beklentisinin bilişsel olarak sınanması." },
      { kod: "sonana", ad: "Son ana bırakma",
        not: "İşleri en çok son ana bırakıyorsun. Teslim tarihinden geriye doğru ara tarihler koymak, baskının tek bir güne yığılmasını önler.",
        danisman: "Odak: zaman tahmini ve ara hedefler. Geriye doğru planlama, “yarın telafi ederim” düşüncesinin kanıt sorgusu, baskı altında çalışma inancının gözden geçirilmesi." },
      { kod: "kacinma", ad: "Kaçınma ve dikkat dağınıklığı",
        not: "Ertelemen en çok kaçınma ve dikkat dağıtıcılardan besleniyor. İradeye güvenmek yerine ortamı düzenlemek, telefonu uzaklaştırmak daha işe yarar.",
        danisman: "Odak: duygu düzenleme ve uyaran kontrolü. Kaçınılan duygunun (sıkıntı, yetersizlik) adlandırılması, ortam düzenlemesi, eksik konular için kademeli maruz bırakma." },
      { kod: "eylem", ad: "Eyleme geçme",
        not: "Bir işe karar verdikten sonra harekete geçmekte zorlanıyorsun. Ne zaman, nerede ve ne kadar çalışacağını önceden belirlemek eyleme geçmeyi kolaylaştırır.",
        danisman: "Odak: uygulama niyetleri (eğer-o zaman planları), görev bölme, ilk adımın zamanlanması. Son testte bu alandaki düşüş eyleme geçme hızındaki artışı gösterir." }
    ],
    maddeler: [
      { alan: "baslama", metin: "Çalışmaya oturmadan önce masamı, telefonumu ya da odamı “hazırlamakla” epey vakit geçiririm." },
      { alan: "sonana",  metin: "Bir işi ancak son ana kaldığında, sıkışınca yapabilirim." },
      { alan: "kacinma", metin: "Çalışmam gerektiğini bile bile başka bir şey yaparım; keyif almam ama bırakamam da." },
      { alan: "eylem",   metin: "Bir işe karar verdiğimde fazla beklemeden başlarım.", ters: true },
      { alan: "baslama", metin: "Zor bulduğum dersi programın sonuna atarım, çoğu zaman da sıra ona gelmez." },
      { alan: "sonana",  metin: "“Yarın daha erken kalkıp telafi ederim” dediğim günler sık olur." },
      { alan: "kacinma", metin: "“Beş dakika bakıp çıkacağım” diye açtığım telefon çalışma saatimin büyük kısmını alır." },
      { alan: "eylem",   metin: "Zor bir işi küçük parçalara bölüp ilk adımı hemen atabilirim.", ters: true },
      { alan: "baslama", metin: "Başlamak için kendimi “hazır” ya da “havamda” hissetmeyi beklerim." },
      { alan: "sonana",  metin: "Deneme analizi ya da konu tekrarı gibi işleri yapılması gereken zamandan sonraya bırakırım." },
      { alan: "kacinma", metin: "Konu eksiğim büyüdükçe o derse başlamak daha da zorlaşır." },
      { alan: "eylem",   metin: "Planladığım saatte çalışmaya oturabilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Erteleme seni pek yavaşlatmıyor",
        yorum: "Yanıtların, ertelemenin şu an çalışma düzenini belirgin biçimde bozmadığını gösteriyor. Ara sıra ertelemek herkesin yaşadığı bir şey; önemli olan bunun alışkanlığa dönüşmemesi.",
        oneri: "Aşağıda en yüksek çıkan alana bak ve o tek durum için bu hafta küçük bir kural koy; örneğin “zor dersi günün ilk 30 dakikasında açarım”." },
      { min: 29, max: 44, etiket: "Erteleme ara ara araya giriyor",
        yorum: "Yanıtların, ertelemenin bazı derslerde ya da bazı günlerde çalışmanı aksattığını gösteriyor. Bu genellikle tembellikle değil, başlamanın zor gelmesiyle ilgilidir.",
        oneri: "Beş dakika kuralını dene: ertelediğin derse yalnızca beş dakika çalışacağına söz ver, süre dolunca bırakmakta serbest ol. Çoğu zaman en zor kısım olan başlangıcı geçmiş olursun." },
      { min: 45, max: 60, etiket: "Erteleme çalışmanın önüne geçiyor",
        yorum: "Yanıtların, ertelemenin şu an hazırlık sürecini ciddi biçimde zorladığını gösteriyor. Bu bir irade ya da karakter sorunu değil; kaçınma, suçluluk ve yeniden kaçınmadan oluşan, öğrenilmiş bir döngü.",
        oneri: "Bugün için tek bir hedef seç ve onu küçült: “matematik çalışacağım” yerine “saat 17.00'de masada, türevden 5 soru”. Ne zaman, nerede ve ne kadar olduğu belli hedefe başlamak çok daha kolaydır." }
    ]
  },

  /* ================= SINAV KAYGISI (TAI ve Beck Anksiyete'den esinlenildi) ================= */
  {
    slug: "sinav-kaygisi", kod: "SK", surum: 2,
    baslik: "Sınav Kaygısı",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Kaygının düşüncelerinde mi, bedeninde mi, sınav anında mı yoğunlaştığını ve ne kadar sakinleşebildiğini gör.",
    sure: "3 dakika",
    amac: { on: "Kaygı düzeyini ve kaygının yoğunlaştığı alanı belirlemek.", son: "Gevşeme ve BDT çalışmaları sonrasında kaygıdaki azalmayı görmek." },
    giris: "Aşağıdaki 12 ifade, deneme ve sınav dönemlerinde yaşananları anlatıyor. Her birini son bir ayda ne sıklıkla yaşadığını işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_SIKLIK,
    alanlar: [
      { kod: "endise", ad: "Kaygılı düşünceler",
        not: "Kaygın en çok zihninde kurduğun senaryolardan besleniyor. Bu düşünceleri fark etmek ve kanıtlarıyla sınamak kaygıyı belirgin biçimde azaltır.",
        danisman: "Odak: endişe bileşeni. Felaketleştirme ve kehanet hatalarının tanınması, düşünce kaydı, kanıt sorgusu, endişe zamanı tekniği." },
      { kod: "beden", ad: "Bedensel belirtiler",
        not: "Kaygın en çok bedeninde kendini gösteriyor. Nefes ve gevşeme becerileri düzenli çalışıldığında bu belirtiler yönetilebilir hale gelir.",
        danisman: "Odak: fizyolojik bileşen. Diyafram nefesi, kademeli kas gevşetme, uyku düzeni. Belirtiler yoğunsa ya da sınav dışında da sürüyorsa tıbbi ve psikiyatrik değerlendirme için yönlendirme düşünülmeli." },
      { kod: "an", ad: "Sınav anında dikkat",
        not: "En çok, bildiğini sınavda ortaya koymakta zorlanıyorsun. Bu çoğunlukla bilgi eksiğinden değil, dikkatin kaygıya kaymasından kaynaklanır.",
        danisman: "Odak: dikkat ve performans. Deneme stratejisi (işaretle-geç), zaman yönetimi provası, dikkati görev üzerine geri getirme alıştırmaları, gerçek koşullarda deneme provası." },
      { kod: "gevseme", ad: "Sakinleşebilme",
        not: "Gerildiğinde kendini sakinleştirmekte zorlanıyorsun. Sakinleşme öğrenilebilen bir beceridir; kısa nefes çalışmaları her gün birkaç dakikayla bile fark yaratır.",
        danisman: "Odak: başa çıkma becerileri. Son testte bu alandaki düşüş, gevşeme ve öz düzenleme becerilerindeki gelişimi gösterir. Günlük kısa gevşeme pratiği ve sınav öncesi rutin oluşturma." }
    ],
    maddeler: [
      { alan: "endise",  metin: "Deneme sonucum kötü geldiğinde aklım hemen “bu sene de olmayacak” noktasına gider." },
      { alan: "beden",   metin: "Deneme ya da sınav öncesinde kalbim hızlanır, midem bulanır ya da nefesim daralır." },
      { alan: "an",      metin: "Evde rahatça çözdüğüm türden soruları denemede yapamam." },
      { alan: "gevseme", metin: "Gerildiğimi fark ettiğimde nefesimi yavaşlatarak sakinleşebilirim.", ters: true },
      { alan: "endise",  metin: "YKS'yi düşündüğümde aklıma önce ters gidebilecek şeyler gelir." },
      { alan: "beden",   metin: "Sınav yaklaştıkça uykuya dalmam zorlaşır ya da uykum bölünür." },
      { alan: "an",      metin: "Bir soruya takıldığımda toparlanamam; sonraki sorulara da o gerginlikle devam ederim." },
      { alan: "gevseme", metin: "Sınavdan önceki gece zihnimi sakinleştirip dinlenebilirim.", ters: true },
      { alan: "endise",  metin: "İstediğim sonucu alamazsam her şeyin biteceğini düşünürüm." },
      { alan: "beden",   metin: "Deneme ya da sınav sırasında ellerim terler, titrer ya da omuzlarım kaskatı kesilir." },
      { alan: "an",      metin: "Sınav sırasında kalan süreyi düşünmekten okuduğumu anlamakta zorlanırım." },
      { alan: "gevseme", metin: "Sınav sırasında kaygım yükseldiğinde dikkatimi yeniden sorulara toplayabilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Sınav kaygısı seni pek zorlamıyor",
        yorum: "Yanıtların, kaygının şu an hazırlığını ve performansını belirgin biçimde etkilemediğini gösteriyor. Bir miktar heyecan olağandır ve çoğu zaman dikkati toplamaya yardım eder.",
        oneri: "Denemelerden sonra yalnızca yanlışlarına değil, sınav sırasında kendini nasıl hissettiğine de bir cümleyle not düş. Kaygı artmaya başlarsa erkenden fark edersin." },
      { min: 29, max: 44, etiket: "Sınav kaygısı zaman zaman performansını etkiliyor",
        yorum: "Yanıtların, kaygının bazı denemelerde bildiğini ortaya koymanı zorlaştırdığını gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Denemeye başlamadan önce iki dakika boyunca nefesini yavaşlat: dört saniyede al, altı saniyede ver. Bedenin sakinleştiğinde dikkatin de sorulara daha kolay döner." },
      { min: 45, max: 60, etiket: "Sınav kaygısı hazırlığını ve sınavını zorluyor",
        yorum: "Yanıtların, kaygının şu an hem çalışma sürecini hem de sınav performansını ciddi biçimde etkilediğini gösteriyor. Bu güçsüz olduğun anlamına gelmez; sınav kaygısı doğru becerilerle yönetilebilir.",
        oneri: "Aklındaki en kötü senaryoyu bir kağıda yaz. Altına iki soru sor: “Bunun olacağına dair kanıtım ne?” ve “Olsa bile sonra ne yapabilirim?”. Yazıya dökülen düşünce daha yönetilebilirdir." }
    ]
  },

  /* ================= AKADEMİK ÖZ-YETERLİK (Jerusalem ve Schwarzer'den esinlenildi) ================= */
  {
    slug: "akademik-oz-yeterlik", kod: "AY", surum: 1,
    baslik: "Akademik Öz-Yeterlik",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Başarabileceğine ne kadar inandığını; yeteneğe güven, zorlukla başa çıkma ve hedef inancı açısından gör.",
    sure: "3 dakika",
    amac: { on: "Öz-yeterlik inancını ve zayıf kaldığı alanı belirlemek.", son: "Başarı inancındaki artışı görmek." },
    giris: "Aşağıdaki 12 ifade, derslere ve sınava hazırlığa dair inançlarını anlatıyor. Her birinin sana ne kadar uyduğunu işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_UYUM,
    alanlar: [
      { kod: "yetenek", ad: "Yeteneğine güven",
        not: "En çok, öğrenme kapasitene güvenmekte zorlanıyorsun. Yetenek sabit değildir; doğru yöntemle çalıştığın her konu bunun kanıtı olur.",
        danisman: "Odak: yetersizlik inançları ve sabit zihniyet. Bilişsel yeniden yapılandırma, “öğrendiklerim” kanıt günlüğü, sosyal karşılaştırmanın gözden geçirilmesi." },
      { kod: "zorluk", ad: "Zorlukla başa çıkma",
        not: "En çok, zor bir soru ya da kötü bir sonuç karşısında devam etmekte zorlanıyorsun. Zorluğu “yapamıyorum” değil “henüz yapamıyorum” diye okumak ısrarını artırır.",
        danisman: "Odak: hayal kırıklığına tolerans ve ısrar. Problem çözme basamakları, kademeli zorluk, hatayı kişiselleştirmeme; başarısızlık sonrası iç konuşmanın düzenlenmesi." },
      { kod: "hedef", ad: "Hedefe ulaşma inancı",
        not: "En çok, emeğinin sonuca dönüşeceğine inanmakta zorlanıyorsun. Küçük ve ölçülebilir hedeflerle ilerlemeyi görünür kılmak bu inancı güçlendirir.",
        danisman: "Odak: çaba-sonuç bağlantısı ve atıflar. Başarının içsel ve kontrol edilebilir nedenlere bağlanması, ara hedefler, ilerleme grafiği. Son testte bu alandaki düşüş başarı inancındaki artışı gösterir." }
    ],
    maddeler: [
      { alan: "yetenek", metin: "Zor bir konuyu yeterince çalışırsam anlayabileceğime inanırım.", ters: true },
      { alan: "zorluk",  metin: "Çözemediğim bir soruyla karşılaşınca kısa sürede pes ederim." },
      { alan: "hedef",   metin: "Hedeflediğim puana ulaşabileceğime inanıyorum.", ters: true },
      { alan: "yetenek", metin: "Bazı dersleri ne kadar çalışsam da öğrenemeyeceğimi düşünürüm." },
      { alan: "zorluk",  metin: "Beklediğimden kötü geçen bir denemeden sonra toparlanıp çalışmaya devam edebilirim.", ters: true },
      { alan: "hedef",   metin: "Ne yaparsam yapayım netlerimin çok değişmeyeceğini düşünürüm." },
      { alan: "yetenek", metin: "Kendimi aynı sınava hazırlanan diğer öğrencilerden daha yetersiz görürüm." },
      { alan: "zorluk",  metin: "Bir konuda hata yaptığımda “zaten benim kafam basmıyor” diye düşünürüm." },
      { alan: "hedef",   metin: "Planladığım çalışmayı yaparsam sonuç alacağıma güvenirim.", ters: true },
      { alan: "yetenek", metin: "Yeni bir konuya başlarken “bunu yapamam” diye düşünürüm." },
      { alan: "zorluk",  metin: "Zorlandığım bir soruda farklı çözüm yollarını denemeye devam ederim.", ters: true },
      { alan: "hedef",   metin: "İyi bir sonuç aldığımda bunu kendi emeğimden çok şansa bağlarım." }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Başarabileceğine güvenin yüksek",
        yorum: "Yanıtların, öğrenme kapasitene ve emeğinin sonuç vereceğine güçlü biçimde inandığını gösteriyor. Bu inanç zor dönemlerde en önemli dayanaklarından biri.",
        oneri: "Bu hafta zorlandığın bir konuyu bilerek seç ve onu öğrendiğinde kısa bir not düş. Kanıtlarla beslenen güven, kötü bir denemeden sonra da ayakta kalır." },
      { min: 29, max: 44, etiket: "Başarı inancın bazı alanlarda sarsılıyor",
        yorum: "Yanıtların, bazı derslerde ya da bazı durumlarda kendine güvenmekte zorlandığını gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Her akşam o gün başardığın bir şeyi, ne kadar küçük olursa olsun, yaz. Bir hafta sonra listeye bakmak “yapamıyorum” düşüncesine karşı somut bir kanıt olur." },
      { min: 45, max: 60, etiket: "Başarabileceğine dair inancın şu an zayıf",
        yorum: "Yanıtların, şu an emeğinin sonuç vereceğine inanmakta zorlandığını gösteriyor. Bu bir yetenek ölçüsü değil, yaşadıklarınla şekillenmiş bir inançtır ve inançlar değişebilir.",
        oneri: "Kendine bu hafta kesinlikle başarabileceğin kadar küçük bir hedef koy ve tamamla. Öz-yeterlik büyük sözlerle değil, küçük ama tamamlanmış adımlarla büyür." }
    ]
  },

  /* ================= MÜKEMMELİYETÇİLİK (Çok Boyutlu Mükemmeliyetçilik'ten esinlenildi) ================= */
  {
    slug: "mukemmeliyetcilik", kod: "MK", surum: 1,
    baslik: "Mükemmeliyetçilik",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Yüksek standartlarının seni ileri mi taşıdığını, yoksa hata kaygısı ve kendinden şüpheyle mi zorladığını gör.",
    sure: "3 dakika",
    amac: { on: "Mükemmeliyetçiliğin tipini ve kaynağını anlamak.", son: "Esnek düşünme becerisindeki gelişimi ölçmek." },
    giris: "Aşağıdaki 12 ifade, kendinden ve sonuçlardan beklentilerini anlatıyor. Her birinin sana ne kadar uyduğunu işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_UYUM,
    alanlar: [
      { kod: "kati", ad: "Katı standartlar",
        not: "Kendine koyduğun ölçütler esneyemeyecek kadar katı. Yüksek hedef iyidir; sorun, hedefin altında kalan her sonucu başarısızlık saymaktır.",
        danisman: "Odak: hep-ya-hiç düşüncesi. Standartların esnetilmesi, “yeterince iyi” ölçütünün tanımlanması, maliyet-yarar analizi. Bu alan tek başına yüksek, hata kaygısı düşükse uyumlu mükemmeliyetçiliğe daha yakındır." },
      { kod: "hata", ad: "Hata kaygısı",
        not: "Hata yapmaktan duyduğun kaygı seni zorluyor. Hatalar öğrenmenin bir parçasıdır; onlardan kaçınmak çoğu zaman öğrenmeyi de geciktirir.",
        danisman: "Odak: uyumsuz mükemmeliyetçiliğin çekirdeği. Hataya bilinçli maruz kalma deneyleri, ruminasyonun kesilmesi, öz-şefkat çalışmaları." },
      { kod: "suphe", ad: "Kendinden şüphe",
        not: "Yaptığın işin yeterli olduğundan emin olmakta zorlanıyorsun. Sürekli kontrol etmek kısa vadede rahatlatır, uzun vadede şüpheyi büyütür.",
        danisman: "Odak: kontrol ve güvence arama davranışları. Kontrol sayısının kademeli azaltılması, belirsizliğe tahammül, karar sonrası ruminasyonla çalışma." },
      { kod: "dis", ad: "Dış beklenti",
        not: "Kusursuz olma baskısını en çok çevrenden hissediyorsun. Başkalarının beklentisini kendi hedefinden ayırmak bu yükü hafifletir.",
        danisman: "Odak: sosyal kaynaklı mükemmeliyetçilik. Aile beklentisinin algısı ile gerçeğinin karşılaştırılması, gerekirse veli görüşmesi, değerin performansa bağlanmasının sorgulanması." }
    ],
    maddeler: [
      { alan: "kati",  metin: "Bir denemede beklediğim neti yapmazsam o denemeyi tamamen başarısız sayarım." },
      { alan: "hata",  metin: "Yaptığım küçük bir hatayı günlerce kafamda evirip çeviririm." },
      { alan: "suphe", metin: "Bir konuyu bitirdikten sonra da gerçekten öğrenip öğrenmediğimden emin olamam." },
      { alan: "dis",   metin: "Ailemin benden kusursuz bir sonuç beklediğini hissederim." },
      { alan: "kati",  metin: "Günlük hedeflerimin bir kısmını yapamazsam günü boşa geçmiş sayarım." },
      { alan: "hata",  metin: "Hata yapmaktan korktuğum için bazı konulara başlamayı geciktiririm." },
      { alan: "suphe", metin: "Çözdüğüm soruları defalarca kontrol etmeden içim rahat etmez." },
      { alan: "dis",   metin: "Başarısız olursam çevremdekilerin bana olan saygısının azalacağını düşünürüm." },
      { alan: "kati",  metin: "Hedefimi gerektiğinde gerçekçi biçimde güncelleyebilirim.", ters: true },
      { alan: "hata",  metin: "Hatalarımı öğrenme fırsatı olarak görebilirim.", ters: true },
      { alan: "suphe", metin: "Verdiğim bir karardan sonra “acaba yanlış mı yaptım” diye uzun süre düşünürüm." },
      { alan: "dis",   metin: "Benim için yeterli sonucun ne olduğunu kendim belirlerim, başkaları değil.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Standartların esnek ve sağlıklı",
        yorum: "Yanıtların, kendine hedef koyarken esnek kalabildiğini ve hatalarına karşı görece rahat olduğunu gösteriyor. Bu, uzun bir hazırlık döneminde seni koruyan bir özellik.",
        oneri: "Bu hafta bir denemeyi değerlendirirken önce iyi giden üç şeyi, sonra geliştirilecek bir şeyi yaz. Dengeli değerlendirme alışkanlığını korumanı sağlar." },
      { min: 29, max: 44, etiket: "Mükemmeliyetçilik zaman zaman yük oluyor",
        yorum: "Yanıtların, yüksek beklentilerinin bazen seni ileri taşıdığını, bazen de gereksiz baskı yarattığını gösteriyor. Aşağıda hangi alanın öne çıktığını görebilirsin.",
        oneri: "Bir sonraki çalışma oturumunda “yeterince iyi” ölçütünü baştan belirle; örneğin “bu konudan 20 soru, en az 14 doğru”. Ölçüte ulaştığında durmayı dene." },
      { min: 45, max: 60, etiket: "Mükemmeliyetçilik seni zorluyor",
        yorum: "Yanıtların, kusursuz olma beklentisinin şu an kaygı, şüphe ve erteleme yarattığını gösteriyor. Yüksek hedeflerinden vazgeçmen gerekmiyor; onlara ulaşma biçimini esnetmek mümkün.",
        oneri: "Bu hafta bilerek küçük bir “kusur” bırak: bir özeti yeniden yazmadan, bir soruyu üç kez kontrol etmeden geç. Sonra gerçekte ne olduğunu not et; çoğu zaman korkulan şey olmaz." }
    ]
  },

  /* ================= AİLE VE ÇEVRE BASKISI (Algılanan Anne-Baba Tutumları ve Sosyal Baskı'dan esinlenildi) ================= */
  {
    slug: "aile-ve-cevre", kod: "AB", surum: 1,
    baslik: "Aile ve Çevre Baskısı",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Ailenden ve çevrenden gelen baskıyı, aldığın desteği ve sınır koyabilme becerini gör.",
    sure: "3 dakika",
    amac: { on: "Aile dinamiklerini ve algılanan sosyal baskıyı anlamak.", son: "Sınır koyma becerisindeki gelişimi değerlendirmek." },
    giris: "Aşağıdaki 12 ifade, ailenle ve çevrenle sınav sürecindeki ilişkini anlatıyor. Her birini son bir ayda ne sıklıkla yaşadığını işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_SIKLIK,
    alanlar: [
      { kod: "beklenti", ad: "Aile beklentisi",
        not: "Ailenin beklentilerini yoğun biçimde hissediyorsun. Bu beklentiler çoğu zaman sevgiden gelir, ama nasıl ifade edildikleri baskıya dönüşebilir.",
        danisman: "Odak: algılanan ebeveyn baskısı. Beklentinin içeriği ile iletişim biçiminin ayrıştırılması; uygunsa veli ile ortak görüşme ve iletişim önerileri." },
      { kod: "destek", ad: "Aile desteği",
        not: "Zorlandığında ailenden yeterince destek hissetmiyorsun. Neye ihtiyacın olduğunu açıkça söylemek, ailenin seni doğru biçimde desteklemesini kolaylaştırır.",
        danisman: "Odak: algılanan duygusal destek. Öğrencinin ihtiyaçlarını ifade etmesinin çalışılması; veli bilgilendirmesi (sonuç yerine çabayı takdir etme). Destek çok düşükse aile içi koşullar dikkatle değerlendirilmeli." },
      { kod: "cevre", ad: "Çevre ve karşılaştırma",
        not: "Akrabalardan, arkadaşlardan ya da sosyal medyadan gelen karşılaştırmalar seni zorluyor. Başkalarının görünen sonuçları, onların tüm sürecini göstermez.",
        danisman: "Odak: sosyal karşılaştırma ve sosyal baskı. Karşılaştırma tetikleyicilerinin belirlenmesi, sosyal medya düzenlemesi, kişisel ilerleme ölçütlerine dönüş." },
      { kod: "sinir", ad: "Sınır koyabilme",
        not: "Seni rahatsız eden soru ve müdahalelere sınır koymakta zorlanıyorsun. Kibar ama net bir cümleyi önceden hazırlamak bu anları kolaylaştırır.",
        danisman: "Odak: atılganlık ve sınır koyma. Atılgan iletişim kalıpları, rol oyunu, hazır yanıt cümleleri. Son testte bu alandaki düşüş sınır koyma becerisindeki artışı gösterir." }
    ],
    maddeler: [
      { alan: "beklenti", metin: "Ailem netlerimi sık sık sorar ve sonuçlar konusunda gerginlik yaşarız." },
      { alan: "destek",   metin: "Zorlandığımda bunu ailemle rahatça konuşabilirim.", ters: true },
      { alan: "cevre",    metin: "Akrabalar ya da tanıdıklar “hangi bölümü kazanacaksın” diye sorduğunda baskı hissederim." },
      { alan: "sinir",    metin: "Beni rahatsız eden sorulara nazikçe “bunu şimdi konuşmak istemiyorum” diyebilirim.", ters: true },
      { alan: "beklenti", metin: "Ailemin istediği bölümü kazanmak zorunda olduğumu hissederim." },
      { alan: "destek",   metin: "Ailem sonuçtan çok emeğimi takdir eder.", ters: true },
      { alan: "cevre",    metin: "Arkadaşlarımın netlerini ya da sıralamalarını duymak kendimi değersiz hissettirir." },
      { alan: "sinir",    metin: "Çalışma düzenime yapılan müdahalelere hayır demekte zorlanırım." },
      { alan: "beklenti", metin: "Ailemle konuşmalarımızın büyük kısmı sınav ve dersler üzerine olur." },
      { alan: "destek",   metin: "Kötü bir sonuçtan sonra ailemden anlayış görürüm.", ters: true },
      { alan: "cevre",    metin: "Sosyal medyada başkalarının çalışma paylaşımlarını görünce yetersiz hissederim." },
      { alan: "sinir",    metin: "Kendi isteklerimi ve tercihlerimi aileme açıkça ifade edebilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Çevrenden gelen baskı yönetilebilir düzeyde",
        yorum: "Yanıtların, ailenden destek aldığını ve çevrenden gelen baskıyı büyük ölçüde yönetebildiğini gösteriyor. Bu, sınav sürecinde önemli bir koruyucu etken.",
        oneri: "Bu hafta ailene, sana iyi gelen bir desteklerini söyle; örneğin “sonucu sormadan çay getirmen iyi geliyor”. Neyin işe yaradığını bilmek onların da işini kolaylaştırır." },
      { min: 29, max: 44, etiket: "Aile ve çevre baskısı zaman zaman zorluyor",
        yorum: "Yanıtların, bazı konularda ailenden ya da çevrenden gelen baskıyı yoğun hissettiğini gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Seni en çok zorlayan soru için önceden kibar ama net bir cevap hazırla; örneğin “Netlerimi deneme sonrası hafta sonu paylaşırım.” Hazır bir cümle o anı çok kolaylaştırır." },
      { min: 45, max: 60, etiket: "Aile ve çevre baskısı seni zorluyor",
        yorum: "Yanıtların, şu an ailenden ve çevrenden gelen baskıyı yoğun biçimde hissettiğini ve destek bulmakta zorlandığını gösteriyor. Bu yükü tek başına taşımak zorunda değilsin.",
        oneri: "Güvendiğin bir yetişkinle, bir öğretmenle ya da bir danışmanla neler yaşadığını konuş. Baskıyı dile getirmek, çözüm aramanın ilk adımıdır." }
    ]
  },

  /* ================= MESLEK KARARI (Osipow ve Bacanlı'nın Mesleki Kararsızlık çalışmalarından esinlenildi) ================= */
  {
    slug: "meslek-karari", kod: "MS", surum: 1,
    baslik: "Meslek ve Bölüm Kararı",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Bölüm kararında seni zorlayanın kendini tanımak mı, bilgi eksikliği mi, kaygı mı yoksa dış etki mi olduğunu gör.",
    sure: "3 dakika",
    amac: { on: "Kararsızlığın nedenlerini tespit etmek.", son: "Hedef netliğindeki gelişimi değerlendirmek." },
    giris: "Aşağıdaki 12 ifade, meslek ve bölüm seçimine dair düşüncelerini anlatıyor. Her birinin sana ne kadar uyduğunu işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_UYUM,
    alanlar: [
      { kod: "kendini", ad: "Kendini tanıma",
        not: "En çok, neyi sevdiğini ve neyde güçlü olduğunu netleştirmekte zorlanıyorsun. Hangi derslerde ve etkinliklerde zamanın nasıl geçtiğini fark etmeyi gözlemlemek iyi bir başlangıçtır.",
        danisman: "Odak: ilgi, değer ve yetenek farkındalığı. İlgi envanteri, değerler sıralaması, geçmiş deneyim analizi; güçlü yönlerin meslek alanlarıyla eşleştirilmesi." },
      { kod: "bilgi", ad: "Bölüm ve meslek bilgisi",
        not: "Bölümler ve meslekler hakkında bilgin eksik. Bir bölümün ders planına bakmak ve o bölümden bir mezunla konuşmak kararını belirgin biçimde netleştirir.",
        danisman: "Odak: mesleki bilgi. Bölüm ders planları, mezun görüşmeleri, tercih kılavuzu ve taban puan okuma becerisi; bilgi toplama planı." },
      { kod: "kaygi", ad: "Karar verme kaygısı",
        not: "Yanlış karar verme korkusu seni kararsız bırakıyor. Hiçbir seçim tek ve geri dönüşsüz değildir; bu düşünce kararın ağırlığını azaltır.",
        danisman: "Odak: karar kaygısı ve kaçınma. Felaketleştirme (“hayatım mahvolur”) düşüncesinin sınanması, kararın geri dönüşlülüğünün tartışılması, yapılandırılmış karar matrisi." },
      { kod: "dis", ad: "Dış etki",
        not: "Bölüm kararında başkalarının sesi seninkinden daha yüksek. Önce kendi tercihlerini yazıya dökmek, sonra başkalarının görüşlerini dinlemek dengeyi kurmana yardım eder.",
        danisman: "Odak: dışsal etki ve özerklik. Öğrencinin kendi tercihlerini ifade etmesi, aile beklentileriyle uzlaşma; uygunsa veli ile ortak tercih görüşmesi." }
    ],
    maddeler: [
      { alan: "kendini", metin: "Hangi alanlara gerçekten ilgi duyduğumu bilmiyorum." },
      { alan: "bilgi",   metin: "Düşündüğüm bölümlerde hangi derslerin okutulduğunu ve mezunların ne iş yaptığını yeterince bilmiyorum." },
      { alan: "kaygi",   metin: "Yanlış bölümü seçip hayatımı mahvedeceğimden korkarım." },
      { alan: "dis",     metin: "Hangi bölümü seçeceğim konusunda ailemin ya da çevremin görüşü benimkinden daha belirleyicidir." },
      { alan: "kendini", metin: "Güçlü olduğum yönleri bir meslekle ilişkilendirmekte zorlanırım." },
      { alan: "bilgi",   metin: "Bölümler hakkında bilgiyi nereden ve nasıl toplayacağımı bilirim.", ters: true },
      { alan: "kaygi",   metin: "Bir bölüme karar verdiğim anda diğer seçenekleri kaçıracağımı düşünüp vazgeçerim." },
      { alan: "dis",     metin: "Seçmek istediğim bölümü çevremdekiler onaylamayacak diye söylemekten çekinirim." },
      { alan: "kendini", metin: "Ne tür bir işte mutlu olacağımı kabaca tarif edebilirim.", ters: true },
      { alan: "bilgi",   metin: "Tercih yaparken gereken bilgilerin (taban puan, kontenjan, şehir, iş olanakları) bende eksik olduğunu düşünürüm." },
      { alan: "kaygi",   metin: "Meslek kararını düşünmek beni o kadar bunaltıyor ki konuyu sürekli ertelerim." },
      { alan: "dis",     metin: "Bölüm seçerken kendi isteklerimi ön planda tutabilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Bölüm kararın büyük ölçüde net",
        yorum: "Yanıtların, ilgi alanlarını ve seçeneklerini tanıdığını, kararını kendin verebildiğini gösteriyor. Net bir hedef, çalışma motivasyonunun da önemli bir kaynağı.",
        oneri: "Hedeflediğin bölümün ilk yıl derslerine göz at ve seni en çok heyecanlandıran dersi not et. Zor günlerde bu not motivasyonunu tazeler." },
      { min: 29, max: 44, etiket: "Bölüm kararında bazı belirsizlikler var",
        yorum: "Yanıtların, bazı açılardan net olduğunu ama karar sürecinde seni zorlayan noktalar bulunduğunu gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Aklındaki üç bölümü yaz ve her biri için bir mezunun ya da öğrencinin anlattığı bir video izle. Gerçek deneyimler soyut düşüncelerden daha çok netlik sağlar." },
      { min: 45, max: 60, etiket: "Bölüm kararı şu an seni zorluyor",
        yorum: "Yanıtların, bölüm ve meslek kararında belirgin bir kararsızlık yaşadığını gösteriyor. Bu olağan bir durum; kararsızlık doğru adımlarla, adım adım netleşebilir.",
        oneri: "Bu hafta bir karar vermek yerine yalnızca bilgi topla: sevdiğin üç dersi ve keyif aldığın üç etkinliği yaz. Karar, kendini tanıdıkça kendiliğinden şekillenmeye başlar." }
    ]
  },

  /* ================= TÜKENMİŞLİK (Maslach Tükenmişlik - Öğrenci Formu'ndan esinlenildi) ================= */
  {
    slug: "tukenmislik", kod: "TK", surum: 1,
    baslik: "Tükenmişlik",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Yorgunluğun, derse yabancılaşman ve yeterlik hissin açısından ne kadar tükendiğini gör.",
    sure: "3 dakika",
    amac: { on: "Tükenmişlik düzeyini ve hangi boyutta yoğunlaştığını tespit etmek.", son: "Enerji ve motivasyondaki artışı görmek." },
    giris: "Aşağıdaki 12 ifade, uzun hazırlık sürecinde nasıl hissettiğini anlatıyor. Her birini son iki haftada ne sıklıkla yaşadığını işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_SIKLIK,
    alanlar: [
      { kod: "yorgun", ad: "Duygusal ve fiziksel yorgunluk",
        not: "Enerjin şu an çok düşük. Daha çok çalışmak değil, düzenli dinlenmek ve uyku bu dönemde en verimli yatırımdır.",
        danisman: "Odak: tükenme. Uyku, beslenme ve hareket düzeninin değerlendirilmesi, programa planlı dinlenme eklenmesi, iş yükünün gerçekçi hale getirilmesi." },
      { kod: "yabanci", ad: "Derse yabancılaşma",
        not: "Derslere ve hedefine karşı mesafe hissediyorsun. Neden bu yola çıktığını hatırlamak ve küçük anlam bağları kurmak motivasyonu yeniden canlandırabilir.",
        danisman: "Odak: sinizm ve anlam kaybı. Değerler ve hedef bağlantısının yeniden kurulması, motivasyonel görüşme, programa keyifli öğelerin eklenmesi." },
      { kod: "yeterlik", ad: "Yeterlik hissinde azalma",
        not: "Emek verdiğin halde ilerlemediğini hissediyorsun. İlerlemeyi yalnızca netlerle değil, bitirdiğin konular ve kurduğun düzenle de ölçmek bu hissi değiştirebilir.",
        danisman: "Odak: azalan kişisel başarı hissi. İlerlemenin görünür kılınması, ölçütlerin çeşitlendirilmesi, başarı kayıtları. Belirgin isteksizlik, umutsuzluk ya da uyku-iştah değişimi varsa depresyon açısından değerlendirme ve yönlendirme düşünülmeli." }
    ],
    maddeler: [
      { alan: "yorgun",   metin: "Sabah uyandığımda daha günün başında kendimi yorgun hissederim." },
      { alan: "yabanci",  metin: "Bu sınava hazırlanmanın bir anlamı olup olmadığını sorgularım." },
      { alan: "yeterlik", metin: "Çalıştığım halde ilerlemediğimi hissederim." },
      { alan: "yorgun",   metin: "Ders çalışmak bana eskisinden çok daha ağır gelir." },
      { alan: "yabanci",  metin: "Derslere karşı eskiden duyduğum merakı artık hissetmem." },
      { alan: "yeterlik", metin: "Zor bir konuyu çözdüğümde hâlâ başarı hissi yaşarım.", ters: true },
      { alan: "yorgun",   metin: "Gün sonunda başka hiçbir şeye enerjim kalmaz." },
      { alan: "yabanci",  metin: "Çalışırken aklım sık sık “nasılsa fark etmeyecek” düşüncesine kayar." },
      { alan: "yeterlik", metin: "Son zamanlarda yaptığım çalışmalardan tatmin olmam." },
      { alan: "yorgun",   metin: "Dinlendiğimde enerjimin yerine geldiğini hissederim.", ters: true },
      { alan: "yabanci",  metin: "Hedeflediğim bölümü düşündüğümde hâlâ heyecan duyarım.", ters: true },
      { alan: "yeterlik", metin: "Hazırlık sürecinde işe yarar bir şeyler yaptığımı düşünmekte zorlanırım." }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Enerjin ve motivasyonun yerinde",
        yorum: "Yanıtların, uzun hazırlık sürecine rağmen enerjini ve motivasyonunu koruyabildiğini gösteriyor. Bu dengeyi korumak, sınav yaklaştıkça daha da önemli hale gelecek.",
        oneri: "Programında haftada en az bir yarım günü tamamen dinlenmeye ayır. Dinlenme, tükenmişliğe karşı en etkili önlemdir." },
      { min: 29, max: 44, etiket: "Tükenmişlik belirtileri başlamış",
        yorum: "Yanıtların, bazı alanlarda yorgunluk ve motivasyon kaybı yaşamaya başladığını gösteriyor. Erken fark etmek, tükenmişliği ilerlemeden durdurmanın en iyi yoludur.",
        oneri: "Bu hafta her çalışma bloğundan sonra on dakikalık, ekransız bir mola ver: yürü, esne ya da pencereden dışarı bak. Ekranlı molalar zihni dinlendirmez." },
      { min: 45, max: 60, etiket: "Tükenmişlik seni ciddi biçimde etkiliyor",
        yorum: "Yanıtların, şu an hem enerjinin hem de motivasyonunun belirgin biçimde düştüğünü gösteriyor. Bu tembellik değil, uzun süreli zorlanmanın doğal bir sonucu ve ciddiye alınması gereken bir işaret.",
        oneri: "Önce programını yükseltmeyi değil, uyku ve dinlenme düzenini toparlamayı hedefle. Bu duygular uzun süredir devam ediyorsa güvendiğin bir yetişkinle ya da bir uzmanla konuşman önemli." }
    ]
  },

  /* ================= ZAMAN ALGISI (Zimbardo Zaman Perspektifi'nden esinlenildi) ================= */
  {
    slug: "zaman-algisi", kod: "ZP", surum: 1,
    baslik: "Zaman Algısı",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Zihninin geçmişte mi, anlık isteklerde mi yoksa gelecekte mi olduğunu ve bunun çalışmanı nasıl etkilediğini gör.",
    sure: "3 dakika",
    amac: { on: "Öğrencinin zaman algısını ve baskın zaman yönelimini anlamak.", son: "Gelecek odaklılıktaki artışı görmek." },
    giris: "Aşağıdaki 12 ifade, geçmişe, bugüne ve geleceğe bakış biçimini anlatıyor. Her birinin sana ne kadar uyduğunu işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_UYUM,
    alanlar: [
      { kod: "gecmis", ad: "Olumsuz geçmiş odağı",
        not: "Geçmişteki hatalar ve kaçan fırsatlar zihninde büyük yer kaplıyor. Geçmişten ders çıkarmak ile geçmişte takılı kalmak arasındaki farkı fark etmek önemli.",
        danisman: "Odak: olumsuz geçmiş yönelimi ve ruminasyon. Geçmiş başarısızlıkların (özellikle mezunlarda önceki sınav) yeniden çerçevelenmesi, ruminasyonun kesilmesi, ders çıkarma yazısı." },
      { kod: "anlik", ad: "Anlık haz odağı",
        not: "O anki istekler çoğu zaman uzun vadeli hedeflerinin önüne geçiyor. Hedefini gün içinde görünür kılmak bu dengeyi kurmana yardım eder.",
        danisman: "Odak: hazcı şimdi yönelimi ve haz erteleme. Ödül planlaması (önce çalışma sonra ödül), uyaran kontrolü, hedefin görselleştirilmesi." },
      { kod: "kader", ad: "Kadercilik",
        not: "Sonucun büyük ölçüde senin dışında belirlendiğini düşünüyorsun. Neyin kontrolünde olduğunu ayırt etmek emeğinin anlamını geri kazandırır.",
        danisman: "Odak: kaderci şimdi yönelimi ve dış kontrol odağı. Kontrol çemberi çalışması, kontrol edilebilir davranışlara odaklanma, çaba-sonuç kanıtları." },
      { kod: "gelecek", ad: "Gelecek odağı",
        not: "Bugünkü çalışmanı gelecekteki hedeflerinle ilişkilendirmekte zorlanıyorsun. Ara hedefler koymak geleceği bugüne yaklaştırır.",
        danisman: "Odak: gelecek yönelimi. Hedef belirleme, geleceğe yönelik imgeleme (“mümkün benlik”), aylık ve haftalık ara hedefler. Son testte bu alandaki düşüş gelecek odaklılığın arttığını gösterir." }
    ],
    maddeler: [
      { alan: "gecmis",  metin: "Geçmiş sınavlardaki ya da önceki yıllardaki hatalarımı sık sık düşünürüm." },
      { alan: "anlik",   metin: "Çalışmam gerekirken o an daha keyifli gelen şeyi yaparım." },
      { alan: "kader",   metin: "Sınavda ne olacağı büyük ölçüde şansa bağlıdır, benim çok etkim yok." },
      { alan: "gelecek", metin: "Bugün yaptığım çalışmanın gelecekteki hayatımı nasıl etkileyeceğini düşünürüm.", ters: true },
      { alan: "gecmis",  metin: "Geçmişte kaçırdığım fırsatlar aklıma geldikçe moralim bozulur." },
      { alan: "anlik",   metin: "Uzun vadeli hedeflerim, o anki isteklerimin önüne pek geçemez." },
      { alan: "kader",   metin: "Ne kadar plan yaparsam yapayım işlerin yine bildiği gibi gideceğini düşünürüm." },
      { alan: "gelecek", metin: "Önümdeki ayları düşünerek kendime ara hedefler koyarım.", ters: true },
      { alan: "gecmis",  metin: "Geçmişteki başarısızlıklarımdan ders çıkarıp ilerleyebilirim.", ters: true },
      { alan: "anlik",   metin: "Anlık eğlenceleri, hedeflerim için gerektiğinde erteleyebilirim.", ters: true },
      { alan: "kader",   metin: "Kaderimde ne varsa o olacağı için fazla zorlamanın anlamı olmadığını düşünürüm." },
      { alan: "gelecek", metin: "Birkaç yıl sonra nerede olmak istediğimi kabaca hayal edebilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Zaman algın hedeflerini destekliyor",
        yorum: "Yanıtların, geçmişten ders çıkarabildiğini, anlık istekleri yönetebildiğini ve geleceği düşünerek hareket ettiğini gösteriyor. Bu denge uzun hazırlık süreçlerinde büyük avantaj.",
        oneri: "Hedeflediğin bölümü ve şehri gün içinde göreceğin bir yere yaz. Geleceği görünür tutmak bu dengeyi korumana yardım eder." },
      { min: 29, max: 44, etiket: "Zaman algın bazen hedeflerinden uzaklaştırıyor",
        yorum: "Yanıtların, bazı durumlarda geçmişe, anlık isteklere ya da şansa takıldığını gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Her pazartesi bu hafta için tek bir ara hedef yaz ve cuma günü ne kadarını yaptığına bak. Kısa vadeli hedefler, uzak geleceği bugüne bağlar." },
      { min: 45, max: 60, etiket: "Zaman algın şu an hedeflerinin önünde duruyor",
        yorum: "Yanıtların, zihninin şu an büyük ölçüde geçmişte, anlık isteklerde ya da kaderci düşüncelerde olduğunu gösteriyor. Zaman algısı değiştirilebilir bir alışkanlıktır.",
        oneri: "Bir kağıda “kontrolümde olanlar” ve “kontrolümde olmayanlar” diye iki sütun aç ve sınav sürecini bu iki sütuna dağıt. Enerjini yalnızca ilk sütuna yönelt." }
    ]
  },

  /* ================= PSİKOLOJİK DAYANIKLILIK (Kısa Psikolojik Sağlamlık Ölçeği'nden esinlenildi) ================= */
  {
    slug: "dayaniklilik", kod: "PD", surum: 1,
    baslik: "Psikolojik Dayanıklılık",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Zorluklardan sonra ne kadar çabuk toparlandığını, uyum sağlayabildiğini ve duygularını yönetebildiğini gör.",
    sure: "3 dakika",
    amac: { on: "Psikolojik dayanıklılık düzeyini ölçmek.", son: "Psikolojik sağlamlıktaki artışı görmek." },
    giris: "Aşağıdaki 12 ifade, zorluklar ve aksilikler karşısında nasıl tepki verdiğini anlatıyor. Her birinin sana ne kadar uyduğunu işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_UYUM,
    alanlar: [
      { kod: "toparlanma", ad: "Toparlanma hızı",
        not: "Kötü bir deneyimden sonra toparlanman uzun sürüyor. Aksiliklerden sonra küçük ve rutin bir adıma dönmek toparlanmayı hızlandırır.",
        danisman: "Odak: geri sıçrama. Başarısızlık sonrası rutin (deneme sonrası protokol), ruminasyonun sınırlandırılması, geçmişte atlatılan zorlukların hatırlanması." },
      { kod: "esneklik", ad: "Uyum ve esneklik",
        not: "Planlar bozulduğunda yeni duruma uyum sağlamakta zorlanıyorsun. B planı hazırlamak beklenmedik durumların etkisini azaltır.",
        danisman: "Odak: bilişsel esneklik ve problem çözme. Alternatif plan üretme, belirsizliğe tahammül, problem çözme basamakları." },
      { kod: "duygu", ad: "Duygu düzenleme ve destek",
        not: "Olumsuz duygular seni çalışamayacak kadar etkiliyor. Duygunu adlandırmak ve güvendiğin biriyle paylaşmak yoğunluğunu azaltır.",
        danisman: "Odak: duygu düzenleme ve sosyal destek. Duyguların adlandırılması, sakinleşme becerileri, destek ağının haritalanması, olumlu iç konuşma." }
    ],
    maddeler: [
      { alan: "toparlanma", metin: "Kötü geçen bir denemeden sonra kısa sürede kendime gelirim.", ters: true },
      { alan: "esneklik",   metin: "Beklemediğim bir değişiklik olduğunda ne yapacağımı bilemem." },
      { alan: "duygu",      metin: "Üzüldüğümde ya da sinirlendiğimde kendimi sakinleştirmenin yollarını bilirim.", ters: true },
      { alan: "toparlanma", metin: "Bir hayal kırıklığının etkisinden çıkmam günler sürer." },
      { alan: "esneklik",   metin: "Planım bozulduğunda yeni bir plan yapıp devam edebilirim.", ters: true },
      { alan: "duygu",      metin: "Olumsuz duygular beni o kadar sarar ki çalışamam." },
      { alan: "toparlanma", metin: "Zor bir dönemi atlattıktan sonra eski düzenime dönebilirim.", ters: true },
      { alan: "esneklik",   metin: "İşler istediğim gibi gitmediğinde her şeyi bırakmak isterim." },
      { alan: "duygu",      metin: "Zorlandığımda güvendiğim birinden destek isteyebilirim.", ters: true },
      { alan: "toparlanma", metin: "Küçük bir aksilik bile bütün günümü bozar." },
      { alan: "esneklik",   metin: "Zor durumlarda farklı çözüm yolları arayabilirim.", ters: true },
      { alan: "duygu",      metin: "Stresli dönemlerde kendime “bunu da atlatabilirim” diyebilirim.", ters: true }
    ],
    sonuclar: [
      { min: 12, max: 28, etiket: "Dayanıklılığın güçlü",
        yorum: "Yanıtların, zorluklardan sonra toparlanabildiğini, değişen koşullara uyum sağlayabildiğini ve duygularını yönetebildiğini gösteriyor. Bu güç, sınav sürecinin inişli çıkışlı doğasında seni korur.",
        oneri: "Geçmişte atlattığın zor bir dönemi ve o dönemde sana neyin iyi geldiğini yaz. Bu liste, ileride zorlandığında hazır bir kaynak olur." },
      { min: 29, max: 44, etiket: "Dayanıklılığın bazı durumlarda zorlanıyor",
        yorum: "Yanıtların, bazı aksiliklerden sonra toparlanmakta ya da duygularını yönetmekte zorlandığını gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin.",
        oneri: "Kötü geçen bir denemeden sonra uygulayacağın üç adımlık bir rutin belirle; örneğin “10 dakika yürü, 3 hatayı not et, yarının ilk işini yaz”. Hazır rutin toparlanmayı hızlandırır." },
      { min: 45, max: 60, etiket: "Zorluklar şu an seni çok yıpratıyor",
        yorum: "Yanıtların, şu an aksiliklerden sonra toparlanmakta ve duygularını yönetmekte belirgin biçimde zorlandığını gösteriyor. Dayanıklılık doğuştan gelen bir özellik değil, geliştirilebilen bir beceridir.",
        oneri: "Bu hafta zorlandığında yalnız kalmak yerine güvendiğin biriyle konuş. Duyguyu paylaşmak, dayanıklılığı artıran en güçlü etkenlerden biridir." }
    ]
  },

  /* ================= ZAMAN YÖNETİMİ (Zaman Yönetimi Envanteri - TMQ'dan esinlenildi) ================= */
  {
    slug: "zaman-yonetimi", kod: "ZY", surum: 1,
    baslik: "Zaman Yönetimi",
    altBaslik: "BDT temelli kendini değerlendirme formu",
    kisaAciklama: "Planlamada mı, uzun vadeli takvimde mi, kontrol hissinde mi yoksa zaman kaçaklarında mı zorlandığını gör.",
    sure: "3 dakika",
    amac: { on: "Zaman yönetimi becerilerini ve zorlanılan alanı belirlemek.", son: "Planlama ve zaman kontrolündeki gelişimi görmek." },
    giris: "Aşağıdaki 12 ifade, YKS'ye hazırlanırken zamanını nasıl kullandığını anlatıyor. Her birini son iki haftada ne sıklıkla yaşadığını işaretle. Doğru ya da yanlış yanıt yok.",
    secenekler: SECENEKLER_SIKLIK,
    alanlar: [
      { kod: "gunluk", ad: "Günlük ve haftalık plan",
        not: "En çok, günü ve haftayı planlamakta zorlanıyorsun. Planın yokken her gün neye çalışacağına yeniden karar vermek hem zaman hem enerji götürür; kısa ve gerçekçi bir planla bu yük hafifler.",
        danisman: "Odak: kısa vadeli planlama. Akşam beş dakikalık plan rutini, “en önemli üç iş” listesi, gerçekçi süre tahmini." },
      { kod: "uzun", ad: "Uzun vadeli takvim",
        not: "En çok, sınava kalan süreyi bütün olarak görmekte zorlanıyorsun. Konuları aylara yaymak ve tekrar haftalarını önceden belirlemek, “yetişmeyecek” kaygısını somut bir yol haritasına çevirir.",
        danisman: "Odak: uzun vadeli planlama. Konuların aylara yayılması, deneme ve tekrar takvimi, geriye doğru planlama." },
      { kod: "kontrol", ad: "Zamana hâkimiyet hissi",
        not: "En çok, zamanın elinden kayıp gittiği hissini yaşıyorsun. Bu his çoğu zaman zamanın nereye gittiğini görmemekten gelir; birkaç gün zaman kaydı tutmak kontrol duygusunu geri kazandırır.",
        danisman: "Odak: zamana yönelik tutum ve kontrol algısı. Birkaç günlük zaman kaydı, “zaman yetmeyecek” düşüncesinin kanıt sorgusu, küçük başarıların görünür kılınması." },
      { kod: "kacak", ad: "Zaman kaçakları",
        not: "En çok, telefon ve küçük işler çalışma saatini bölüyor. İrade gücüne güvenmek yerine ortamı düzenlemek (telefonu başka odaya koymak, bildirimleri kapatmak) daha işe yarar bir yöntemdir.",
        danisman: "Odak: zaman kaçakları. Uyaran kontrolü (telefon, bildirim), mola süresinin sınırlandırılması, görev geçişlerinin azaltılması." }
    ],
    maddeler: [
      { alan: "gunluk",  metin: "Güne, o gün hangi derslerden ne kadar çalışacağımı bilmeden başlarım." },
      { alan: "uzun",    metin: "YKS'ye kalan sürede hangi konuları hangi ayda bitirmem gerektiğine dair bir planım yok." },
      { alan: "kontrol", metin: "Günün sonunda zamanımın nereye gittiğini tam olarak açıklayamam." },
      { alan: "kacak",   metin: "Mola diye başladığım telefon, dizi ya da sohbet planladığımdan çok daha uzun sürer." },
      { alan: "gunluk",  metin: "Her akşam ertesi günün çalışma planını kabaca belirlerim.", ters: true },
      { alan: "uzun",    metin: "Deneme tarihlerini ve tekrar haftalarını önceden takvimime işlerim.", ters: true },
      { alan: "kontrol", metin: "Zamanımın kontrolünün bende olduğunu hissederim.", ters: true },
      { alan: "kacak",   metin: "Çalışırken bildirimleri kapatır ya da telefonu başka bir odaya koyarım.", ters: true },
      { alan: "gunluk",  metin: "Haftalık programım ya hiç yoktur ya da yazdığım program birkaç gün içinde geçerliliğini yitirir." },
      { alan: "uzun",    metin: "Konu eksiklerimin toplamda ne kadar zaman alacağını kestiremem." },
      { alan: "kontrol", metin: "Yetiştirmem gerekenler aklıma geldikçe “zaman yetmeyecek” duygusuna kapılırım." },
      { alan: "kacak",   metin: "Mesajlar, masa düzenleme ya da plansız işler gibi küçük şeyler çalışma saatimi parça parça böler." }
    ],
    /* Puan aralıkları: 12 madde x (1-5) = en az 12, en çok 60. Ters maddeler otomatik çevrilir. */
    sonuclar: [
      {
        min: 12, max: 28,
        etiket: "Zamanını büyük ölçüde sen yönetiyorsun",
        yorum: "Yanıtların, planlama alışkanlıklarının oturduğunu ve zamanının çoğunu bilinçli kullandığını gösteriyor. Uzun ve yorucu bir hazırlık döneminde bu düzeni korumak en az kurmak kadar önemli.",
        oneri: "Haftada bir, örneğin pazar akşamı, on dakikanı ayır ve geçen haftanın planına ne kadar uyduğuna bak. Küçük sapmaları erken fark etmek düzenini korumanı kolaylaştırır."
      },
      {
        min: 29, max: 44,
        etiket: "Zaman yönetiminde bazı boşluklar var",
        yorum: "Yanıtların, bazı alanlarda planlı ilerlediğini ama zaman zaman günün ya da haftanın elinden kaydığını gösteriyor. Hangi alanın öne çıktığını aşağıda görebilirsin; çözüm genellikle her şeyi değiştirmek değil, o tek alanı düzeltmektir.",
        oneri: "Her akşam beş dakikada ertesi gün için yalnızca en önemli üç işi yaz. Uzun ve kusursuz bir program yerine kısa ve uygulanabilir bir liste daha sürdürülebilirdir."
      },
      {
        min: 45, max: 60,
        etiket: "Zaman yönetimi şu an hazırlığını zorluyor",
        yorum: "Yanıtların, zamanın şu an büyük ölçüde senin kontrolünün dışında aktığını gösteriyor. Bu bir disiplin eksikliği değil; zaman yönetimi öğrenilebilen bir beceridir ve genellikle zamanın nereye gittiğini görmekle başlar.",
        oneri: "Bir gün boyunca yarım saatlik dilimler halinde ne yaptığını not et; yargılamadan, sadece yaz. Gün sonunda bu tabloya bakmak, nereden başlaman gerektiğini çoğu zaman kendiliğinden gösterir."
      }
    ]
  }

  /* YENİ FORM EKLEMEK İÇİN: YENI-FORM-EKLEME.md dosyasına bakın.
     Her formun "kod" alanı benzersiz olmalı; maddeleri değiştirirseniz "surum" sayısını bir artırın. */
];
