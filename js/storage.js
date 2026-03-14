


function getUsers() {
  const savedData = localStorage.getItem("users");

  if (savedData == null) {
    return [];
  }

  return JSON.parse(savedData);
}

function saveUsers(usersArray) {
  localStorage.setItem("users", JSON.stringify(usersArray));
}

function getCurrentUser() {
  const savedData = localStorage.getItem("current_user");

  if (savedData == null) {
    return null;
  }

  return JSON.parse(savedData);
}

function saveCurrentUser(userObject) {
  const safeUserData = {
    fname: userObject.fname,
    lname: userObject.lname,
    email: userObject.email
  };

  localStorage.setItem("current_user", JSON.stringify(safeUserData));
}

function clearCurrentUser() {
  localStorage.removeItem("current_user");
}



function saveExamState(answersArray, markedArray, visitedArray, secondsRemaining) {
  const examData = {
    answers: answersArray,
    marked: markedArray,
    visited: visitedArray,
    secondsLeft: secondsRemaining,
    submitted: false
  };

  localStorage.setItem("exam_state", JSON.stringify(examData));
}

function loadExamState() {
  const examStateData = localStorage.getItem("exam_state");

  if (examStateData == null) {
    return null;
  }

  const examData = JSON.parse(examStateData);

  if (examData.submitted == true) {
    return null;
  }

  return examData;
}

function saveExamResult(resultObject) {
  localStorage.setItem("exam_result", JSON.stringify(resultObject));
}

function loadExamResult() {
  const examResultData = localStorage.getItem("exam_result");

  if (examResultData == null) {
    return null;
  }

  return JSON.parse(examResultData);
}

function markExamAsSubmitted(answersArray, markedArray, visitedArray) {
  const examData = {
    answers: answersArray,
    marked: markedArray,
    visited: visitedArray,
    secondsLeft: 0,
    submitted: true
  };

  localStorage.setItem("exam_state", JSON.stringify(examData));
}

function clearExamData() {
  localStorage.removeItem("exam_state");
  localStorage.removeItem("exam_result");
}

function loadCurrentUser() {
  return getCurrentUser();
}
