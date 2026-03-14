

function shuffleArray(arrayToShuffle) {


  for (let i = arrayToShuffle.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporaryValue = arrayToShuffle[i];
    arrayToShuffle[i] = arrayToShuffle[randomIndex];
    arrayToShuffle[randomIndex] = temporaryValue;
  }

  return arrayToShuffle;
}

function buildRandomizedQuestions() {

  const questionsCopy = [];
  for (let i = 0; i < questions.length; i++) {
    questionsCopy.push({
      text: questions[i].text,
      options: questions[i].options.slice(),
      answer: questions[i].answer
    });
  }

  shuffleArray(questionsCopy);

  for (let questionIndex = 0; questionIndex < questionsCopy.length; questionIndex++) {
    const correctAnswerText = questionsCopy[questionIndex].options[questionsCopy[questionIndex].answer];

    shuffleArray(questionsCopy[questionIndex].options);

    for (let optionIndex = 0; optionIndex < questionsCopy[questionIndex].options.length; optionIndex++) {
      if (questionsCopy[questionIndex].options[optionIndex] === correctAnswerText) {
        questionsCopy[questionIndex].answer = optionIndex;
        break;
      }
    }
  }

  return questionsCopy;
}



window.addEventListener("DOMContentLoaded", function () {

  const currentUser = requireLogin();
  if (currentUser == null) return;

  setGreeting(currentUser);

  document.getElementById("prev-btn").addEventListener("click", goToPrev);
  document.getElementById("next-btn").addEventListener("click", goToNext);
  document.getElementById("mark-btn").addEventListener("click", toggleMark);
  document.getElementById("submit-btn").addEventListener("click", handleSubmitClick);
  document.getElementById("restart-btn").addEventListener("click", restartExam);

  const previousResult = loadExamResult();
  if (previousResult != null) {
    showExamScreen(false);
    showResult(previousResult, currentUser);
    blockGoingBack();
    return;
  }

  const savedExamState = loadExamState();

  if (savedExamState != null) {
    selectedAnswers = savedExamState.answers;
    markedQuestions = savedExamState.marked;
    visitedQuestions = savedExamState.visited;
    startTimer(savedExamState.secondsLeft);
  } else {
    questions = buildRandomizedQuestions();

    for (let i = 0; i < questions.length; i++) {
      selectedAnswers.push(null);
      markedQuestions.push(false);
      visitedQuestions.push(false);
    }

    startTimer(TOTAL_EXAM_SECONDS);
  }

  showExamScreen(true);
  renderQuestion();

});
