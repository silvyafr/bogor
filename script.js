const container = document.getElementById("list-makanan");

makanan.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${item.gambar}">
    <h3>${item.nama}</h3>
    <p>${item.deskripsi}</p>
  `;

  container.appendChild(card);
});
