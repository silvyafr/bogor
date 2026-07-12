// Ambil data langsung dari data.js
const semuaData = [
    ...dataKuliner.makanan,
    ...dataKuliner.minuman,
    ...dataKuliner.jajanan
];

async function testSupabase(){

    const { data, error } = await supabase
    .from("kuliner")
    .select("*");

    console.log(data);

    console.log(error);

}

testSupabase();

// Filter kategori
const viral = semuaData.filter(item => item.kategori === "🔥 Viral");
const rekomendasi = semuaData.filter(item => item.kategori === "⭐ Rekomendasi");

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

// Render pertama
renderCard(viral, viralContainer);
renderCard(rekomendasi, rekomendasiContainer);

// Search
function cariKuliner() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const hasilViral = viral.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    const hasilRekomendasi = rekomendasi.filter(item =>
        item.nama.toLowerCase().includes(keyword)
    );

    renderCard(hasilViral, viralContainer);
    renderCard(hasilRekomendasi, rekomendasiContainer);

}
