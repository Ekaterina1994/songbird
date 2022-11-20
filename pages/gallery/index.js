import birdsDataEn from "../../assets/datas/data.js";

const GALLERY = document.querySelector(".container");

const renderCards = (i) => {

  const renderCard = (i) => {
      return birdsDataEn[i]
      .map((card) => {
        return `<div class="card">
        <div class="card__img">
          <img class="card__img"
            src="${card.image}"
          />
        </div>
        <audio controls>
          <source type="audio/mp3" src="${card.audio}">
        </audio>
        <div class="card__about">
          <p class="card__name">${card.name}</p>
          <p class="card__species">${card.species}</p>
          <p class="card__description">
          ${card.description}
          </p>
        </div>
      </div>`;
      })
      .join("");
    }
    


  GALLERY.innerHTML = `<div class="gallery-cards">${renderCard(0)}${renderCard(1)}${renderCard(2)}${renderCard(3)}${renderCard(4)}${renderCard(5)}</div>`;
};

renderCards(0);
renderCards(1);
renderCards(2);

