function getField(fieldId) {
  return document.getElementById(fieldId).value;
}

function showFieldError(errorDivId, errorMessage) {
  const errorDiv = document.getElementById(errorDivId);
  if (errorDiv == null) return;

  errorDiv.textContent = errorMessage;

  const inputFieldId = errorDivId.replace("-err", "");
  const inputField = document.getElementById(inputFieldId);

  if (inputField != null) {
    if (errorMessage != "") {
      inputField.classList.add("is-invalid");
    } else {
      inputField.classList.remove("is-invalid");
    }
  }
}

function clearAllErrors() {
  const allInputFields = document.querySelectorAll(".form-control");
  for (let i = 0; i < allInputFields.length; i++) {
    allInputFields[i].classList.remove("is-invalid");
  }

  const allErrorDivs = document.querySelectorAll(".invalid-feedback");
  for (let i = 0; i < allErrorDivs.length; i++) {
    allErrorDivs[i].textContent = "";
  }

  const formErrorBanner = document.getElementById("form-error");
  if (formErrorBanner != null) {
    formErrorBanner.style.display = "none";
  }
}

function showFormError(errorMessage) {
  const formErrorBanner = document.getElementById("form-error");
  if (formErrorBanner == null) return;

  formErrorBanner.textContent = errorMessage;
  formErrorBanner.style.display = "";
}



function findUserByEmail(emailAddress) {
  const allUsers = getUsers();
  const normalizedEmail = emailAddress.toLowerCase().trim();

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email.toLowerCase() == normalizedEmail) {
      return allUsers[i];
    }
  }

  return null;
}

function createUser(firstName, lastName, emailAddress, password) {
  const newUser = {
    fname: firstName.trim(),
    lname: lastName.trim(),
    email: emailAddress.trim().toLowerCase(),
    password: password
  };

  const allUsers = getUsers();
  allUsers.push(newUser);
  saveUsers(allUsers);

  return newUser;
}



function handleRegister() {
  clearAllErrors();

  const firstName = getField("fname");
  const lastName = getField("lname");
  const emailAddress = getField("email");
  const password = getField("password");
  const confirmPassword = getField("repassword");

  const firstNameError = validateFirstName(firstName);
  const lastNameError = validateLastName(lastName);
  const emailError = validateEmail(emailAddress);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validatePassword(password, confirmPassword);

  showFieldError("fname-err", firstNameError);
  showFieldError("lname-err", lastNameError);
  showFieldError("email-err", emailError);
  showFieldError("password-err", passwordError);
  showFieldError("repassword-err", confirmPasswordError);

  const hasErrors = firstNameError != "" || lastNameError != "" || emailError != "" || passwordError != "" || confirmPasswordError != "";
  if (hasErrors) {
    return;
  }

  const existingUser = findUserByEmail(emailAddress);
  if (existingUser != null) {
    showFieldError("email-err", "An account with this email already exists.");
    return;
  }

  createUser(firstName, lastName, emailAddress, password);
  window.location.href = "login.html?registered=1";
}






function handleLogin() {
  clearAllErrors();

  const emailAddress = getField("email");
  const password = getField("password");

  const emailError = validateEmail(emailAddress);
  const passwordError = validatePassword(password);

  showFieldError("email-err", emailError);
  showFieldError("password-err", passwordError);

  if (emailError != "" || passwordError != "") {
    return;
  }

  const matchingUser = findUserByEmail(emailAddress);

  if (matchingUser == null) {
    showFormError("No account found with that email address.");
    return;
  }

  if (matchingUser.password != password) {
    showFormError("Incorrect password. Please try again.");
    showFieldError("password-err", "Wrong password.");
    return;
  }

  saveCurrentUser(matchingUser);
  clearExamData();
  window.location.href = "exam.html";
}

function logout() {
  clearCurrentUser();
  clearExamData();
  window.location.href = "index.html";
}

function requireLogin() {
  const loggedInUser = getCurrentUser();

  if (loggedInUser == null) {
    window.location.href = "login.html";
  }

  return loggedInUser;
}
