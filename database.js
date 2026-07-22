console.log("database.js berjalan");

let dbLocal = null;
let dbReadyPromise = null;

// Fungsi Inisialisasi IndexedDB menggunakan Promise
function initIndexedDB() {
    if (dbReadyPromise) return dbReadyPromise;

    dbReadyPromise = new Promise((resolve, reject) => {
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
            console.log("IndexedDB berhasil dibuka & siap digunakan");
            resolve(dbLocal);
        };

        request.onerror = function (event) {
            console.error("IndexedDB gagal dibuka:", event.target.error);
            reject(event.target.error);
        };
    });

    return dbReadyPromise;
}

// Menjalankan inisialisasi awal saat script dimuat
initIndexedDB();

// 1. Simpan Data ke IndexedDB
async function simpanKeIndexedDB(data) {
    if (!data || data.length === 0) return;

    try {
        await initIndexedDB(); // Pastikan DB sudah siap

        const tx = dbLocal.transaction("kuliner", "readwrite");
        const store = tx.objectStore("kuliner");

        data.forEach(item => {
            store.put(item);
        });

        tx.oncomplete = function () {
            console.log("Data berhasil disimpan/diperbarui di IndexedDB");
        };

        tx.onerror = function (err) {
            console.error("Gagal menyimpan ke IndexedDB:", err);
        };

    } catch (err) {
        console.error("Gagal menginisialisasi IndexedDB saat simpan:", err);
    }
}

// 2. Ambil Data dari IndexedDB (Mendukung Callback & Promise)
async function ambilDariIndexedDB(callback) {
    try {
        await initIndexedDB(); // Menunggu DB siap jika belum selesai diproses

        const transaksi = dbLocal.transaction("kuliner", "readonly");
        const store = transaksi.objectStore("kuliner");
        const request = store.getAll();

        request.onsuccess = function () {
            const hasil = request.result || [];
            console.log("Isi IndexedDB dimuat:", hasil.length, "item");
            if (typeof callback === "function") callback(hasil);
        };

        request.onerror = function () {
            console.error("Gagal membaca dari IndexedDB");
            if (typeof callback === "function") callback([]);
        };

    } catch (err) {
        console.error("Database belum siap atau error:", err);
        if (typeof callback === "function") callback([]);
    }
}

// 3. (Opsional) Fungsi Kosongkan IndexedDB untuk Sinkronisasi Data
async function bersihkanIndexedDB() {
    try {
        await initIndexedDB();
        const tx = dbLocal.transaction("kuliner", "readwrite");
        const store = tx.objectStore("kuliner");
        store.clear();
        console.log("IndexedDB berhasil dibersihkan.");
    } catch (err) {
        console.error("Gagal membersihkan IndexedDB:", err);
    }
}

// Export ke objek Global Window
window.simpanKeIndexedDB = simpanKeIndexedDB;
window.ambilDariIndexedDB = ambilDariIndexedDB;
window.bersihkanIndexedDB = bersihkanIndexedDB;
