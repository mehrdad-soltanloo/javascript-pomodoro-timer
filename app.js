const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workDurationInput = document.getElementById("work-duration");
const breakDurationInput = document.getElementById("break-duration");

const progressCircleFill = document.querySelector(".progress-circle-fill");
const circleRadius = 90;
const circumference = 2 * Math.PI * circleRadius;

progressCircleFill.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircleFill.style.strokeDashoffset = `${circumference}`;

let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let timerInterval;
let isRunning = false;
let isWorkingSession = true;

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

function updateDisplay(timeInSeconds) {
  let minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
  let seconds = String(timeInSeconds % 60).padStart(2, "0");

  //   if (seconds < 10) seconds = "0" + seconds;
  //   if (minutes < 10) minutes = "0" + minutes;

  timerDisplay.innerText = `${minutes}:${seconds}`;
  updateProgressBar(timeInSeconds);
}

function updateProgressBar(timeInSeconds) {
  const offset =
    circumference -
    (timeInSeconds / (isWorkingSession ? workTime : breakTime)) * circumference;
  progressCircleFill.style.strokeDashoffset = offset;
  requestAnimationFrame(() => {
    progressCircleFill.style.strokeDashoffset = offset;
  });
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;

    timerInterval = setInterval(function () {
      currentTime--;
      updateDisplay(currentTime);

      if (currentTime <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        // switch between work and break
        if (isWorkingSession) {
          currentTime = breakTime;
          isWorkingSession = false;
        } else {
          currentTime = workTime;
          isWorkingSession = true;
        }
        updateDisplay(currentTime);
        startTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  currentTime = workTime;
  isWorkingSession = true;
  updateDisplay(currentTime);
}

// Adjust WOrk and Break duration
workDurationInput.addEventListener("change", function () {
  workTime = parseInt(workDurationInput.value) * 60;
  if (!isRunning && isWorkingSession) {
    currentTime = workTime;
    updateDisplay(currentTime);
  }
  //   resetTimer();
});

breakDurationInput.addEventListener("change", function () {
  breakTime = parseInt(breakDurationInput.value) * 60;
  if (!isRunning && !isWorkingSession) {
    updateDisplay(currentTime);
  }
});

function saveTimerState() {
  localStorage.setItem("currentTime", currentTime);
  localStorage.setItem("isWorkingSession", isWorkingSession);
}

function loadTimerState() {
  currentTime = parseInt(localStorage.getItem("currentTime")) || workTime;

  isWorkingSession =
    JSON.parse(localStorage.getItem("isWorkingSession")) || true;
  updateDisplay(currentTime);
}
window.addEventListener("beforeunload", saveTimerState);
window.addEventListener("load", loadTimerState);
