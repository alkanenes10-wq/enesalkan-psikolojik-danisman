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
  formlar.forEach(function (f) {
    var a = document.createElement("a");
    a.className = "kart";
    a.href = (window.ONIZLEME ? "form.html?f=" : "/") + f.slug;
    var e = document.createElement("span"); e.className = "etiket";
    e.textContent = f.maddeler.length + " soru · " + f.sure;
    var h = document.createElement("h3"); h.textContent = f.baslik;
    var p = document.createElement("p"); p.textContent = f.kisaAciklama;
    var g = document.createElement("span"); g.className = "git"; g.textContent = "Forma başla →";
    a.appendChild(e); a.appendChild(h); a.appendChild(p); a.appendChild(g);
    liste.appendChild(a);
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
    if (e.ctrlKey || e.defaultPrevented) return;
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
