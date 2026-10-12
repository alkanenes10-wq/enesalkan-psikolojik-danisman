/* Form sayfasının çalışma mantığı.
   Hesaplama tamamen tarayıcıda yapılır; hiçbir yanıt kaydedilmez ya da gönderilmez. */
(function () {
  var site = window.SITE || {};
  var formlar = window.FORMLAR || [];
  var kok = document.getElementById("form-kok");

  function el(etiket, sinif, metin) {
    var e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin != null) e.textContent = metin;
    return e;
  }
  function slugBul() {
    if (window.ONIZLEME_SLUG) return window.ONIZLEME_SLUG;
    var q = new URLSearchParams(location.search).get("f");
    if (q) return q.toLowerCase();
    var parca = location.pathname.split("/").filter(Boolean).pop() || "";
    return decodeURIComponent(parca).replace(/\.html$/, "").toLowerCase();
  }
  function dmAdresi() { return "https://ig.me/m/" + site.instagram; }
  function temizle() { kok.innerHTML = ""; window.scrollTo(0, 0); }

  var form = formlar.filter(function (f) { return f.slug === slugBul(); })[0];

  if (!form) { bulunamadi(); return; }

  document.title = form.baslik + " | " + site.ad;
  var yanitlar = new Array(form.maddeler.length).fill(null);
  var enAz = form.maddeler.length;
  var enCok = form.maddeler.length * form.secenekler.length;
  giris();

  function bulunamadi() {
    var p = el("div", "panel");
    p.appendChild(el("h1", null, "Form bulunamadı"));
    p.appendChild(el("p", null, "Aradığın form taşınmış ya da adresi yanlış yazılmış olabilir. Mevcut formlar:"));
    var g = el("div", "secenekler");
    formlar.forEach(function (f) {
      var a = el("a", "secenek", f.baslik);
      a.href = "/" + f.slug;
      g.appendChild(a);
    });
    p.appendChild(g);
    kok.appendChild(p);
  }

  function giris() {
    temizle();
    var p = el("div", "panel");
    p.appendChild(el("span", "etiket", form.maddeler.length + " soru · " + form.sure));
    p.appendChild(el("h1", null, form.baslik));
    p.appendChild(el("div", "alt-baslik", form.altBaslik));
    p.appendChild(el("p", null, form.giris));
    p.appendChild(el("div", "not",
      "Bu form bir psikolojik test ya da tanı aracı değildir; kendi durumunu fark etmen için hazırlanmış bir değerlendirmedir. " +
      "Yanıtların kaydedilmez ve kimseyle paylaşılmaz; sonuç yalnızca senin ekranında hesaplanır."));
    var b = el("button", "dugme tam", "Başla");
    b.type = "button";
    b.onclick = function () { soru(0); };
    p.appendChild(b);
    kok.appendChild(p);
  }

  function soru(i) {
    temizle();
    var p = el("div", "panel");
    var cubuk = el("div", "ilerleme");
    var dolgu = el("i");
    dolgu.style.width = Math.round((i / form.maddeler.length) * 100) + "%";
    cubuk.appendChild(dolgu);
    p.appendChild(cubuk);
    p.appendChild(el("div", "sayac", "Soru " + (i + 1) + " / " + form.maddeler.length));
    p.appendChild(el("div", "soru", form.maddeler[i].metin));

    var g = el("div", "secenekler");
    form.secenekler.forEach(function (ad, k) {
      var b = el("button", "secenek" + (yanitlar[i] === k + 1 ? " secili" : ""));
      b.type = "button";
      b.appendChild(el("b", null, String(k + 1)));
      b.appendChild(el("span", null, ad));
      b.onclick = function () {
        yanitlar[i] = k + 1;
        Array.prototype.forEach.call(g.children, function (c) { c.classList.remove("secili"); });
        b.classList.add("secili");
        setTimeout(function () {
          if (i + 1 < form.maddeler.length) soru(i + 1); else sonuc();
        }, 180);
      };
      g.appendChild(b);
    });
    p.appendChild(g);

    var alt = el("div", "form-alt");
    var geri = el("button", "baglanti", i === 0 ? "Girişe dön" : "Önceki soru");
    geri.type = "button";
    geri.onclick = function () { if (i === 0) giris(); else soru(i - 1); };
    alt.appendChild(geri);
    p.appendChild(alt);
    kok.appendChild(p);
  }

  function puanHesapla() {
    var n = form.secenekler.length;
    return yanitlar.reduce(function (t, y, i) {
      return t + (form.maddeler[i].ters ? (n + 1 - y) : y);
    }, 0);
  }

  function sonuc() {
    temizle();
    var puan = puanHesapla();
    var s = form.sonuclar.filter(function (x) { return puan >= x.min && puan <= x.max; })[0]
      || form.sonuclar[form.sonuclar.length - 1];

    var p = el("div", "panel");
    p.appendChild(el("div", "sonuc-ust", form.baslik + " · Puanın: " + puan + " / " + enCok));
    p.appendChild(el("div", "sonuc-etiket", s.etiket));

    var olcek = el("div", "olcek");
    var nokta = el("i");
    nokta.style.left = Math.round(((puan - enAz) / (enCok - enAz)) * 100) + "%";
    olcek.appendChild(nokta);
    p.appendChild(olcek);
    var uc = el("div", "olcek-uc");
    uc.appendChild(el("span", null, "Düşük"));
    uc.appendChild(el("span", null, "Yüksek"));
    p.appendChild(uc);

    p.appendChild(el("p", null, s.yorum));
    var o = el("div", "oneri");
    o.appendChild(el("strong", null, "Bu hafta deneyebileceğin bir şey"));
    o.appendChild(el("span", null, s.oneri));
    p.appendChild(o);

    if (form.alanlar && form.alanlar.length) {
      var n = form.secenekler.length;
      var ort = form.alanlar.map(function (al) {
        var t = 0, k = 0;
        form.maddeler.forEach(function (m, i) {
          if (m.alan === al.kod) { t += m.ters ? (n + 1 - yanitlar[i]) : yanitlar[i]; k++; }
        });
        return { alan: al, deger: k ? t / k : 0 };
      });
      var kutu = el("div", "alanlar");
      kutu.appendChild(el("h2", null, "Alanlara göre zorlanma"));
      kutu.appendChild(el("p", "alan-aciklama", "Çubuk uzadıkça o alanda daha çok zorlanıyorsun."));
      ort.forEach(function (o) {
        var satir = el("div", "alan");
        satir.appendChild(el("span", "alan-ad", o.alan.ad));
        var cb = el("div", "alan-cubuk");
        var ci = el("i");
        ci.style.width = Math.round(((o.deger - 1) / (n - 1)) * 100) + "%";
        cb.appendChild(ci);
        satir.appendChild(cb);
        kutu.appendChild(satir);
      });
      var enYuksek = ort.slice().sort(function (x, y) { return y.deger - x.deger; })[0];
      if (enYuksek.deger >= 3 && enYuksek.alan.not) {
        var an = el("p", "alan-not");
        an.appendChild(el("strong", null, enYuksek.alan.ad + ": "));
        an.appendChild(document.createTextNode(enYuksek.alan.not));
        kutu.appendChild(an);
      }
      p.appendChild(kutu);
    }

    if (window.SonucKodu && form.kod) {
      var kodMetni = SonucKodu.uret(form, yanitlar);
      var kk = el("div", "kod-kutu");
      kk.appendChild(el("strong", null, "Sonuç kodun"));
      var satir2 = el("div", "kod-satir");
      var kodEl = el("code", null, kodMetni);
      satir2.appendChild(kodEl);
      var kb = el("button", "dugme ikincil kucuk", "Kopyala");
      kb.type = "button";
      kb.onclick = function () {
        function tamam() { kb.textContent = "Kopyalandı"; setTimeout(function () { kb.textContent = "Kopyala"; }, 1800); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(kodMetni).then(tamam, secip);
        else secip();
        function secip() { var r = document.createRange(); r.selectNodeContents(kodEl); var se = getSelection(); se.removeAllRanges(); se.addRange(r); kb.textContent = "Seçildi, kopyala"; }
      };
      satir2.appendChild(kb);
      kk.appendChild(satir2);
      kk.appendChild(el("p", null, "Ön görüşmede bu kodu bana gönderirsen yanıtlarını ayrıntılı değerlendirebilirim. Kod adını ya da kişisel bilgini içermez; yalnızca sen paylaşırsan bana ulaşır."));
      p.appendChild(kk);
    }

    var d = el("div", "davet");
    d.appendChild(el("h2", null, "Sonucunu birlikte konuşalım mı?"));
    var dp = el("p");
    dp.appendChild(document.createTextNode("İstersen 15 dakikalık ücretsiz bir ön görüşmede bu sonucun senin için ne anlama geldiğine bakalım. Instagram'dan bana "));
    dp.appendChild(el("span", "kelime", site.dmKelimesi));
    dp.appendChild(document.createTextNode(" yazman yeterli. 18 yaşından küçüksen görüşmeye velinle birlikte katılırsın."));
    d.appendChild(dp);
    var a = el("a", "dugme tam", "Instagram'dan yaz");
    a.href = dmAdresi();
    a.target = "_blank";
    a.rel = "noopener";
    d.appendChild(a);
    p.appendChild(d);

    p.appendChild(el("div", "not",
      "Bu sonuç bir tanı değildir. Kendini uzun süredir yoğun biçimde sıkıntılı, kaygılı ya da çaresiz hissediyorsan bir ruh sağlığı uzmanına başvurman önemlidir."));

    var alt = el("div", "form-alt");
    var yeniden = el("button", "baglanti", "Formu yeniden doldur");
    yeniden.type = "button";
    yeniden.onclick = function () { yanitlar.fill(null); giris(); };
    alt.appendChild(yeniden);
    var diger = el("a", "baglanti", "Diğer formlar");
    diger.href = "/#formlar";
    alt.appendChild(diger);
    p.appendChild(alt);
    kok.appendChild(p);
  }
})();
