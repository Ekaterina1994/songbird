const SCORES = document.querySelector(".full-screen__scores");

let result = localStorage.getItem("res");

if (Number(result) === 30) {
  SCORES.innerText = `Congrats!\nYou scored the maximum number of points -\n ${result} out of 30 possible`;
} else {
  SCORES.innerText = `You scored ${result} out of 30 possible`;
}