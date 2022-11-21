import birdsDataEn from "../../assets/datas/data.js";

const BUTTON_NEXT = document.querySelector(".description__next");
const BUTTONS = document.querySelector(".buttons");
const BUTTON_RESULTS = document.querySelector(".description__results");
const DESCRIPTION_BLOCK = document.querySelector(".description__about");
const DESCRIPTION_TEXT = document.querySelector(".description__text");
const DESCRIPTION_IMG = document.querySelector(".description__img-block");
const SCORES = document.querySelector(".scores");
const ANSWERS = document.querySelector(".answers");
const ANSWERS_ITEM = Array.from(document.querySelectorAll(".answers__item"));
const QUESTION_BLOCK = document.querySelector(".question-block");
const QUESTIONS_ITEMS = Array.from(
  document.querySelectorAll(".questions__item")
);

const TEXT = document.querySelector(".description__text");
const TITLE = document.querySelector(".card__title");
const SPECIE = document.querySelector(".description__species");
const DESCRIPTION = document.querySelector(".description__description");
const DESC = document.querySelector(".description");
const IMAGE = document.querySelector(".description__img-block");

const BUTTON_PLAY = document.querySelector(".play");
const PROGRESS = document.querySelector(".progress");
const PROGRESS_FILL = document.querySelector(".fill-progress");
// let audio = document.getElementById("audio");

let scores = 0;

const showInfo = (index) => {
  QUESTION_BLOCK.innerHTML = `<div class="card">
  <img class="card__img" src="${birdsDataEn[index][index].image}" />
  <div class="card__media">
    <h2 class="card__title">${birdsDataEn[index][index].name}</h2>
    <hr />
    <audio id="audio" class="card__audio" controls>
    <source
      src="${birdsDataEn[index][index].audio}"
      type="audio/mp3"
    />
  </audio>

  </div>
</div>`;
  TITLE.innerHTML = `${birdsDataEn[index][index].name}`;
  SPECIE.innerHTML = `${birdsDataEn[index][index].species}`;
  DESCRIPTION.innerHTML = `${birdsDataEn[index][index].description}`;
  IMAGE.innerHTML = `<img class="description__img" src="${birdsDataEn[index][index].image}"/>`;
};

const showAbout = (index, number) => {
  TITLE.innerHTML = `${birdsDataEn[index][number].name}`;
  SPECIE.innerHTML = `${birdsDataEn[index][number].species}`;
  DESCRIPTION.innerHTML = `${birdsDataEn[index][number].description}`;
  IMAGE.innerHTML = `<img class="description__img" src="${birdsDataEn[index][number].image}"/>`;
};

const back = () => {
  DESCRIPTION_TEXT.style.display = "flex";
  DESCRIPTION_BLOCK.style.disabled = "none";
};

const deleteClasses = () =>
{

  console.log(124);
  Array.from(ANSWERS.firstChild.childNodes).forEach((elem) =>
  {
    elem.classList.remove("right");
    elem.classList.remove("wrong");
    console.log(elem);
  })
  console.log(Array.from(ANSWERS.firstChild.childNodes));
}

const checkAnswer = (index) => {
  let point = 5;
  ANSWERS.addEventListener("click", (event) => {
    if (Number(event.target.id) === birdsDataEn[index][index].id) {
      BUTTON_NEXT.disabled = false;
      event.target.classList.add("right");
      console.log(event.target.className);
        scores += point;
      showInfo(index);
      DESCRIPTION_TEXT.style.display = "none";
    } else {
      point -= 1;
      event.target.classList.add("wrong");
      event.target.classList.remove("right");
      BUTTON_NEXT.disabled = true;
      showAbout(index, event.target.id - 1);
    }
    
    SCORES.innerText = `Scores: ${scores}`;
    localStorage.setItem("res", scores);
  });
};

const renderQuestions = (index) => {
  QUESTION_BLOCK.dataset.currentStep = index;

  const renderAnswers = () => {
    return birdsDataEn[index]
      .map((answer) => {
        return `<li class="answers__item" id="${answer.id}">${answer.name}</li>`;
      })
      .join("");
  };

  QUESTION_BLOCK.innerHTML = `<div class="card">
  <img class="card__img" src="../../assets/images/logo.svg" />
  <div class="card__media">
    <h2 class="card__title">*****</h2>
    <hr />
    <audio class="card__audio" id="player" controls>
    <source
      src="${birdsDataEn[index][index].audio}"
      type="audio/mp3"
    />
  </audio>

  </div>
</div>`;

  ANSWERS.innerHTML = `<ul class="answers__list">${renderAnswers()}</ul>`;

  checkAnswer(index);
  // sounds();
};

renderQuestions(0);

BUTTONS.addEventListener("click", (event) => {
  if (event.target.classList.contains("description__next")) {
    if (birdsDataEn.length === Number(QUESTION_BLOCK.dataset.currentStep) + 1) {
      BUTTON_RESULTS.disabled = false;

      BUTTON_RESULTS.addEventListener("click", () => {
        window.location.href = "../results/index.html";
      });
    } else {
      deleteClasses();
      renderQuestions(Number(QUESTION_BLOCK.dataset.currentStep) + 1);
      QUESTIONS_ITEMS[Number(QUESTION_BLOCK.dataset.currentStep)].classList.add(
        "actual"
      );
      back();
      
    }

    BUTTON_NEXT.disabled = true;
  }
});

console.log(birdsDataEn);

