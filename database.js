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

// ======================
// SIMPAN DATA
// ======================

function simpanKeIndexedDB(data){

    if(!dbLocal) return;

    const transaksi = dbLocal.transaction("kuliner","readwrite");

    const store = transaksi.objectStore("kuliner");

    // hapus data lama supaya tidak dobel
    store.clear();

    data.forEach(item=>{
        store.put(item);
    });

    transaksi.oncomplete = function(){
        console.log("Data berhasil disimpan ke IndexedDB");
    };

}

window.simpanKeIndexedDB = simpanKeIndexedDB;


// ======================
// AMBIL DATA
// ======================

function ambilDariIndexedDB(callback){

    if(!dbLocal){
        callback([]);
        return;
    }

    const transaksi = dbLocal.transaction("kuliner","readonly");

    const store = transaksi.objectStore("kuliner");

    const req = store.getAll();

    req.onsuccess = function(){
        callback(req.result);
    };

    req.onerror = function(){
        callback([]);
    };

}

window.ambilDariIndexedDB = ambilDariIndexedDB;
