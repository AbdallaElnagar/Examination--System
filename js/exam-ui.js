

function showExamScreen(shouldShow) {
  if (shouldShow) {
    document.getElementById("exam-screen").style.display = "";
    document.getElementById("results-screen").style.display = "none";
  } else {
    document.getElementById("exam-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "";
  }
}



function renderQuestion() {
  visitedQuestions[currentQuestionIndex] = true;
  saveExamState(selectedAnswers, markedQuestions, visitedQuestions, secondsRemaining);

  const currentQuestion = questions[currentQuestionIndex];
  const optionLetters = ["A", "B", "C", "D"];

  document.getElementById("question-number").textContent =
    "Question " + (currentQuestionIndex + 1) + " of " + questions.length;

  document.getElementById("question-text").textContent = currentQuestion.text;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const columnDiv = document.createElement("div");
    columnDiv.className = "col-6";

    const answerButton = document.createElement("button");
    answerButton.className = "btn w-100 py-3 option-btn";
    answerButton.textContent = optionLetters[i] + ". " + currentQuestion.options[i];

    if (selectedAnswers[currentQuestionIndex] === i) {
      answerButton.classList.add("btn-success");
    } else {
      answerButton.classList.add("btn-outline-secondary");
    }

    answerButton.addEventListener("click", makeAnswerClickHandler(i));
    columnDiv.appendChild(answerButton);
    optionsContainer.appendChild(columnDiv);
  }

  updateNavButtons();
  updateMarkButton();
  updateSubmitButton();
  updateProgressTrack();
  updateSidebar();
}




function makeAnswerClickHandler(optionIndex) {
  return function () {
    pickAnswer(optionIndex);
  };
}



function updateNavButtons() {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (isFirstQuestion) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
  }

  if (isLastQuestion) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }
}

function updateMarkButton() {
  const markButton = document.getElementById("mark-btn");
  const questionIsMarked = markedQuestions[currentQuestionIndex] == true;

  if (questionIsMarked) {
    markButton.textContent = "Unmark";
    markButton.classList.remove("btn-outline-warning");
    markButton.classList.add("btn-warning");
  } else {
    markButton.textContent = "Mark";
    markButton.classList.remove("btn-warning");
    markButton.classList.add("btn-outline-warning");
  }
}

function updateSubmitButton() {
  let allQuestionsAnswered = true;

  for (let i = 0; i < selectedAnswers.length; i++) {
    if (selectedAnswers[i] === null) {
      allQuestionsAnswered = false;
      break;
    }
  }

  document.getElementById("submit-btn").disabled = !allQuestionsAnswered;
}






function updateProgressTrack() {
  const progressTracks = [
    document.getElementById("progress-track"),
    document.getElementById("progress-track-mobile")
  ];

  for (let t = 0; t < progressTracks.length; t++) {
    const track = progressTracks[t];
    if (track == null) continue;

    track.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
      const dot = document.createElement("div");

      dot.style.width = "12px";
      dot.style.height = "12px";
      dot.style.borderRadius = "50%";
      dot.style.cursor = "pointer";
      dot.style.flexShrink = "0";

      if (i === currentQuestionIndex) {
        dot.style.backgroundColor = "#212529";
      } else if (markedQuestions[i] == true) {
        dot.style.backgroundColor = "#ffc107";
      } else if (selectedAnswers[i] !== null) {
        dot.style.backgroundColor = "#198754";
      } else {
        dot.style.backgroundColor = "#ced4da";
      }

      dot.addEventListener("click", makeJumpToHandler(i));
      track.appendChild(dot);
    }
  }
}





function updateSidebar() {
  const sidebarGrid = document.getElementById("sidebar-grid");
  if (sidebarGrid == null) return;

  sidebarGrid.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const card = document.createElement("div");
    card.className = "sidebar-card";
    card.textContent = i + 1;

    if (i === currentQuestionIndex) {
      card.style.backgroundColor = "#212529";
      card.style.color = "#ffffff";
      card.style.borderColor = "#212529";
    } else if (markedQuestions[i] == true) {
      card.style.backgroundColor = "#fff3cd";
      card.style.color = "#664d03";
      card.style.borderColor = "#ffc107";
    } else if (selectedAnswers[i] !== null) {
      card.style.backgroundColor = "#d1e7dd";
      card.style.color = "#0f5132";
      card.style.borderColor = "#198754";
    } else {
      card.style.backgroundColor = "#f8f9fa";
      card.style.color = "#6c757d";
      card.style.borderColor = "#dee2e6";
    }

    card.addEventListener("click", makeJumpToHandler(i));
    sidebarGrid.appendChild(card);
  }
}

function makeJumpToHandler(targetIndex) {
  return function () {
    jumpTo(targetIndex);
  };
}



function showResult(resultData, currentUser) {
  if (resultData.passed) {
    document.getElementById("result-icon").innerHTML = '<i class="fa-solid fa-trophy"></i>';
    document.getElementById("result-heading").textContent = "Passed!";
  } else {
    document.getElementById("result-icon").innerHTML = '<i class="fa-solid fa-heart-crack"></i>';
    document.getElementById("result-heading").textContent = "Failed";
  }

  document.getElementById("result-score").textContent = resultData.percent + "%";

  document.getElementById("result-detail").textContent =
    "You got " + resultData.correct + " out of " + resultData.total + " correct." +
    (resultData.passed ? " Well done!" : " You need 50% or more to pass.");

  const resultNameElement = document.getElementById("result-name");
  if (resultNameElement != null && currentUser != null) {
    resultNameElement.textContent = currentUser.fname + " " + currentUser.lname;
  }


  if (resultData.passed) {
    document.getElementById("restart-btn").style.display = "none";
  } else {
    document.getElementById("restart-btn").style.display = "";
  }
}

function setGreeting(currentUser) {
  const greetingElement = document.getElementById("user-greeting");
  if (greetingElement != null) {
    greetingElement.textContent = "Hello, " + currentUser.fname + "!";
  }
}



function showSubmitModal(onConfirmCallback) {
  let numberOfMarkedQuestions = 0;
  for (let i = 0; i < markedQuestions.length; i++) {
    if (markedQuestions[i] == true) {
      numberOfMarkedQuestions = numberOfMarkedQuestions + 1;
    }
  }

  let markedMessage = "";
  if (numberOfMarkedQuestions > 0) {
    const markedQuestionNumbers = [];
    for (let j = 0; j < markedQuestions.length; j++) {
      if (markedQuestions[j] == true) {
        markedQuestionNumbers.push("Q" + (j + 1));
      }
    }
    markedMessage = "You still have " + numberOfMarkedQuestions + " marked question(s): " + markedQuestionNumbers.join(", ") + ".";
  } else {
    markedMessage = "You have no marked questions.";
  }

  document.getElementById("modal-marked-msg").textContent = markedMessage;

  const modalElement = document.getElementById("submit-modal");
  const bootstrapModal = new bootstrap.Modal(modalElement);
  bootstrapModal.show();

  const oldConfirmButton = document.getElementById("modal-confirm-btn");
  const newConfirmButton = oldConfirmButton.cloneNode(true);
  oldConfirmButton.parentNode.replaceChild(newConfirmButton, oldConfirmButton);

  newConfirmButton.addEventListener("click", function () {
    bootstrapModal.hide();
    onConfirmCallback();
  });
}
