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

console.log("database.js berjalan");

let dbLocal;

const request = indexedDB.open("KulinerBogorDB", 1);

request.onupgradeneeded = function (event) {

    dbLocal = event.target.result;

    dbLocal.createObjectStore("kuliner", {
        keyPath: "id"
    });

};

request.onsuccess = function (event) {

    dbLocal = event.target.result;

    console.log("IndexedDB berhasil dibuat");

};

request.onerror = function () {

    console.log("IndexedDB gagal dibuat");

};

function simpanKeIndexedDB(data) {

    const transaksi = dbLocal.transaction("kuliner", "readwrite");

    const store = transaksi.objectStore("kuliner");

    data.forEach(item => {
        store.put(item);
    });

    console.log("Data berhasil disimpan ke IndexedDB");

}
