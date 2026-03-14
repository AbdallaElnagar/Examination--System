

function pickAnswer(chosenOptionIndex) {
  selectedAnswers[currentQuestionIndex] = chosenOptionIndex;
  saveExamState(selectedAnswers, markedQuestions, visitedQuestions, secondsRemaining);

  const allOptionButtons = document.querySelectorAll(".option-btn");
  for (let i = 0; i < allOptionButtons.length; i++) {
    allOptionButtons[i].classList.remove("btn-success");
    allOptionButtons[i].classList.add("btn-outline-secondary");
  }

  allOptionButtons[chosenOptionIndex].classList.remove("btn-outline-secondary");
  allOptionButtons[chosenOptionIndex].classList.add("btn-success");

  updateSubmitButton();
  updateProgressTrack();
  updateSidebar();
}



function toggleMark() {
  markedQuestions[currentQuestionIndex] = !markedQuestions[currentQuestionIndex];
  saveExamState(selectedAnswers, markedQuestions, visitedQuestions, secondsRemaining);
  updateMarkButton();
  updateProgressTrack();
  updateSidebar();
}



function goToPrev() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex = currentQuestionIndex - 1;
    renderQuestion();
  }
}

function goToNext() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex = currentQuestionIndex + 1;
    renderQuestion();
  }
}

function jumpTo(targetIndex) {
  currentQuestionIndex = targetIndex;
  renderQuestion();
}



function handleSubmitClick() {
  for (let i = 0; i < selectedAnswers.length; i++) {
    if (selectedAnswers[i] === null) return;
  }

  showSubmitModal(function () {
    doSubmit();
  });
}

function doSubmit() {
  stopTimer();

  let numberOfCorrectAnswers = 0;
  for (let i = 0; i < questions.length; i++) {
    if (selectedAnswers[i] === questions[i].answer) {
      numberOfCorrectAnswers = numberOfCorrectAnswers + 1;
    }
  }

  const totalQuestions = questions.length;
  const scorePercent = Math.round((numberOfCorrectAnswers / totalQuestions) * 100);
  const studentPassed = scorePercent >= PASSING_SCORE_PERCENT;

  const examResult = {
    correct: numberOfCorrectAnswers,
    total: totalQuestions,
    percent: scorePercent,
    passed: studentPassed
  };

  saveExamResult(examResult);
  markExamAsSubmitted(selectedAnswers, markedQuestions, visitedQuestions);

  blockGoingBack();
  showExamScreen(false);

  const loggedInUser = getCurrentUser();
  showResult(examResult, loggedInUser);
}



function restartExam() {
  clearExamData();
  window.location.reload();
}



function blockGoingBack() {
  history.pushState({ guard: true }, "", window.location.href);

  window.addEventListener("popstate", function () {
    history.pushState({ guard: true }, "", window.location.href);
  });
}
