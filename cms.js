function buatItem(item){

    async function ambilData(jenis, kategori = null) {

    // Kalau online
    if (navigator.onLine) {

        let query = db
            .from("kuliner")
            .select("*")
            .eq("jenis", jenis);

        if (kategori) {
            query = query.eq("kategori", kategori);
        }

        const { data, error } = await query;

        if (!error) {
            simpanOffline(data);
            return data;
        }

    }

    // Kalau offline
    let data = await bacaOffline();

    data = data.filter(item => item.jenis === jenis);

    if (kategori) {
        data = data.filter(item => item.kategori === kategori);
    }

    return data;
}

    return `
    <section class="item">

        <img src="${item.gambar}" alt="${item.nama}">

        <div class="item-info">

            <h2>${item.nama}</h2>

            <p>${item.deskripsi}</p>

            <p><b>💸 Harga :</b> ${item.harga}</p>

            <p><b>📍 Lokasi :</b> ${item.lokasi}</p>

            <p><b>🏷️ Kategori :</b> ${item.kategori}</p>

        </div>

    </section>
    `;

}


// UNTUK MAKANAN, MINUMAN, JAJANAN, OLEH-OLEH
async function tampilKategori(jenis, id){

    const container = document.getElementById(id);

    if(!container) return;

    const data = await ambilData(jenis);

    container.innerHTML = "";

    data.forEach(item=>{
        container.innerHTML += buatItem(item);
    });

}


// KHUSUS MINUMAN VIRAL
async function tampilMinumanViral(){

    const container = document.getElementById("minumanviralContainer");

    if(!container) return;

    const data = await ambilData("minuman", "Viral");

    container.innerHTML = "";

    data.forEach(item=>{
        container.innerHTML += buatItem(item);
    });

}

document.addEventListener("DOMContentLoaded",()=>{

    tampilKategori("makanan","makananContainer");

    tampilKategori("minuman","minumanContainer");

    tampilKategori("jajanan","jajananContainer");

    tampilKategori("oleh-oleh","oleholehContainer");

    tampilMinumanViral();

});
