const CACHE_NAME = "bogor-pwa-v3";

const urlsToCache = [

    "./",
    "./index.html",
    "./makanan-khas.html",
    "./minuman-khas.html",
    "./oleh-oleh.html",
    "./detail.html",
    "./admin-login.html",
    
    "./style.css",
    "./script.js",
    "./database.js",
    "./supabase.js",
    
    "./manifest.json",
    
    "./assets/icon-192.png",
    "./assets/icon-512.png",
    
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
            .then(cache => cache.addAll(urlsToCache))

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

                return response || fetch(event.request)

                    .then(networkResponse => {

                        if (
                            event.request.method === "GET" &&
                            networkResponse.status === 200
                        ) {

                            const clone = networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, clone));

                        }

                        return networkResponse;

                    })

                    .catch(() => caches.match("index.html"));

            })

    );

});
