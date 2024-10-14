# Pomodoro Timer

This project is a simple **Pomodoro Timer** built with HTML, CSS, and JavaScript. It allows users to track work and break intervals based on the Pomodoro technique, helping them to stay productive.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Step-by-Step Guide](#step-by-step-guide)
   1. [HTML Overview](#html-overview)
   2. [CSS Overview](#css-overview)
   3. [JavaScript Overview](#javascript-overview)
4. [Functions and Methods Explanation](#functions-and-methods-explanation)

---

## Project Structure

The project contains the following files:

- `index.html`: The main structure of the Pomodoro timer.
- `styles.css`: Contains styles for the timer interface.
- `app.js`: The core logic of the Pomodoro Timer.
- `pmodoro.png`: An image used in the background of the circular progress bar.

---

## Features

- Customizable work and break intervals.
- A circular progress bar that visually tracks time remaining.
- Start, pause, and reset functionality for the timer.
- Responsive design for different screen sizes.

---

## Step-by-Step Guide

### 1. HTML Overview

The `index.html` file is the backbone of the Pomodoro Timer. It includes the following sections:

1. **Header and Title**:
   - `<h1>Pomodoro Timer</h1>`: Displays the main title.
2. **Timer Display**:
   - Uses an SVG (Scalable Vector Graphics) circle for a visual timer progress.
   - `<div id="timer-display">25:00</div>`: Displays the current countdown time in minutes and seconds.
3. **Control Buttons**:
   - Buttons to start, pause, and reset the timer: `<button id="start-btn">start</button>`, `<button id="pause-btn">pause</button>`, and `<button id="reset-btn">reset</button>`.
4. **Settings for Duration**:
   - Allows users to customize work and break durations through number inputs:
   ```html
   <input type="number" id="work-duration" value="25" />
   <input type="number" id="break-duration" value="5" />
   ```

### 2. CSS Overview

The `styles.css` file styles the entire Pomodoro Timer interface. Here are some key features:

1. **CSS Variables**:
   - `:root {}`: Stores common colors for easier styling and theming. For example, `--gray-950` sets a dark background color.
2. **Font Settings**:
   - The project uses Google Fonts like **Open Sans** and **Sixtyfour Convergence** for styling.
3. **Timer Display Styles**:

   - The progress circle and the timer numbers are styled for clarity.
   - `.progress-circle-fill`: This class controls the circular progress bar’s stroke properties like its color and stroke width.

4. **Control Buttons**:
   - Buttons have hover effects and smooth transitions for a better user experience.
5. **Responsive Design**:
   - The app uses **flexbox** to center content and make sure the design works well on different screen sizes.

### 3. JavaScript Overview

The logic behind the Pomodoro timer is in `app.js`. It handles the timer's functionality, updating the UI, and responding to user actions.

1. **Variables**:

   - HTML elements are selected using `document.getElementById` or `document.querySelector` to interact with the DOM.
   - The **workTime** and **breakTime** variables are set in seconds to represent the intervals.
   - `currentTime` keeps track of the time remaining for the current session (work or break).

2. **Event Listeners**:
   - Buttons are set up with event listeners that trigger the timer functions (start, pause, reset) when clicked.

---

## Functions and Methods Explanation

This section explains the core methods and functions used to control the Pomodoro Timer:

### 1. `startTimer()`

```javascript
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(function () {
      currentTime--;
      updateDisplay(currentTime);

      if (currentTime <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
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
```

## Purpose: Starts the countdown for the Pomodoro timer. It checks if the timer is running using the isRunning flag to avoid starting multiple intervals.

## Key Logic:

- The timer decreases currentTime by 1 every second (1000ms).
- When the time reaches zero, the session switches between work and break mode.
- The interval is reset with clearInterval when switching between work and break periods to avoid multiple intervals running simultaneously.

2.  pauseTimer()

```javascript
function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}
```

## Purpose: Pauses the timer by clearing the interval and setting isRunning to false. This prevents the timer from continuing to count down while paused.

3. resetTimer()

```javascript
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  currentTime = workTime;
  isWorkingSession = true;
  updateDisplay(currentTime);
}
```

## Purpose: Resets the timer to its initial state by stopping the current interval and setting the timer back to the original work duration.

4.  updateDisplay()

```javascript
function updateDisplay(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;

  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;

  timerDisplay.innerText = `${minutes}:${seconds}`;
  updateProgressBar(timeInSeconds);
}
```

## Purpose: Converts the remaining time (in seconds) into minutes and seconds and displays it on the screen. It also updates the circular progress bar with updateProgressBar().

5. updateProgressBar()

```javascript

function updateProgressBar(timeInSeconds) {
const offset = circumference - (timeInSeconds / (isWorkingSession ? workTime : breakTime)) _ circumference;
progressCircleFill.style.strokeDashoffset = offset;
}
```

## Purpose: This function updates the stroke offset of the progress circle to visually represent the time left. The progress bar fills in reverse as the time decreases.

6.  Adjust Work and Break Duration

```javascript

workDurationInput.addEventListener("change", function () {
workTime = parseInt(workDurationInput.value) _ 60;
resetTimer();
});

breakDurationInput.addEventListener("change", function () {
breakTime = parseInt(breakDurationInput.value) \* 60;
});
```

## Purpose: These event listeners adjust the work and break durations based on user input and reset the timer accordingly.

### Final Notes

This Pomodoro Timer project demonstrates how to use JavaScript to create interactive web applications. The circular progress bar gives users visual feedback, while the customizable work and break times allow flexibility.

> Feel free to build upon this foundation by adding new features like notifications, sound alerts, or even a task list for better productivity tracking. Thank you!


