/* Danışman ekranını parola ile korur.
   Parola GitHub'da değil, Vercel'de "DANISMAN_SIFRE" ortam değişkeninde durur.
   Kullanıcı adı varsayılan olarak "enes"; değiştirmek için "DANISMAN_KULLANICI" ekleyin.
   Parola tanımlı değilse sayfa herkese kapalı kalır. */
export const config = {
  matcher: ["/danisman", "/danisman/:path*", "/danisman.html", "/danisman.js", "/danisman.css"]
};

export default function middleware(request) {
  const sifre = process.env.DANISMAN_SIFRE;
  const kullanici = process.env.DANISMAN_KULLANICI || "enes";

  if (sifre) {
    const baslik = request.headers.get("authorization") || "";
    if (baslik.startsWith("Basic ")) {
      try {
        const cozulmus = atob(baslik.slice(6));
        const i = cozulmus.indexOf(":");
        const u = cozulmus.slice(0, i);
        const p = cozulmus.slice(i + 1);
        if (i > 0 && u === kullanici && p === sifre) {
          // Doğru giriş: isteği sayfaya geçir
          return new Response(null, { headers: { "x-middleware-next": "1" } });
        }
      } catch (e) { /* hatalı başlık: aşağıda reddedilir */ }
    }
  }

  return new Response("Bu sayfa yalnızca danışman içindir.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Danisman ekrani", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
