let semuaData = [];

async function ambilData(){

    // ==========================
    // OFFLINE
    // ==========================
    if (!navigator.onLine){

        console.log("Mode Offline");

        ambilDariIndexedDB(function(dataLokal){

            semuaData = dataLokal || [];

            console.log("Data Offline:", semuaData);

            const viral = semuaData.filter(item => item.kategori === "Viral");
            const rekomendasi = semuaData.filter(item => item.kategori === "Rekomendasi");

            renderCard(viral, viralContainer);
            renderCard(rekomendasi, rekomendasiContainer);

        });

        return;
    }

    // ==========================
    // ONLINE
    // ==========================
    const { data, error } = await db
        .from("kuliner")
        .select("*");

    if(error){
        console.log(error);
        return;
    }

    semuaData = data || [];

    simpanKeIndexedDB(semuaData);

    console.log("Jumlah data:", semuaData.length);

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
        .toLowerCase()
        .trim();

    const hasilViral = semuaData.filter(item =>
        item.kategori === "Viral" &&
        item.nama.toLowerCase().includes(keyword)
    );

    const hasilRekomendasi = semuaData.filter(item =>
        item.kategori === "Rekomendasi" &&
        item.nama.toLowerCase().includes(keyword)
    );

    renderCard(hasilViral, viralContainer);
    renderCard(hasilRekomendasi, rekomendasiContainer);

}

ambilData();
