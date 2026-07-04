const dataKuliner = {
  makanan: [
    {
      id: "asinan",
      nama: "Asinan Bogor",
      deskripsi: "Jajanan segar dengan rasa asam, manis, dan pedas.",
      lokasi: "Jl. Suryakencana",
      harga: "Rp10.000 – Rp20.000",
      gambar: "assets/asinanbogor.jpg",
      kategori: "viral"
    },
    {
      id: "toge",
      nama: "Toge Goreng",
      deskripsi: "Disajikan dengan tauco khas yang gurih.",
      lokasi: "Bogor Tengah",
      harga: "Rp15.000",
      gambar: "assets/toge-goreng-bogor.jpg",
      kategori: "rekomendasi"
    },
    {
      id: "doclang",
      nama: "Doclang",
      deskripsi: "Lontong dengan saus kacang khas.",
      lokasi: "Jl. Raya Bogor",
      harga: "Rp12.000",
      gambar: "assets/doclang.jpg",
      kategori: "rekomendasi"
    },
    {
      id: "soto",
      nama: "Soto Mie Bogor",
      deskripsi: "Soto dengan mie, risol, kikil, dan kuah gurih.",
      lokasi: "Bogor Tengah",
      harga: "Rp25.000",
      gambar: "assets/sotomiebogor.jpg",
      kategori: "rekomendasi"
    },
    {
      id: "cungkring",
      nama: "Cungkring",
      deskripsi: " kuliner berupa potongan kikil dan bagian kepala sapi (seperti cungur atau bibir) yang dimasak empuk, disajikan bersama irisan lontong dan rempeyek atau keripik tempe, lalu disiram saus kacang yang gurih serta kecap manis.",
      lokasi: "Bogor Tengah",
      harga: "Rp35.000",
      gambar: "assets/cungkring.jpg",
      kategori: "rekomendasi"
    },
    {
      id: "combro",
      nama: "Combro",
      deskripsi: " gorengan tradisional khas Sunda, Jawa Barat, yang terbuat dari parutan singkong dengan isian sambal oncom gurih dan pedas.",
      harga: "Rp5.000",
      gambar: "assets/combro.jpg",
      kategori: "rekomendasi"
    }
  ],

  minuman: [
    {
      id: "pala",
      nama: "Es Pala Bogor",
      deskripsi: "Minuman segar khas Bogor.",
      lokasi: "Pasar Bogor",
      harga: "Rp8.000",
      gambar: "assets/espalabogor.jpeg",
      kategori: "viral"
    },
    {
      id: "kotjok",
      nama: "Bir Kotjok",
      deskripsi: "Minuman rempah tradisional.",
      lokasi: "Sekitar Bogor",
      harga: "Rp10.000",
      gambar: "assets/bir-pletok-bogor.jpg",
      kategori: "rekomendasi"
    },
    {
      id: "bajigur",
      nama: "Bajigur",
      deskripsi: "Minuman rempah tradisional cita rasa manis dan gurih.",
      lokasi: "Sekitar Bogor",
      harga: "Rp15.000",
      gambar: "assets/bajigur.jfif",
      kategori: "rekomendasi"
    }
  ],

  oleholeh:[
    {
    id:"lapis",
    nama:"Lapis Bogor",
    harga:"Rp35.000",
    kategori:"rekomendasi",
    lokasi:"Bogor",
    deskripsi:"Kue lapis khas Bogor.",
    gambar:"assets/lapisbogor.jpg"
    },
     {
    id:"roti unyil",
    nama:"Roti Unyil",
    harga:"Rp25.000",
    kategori:"rekomendasi",
    lokasi:"Bogor",
    deskripsi:"kuliner ikonik legendaris.",
    gambar:"assets/roti unyil.jpg"
    }
  ]
};

// Membuat database pertama kali
let dbLocal = JSON.parse(localStorage.getItem("dataKuliner"));

if (!dbLocal) {

    dbLocal = structuredClone(dataKuliner);

} else {

    dbLocal.makanan ??= structuredClone(dataKuliner.makanan);
    dbLocal.minuman ??= structuredClone(dataKuliner.minuman);
    dbLocal.oleholeh ??= structuredClone(dataKuliner.oleholeh);

}

localStorage.setItem(
    "dataKuliner",
    JSON.stringify(dbLocal)
);
