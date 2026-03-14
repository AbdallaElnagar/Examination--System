

function startTimer(startingSeconds) {
  secondsRemaining = startingSeconds;
  updateTimerDisplay();

  timerIntervalID = setInterval(function () {
    secondsRemaining = secondsRemaining - 1;
    updateTimerDisplay();

    saveExamState(selectedAnswers, markedQuestions, visitedQuestions, secondsRemaining);

    if (secondsRemaining <= 0) {
      clearInterval(timerIntervalID);
      doSubmit();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalID);
}

function updateTimerDisplay() {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  let minuteString;
  if (minutes < 10) {
    minuteString = "0" + minutes;
  } else {
    minuteString = "" + minutes;
  }

  let secondString;
  if (seconds < 10) {
    secondString = "0" + seconds;
  } else {
    secondString = "" + seconds;
  }

  const timeText = minuteString + ":" + secondString;

  const timerElements = [
    document.getElementById("timer"),
    document.getElementById("timer-mobile")
  ];

  for (let i = 0; i < timerElements.length; i++) {
    if (timerElements[i] == null) continue;

    timerElements[i].textContent = timeText;

    if (secondsRemaining <= 30) {
      timerElements[i].classList.remove("bg-secondary");
      timerElements[i].classList.add("bg-danger");
    }
  }
}
