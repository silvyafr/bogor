console.log("database.js berjalan");

// Helper untuk membuka/mendapatkan koneksi database secara aman
function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("KulinerBogorDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("kuliner")) {
        db.createObjectStore("kuliner", { keyPath: "id" });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      console.error("IndexedDB gagal dibuka:", event.target.error);
      reject(event.target.error);
    };
  });
}

// 1. SIMPAN KE INDEXEDDB
async function simpanKeIndexedDB(data) {
  if (!data || data.length === 0) return;

  try {
    const db = await getDB();
    const tx = db.transaction("kuliner", "readwrite");
    const store = tx.objectStore("kuliner");

    data.forEach(item => {
      store.put(item);
    });

    console.log("Data berhasil disimpan ke IndexedDB");
  } catch (err) {
    console.error("Gagal menyimpan ke IndexedDB:", err);
  }
}

// 2. AMBIL DARI INDEXEDDB
async function ambilDariIndexedDB(callback) {
  try {
    // Menunggu database siap dulu!
    const db = await getDB(); 
    
    const tx = db.transaction("kuliner", "readonly");
    const store = tx.objectStore("kuliner");
    const request = store.getAll();

    request.onsuccess = function () {
      console.log("Isi IndexedDB berhasil diambil:", request.result);
      if (typeof callback === "function") {
        callback(request.result || []);
      }
    };

    request.onerror = function () {
      console.error("Gagal membaca dari IndexedDB");
      if (typeof callback === "function") callback([]);
    };
  } catch (err) {
    console.error("Error pada IndexedDB:", err);
    if (typeof callback === "function") callback([]);
  }
}

// Make functions available globally
window.simpanKeIndexedDB = simpanKeIndexedDB;
window.ambilDariIndexedDB = ambilDariIndexedDB;
