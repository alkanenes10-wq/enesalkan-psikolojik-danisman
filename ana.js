/* Ana sayfa ve bilgilendirme sayfası: form listesini ve Instagram bağlantılarını doldurur. */
(function () {
  var site = window.SITE || {};
  var formlar = window.FORMLAR || [];
  var dm = "https://ig.me/m/" + site.instagram;

  document.querySelectorAll("[data-dm]").forEach(function (a) {
    a.href = dm; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-ig]").forEach(function (a) {
    a.href = "https://instagram.com/" + site.instagram;
    a.textContent = "@" + site.instagram;
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-kelime]").forEach(function (s) { s.textContent = site.dmKelimesi; });
  document.querySelectorAll("[data-yil]").forEach(function (s) { s.textContent = "© " + new Date().getFullYear(); });

  var liste = document.getElementById("form-listesi");
  if (!liste) return;
  liste.className = "sss form-akordeon";
  formlar.forEach(function (f, n) {
    var d = document.createElement("details");
    d.name = "form";
    if (n === 0) d.open = true;
    var su = document.createElement("summary");
    var ad = document.createElement("span"); ad.className = "f-ad"; ad.textContent = f.baslik;
    var bilgi = document.createElement("small"); bilgi.textContent = f.maddeler.length + " soru · " + f.sure;
    su.appendChild(ad); su.appendChild(bilgi);
    var ic = document.createElement("div"); ic.className = "f-ic";
    var p = document.createElement("p"); p.textContent = f.kisaAciklama;
    var a = document.createElement("a"); a.className = "dugme acik kucuk";
    a.href = (window.ONIZLEME ? "form.html?f=" : "/") + f.slug;
    a.textContent = "Forma başla →";
    ic.appendChild(p); ic.appendChild(a);
    d.appendChild(su); d.appendChild(ic);
    liste.appendChild(d);
  });
  // Aynı anda tek form açık kalsın (eski tarayıcılar için)
  liste.addEventListener("toggle", function (e) {
    if (!e.target.open) return;
    liste.querySelectorAll("details[open]").forEach(function (o) { if (o !== e.target) o.open = false; });
  }, true);
})();

/* Hikaye şeridi, eğitim/sertifika ve yorumlar: içerik formlar.js içindeki SITE ayarlarından gelir */
(function () {
  var site = window.SITE || {};
  var formlar = window.FORMLAR || [];
  function el(t, c, m) { var e = document.createElement(t); if (c) e.className = c; if (m != null) e.textContent = m; return e; }
  var IKON = {
    "erteleme": '<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9 3h6"/>',
    "sinav-kaygisi": '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    "akademik-oz-yeterlik": '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    "mukemmeliyetcilik": '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>',
    "aile-ve-cevre": '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M3 20c0-3.3 2.2-5.5 5-5.5s5 2.2 5 5.5M13.5 20c.2-2.6 1.4-4.2 3-4.2s3 1.6 3.3 4.2"/>',
    "meslek-karari": '<path d="M12 21V11M12 11l-6-4M12 11l6-4M6 7V3M18 7V3"/>',
    "tukenmislik": '<rect x="3" y="8" width="16" height="9" rx="2"/><path d="M22 11v3M6 11v3"/>',
    "zaman-algisi": '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
    "dayaniklilik": '<path d="M12 21s-7-4.4-7-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 16.6 12 21 12 21z"/>',
    "zaman-yonetimi": '<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/>'
  };
  var serit = document.getElementById("hikaye-seridi");
  if (serit) formlar.forEach(function (f) {
    var a = el("a", "hikaye");
    a.href = (window.ONIZLEME ? "form.html?f=" : "/") + f.slug;
    var halka = el("span", "h-halka");
    halka.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (IKON[f.slug] || '<circle cx="12" cy="12" r="7"/>') + '</svg>';
    a.appendChild(halka);
    a.appendChild(el("span", "h-ad", f.baslik));
    serit.appendChild(a);
  });

  var y = document.getElementById("yeterlik");
  if (y && ((site.egitim || []).length || (site.sertifikalar || []).length)) {
    [["Eğitim", site.egitim], ["Sertifikalar", site.sertifikalar]].forEach(function (g) {
      if (!g[1] || !g[1].length) return;
      var k = el("div", "y-grup");
      k.appendChild(el("h4", null, g[0]));
      var u = el("ul");
      g[1].forEach(function (m) { u.appendChild(el("li", null, m)); });
      k.appendChild(u);
      y.appendChild(k);
    });
  }

  var yb = document.getElementById("yorumlar"), yl = document.getElementById("yorum-listesi");
  if (yb && yl && (site.yorumlar || []).length) {
    site.yorumlar.forEach(function (r) {
      var f = el("figure", "yorum");
      f.appendChild(el("blockquote", null, r.metin));
      f.appendChild(el("figcaption", null, r.kim || ""));
      yl.appendChild(f);
    });
    yb.hidden = false;
  }
})();

/* Ön görüşme sihirbazı: birkaç soruyla öğrenciyi takvime ya da Instagram'a yönlendirir. Yanıtlar hiçbir yere gönderilmez. */
(function () {
  var site = window.SITE || {};
  var dugmeler = document.querySelectorAll("[data-planla]");
  if (!dugmeler.length) return;
  var dm = "https://ig.me/m/" + site.instagram;
  var KONULAR = ["Erteleme ve çalışma düzeni", "Sınav kaygısı", "Zaman yönetimi", "Bölüm ve meslek kararı", "Motivasyon ve tükenmişlik", "Başka bir konu"];
  var KIM = [
    { k: "buyuk", ad: "Kendim için, 18 yaş ve üstü" },
    { k: "kucuk", ad: "Kendim için, 18 yaşından küçük" },
    { k: "veli", ad: "Çocuğum için, veliyim" }
  ];
  var durum, kok, kutu, sonOdak;

  function el(t, c, m) { var e = document.createElement(t); if (c) e.className = c; if (m != null) e.textContent = m; return e; }

  function kur() {
    kok = el("div", "sihirbaz");
    kok.setAttribute("role", "dialog");
    kok.setAttribute("aria-modal", "true");
    kok.setAttribute("aria-label", "Ön görüşme planla");
    kok.hidden = true;
    var perde = el("div", "s-perde");
    perde.onclick = kapat;
    kutu = el("div", "s-kutu");
    kok.appendChild(perde); kok.appendChild(kutu);
    document.body.appendChild(kok);
    document.addEventListener("keydown", function (e) { if (!kok.hidden && e.key === "Escape") kapat(); });
  }

  function ac(kim) {
    if (!kok) kur();
    sonOdak = document.activeElement;
    durum = { adim: 0, konu: null, kim: kim || null, kod: "" };
    if (durum.kim) durum.adim = 0;
    kok.hidden = false;
    document.documentElement.classList.add("sihirbaz-acik");
    ciz();
  }
  function kapat() {
    kok.hidden = true;
    document.documentElement.classList.remove("sihirbaz-acik");
    if (sonOdak && sonOdak.focus) sonOdak.focus();
  }

  function ust(baslik, toplam) {
    var u = el("div", "s-ust");
    var ilerleme = el("div", "s-ilerleme");
    for (var i = 0; i < toplam; i++) ilerleme.appendChild(el("i", i <= durum.adim ? "dolu" : ""));
    u.appendChild(ilerleme);
    var x = el("button", "s-kapat", "×"); x.type = "button"; x.setAttribute("aria-label", "Kapat"); x.onclick = kapat;
    u.appendChild(x);
    kutu.appendChild(u);
    kutu.appendChild(el("h3", null, baslik));
  }
  function secenekler(liste, secili, sec) {
    var g = el("div", "s-secenekler");
    liste.forEach(function (o) {
      var b = el("button", "s-secenek" + (secili === o ? " secili" : ""), o.ad || o);
      b.type = "button";
      b.onclick = function () { sec(o); };
      g.appendChild(b);
    });
    kutu.appendChild(g);
  }
  function geri() {
    var b = el("button", "baglanti", "Geri"); b.type = "button";
    b.onclick = function () { durum.adim--; ciz(); };
    kutu.appendChild(b);
  }

  function mesaj() {
    var kim = KIM.filter(function (x) { return x.k === durum.kim; })[0];
    return site.dmKelimesi + "\nKonu: " + durum.konu + "\nKim için: " + (kim ? kim.ad : "") + (durum.kod ? "\nSonuç kodu: " + durum.kod : "");
  }

  function ciz() {
    kutu.innerHTML = "";
    if (durum.adim === 0) {
      ust("Hangi konuda destek istiyorsun?", 4);
      secenekler(KONULAR, durum.konu, function (o) { durum.konu = o; durum.adim = 1; ciz(); });
    } else if (durum.adim === 1) {
      ust("Görüşme kimin için?", 4);
      secenekler(KIM, KIM.filter(function (x) { return x.k === durum.kim; })[0], function (o) { durum.kim = o.k; durum.adim = 2; ciz(); });
      geri();
    } else if (durum.adim === 2) {
      ust("Formlardan birini doldurdun mu?", 4);
      kutu.appendChild(el("p", "s-not", "Doldurduysan sonuç ekranındaki kodu buraya yapıştır; ön görüşmede sonucuna birlikte bakarız. Doldurmadıysan boş bırakabilirsin."));
      var g = el("input", "s-girdi"); g.type = "text"; g.placeholder = "Örnek: ER2-345434543454-77"; g.value = durum.kod; g.autocomplete = "off";
      kutu.appendChild(g);
      var d = el("button", "dugme tam", "Devam"); d.type = "button";
      d.onclick = function () { durum.kod = g.value.trim().toUpperCase().slice(0, 40); durum.adim = 3; ciz(); };
      g.addEventListener("keydown", function (e) { if (e.key === "Enter") d.click(); });
      kutu.appendChild(d);
      geri();
      setTimeout(function () { g.focus(); }, 30);
    } else {
      var kucuk = durum.kim !== "buyuk";
      var takvim = !kucuk && site.randevu;
      ust(takvim ? "Takvimden sana uyan saati seç" : "Bana Instagram'dan yaz", 4);
      kutu.appendChild(el("p", "s-not", takvim
        ? "15 dakikalık ön görüşme ücretsizdir ve Google Meet üzerinden yapılır. Randevu notuna aşağıdaki mesajı ekleyebilirsin."
        : kucuk
          ? "18 yaş altındaki öğrencilerle ön görüşmeyi velinin bilgisi ve onayıyla planlıyorum. Aşağıdaki mesajı kopyalayıp Instagram'dan gönder; saati birlikte belirleyelim."
          : "Aşağıdaki mesajı kopyalayıp Instagram'dan gönder; ön görüşme saatini birlikte belirleyelim."));
      var m = mesaj();
      var pre = el("pre", "s-mesaj", m);
      kutu.appendChild(pre);
      var kop = el("button", "dugme ikincil tam", "Mesajı kopyala"); kop.type = "button";
      kop.onclick = function () {
        function tamam() { kop.textContent = "Kopyalandı"; setTimeout(function () { kop.textContent = "Mesajı kopyala"; }, 1800); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(m).then(tamam, secip); else secip();
        function secip() { var r = document.createRange(); r.selectNodeContents(pre); var se = getSelection(); se.removeAllRanges(); se.addRange(r); kop.textContent = "Seçildi, kopyala"; }
      };
      var git = el("a", "dugme tam", takvim ? "Takvimi aç" : "Instagram'dan yaz");
      git.href = takvim ? site.randevu : dm; git.target = "_blank"; git.rel = "noopener";
      kutu.appendChild(git);
      kutu.appendChild(kop);
      if (takvim) { var ig = el("a", "baglanti", "Instagram'dan yazmayı tercih ederim"); ig.href = dm; ig.target = "_blank"; ig.rel = "noopener"; kutu.appendChild(ig); }
      geri();
    }
    var ilk = kutu.querySelector(".s-secenek, .s-girdi, .dugme");
    if (ilk && durum.adim !== 2) ilk.focus({ preventScroll: true });
  }

  dugmeler.forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); ac(b.getAttribute("data-kim")); });
  });
})();

/* 3B sahne: fare hareketine göre hafif eğim (yalnızca fare olan cihazlarda) */
(function () {
  if (!window.matchMedia || !matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".sahne").forEach(function (s) {
    var ic = s.querySelector(".sahne-ic");
    s.addEventListener("mousemove", function (e) {
      var r = s.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      ic.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
      ic.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
    });
    s.addEventListener("mouseleave", function () {
      ic.style.setProperty("--ry", "0deg"); ic.style.setProperty("--rx", "0deg");
    });
  });
})();


/* Akıcılık: yapışkan başlık, kaydırınca belirme, sayaçlar, paralaks, kart eğimi */
(function () {
  var azHareket = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fare = window.matchMedia && matchMedia("(pointer: fine)").matches;

  var ust = document.querySelector(".ana .ust");
  function ustGuncelle() { if (ust) ust.classList.toggle("kaydi", window.scrollY > 10); }

  // Kaydırınca belirme
  var hedefler = document.querySelectorAll(".kh-sol > *, .blok .ust-etiket, .blok h2, .blok .giris, .oz, #form-listesi .kart, .adimlar li, .tikler li, .sss details, .bant, .portre, .formsahne, .sahne.kucuk");
  hedefler.forEach(function (el) {
    var kardes = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--gecik", Math.min(kardes, 6) * 90 + "ms");
    el.classList.add("gor");
  });
  function ac(el) {
    el.classList.add("acik");
    var b = el.querySelectorAll ? el.querySelectorAll("[data-say]") : [];
    b.forEach(say);
  }
  if (!("IntersectionObserver" in window)) {
    hedefler.forEach(ac);
  } else {
    var io = new IntersectionObserver(function (girdiler) {
      girdiler.forEach(function (g) { if (g.isIntersecting) { ac(g.target); io.unobserve(g.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    hedefler.forEach(function (el) { io.observe(el); });
  }

  // Sayaçlar
  function say(el) {
    if (el.dataset.sayildi) return;
    el.dataset.sayildi = 1;
    var son = +el.dataset.say, ek = el.dataset.ek || "", t0 = null;
    function adim(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1100, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(son * e) + ek;
      if (p < 1) requestAnimationFrame(adim);
    }
    requestAnimationFrame(adim);
  }

  // Paralaks katmanları
  var katmanlar = [];
  if (!azHareket) {
    document.querySelectorAll(".sahne").forEach(function (s) {
      [[".b1", .05], [".b2", -.04], [".b3", .06], [".nokta", -.08], [".kisi", .015]].forEach(function (k) {
        s.querySelectorAll(k[0]).forEach(function (el) { katmanlar.push({ el: el, hiz: k[1], sahne: s }); });
      });
    });
  }
  var bekliyor = false;
  function kaydir() {
    ustGuncelle();
    katmanlar.forEach(function (k) {
      var r = k.sahne.getBoundingClientRect();
      var merkez = r.top + r.height / 2 - innerHeight / 2;
      var v = Math.max(-36, Math.min(36, merkez * k.hiz));
      k.el.style.translate = "0 " + v.toFixed(1) + "px";
    });
    bekliyor = false;
  }
  window.addEventListener("scroll", function () { if (!bekliyor) { bekliyor = true; requestAnimationFrame(kaydir); } }, { passive: true });
  kaydir();

  // Kart eğimi
  if (fare) {
    document.querySelectorAll(".oz, #form-listesi .kart").forEach(function (k) {
      k.addEventListener("mousemove", function (e) {
        var r = k.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        k.classList.add("egik");
        k.style.setProperty("--egy", ((x - .5) * 14).toFixed(2) + "deg");
        k.style.setProperty("--egx", ((.5 - y) * 12).toFixed(2) + "deg");
        k.style.setProperty("--px", (x * 100).toFixed(1) + "%");
        k.style.setProperty("--py", (y * 100).toFixed(1) + "%");
      });
      k.addEventListener("mouseleave", function () {
        k.classList.remove("egik");
        k.style.setProperty("--egx", "0deg"); k.style.setProperty("--egy", "0deg");
      });
    });
  }
})();


/* Yumuşak kaydırma: fare tekerleğiyle kaydırırken sayfa adım adım değil, akarak ilerler */
(function () {
  if (!window.matchMedia || !matchMedia("(pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var kok = document.documentElement;
  kok.classList.add("akici");
  var hedef = window.scrollY, simdi = window.scrollY, calisiyor = false;
  function sinir(v) { return Math.max(0, Math.min(v, kok.scrollHeight - innerHeight)); }
  function dongu() {
    simdi += (hedef - simdi) * 0.11;
    if (Math.abs(hedef - simdi) < 0.5) { simdi = hedef; calisiyor = false; }
    window.scrollTo(0, simdi);
    if (calisiyor) requestAnimationFrame(dongu);
  }
  function git(y) {
    hedef = sinir(y);
    if (!calisiyor) { calisiyor = true; simdi = window.scrollY; requestAnimationFrame(dongu); }
  }
  window.addEventListener("wheel", function (e) {
    if (e.ctrlKey || e.defaultPrevented || kok.classList.contains("sihirbaz-acik")) return;
    e.preventDefault();
    var d = e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1);
    git((calisiyor ? hedef : window.scrollY) + d);
  }, { passive: false });
  // Klavye ya da kaydırma çubuğu ile kaydırılınca hedefi eşitle
  window.addEventListener("scroll", function () { if (!calisiyor) { hedef = simdi = window.scrollY; } }, { passive: true });
  // Menüdeki bağlantılar da aynı akışla gitsin
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    var el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    git(el.getBoundingClientRect().top + window.scrollY - 80);
    history.replaceState(null, "", a.getAttribute("href"));
  });
})();
