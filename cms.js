const db = dataKuliner;

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

function tampilKategori(jenis,id){

const container=document.getElementById(id);

if(!container) return;

container.innerHTML="";

(db[jenis] || []).forEach(item=>{

container.innerHTML += buatItem(item);

});

}

document.addEventListener("DOMContentLoaded",()=>{

tampilKategori("makanan","makananContainer");

tampilKategori("minuman","minumanContainer");

tampilKategori("oleholeh","oleholehContainer");

});
