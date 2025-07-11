const questions = [
    { q: "what is 3+4?", options: ["7", "8", "6"]. answer: 1},
    { q: "who is CM of Andhra Pradesh?", options: ["revanth anna", "jagan maavaya", "modi thata"]. answer: 2},
     { q: "who won all trophies for team india?", options: ["MSD", "VK", "ROHIT SHARMA"]. answer: 1},
      { q: "what is the jersey no of Dhoni?", options: ["18", "45", "7"]. answer: 3},
       { q: "which team have lowest score in IPL all seasonas?", options: ["DC", "RCB", "KKR"]. answer: 2},
        { q: "which team have more win percentage?", options: ["RCB", "MI", "CSK"]. answer: 3},
         { q: "which wicketkeeper have fastest stump wicket?", options: ["DHONI", "ADAM GHILCHRIST", "HENRICH KLASSEN"]. answer: 1},
          { q: "which team have won more IPL trophies in lesss seasons?", options: ["RCB", "MI", "CSK"]. answer: 3},
           { q: "which franchise has conducted ipl season 18?", options: ["OPPO", "TATA", "DLF"]. answer: 2},
            { q: "which team has won 2018 IPL trophy?", options: ["RCB", "MI", "CSK"]. answer: 3},
             { q: "which team have played most no of ipl finals?", options: ["CSK", "RCB", "MI"]. answer: 1},
              { q: "which captain have played most ipl finals?", options: ["DHONI", "GAMBHIR", "VIRAT"]. answer: 1},
               { q: "which player played most ipl finals?", options: ["VIRAT", "FAF DUPLESIS", "DHONI"]. answer: 3},
                { q: "what is the name of chennai stadium?", options: ["WANKEDE", "CHEPAUK", "CHINNASWAMI"]. answer: 2},
                 { q: "who is the cricket player and also lieftanat colonel to india?", options: ["DHONI", "VIRAT", "GAMBIR"]. answer: 1},

let current = 0;
let score = 0;
let timerId;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultModal = document.getElementById("result-modal");
const scoreEl = document.getElementById("score");
const starRatingEl = document.getElementById("star-rating");
const leaderboardEl = document.getElementById("leaderboard");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  clearTimeout(timerId);
  timerEl.style.transition = "none";
  timerEl.style.transform = "scaleX(1)";
  
  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  
  q.options.forEach(opt => {
    const id = `opt-${opt.replace(/\s+/g, '-')}`;
    optionsEl.innerHTML += `
      <input type="radio" name="opt" id="${id}" value="${opt}">
      <label for="${id}">${opt}</label>
    `;
  });
  const labels = optionsEl.querySelectorAll('label');
  labels.forEach(label => {
    label.classList.remove("correct", "incorrect");
    label.onclick = () => {
      labels.forEach(l => l.classList.remove("correct", "incorrect"));
    };
  });

  setTimeout(() => {
    timerEl.style.transition = "transform 10s linear";
    timerEl.style.transform = "scaleX(0)";
  }, 50);

  timerId = setTimeout(() => {
    handleAnswer();
  }, 10000);
  
  nextBtn.disabled = true;
}

function handleAnswer() {
  clearTimeout(timerId);
  const selected = document.querySelector('input[name="opt"]:checked');
  const labels = optionsEl.querySelectorAll('label');

  if (selected) {
    const answer = questions[current].answer;

    labels.forEach(label => {
      if (label.htmlFor === selected.id) {
        if (selected.value === answer) {
          label.classList.add("correct");
          score++;
        } else {
          label.classList.add("incorrect");
        }
      }
      // Mark correct answer
      if (label.textContent === answer) {
        label.classList.add("correct");
      }
    });
  } else {
    labels.forEach(label => {
      if (label.textContent === questions[current].answer) {
        label.classList.add("correct");
      }
    });
  }

  nextBtn.disabled = false;
}

function showNext() {
  handleAnswer();
  
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  resultModal.classList.add("show");
  scoreEl.textContent = score;
  const starsCount = Math.round(score / 3);
  starRatingEl.textContent = "⭐".repeat(starsCount);

  let scores = JSON.parse(localStorage.getItem("quizScores") || "[]");
  scores.push(score);
  scores = scores.sort((a,b) => b - a).slice(0,5);
  localStorage.setItem("quizScores", JSON.stringify(scores));

  leaderboardEl.innerHTML = "";
  scores.forEach((s, i) => {
    leaderboardEl.innerHTML += `<li>${i + 1}. Score: ${s}</li>`;
  });
}

nextBtn.addEventListener("click", showNext);
restartBtn.addEventListener("click", () => location.reload());

loadQuestion();

