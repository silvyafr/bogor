let semuaData = [];

async function ambilData(){

    const { data, error } = await db
    .from("kuliner")
    .select("*");

    console.log(data);
    console.log(error);

    if (error) return;

    semuaData = data;

    const viral = semuaData.filter(item => item.kategori === "Viral");
    const rekomendasi = semuaData.filter(item => item.kategori === "Rekomendasi");
    
    renderCard(viral, viralContainer);
    renderCard(rekomendasi, rekomendasiContainer);
}

// Container
const viralContainer = document.getElementById("viral-container");
const rekomendasiContainer = document.getElementById("rekomendasi-container");

// Render Card
function renderCard(data, container) {

    container.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}">

            <div class="card-body">

                <span class="badge">
                    ${item.kategori}
                </span>

                <h3>${item.nama}</h3>

                <p>${item.deskripsi}</p>

                <button
                    class="detailBtn"
                    onclick="location.href='detail.html?id=${item.id}'">

                    Lihat Detail

                </button>

            </div>
        `;

        container.appendChild(card);

    });

}

// Search
function cariKuliner() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const hasilViral = semuaData.filter(item =>
        item.kategori === "🔥 Viral" &&
        item.nama.toLowerCase().includes(keyword)
    );

    const hasilRekomendasi = semuaData.filter(item =>
        item.kategori === "⭐ Rekomendasi" &&
        item.nama.toLowerCase().includes(keyword)
    );

    renderCard(hasilViral, viralContainer);
    renderCard(hasilRekomendasi, rekomendasiContainer);

}
ambilData();
