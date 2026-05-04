// ambil semua data
const semuaData = [
  ...dataKuliner.makanan,
  ...dataKuliner.minuman
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
      <h3>${item.nama}</h3>
      <p>${item.deskripsi}</p>
    `;

    container.appendChild(card);
  });
}

// render
renderCard(viral, viralContainer);
renderCard(rekomendasi, rekomendasiContainer);
