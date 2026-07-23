let semuaData = [];

// Container Element
const viralContainer = document.getElementById("viral-container");
const rekomendasiContainer = document.getElementById("rekomendasi-container");

async function ambilData() {
  try {
    // 1. UTAMAKAN KONEKSI ONLINE (Supabase)
    const { data, error } = await db.from("kuliner").select("*");

    if (error) throw error; // Jika Supabase error, lempar ke block catch

    semuaData = data || [];
    console.log("Mode Online: Data berhasil diambil dari Supabase (" + semuaData.length + " item)");

    // Simpan data terbaru ke IndexedDB untuk cadangan offline
    simpanKeIndexedDB(semuaData);

    // Tampilkan ke layar
    tampilkanData(semuaData);

  } catch (err) {
    // 2. FALLBACK KETIKA OFFLINE / SUPABASE GAGAL
    console.log("Gagal terhubung ke network/Supabase. Beralih ke Mode Offline (IndexedDB)...", err);

    ambilDariIndexedDB(function(dataLokal) {
      semuaData = dataLokal || [];
      console.log("Data Offline dari IndexedDB:", semuaData);

      if (semuaData.length > 0) {
        tampilkanData(semuaData);
      } else {
        console.warn("IndexedDB masih kosong, tidak ada data untuk ditampilkan.");
      }
    });
  }
}

// Fungsi Helper untuk memisahkan kategori dan render
function tampilkanData(listData) {
  // Gunakan toLowerCase() agar aman dari perbedaan huruf kapital
  const viral = listData.filter(item => item.kategori && item.kategori.toLowerCase() === "viral");
  const rekomendasi = listData.filter(item => item.kategori && item.kategori.toLowerCase() === "rekomendasi");

  renderCard(viral, viralContainer);
  renderCard(rekomendasi, rekomendasiContainer);
}

// Render Card
function renderCard(data, container) {
  if (!container) return; // Mencegah error jika ID container tidak ditemukan di HTML
  
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Tidak ada data kuliner.</p>`;
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    // Gambar cadangan sederhana jika URL gambar offline gagal di-load
    const defaultImg = "https://via.placeholder.com/300x200?text=Gambar+Offline";

    card.innerHTML = `
      <img src="${item.gambar || defaultImg}" alt="${item.nama}" onerror="this.onerror=null;this.src='${defaultImg}';">
      <div class="card-body">
        <span class="badge">${item.kategori}</span>
        <h3>${item.nama}</h3>
        <p>${item.deskripsi}</p>
        <button class="detailBtn" onclick="location.href='detail.html?id=${item.id}'">
          Lihat Detail
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Search
function cariKuliner() {
  const keyword = document.getElementById("search")?.value.toLowerCase().trim() || "";

  const hasilViral = semuaData.filter(item =>
    item.kategori && item.kategori.toLowerCase() === "viral" &&
    item.nama.toLowerCase().includes(keyword)
  );

  const hasilRekomendasi = semuaData.filter(item =>
    item.kategori && item.kategori.toLowerCase() === "rekomendasi" &&
    item.nama.toLowerCase().includes(keyword)
  );

  renderCard(hasilViral, viralContainer);
  renderCard(hasilRekomendasi, rekomendasiContainer);
}

// Jalankan saat script dimuat
ambilData();
