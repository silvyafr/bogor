const CACHE_NAME = "bogor-pwa-v7"; // Naikkan versi cache

// Cukup cache aset-aset KRUSIAL saja di awal agar instalasi CEPAT dan TIDAK GAGAL
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./admin-login.html",
  "./admin.html",
  "./detail.html",
  "./edit.html",
  "./tambah.html",
  "./makanan-khas.html",
  "./minuman-khas.html",
  "./jajanan-tradisional.html",
  "./minuman-viral.html",
  "./oleh-oleh.html",
  "./style.css",
  "./script.js",
  "./database.js",
  "./supabase.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/fonts/Montserrat-Regular.ttf",
  "./assets/fonts/Montserrat-Light.ttf",
  "./assets/fonts/Montserrat-SemiBold.ttf"
];

// 1. Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching static assets...");
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => {
        console.error("[SW] Pre-cache failed:", err);
      })
  );
  self.skipWaiting();
});

// 2. Activate Event (Pembersihan Cache Lama)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ABAIKAN request non-HTTP/HTTPS (seperti chrome-extension://)
  // dan ABAIKAN request ke API Supabase agar data database selalu fresh
  if (
    !req.url.startsWith("http") ||
    url.hostname.includes("supabase.co") ||
    req.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      // Jika ada di cache, gunakan dari cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika tidak ada di cache, ambil dari jaringan
      return fetch(req)
        .then((networkResponse) => {
          // Validasi respon sebelum disimpan ke cache
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          // Simpan secara dinamis (seperti gambar-gambar yang baru dibuka)
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Fallback saat offline dan membuka halaman navigasi
          if (req.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    })
  );
});
