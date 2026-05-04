const container = document.getElementById("list-makanan");

makanan.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${item.gambar}">
    <h3>${item.nama}</h3>
    <p>${item.deskripsi}</p>
  `;

  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";

  container.appendChild(card);

  setTimeout(() => {
    card.style.transition = "0.6s";
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
  }, index * 150);
});
