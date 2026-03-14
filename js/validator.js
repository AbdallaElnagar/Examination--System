



function validateName(inputValue, fieldLabel) {
  const trimmedName = inputValue.trim();

  if (trimmedName == "") {
    return fieldLabel + " is required.";
  }

  if (trimmedName.length < 2) {
    return fieldLabel + " must be at least 2 characters.";
  }

  if (!/^[a-zA-Z-]+$/.test(trimmedName)) {
    return fieldLabel + " can only contain letters.";
  }

  return "";
}

function validateFirstName(inputValue) {
  return validateName(inputValue, "First name");
}

function validateLastName(inputValue) {
  return validateName(inputValue, "Last name");
}

function validateEmail(inputValue) {
  const trimmedEmail = inputValue.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (trimmedEmail === "") {
    return "Email address is required.";
  }

  if (!emailRegex.test(trimmedEmail)) {
    return "Please enter a valid email address.";
  }

  return "";
}



function validatePassword(passwordValue, confirmValue = null) {
  if (passwordValue == "") {
    return "Password is required.";
  }

  if (passwordValue.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (confirmValue !== null) {
    if (confirmValue == "") {
      return "Please confirm your password.";
    }
    if (passwordValue != confirmValue) {
      return "Passwords do not match.";
    }
  }

  return "";
}
