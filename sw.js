const CACHE_NAME="bogor-pwa-v5";

const urlsToCache = [
    "./",
    "./index.html",
    "./makanan-khas.html",
    "./jajanan-tradisional.html",
    "./minuman-khas.html",
    "./minuman-viral.html",
    "./oleh-oleh.html",
    "./detail.html",
    "./admin.html",
    "./edit.html",
    "./admin-login.html",

    "./style.css",
    "./script.js",
    "./database.js",
    "./supabase.js",

    "./manifest.json",

    // FONT
    "./assets/fonts/Montserrat-Regular.ttf",
    "./assets/fonts/Montserrat-Light.ttf",
    "./assets/fonts/Montserrat-SemiBold.ttf",

    // ICON
    "./assets/icon-192.png",
    "./assets/icon-512.png",

    // GAMBAR
    "./assets/asinanbogor.jpg",
    "./assets/bajigur.jfif",
    "./assets/bandrek.jpg",
    "./assets/belahdoeren.jpg",
    "./assets/bir-pletok-bogor.jpg",
    "./assets/birkotjok.jpeg",
    "./assets/combro.jpg",
    "./assets/cungkring.jpg",
    "./assets/dodolpala.jpg",
    "./assets/durengoreng.jpeg",
    "./assets/eslidahbuaya.jfif",
    "./assets/espalabogor.jpeg",
    "./assets/glosor.jpg",
    "./assets/keripiktalas.jfif",
    "./assets/laksa.jpeg",
    "./assets/lapisbogor.jpg",
    "./assets/manisanpala.jfif",
    "./assets/martabakairmancur.jpg",
    "./assets/nasitutug.jpg",
    "./assets/pietalas.jfif",
    "./assets/pisangaroma.jfif",
    "./assets/rotiunyil.jpg",
    "./assets/soto_kuning.jpg",
    "./assets/sotomiebogor.jpg",
    "./assets/talasbogor.jpg",
    "./assets/toge-goreng-bogor.jpg",
    "./assets/ulenbakar.jfif"
];

// Install
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(urlsToCache);

        })
        .catch(err => {
            console.log("CACHE ERROR:", err);
        })

    );

    self.skipWaiting();

});

// Activate
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            )

        )

    );

    self.clients.claim();

});

// Fetch
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            // kalau ada di cache langsung tampilkan
            if (response) {
                return response;
            }


            // ambil dari internet
            return fetch(event.request)
            .then(networkResponse => {


                // simpan request GET ke cache
                if (
                    event.request.method === "GET" &&
                    networkResponse.status === 200
                ) {

                    const clone = networkResponse.clone();

                    caches.open(CACHE_NAME)
                    .then(cache => {

                        cache.put(event.request, clone);

                    });

                }


                return networkResponse;

            })


            .catch(() => {

                // kalau buka halaman saat offline
                if (event.request.mode === "navigate") {

                    return caches.match("./index.html");

                }


                return new Response("", {
                    status:404,
                    statusText:"Offline"
                });

            });


        })

    );

});
