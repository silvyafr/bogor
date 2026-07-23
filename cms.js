// Function untuk membuat komponen Card (Sesuai Tampilan Foto Kedua)
function buatItem(item) {
    const gambarSrc = item.gambar || 'assets/no-image.png';
    const nama = item.nama || 'Tanpa Nama';
    const deskripsi = item.deskripsi || '';
    const harga = item.harga || '-';
    const lokasi = item.lokasi || '-';
    const kategori = item.kategori || '-';

    return `
    <div class="card">
        <img 
            src="${gambarSrc}" 
            alt="${nama}" 
            onerror="this.onerror=null; this.src='assets/no-image.png';"
        >
        <div class="card-body">
            <h2>${nama}</h2>
            <p>${deskripsi}</p>
            <p><b>💸 Harga :</b> ${harga}</p>
            <p><b>📍 Lokasi :</b> ${lokasi}</p>
            <p><b>🏷️ Kategori :</b> ${kategori}</p>
        </div>
    </div>
    `;
}

// UNTUK MAKANAN, MINUMAN, JAJANAN, OLEH-OLEH
async function tampilKategori(jenis, id) {
    const container = document.getElementById(id);
    if (!container) return;

    // 1. Ambil Offline dari IndexedDB dulu (atau saat offline)
    if (!navigator.onLine) {
        if (typeof ambilDariIndexedDB === "function") {
            ambilDariIndexedDB((dataLokal) => {
                const filtered = dataLokal.filter(item => item.jenis === jenis);
                renderKeContainer(container, filtered);
            });
        }
        return;
    }

    // 2. Ambil Online dari Supabase
    try {
        const { data, error } = await db
            .from("kuliner")
            .select("*")
            .eq("jenis", jenis);

        if (error) throw error;

        renderKeContainer(container, data);

    } catch (err) {
        console.warn("Gagal fetch online, mencoba IndexedDB...", err);
        if (typeof ambilDariIndexedDB === "function") {
            ambilDariIndexedDB((dataLokal) => {
                const filtered = dataLokal.filter(item => item.jenis === jenis);
                renderKeContainer(container, filtered);
            });
        }
    }
}

// KHUSUS MINUMAN VIRAL
async function tampilMinumanViral() {
    const container = document.getElementById("minumanviralContainer");
    if (!container) return;

    if (!navigator.onLine) {
        if (typeof ambilDariIndexedDB === "function") {
            ambilDariIndexedDB((dataLokal) => {
                const filtered = dataLokal.filter(item => item.jenis === "minuman" && item.kategori === "Viral");
                renderKeContainer(container, filtered);
            });
        }
        return;
    }

    try {
        const { data, error } = await db
            .from("kuliner")
            .select("*")
            .eq("jenis", "minuman")
            .eq("kategori", "Viral");

        if (error) throw error;

        renderKeContainer(container, data);

    } catch (err) {
        if (typeof ambilDariIndexedDB === "function") {
            ambilDariIndexedDB((dataLokal) => {
                const filtered = dataLokal.filter(item => item.jenis === "minuman" && item.kategori === "Viral");
                renderKeContainer(container, filtered);
            });
        }
    }
}

// Helper Render HTML
function renderKeContainer(container, data) {
    if (!data || data.length === 0) {
        container.innerHTML = `<p style="color: #777;">Belum ada data untuk kategori ini.</p>`;
        return;
    }
    container.innerHTML = data.map(item => buatItem(item)).join("");
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    tampilKategori("makanan", "makananContainer");
    tampilKategori("minuman", "minumanContainer");
    tampilKategori("jajanan", "jajananContainer");
    tampilKategori("oleh-oleh", "oleholehContainer");
    tampilMinumanViral();
});
