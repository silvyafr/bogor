console.log("database.js berjalan");

let dbLocal;

const request = indexedDB.open("KulinerBogorDB", 1);

request.onupgradeneeded = function (event) {

    dbLocal = event.target.result;

    if (!dbLocal.objectStoreNames.contains("kuliner")) {
        dbLocal.createObjectStore("kuliner", {
            keyPath: "id"
        });
    }

};

request.onsuccess = function (event) {

    dbLocal = event.target.result;

    console.log("IndexedDB berhasil dibuat");

};

request.onerror = function () {

    console.log("IndexedDB gagal dibuat");

};

function simpanKeIndexedDB(data){

    if(!data || data.length === 0){
        return;
    }

    const tx = dbLocal.transaction("kuliner","readwrite");
    const store = tx.objectStore("kuliner");

    data.forEach(item=>{
        store.put(item);
    });

    console.log("Data berhasil disimpan ke IndexedDB");

}

window.simpanKeIndexedDB = simpanKeIndexedDB;

function ambilDariIndexedDB(callback) {

    if (!dbLocal) {
        console.log("Database belum siap");
        callback([]);
        return;
    }

    const transaksi = dbLocal.transaction("kuliner", "readonly");
    const store = transaksi.objectStore("kuliner");

    const request = store.getAll();

    request.onsuccess = function () {

        console.log("Isi IndexedDB:", request.result);

        callback(request.result || []);

    };

    request.onerror = function () {

        console.log("Gagal membaca IndexedDB");

        callback([]);

    };

}

window.ambilDariIndexedDB = ambilDariIndexedDB;
