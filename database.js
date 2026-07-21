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
    console.log("IndexedDB siap");
};

request.onerror = function () {
    console.log("IndexedDB gagal");
};

function simpanKeIndexedDB(data){

    const tx = dbLocal.transaction("kuliner","readwrite");
    const store = tx.objectStore("kuliner");

    data.forEach(item=>{
        store.put(item);
    });

}

function ambilDariIndexedDB(callback){

    const tx = dbLocal.transaction("kuliner","readonly");
    const store = tx.objectStore("kuliner");

    const req = store.getAll();

    req.onsuccess = function(){
        callback(req.result);
    };

}

window.simpanKeIndexedDB = simpanKeIndexedDB;
window.ambilDariIndexedDB = ambilDariIndexedDB;
