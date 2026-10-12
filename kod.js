/* Sonuç kodu: öğrencinin yanıtlarını kısa bir metne çevirir ve geri çözer.
   Biçim: <form kodu><sürüm>-<yanıtlar>-<kontrol>   örnek: SK2-421354213542-37
   Hiçbir yere gönderilmez; öğrenci isterse kodu danışmanına kendisi iletir. */
window.SonucKodu = (function () {
  function kontrol(kod, yanitlar) {
    var t = 0;
    for (var i = 0; i < kod.length; i++) t += kod.charCodeAt(i) * (i + 3);
    yanitlar.forEach(function (y, i) { t += y * (i + 7) * (i % 3 + 1); });
    return ("0" + (t % 97)).slice(-2);
  }
  function uret(form, yanitlar) {
    var on = form.kod + (form.surum || 1);
    return on + "-" + yanitlar.join("") + "-" + kontrol(on, yanitlar);
  }
  function coz(metin, formlar) {
    var m = String(metin || "").toUpperCase().replace(/\s+/g, "").match(/^([A-Z]{2})(\d+)-([1-9]+)-(\d{2})$/);
    if (!m) return { hata: "Kod biçimi tanınmadı. Örnek: SK2-421354213542-37" };
    var form = (formlar || window.FORMLAR || []).filter(function (f) { return f.kod === m[1]; })[0];
    if (!form) return { hata: "Bu koda ait bir form bulunamadı (" + m[1] + ")." };
    if (String(form.surum || 1) !== m[2]) return { hata: "Bu kod formun eski bir sürümüne ait (sürüm " + m[2] + ", güncel sürüm " + (form.surum || 1) + "). Maddeler değiştiği için güvenilir biçimde çözülemez." };
    var yan = m[3].split("").map(Number);
    if (yan.length !== form.maddeler.length) return { hata: "Yanıt sayısı formdaki madde sayısıyla uyuşmuyor." };
    if (yan.some(function (y) { return y < 1 || y > form.secenekler.length; })) return { hata: "Kodda geçersiz bir yanıt değeri var." };
    if (kontrol(m[1] + m[2], yan) !== m[4]) return { hata: "Kontrol hanesi tutmuyor; kod eksik ya da hatalı kopyalanmış olabilir." };
    return { form: form, yanitlar: yan, kod: m[0] };
  }
  /* Puanlama: ters maddeler çevrilir; tüm puanlar "zorlanma" yönündedir (yüksek = daha çok zorlanma). */
  function puanla(form, yanitlar) {
    var n = form.secenekler.length;
    var maddePuan = yanitlar.map(function (y, i) { return form.maddeler[i].ters ? (n + 1 - y) : y; });
    var toplam = maddePuan.reduce(function (a, b) { return a + b; }, 0);
    var bant = form.sonuclar.filter(function (s) { return toplam >= s.min && toplam <= s.max; })[0] || form.sonuclar[form.sonuclar.length - 1];
    var alanlar = (form.alanlar || []).map(function (a) {
      var p = [], idx = [];
      form.maddeler.forEach(function (m, i) { if (m.alan === a.kod) { p.push(maddePuan[i]); idx.push(i); } });
      var t = p.reduce(function (x, y) { return x + y; }, 0);
      var ort = p.length ? t / p.length : 0;
      return { alan: a, toplam: t, en: p.length, ec: p.length * n, ort: ort, maddeler: idx,
               duzey: ort >= 3.67 ? "Yüksek" : ort >= 2.34 ? "Orta" : "Düşük" };
    });
    return { maddePuan: maddePuan, toplam: toplam, enAz: form.maddeler.length, enCok: form.maddeler.length * n, bant: bant, alanlar: alanlar };
  }
  return { uret: uret, coz: coz, puanla: puanla };
})();
