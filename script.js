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
function renderCard(data, container){

    container.innerHTML = "";

    data.forEach(item=>{

        const card = document.createElement("div");

        card.className = "card";

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

function cariKuliner(){

    const keyword =
    document.getElementById("search").value.toLowerCase();

    const hasilViral =
    viral.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    const hasilRekomendasi =
    rekomendasi.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    renderCard(hasilViral, viralContainer);
    renderCard(hasilRekomendasi, rekomendasiContainer);

}
