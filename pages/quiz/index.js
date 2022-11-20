import birdsDataEn from "../../assets/datas/data.js";

const BUTTON_NEXT = document.querySelector(".description__next");
const BUTTON_RESULTS = document.querySelector(".description__results");
const DESCRIPTION_BLOCK = document.querySelector(".description__about");
const SCORES = document.querySelector(".scores");
const ANSWERS = document.querySelector(".answers");
const QUESTION_BLOCK = document.querySelector(".question-block");
const QUESTIONS_ITEMS = Array.from(document.querySelectorAll(".questions__item"));

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
    <audio class="card__audio" controls>
    <source
      src="${birdsDataEn[index][index].audio}"
      type="audio/mp3"
    />
  </audio>
    <div class="player">
      <audio id="av-tag" controls>
        <source src="${birdsDataEn[index][index].audio}" type="audio/mp3"></audio>
      <div class="player__info">
      <div class="player__time">
        <button class="play-btn">&#x23f5;</button>
        <div class="play-time">1:00</div>
      </div>
      <div class="player__volume">
        <div class="speaker" id="speaker">🔊</div>
        <input class="volume" id="volume" type="range" min="0" max="">
      </div>
      </div>
      <div class="fill-progress"><input class="song" width="" id="cur-time" type="range" value="0" min="0" max=""></div>
    </div>
  </div>
</div>`;
TITLE.innerHTML = `${birdsDataEn[index][index].name}`;
SPECIE.innerHTML = `${birdsDataEn[index][index].species}`;
  DESCRIPTION.innerHTML = `${birdsDataEn[index][index].description}`;
  IMAGE.innerHTML = `<img class="description__img" src="${birdsDataEn[index][index].image}"/>`;
}

const showAbout = (index, number) => {
  TITLE.innerHTML = `${birdsDataEn[index][number].name}`;
  SPECIE.innerHTML = `${birdsDataEn[index][number].species}`;
  DESCRIPTION.innerHTML = `${birdsDataEn[index][number].description}`;
  IMAGE.innerHTML = `<img class="description__img" src="${birdsDataEn[index][number].image}"/>`; 
}

const back = () => {
  DESC.innerHTML = `<div class="description__text">
  Listen to the recording and guess the name of the bird
</div>
<div class="description__about">
  <h2 class="card__title"></h2>
  <div class="description__species"></div>
  <p class="description__description"></p>
  <div class="buttons">
    <button class="btn description__next" disabled>Next</button>
    <button class="btn description__results" disabled>Results</button>
  </div>
</div>
<div class="description__img-block"></div>`;
}

const checkAnswer = (index) => {
  let point = 5;
  ANSWERS.addEventListener("click", (event) => {
    if (Number(event.target.id) === birdsDataEn[index][index].id) {
      console.log(event.target.id);
      console.log(birdsDataEn[index][index].id);
      BUTTON_NEXT.disabled = false;
      scores += point;
      event.target.classList.add("right");
      showInfo(index);
      TEXT.classList.add("none");
    } else {
      // console.log(event.target.id);
      point -= 1;
      event.target.classList.add("wrong");
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
    <audio class="card__audio" controls>
    <source
      src="${birdsDataEn[index][index].audio}"
      type="audio/mp3"
    />
  </audio>
    <div class="player">
      <audio id="av-tag" controls>
        <source src="${birdsDataEn[index][index].audio}" type="audio/mp3"></audio>
      <div class="player__info">
      <div class="player__time">
        <button class="play-btn">&#x23f5;</button>
        <div class="play-time">1:00</div>
      </div>
      <div class="player__volume">
        <div class="speaker" id="speaker">🔊</div>
        <input class="volume" id="volume" type="range" min="0" max="">
      </div>
      </div>
      <div class="fill-progress"><input class="song" width="" id="cur-time" type="range" value="0" min="0" max=""></div>
    </div>
  </div>
</div>`;

  ANSWERS.innerHTML = `<ul class="answers__list">${renderAnswers()}</ul>`;

  checkAnswer(index);
  sounds();
};

renderQuestions(0);


DESCRIPTION_BLOCK.addEventListener("click", (event) => {
  if (event.target.classList.contains("description__next")) {
    if (birdsDataEn.length === Number(QUESTION_BLOCK.dataset.currentStep) + 1) {
      BUTTON_RESULTS.disabled = false;
      
      BUTTON_RESULTS.addEventListener("click", () =>
      {
        window.location.href = "../results/index.html";
      })
    } else {
      renderQuestions(Number(QUESTION_BLOCK.dataset.currentStep) + 1);
      QUESTIONS_ITEMS[Number(QUESTION_BLOCK.dataset.currentStep)].classList.add("actual");
      // back();

    }

    BUTTON_NEXT.disabled = true;
  }
});

console.log(birdsDataEn);

function sounds() {
  document.addEventListener("DOMContentLoaded", (e) => {
    //dom объекты элементов контроля

    var av = document.getElementById("av-tag");
    var playTime = document.getElementsByClassName("play-time")[0];
    var playBtn = document.getElementsByClassName("play-btn")[0];
    var curTime = document.getElementById("cur-time");
    var volume = document.getElementById("volume");
    var speaker = document.getElementById("speaker");

    //переменная для отслеживания воспроизведения звука
    var isPlaying = false;

    av.onloadedmetadata = function () {
      curTime.max = av.duration;
    };

    //функция вывода текущего времени воспроизведения
    av.ontimeupdate = function () {
      var sec_num = av.currentTime;
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;
      seconds = Math.round(seconds);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      playTime.innerHTML = minutes + ":" + seconds;
      if (isPlaying) curTime.value = av.currentTime;
    };
    //функция для настройки громкости
    volume.onchange = function () {
      av.volume = volume.value / 10;
    };
    //функция для установки начала воспроизведения
    curTime.onchange = function () {
      av.pause();
      av.currentTime = curTime.value;
      av.play();
    };
    //функция для вкл/выкл громкости
    speaker.onclick = function () {
      if (volume.value == 0) {
        volume.value = 10;
        av.volume = 1;
      } else {
        volume.value = 0;
        av.volume = 0;
      }
    };
    //функция для play/pause и изображения кнопки воспроизведения
    playBtn.addEventListener("click", (a) => {
      if (isPlaying) {
        av.pause();
        isPlaying = false;
        playBtn.innerHTML = "&#x23f5;";
      } else {
        av.play();
        isPlaying = true;
        playBtn.innerHTML = "<b>&#8545;</b>";
      }
    });
  });
}
