// Ambil database dari LocalStorage
const db = JSON.parse(localStorage.getItem("dataKuliner"));

// Gabungkan semua data
const semuaData = [
    ...db.makanan,
    ...db.minuman
];

// filter kategori
const viral = semuaData.filter(item => item.kategori === "viral");
const rekomendasi = semuaData.filter(item => item.kategori === "rekomendasi");

// container
const viralContainer = document.getElementById("viral-container");
const rekomendasiContainer = document.getElementById("rekomendasi-container");

// function render card
function renderCard(data, container) {
  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.gambar}">
    
      <div class="card-body">
    
        <span class="badge">
          ${item.kategori === "viral" ? "🔥 Viral" : "⭐ Rekomendasi"}
        </span>
    
        <h3>${item.nama}</h3>
    
        <p>${item.deskripsi}</p>
    
        <button class="detailBtn">
          Lihat Detail
        </button>
    
      </div>
    `;

    container.appendChild(card);
  });
}

// render
renderCard(viral, viralContainer);
renderCard(rekomendasi, rekomendasiContainer);
