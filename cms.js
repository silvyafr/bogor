// =========================
// Ambil Data (Online / Offline)
// =========================
async function ambilData(jenis, kategori = null) {

    // ONLINE
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
            simpanKeIndexedDB(data);
            return data;
        }

    }

    // OFFLINE
    return new Promise(resolve => {

        ambilDariIndexedDB(function(data){

            let hasil = data.filter(item => item.jenis === jenis);

            if(kategori){
                hasil = hasil.filter(item => item.kategori === kategori);
            }

            resolve(hasil);

        });

    });

}


// =========================
// Membuat Card
// =========================
function buatItem(item){

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


// =========================
// Halaman Kategori
// =========================
async function tampilKategori(jenis,id){

    const container = document.getElementById(id);

    if(!container) return;

    const data = await ambilData(jenis);

    container.innerHTML="";

    data.forEach(item=>{
        container.innerHTML += buatItem(item);
    });

}


// =========================
// Minuman Viral
// =========================
async function tampilMinumanViral(){

    const container = document.getElementById("minumanviralContainer");

    if(!container) return;

    const data = await ambilData("minuman","Viral");

    container.innerHTML="";

    data.forEach(item=>{
        container.innerHTML += buatItem(item);
    });

}


// =========================
// Jalankan
// =========================
document.addEventListener("DOMContentLoaded",()=>{

    tampilKategori("makanan","makananContainer");

    tampilKategori("minuman","minumanContainer");

    tampilKategori("jajanan","jajananContainer");

    tampilKategori("oleh-oleh","oleholehContainer");

    tampilMinumanViral();

});
