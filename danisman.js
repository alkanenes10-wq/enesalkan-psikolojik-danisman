/* Danışman değerlendirme ekranı: sonuç kodlarını çözer, alan profilini ve ön/son test karşılaştırmasını gösterir. */
(function () {
  var F = window.FORMLAR || [];
  function $(id) { return document.getElementById(id); }
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function f2(x) { return x.toFixed(2).replace(".", ","); }
  function yuzde(a, f) { return Math.round(((a - 1) / (f.secenekler.length - 1)) * 100); }

  // Form tablosu
  (function () {
    var t = el("table", "r-tablo"), h = el("tr");
    ["Kod", "Form", "Ön test amacı", "Son test amacı"].forEach(function (x) { h.appendChild(el("th", null, x)); });
    t.appendChild(h);
    F.forEach(function (f) {
      var r = el("tr");
      r.appendChild(el("td", null, f.kod + (f.surum || 1)));
      r.appendChild(el("td", null, f.baslik));
      r.appendChild(el("td", null, f.amac ? f.amac.on : ""));
      r.appendChild(el("td", null, f.amac ? f.amac.son : ""));
      t.appendChild(r);
    });
    $("form-tablosu").appendChild(t);
  })();

  function degisim(d) {
    if (d <= -0.5) return ["Belirgin iyileşme", "iyi"];
    if (d <= -0.2) return ["Hafif iyileşme", "iyi"];
    if (d < 0.2) return ["Belirgin değişim yok", "notr"];
    if (d < 0.5) return ["Hafif artış", "kotu"];
    return ["Belirgin artış, dikkat", "kotu"];
  }

  function rapor(on, son, ogrenci) {
    var f = on.form, P = SonucKodu.puanla(f, on.yanitlar), S = son ? SonucKodu.puanla(f, son.yanitlar) : null;
    var kok = $("rapor"); kok.innerHTML = "";
    var p = el("div", "panel");

    var bas = el("div", "r-bas"), sol = el("div");
    sol.appendChild(el("h2", null, f.baslik + (S ? " · Ön test ve son test" : " · Değerlendirme")));
    sol.appendChild(el("div", "r-kod", (ogrenci ? "Öğrenci: " + ogrenci + " · " : "") + "Ön test: " + on.kod + (son ? " · Son test: " + son.kod : "")));
    bas.appendChild(sol);
    bas.appendChild(el("div", "r-kod", new Date().toLocaleDateString("tr-TR")));
    p.appendChild(bas);

    if (f.amac) {
      var am = el("div", "amac");
      var a1 = el("div"); a1.appendChild(el("b", null, "Ön test amacı")); a1.appendChild(document.createTextNode(f.amac.on)); am.appendChild(a1);
      var a2 = el("div"); a2.appendChild(el("b", null, "Son test amacı")); a2.appendChild(document.createTextNode(f.amac.son)); am.appendChild(a2);
      p.appendChild(am);
    }

    // Özet
    var oz = el("div", "ozet");
    function kart(baslik, deger, alt) { var d = el("div"); d.appendChild(el("small", null, baslik)); d.appendChild(el("b", null, deger)); d.appendChild(el("span", null, alt)); oz.appendChild(d); }
    kart(S ? "Ön test toplam" : "Toplam puan", P.toplam + " / " + P.enCok, P.bant.etiket);
    if (S) {
      kart("Son test toplam", S.toplam + " / " + S.enCok, S.bant.etiket);
      var fark = S.toplam - P.toplam, aralik = P.enCok - P.enAz;
      kart("Değişim", (fark > 0 ? "+" : "") + fark + " puan", (fark <= 0 ? "Zorlanmada %" + Math.round(-fark / aralik * 100) + " azalma" : "Zorlanmada %" + Math.round(fark / aralik * 100) + " artış"));
    }
    var enCokZor = P.alanlar.filter(function (a) { return a.duzey === "Yüksek"; }).length;
    kart("Yüksek zorlanma alanı", String(S ? S.alanlar.filter(function (a) { return a.duzey === "Yüksek"; }).length : enCokZor), S ? "son testte (ön testte " + enCokZor + ")" : P.alanlar.length + " alandan");
    p.appendChild(oz);

    // Öncelikli alan
    var guncel = S || P;
    var sirali = guncel.alanlar.slice().sort(function (x, y) { return y.ort - x.ort; });
    var on1 = sirali[0];
    if (on1) {
      var o = el("div", "oncelik");
      o.appendChild(el("small", null, (S ? "Son teste göre " : "") + "öncelikli çalışma alanı"));
      o.appendChild(el("h3", null, on1.alan.ad + " · ortalama " + f2(on1.ort) + " (" + on1.duzey.toLowerCase() + ")"));
      o.appendChild(el("p", null, on1.alan.danisman || on1.alan.not));
      p.appendChild(o);
      if (sirali[1] && sirali[1].ort >= 3) {
        var o2 = el("div", "oncelik");
        o2.appendChild(el("small", null, "İkinci alan"));
        o2.appendChild(el("h3", null, sirali[1].alan.ad + " · ortalama " + f2(sirali[1].ort) + " (" + sirali[1].duzey.toLowerCase() + ")"));
        o2.appendChild(el("p", null, sirali[1].alan.danisman || sirali[1].alan.not));
        p.appendChild(o2);
      }
    }

    // Alan profili
    var b1 = el("div", "r-blok");
    b1.appendChild(el("h3", null, "Alan profili (1 = hiç zorlanmıyor, 5 = çok zorlanıyor)"));
    var t = el("table", "r-tablo"), h = el("tr");
    (S ? ["Alan", "Ön test", "", "Son test", "Değişim"] : ["Alan", "Ortalama", "", "Düzey", "Maddeler"]).forEach(function (x) { h.appendChild(el("th", null, x)); });
    t.appendChild(h);
    P.alanlar.slice().sort(function (x, y) { return y.ort - x.ort; }).forEach(function (a) {
      var r = el("tr");
      r.appendChild(el("td", null, a.alan.ad));
      var c1 = el("td"); c1.appendChild(document.createTextNode(f2(a.ort) + " ")); c1.appendChild(el("span", "cip " + a.duzey, a.duzey)); r.appendChild(c1);
      var cb = el("td"), bar = el("div", "cubuk"), i1 = el("i"); i1.style.width = yuzde(a.ort, f) + "%"; bar.appendChild(i1);
      var sa = S ? S.alanlar.filter(function (x) { return x.alan.kod === a.alan.kod; })[0] : null;
      if (sa) { var i2 = el("i", "son"); i2.style.width = yuzde(sa.ort, f) + "%"; bar.appendChild(i2); }
      cb.appendChild(bar); r.appendChild(cb);
      if (sa) {
        var c3 = el("td"); c3.appendChild(document.createTextNode(f2(sa.ort) + " ")); c3.appendChild(el("span", "cip " + sa.duzey, sa.duzey)); r.appendChild(c3);
        var dg = degisim(sa.ort - a.ort), c4 = el("td");
        c4.appendChild(document.createTextNode((sa.ort - a.ort > 0 ? "+" : "") + f2(sa.ort - a.ort) + " ")); c4.appendChild(el("span", "cip " + dg[1], dg[0])); r.appendChild(c4);
      } else {
        var c5 = el("td"); c5.appendChild(el("span", "cip " + a.duzey, a.duzey)); r.appendChild(c5);
        r.appendChild(el("td", null, a.maddeler.map(function (i) { return i + 1; }).join(", ")));
      }
      t.appendChild(r);
    });
    b1.appendChild(t);
    if (S) b1.appendChild(el("p", "soluk", "Çubukta koyu renk ön testi, ince açık renk son testi gösterir. Puanlar zorlanma yönündedir; düşüş iyileşme anlamına gelir."));
    p.appendChild(b1);

    // Dikkat gerektiren yanıtlar
    var b2 = el("div", "r-blok");
    b2.appendChild(el("h3", null, (S ? "Son testte " : "") + "dikkat gerektiren yanıtlar (zorlanma puanı 4 ve 5)"));
    var lst = el("div", "madde-liste"), sayac = 0, kaynak = S ? son : on;
    guncel.maddePuan.forEach(function (mp, i) {
      if (mp < 4) return;
      sayac++;
      var m = f.maddeler[i], al = (f.alanlar || []).filter(function (a) { return a.kod === m.alan; })[0];
      var d = el("div");
      d.appendChild(document.createTextNode((i + 1) + ". " + m.metin));
      d.appendChild(el("em", null, "Yanıt: " + f.secenekler[kaynak.yanitlar[i] - 1] + (m.ters ? " (olumlu ifade, ters puanlandı)" : "") + (al ? " · Alan: " + al.ad : "")));
      lst.appendChild(d);
    });
    if (!sayac) lst.appendChild(el("div", null, "Zorlanma puanı 4 ya da 5 olan madde yok."));
    b2.appendChild(lst);
    p.appendChild(b2);

    // Madde düzeyinde en çok değişenler
    if (S) {
      var b3 = el("div", "r-blok");
      b3.appendChild(el("h3", null, "Madde düzeyinde en çok değişenler"));
      var farklar = P.maddePuan.map(function (x, i) { return { i: i, d: S.maddePuan[i] - x }; }).filter(function (x) { return x.d !== 0; })
        .sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); }).slice(0, 5);
      var l2 = el("div", "madde-liste");
      farklar.forEach(function (x) {
        var d = el("div");
        d.appendChild(document.createTextNode((x.i + 1) + ". " + f.maddeler[x.i].metin));
        d.appendChild(el("em", null, "Zorlanma puanı " + P.maddePuan[x.i] + " → " + S.maddePuan[x.i] + (x.d < 0 ? " (iyileşme)" : " (artış)")));
        l2.appendChild(d);
      });
      if (!farklar.length) l2.appendChild(el("div", null, "Hiçbir maddede değişim yok."));
      b3.appendChild(l2);
      p.appendChild(b3);
    }

    // Öğrencinin gördüğü metin
    var b4 = el("div", "r-blok");
    b4.appendChild(el("h3", null, "Öğrencinin ekranında gördüğü sonuç" + (S ? " (son test)" : "")));
    var om = el("div", "ogr-metin");
    om.appendChild(el("b", null, guncel.bant.etiket));
    om.appendChild(el("p", null, guncel.bant.yorum));
    b4.appendChild(om);
    p.appendChild(b4);

    p.appendChild(el("p", "uyari", "Bu formlar, bilinen ölçeklerden esinlenerek hazırlanmış kendini değerlendirme araçlarıdır; geçerlik ve güvenirlik çalışması yapılmamıştır ve tanı koymaz. Düzey eşikleri (ortalama 2,34 ve 3,67) ile değişim eşikleri (0,2 ve 0,5) uzlaşımsal değerlerdir; sonuçlar görüşmede birlikte değerlendirilmelidir."));
    kok.appendChild(p);
    $("yazdir").hidden = false;
    kok.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("kod-formu").addEventListener("submit", function (e) {
    e.preventDefault();
    var hata = $("hata"); hata.hidden = true;
    var on = SonucKodu.coz($("on").value, F);
    if (on.hata) { hata.textContent = "Ön test: " + on.hata; hata.hidden = false; return; }
    var son = null;
    if ($("son").value.trim()) {
      son = SonucKodu.coz($("son").value, F);
      if (son.hata) { hata.textContent = "Son test: " + son.hata; hata.hidden = false; return; }
      if (son.form !== on.form) { hata.textContent = "Ön test ve son test kodları farklı formlara ait (" + on.form.baslik + " / " + son.form.baslik + ")."; hata.hidden = false; return; }
    }
    rapor(on, son, $("ogrenci").value.trim());
  });
  $("yazdir").addEventListener("click", function () { window.print(); });
})();
