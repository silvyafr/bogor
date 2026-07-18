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


// UNTUK MAKANAN, MINUMAN, JAJANAN, OLEH-OLEH
async function tampilKategori(jenis,id){

    const container = document.getElementById(id);

    if(!container) return;

    const { data, error } = await db
        .from("kuliner")
        .select("*")
        .eq("jenis", jenis);

    if(error){
        console.log(error);
        return;
    }

    container.innerHTML="";

    data.forEach(item=>{
        container.innerHTML += buatItem(item);
    });

}


// KHUSUS MINUMAN VIRAL
async function tampilMinumanViral(){

    const container = document.getElementById("minumanviralContainer");

    if(!container) return;

    const { data, error } = await db
        .from("kuliner")
        .select("*")
        .eq("jenis","minuman")
        .eq("kategori","🔥 Viral");

    if(error){
        console.log(error);
        return;
    }

    console.table(data);

    container.innerHTML="";

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
