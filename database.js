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
