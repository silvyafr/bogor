let dbOffline;

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

    console.log("IndexedDB siap.");

};

request.onerror = function () {

    console.log("Gagal membuka IndexedDB");

};

// Simpan data (tidak menghapus data lama)
function simpanOffline(data) {

    const transaksi = dbOffline.transaction("kuliner", "readwrite");

    const store = transaksi.objectStore("kuliner");

    data.forEach(item => {
        store.put(item);
    });

}

// Ambil semua data
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
