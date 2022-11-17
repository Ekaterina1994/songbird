import birdsDataEn from "../../assets/datas/data.js";

const BUTTON_NEXT = document.querySelector(".description__next");
const DESCRIPTION_BLOCK = document.querySelector(".description__about");
const SCORES = document.querySelector(".scores");
const ANSWERS = document.querySelector(".answers");
const QUESTION_BLOCK = document.querySelector(".question-block");
const QUESTIONS_LIST = document.querySelector(".questions__list");

let results = {};
let scores = 0;

const checkAnswer = (index) =>
{
  ANSWERS.addEventListener("click", (event) => {
    if (Number(event.target.id) === birdsDataEn[index][index].id) {
      console.log(122);
      BUTTON_NEXT.disabled = false;
    }
  });
}

const renderQuestions = (index) => {
  QUESTION_BLOCK.dataset.currentStep = index;
  
  const renderAnswers = () =>
  {
    return birdsDataEn[index].map((answer) => {
      return `<li class="answers__item" id="${answer.id}">${answer.name}</li>`;
    }).join("");
  };

  QUESTION_BLOCK.innerHTML = `<div class="card">
  <img class="card__img" src="../../assets/images/logo.svg" />
  <div class="card__media">
    <h2 class="card__title">*****${birdsDataEn[index][index].name}</h2>
    <hr />
    <!-- <audio class="card__audio" controls>
      <source
        src="https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3"
        type="audio/mp3"
      />
    </audio> -->
    <div class="progress">
      <div class="fill-progress"></div>
    </div>
  </div>
</div>`;

  ANSWERS.innerHTML = `<ul class="answers__list">${renderAnswers()}</ul>`;

  checkAnswer(index);
};



// const renderAnswers = () => {};

const renderIndicator = () =>
{
  
};




DESCRIPTION_BLOCK.addEventListener("click", (event) => {
  if (event.target.classList.contains("description__next")) {
    console.log(1);


    if (birdsDataEn.length === Number(QUESTION_BLOCK.dataset.currentStep) + 1) {
      window.location.href = "../results/index.html";
    } else {
      renderQuestions(Number(QUESTION_BLOCK.dataset.currentStep) + 1);
    }

    BUTTON_NEXT.disabled = true;

  }
});

console.log(birdsDataEn);


renderQuestions(0);