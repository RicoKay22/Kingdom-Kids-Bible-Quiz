import { shuffleArray } from "./utils.js";
import { questions3to6 } from "./data-3-6.js";
import { questions7to12 } from "./data-7-12.js";

/* ------------------ SAFETY CHECK ------------------ */
const age = Number(sessionStorage.getItem("age"));
if (!age) {
  window.location.href = "index.html";
}

/* ------------------ QUESTION SETUP ------------------ */
const TOTAL_QUESTIONS = age <= 6 ? 20 : 30;
const QUESTION_POOL = age <= 6 ? questions3to6 : questions7to12;

let questions = shuffleArray(QUESTION_POOL).slice(0, TOTAL_QUESTIONS);
questions = questions.map(q => ({
  ...q,
  options: shuffleArray(q.options)
}));

let currentIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

/* ------------------ DOM ELEMENTS ------------------ */
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressText = document.getElementById("progress");
const quizCard = document.querySelector(".card");

const countdownOverlay = document.getElementById("countdown-overlay");
const countdownText = document.getElementById("countdown-text");
const timerDisplay = document.getElementById("timer");

/* ------------------ INITIAL STATE ------------------ */
nextBtn.style.display = "none";
prevBtn.style.display = "none";
quizCard.style.pointerEvents = "none";

/* ------------------ COUNTDOWN ------------------ */
let countdown = 5;

const countdownInterval = setInterval(() => {
  countdownText.textContent = countdown;
  countdown--;

  if (countdown < 0) {
    clearInterval(countdownInterval);
    countdownOverlay.style.display = "none";
    quizCard.style.pointerEvents = "auto";
    startTimer();
    loadQuestion();
  }
}, 1000);

/* ------------------ MAIN TIMER ------------------ */
let totalSeconds = questions.length * 15;
let timerInterval;

function startTimer() {
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    totalSeconds--;
    updateTimerDisplay();

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      autoSubmitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/* ------------------ QUIZ LOGIC ------------------ */
function loadQuestion() {
  const q = questions[currentIndex];

  questionText.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");

    if (userAnswers[currentIndex] === option) {
      btn.classList.add("selected");
    }

    btn.onclick = () => selectOption(option);
    optionsBox.appendChild(btn);
  });

  progressText.textContent = `${currentIndex + 1} of ${questions.length} questions`;
  prevBtn.style.display = currentIndex > 0 ? "inline-block" : "none";
  nextBtn.style.display = userAnswers[currentIndex] ? "inline-block" : "none";
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Submit" : "Next";
}

function selectOption(option) {
  userAnswers[currentIndex] = option;

  document.querySelectorAll(".option").forEach(btn => {
    btn.classList.toggle("selected", btn.textContent === option);
  });

  nextBtn.style.display = "inline-block";
}

/* ------------------ NAVIGATION ------------------ */
nextBtn.onclick = () => {
  if (currentIndex === questions.length - 1) {
    submitQuiz();
  } else {
    currentIndex++;
    loadQuestion();
  }
};

prevBtn.onclick = () => {
  currentIndex--;
  loadQuestion();
};

/* ------------------ SUBMISSION ------------------ */
function autoSubmitQuiz() {
  alert("Time is up! Your quiz will be submitted.");
  submitQuiz();
}

function submitQuiz() {
  clearInterval(timerInterval);
  sessionStorage.setItem("quizQuestions", JSON.stringify(questions));
  sessionStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  window.location.href = "result.html";
}


history.pushState(null, null, location.href);
window.onpopstate = () => {
  history.go(1);
};
