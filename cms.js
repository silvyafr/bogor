// Helper Function: Membuat komponen HTML Card/Item
function buatItem(item) {
    const gambarSrc = item.gambar || 'assets/no-image.png';
    const kategoriTeks = item.kategori ? item.kategori : '-';
    
    return `
    <section class="item">
        <img 
            src="${gambarSrc}" 
            alt="${item.nama || 'Gambar Kuliner'}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/no-image.png';"
        >

        <div class="item-info">
            <h2>${item.nama || 'Tanpa Nama'}</h2>
            <p>${item.deskripsi || 'Tidak ada deskripsi.'}</p>
            <p><b>💸 Harga :</b> ${item.harga || '-'}</p>
            <p><b>📍 Lokasi :</b> ${item.lokasi || '-'}</p>
            <p><b>🏷️ Kategori :</b> ${kategoriTeks}</p>
            
            <a href="detail.html?id=${item.id}" class="btn-detail" style="display:inline-block; margin-top:10px;">Lihat Detail →</a>
        </div>
    </section>
    `;
}

// UNTUK MAKANAN, MINUMAN, JAJANAN, OLEH-OLEH
async function tampilKategori(jenis, id) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const { data, error } = await db
            .from("kuliner")
            .select("*")
            .eq("jenis", jenis);

        if (error) {
            console.error(`Error mengambil data ${jenis}:`, error);
            container.innerHTML = `<p style="color:red;">Gagal memuat data. Periksa koneksi internet Anda.</p>`;
            return;
        }

        if (!data || data.length === 0) {
            container.innerHTML = `<p style="color:#777;">Belum ada data untuk kategori ini.</p>`;
            return;
        }

        // Render sekaligus menggunakan map & join untuk performa DOM yang lebih optimal
        container.innerHTML = data.map(item => buatItem(item)).join("");

    } catch (err) {
        console.error("Terjadi kesalahan sistem:", err);
        container.innerHTML = `<p style="color:red;">Terjadi kesalahan saat memuat data.</p>`;
    }
}

// KHUSUS MINUMAN VIRAL
async function tampilMinumanViral() {
    const container = document.getElementById("minumanviralContainer");
    if (!container) return;

    try {
        const { data, error } = await db
            .from("kuliner")
            .select("*")
            .eq("jenis", "minuman")
            .eq("kategori", "Viral");

        if (error) {
            console.error("Error mengambil Minuman Viral:", error);
            container.innerHTML = `<p style="color:red;">Gagal memuat minuman viral.</p>`;
            return;
        }

        if (!data || data.length === 0) {
            container.innerHTML = `<p style="color:#777;">Belum ada minuman viral saat ini.</p>`;
            return;
        }

        container.innerHTML = data.map(item => buatItem(item)).join("");

    } catch (err) {
        console.error("Terjadi kesalahan sistem:", err);
        container.innerHTML = `<p style="color:red;">Terjadi kesalahan saat memuat data.</p>`;
    }
}

// Inisialisasi Panggilan Data Setelah DOM Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
    tampilKategori("makanan", "makananContainer");
    tampilKategori("minuman", "minumanContainer");
    tampilKategori("jajanan", "jajananContainer");
    tampilKategori("oleh-oleh", "oleholehContainer");
    tampilMinumanViral();
});
