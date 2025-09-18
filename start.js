const API_KEY = "AHqr7uA8UP3vRQhoAU4k3ZygXs8632dLEEZVJ76aLffXoSA4EL0lNlN0";
const API_URL = "https://api.pexels.com/v1/search?query=";

// ELEMENTI PAGINA
const row = document.getElementById("cards-row");
const loadBtn = document.getElementById("loadBtn");
const loadSecondaryBtn = document.getElementById("loadSecondaryBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// FUNZIONE FETCH API
function fetchImages(query) {
  fetch(API_URL + query, {
    headers: { Authorization: API_KEY },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Images:", data.photos);
      displayCards(data.photos);
    })
    .catch((err) => console.error("Error:", err));
}

// PRIMA CREO LE CARDS

// CREAZIONE CARD
function createCard(image) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-5";

  col.innerHTML = `
    <div class="card shadow-sm h-100">
      <img src="${image.src.medium}" class="bd-placeholder-img card-img-top" alt="${image.alt}" />
      <div class="card-body">
        <p class="card-text">${image.alt}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary view-btn">Details</button>
            <button type="button" class="btn btn-sm btn-outline-danger hide-btn">Hide</button>
          </div>
          <small class="text-muted"> ID:${image.id}</small>
        </div>
      </div>
    </div>
  `;

  // BOTTONE HIDE
  col.querySelector(".hide-btn").addEventListener("click", () => {
    col.remove();
  });

  // BOTTONE MODALE
  col.querySelector(".view-btn").addEventListener("click", () => {
    const modalImage = document.getElementById("modalImage");
    const modalPhotographer = document.getElementById("modalPhotographer");
    const modalLink = document.getElementById("modalLink");

    modalImage.src = image.src.large;
    modalPhotographer.textContent = "Author: " + image.photographer;
    modalLink.href = image.photographer_url;

    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();
  });

  return col;
}

// DOPO CON RETURN LA CARTA INTERA CHIAMO LA FUNZIONE DENTRO MOSTRA PIU CARDS, IL TUTTO VERRA RICHIAMATO DENTRO IL FETCH NELLA PROMISE ANDANDO A CREARE TUTTO SOLO AL CLICK

// MOSTRA PIU CARDS
function displayCards(images) {
  row.innerHTML = "";
  images.forEach((img) => {
    const card = createCard(img);
    row.appendChild(card);
  });
}

// BOTTONI PRINCIPALI
loadBtn.addEventListener("click", () => fetchImages("hamsters"));
loadSecondaryBtn.addEventListener("click", () => fetchImages("tigers"));
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchImages(query);
});
