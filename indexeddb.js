// Nama database
let dbOffline;

// Buka / buat database
const request = indexedDB.open("BogorDB", 1);

request.onupgradeneeded = function (event) {

    dbOffline = event.target.result;

    if (!dbOffline.objectStoreNames.contains("kuliner")) {

        dbOffline.createObjectStore("kuliner", {
            keyPath: "id"
        });

    }

};

request.onsuccess = function (event) {

    dbOffline = event.target.result;

    console.log("IndexedDB berhasil dibuka");

};

request.onerror = function () {

    console.log("Gagal membuka IndexedDB");

};

// Simpan semua data ke IndexedDB
function simpanOffline(data) {

    const transaksi = dbOffline.transaction("kuliner", "readwrite");

    const store = transaksi.objectStore("kuliner");

    store.clear();

    data.forEach(item => {
        store.put(item);
    });

}

// Ambil semua data dari IndexedDB
function bacaOffline() {

    return new Promise((resolve, reject) => {

        const transaksi = dbOffline.transaction("kuliner", "readonly");

        const store = transaksi.objectStore("kuliner");

        const request = store.getAll();

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject(request.error);
        };

    });

}
