let semuaData = [];

// Elemen Container
const viralContainer = document.getElementById("viral-container");
const rekomendasiContainer = document.getElementById("rekomendasi-container");

// 1. Ambil Data (Online First -> Fallback Offline)
async function ambilData() {
    // Mode Offline Langsung
    if (!navigator.onLine) {
        console.log("Status: Offline. Mengambil dari IndexedDB...");
        muatDataOffline();
        return;
    }

    // Mode Online
    try {
        const { data, error } = await db
            .from("kuliner")
            .select("*");

        if (error) throw error;

        semuaData = data || [];

        // Simpan data terbaru ke IndexedDB untuk cadangan offline
        if (typeof simpanKeIndexedDB === "function") {
            simpanKeIndexedDB(semuaData);
        }

        console.log("Data Online dimuat. Total:", semuaData.length);
        pisahkanDanRender(semuaData);

    } catch (err) {
        console.warn("Gagal memuat dari Supabase (mungkin masalah jaringan). Dialihkan ke Offline Mode...", err);
        muatDataOffline();
    }
}

// Helper: Ambil dari IndexedDB
function muatDataOffline() {
    if (typeof ambilDariIndexedDB === "function") {
        ambilDariIndexedDB(function (dataLokal) {
            semuaData = dataLokal || [];
            console.log("Data Offline dimuat. Total:", semuaData.length);
            pisahkanDanRender(semuaData);
        });
    } else {
        console.error("Fungsi ambilDariIndexedDB tidak ditemukan di database.js");
    }
}

// Helper: Pisahkan Kategori & Render
function pisahkanDanRender(dataList) {
    const viral = dataList.filter(item => item.kategori === "Viral");
    const rekomendasi = dataList.filter(item => item.kategori === "Rekomendasi");

    renderCard(viral, viralContainer);
    renderCard(rekomendasi, rekomendasiContainer);
}

// 2. Render Card ke HTML
function renderCard(data, container) {
    if (!container) return;

    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = `<p class="empty-msg" style="color: #777; width: 100%; text-align: center; padding: 20px 0;">Tidak ada data ditemukan.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const gambarSrc = item.gambar || "assets/no-image.png";
        const nama = item.nama || "Tanpa Nama";
        const deskripsi = item.deskripsi || "Tidak ada deskripsi.";
        const kategori = item.kategori || "Umum";

        card.innerHTML = `
            <img 
                src="${gambarSrc}" 
                alt="${nama}" 
                loading="lazy" 
                onerror="this.onerror=null; this.src='assets/no-image.png';"
            >

            <div class="card-body">
                <span class="badge">${kategori}</span>
                <h3>${nama}</h3>
                <p>${deskripsi}</p>
                <button
                    class="detailBtn"
                    onclick="location.href='detail.html?id=${item.id}'">
                    Lihat Detail
                </button>
            </div>
        `;

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// 3. Fitur Cari Kuliner
function cariKuliner() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    const keyword = searchInput.value.toLowerCase().trim();

    const hasilViral = semuaData.filter(item =>
        item.kategori === "Viral" &&
        (item.nama || "").toLowerCase().includes(keyword)
    );

    const hasilRekomendasi = semuaData.filter(item =>
        item.kategori === "Rekomendasi" &&
        (item.nama || "").toLowerCase().includes(keyword)
    );

    renderCard(hasilViral, viralContainer);
    renderCard(hasilRekomendasi, rekomendasiContainer);
}

// Inisialisasi awal saat dokumen siap
document.addEventListener("DOMContentLoaded", () => {
    ambilData();

    // Event listener otomatis untuk kolom pencarian
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", cariKuliner);
    }
});

// Event listener otomatis saat status jaringan browser berubah
window.addEventListener("online", ambilData);
window.addEventListener("offline", muatDataOffline);
