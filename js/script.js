var loginBtn = document.getElementById("login");
var signupBtn = document.getElementById("signup");
var emailLogin = document.getElementById("emailLogin");
var passwordLogin = document.getElementById("passwordLogin");
var nameSignup = document.getElementById("nameSignup");
var emailSignup = document.getElementById("emailSignup");
var passwordSignup = document.getElementById("passwordSignup");
var alertSpanSignUp = document.getElementById("alert");
var alertSpanLogin = document.getElementById("alert-login");

var homePage = document.getElementById("home-data");
var currentUser = {};
if (localStorage.getItem("currentUser") != null) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
}
var loginData = [];
if (localStorage.getItem("loginData") != null) {
  loginData = JSON.parse(localStorage.getItem("loginData"));
}

function startHomePage() {
  homePage.innerHTML = `Hallo ${currentUser.name}`;
}
// signupBtn.addEventListener("click", function () {
//   e.preventDefault();
// localStorage.setItem("","")
// localStorage.removeItem("","")
// localStorage.getItem("")
// localStorage.clear()
// localStorage.key()
function signUp() {
  var newUser = {
    name: nameSignup.value,
    email: emailSignup.value,
    password: passwordSignup.value,
  };
  console.log(newUser);
  var nameRegex = /^[A-Za-z]{3,}$/;
  var emailRegex = /^[a-zA-Z]+(?:[\.\-\_][a-zA-Z0-9]+)*@([a-zA-Z0-9]{2,})+\.([a-zA-Z]{2,})$/;
  var passwordRegex = /(.*[A-Za-z0-9].*){8,}/;
  if (nameRegex.test(newUser.name.trim())) {
    if (emailRegex.test(newUser.email.trim())) {
      if (validEmail() == true) {
        if (passwordRegex.test(newUser.password)) {
          loginData.push(newUser);
          localStorage.setItem("loginData", JSON.stringify(loginData));
          console.log(loginData);
          location.href = "index.html";
        } else if (newUser.password.trim() == "") {
          alertSpanSignUp.innerHTML = "please enter a new password";
          alertSpanSignUp.classList.remove("d-none");
        } else {
          alertSpanSignUp.innerHTML = "password should have 8 letters und numbers";
          alertSpanSignUp.classList.remove("d-none");
        }
      } else {
        alertSpanSignUp.innerHTML = "This email is already resgisted";
        alertSpanSignUp.classList.remove("d-none");
      }
    } else if (newUser.email.trim() == "") {
      alertSpanSignUp.innerHTML = "please enter a valid email";
      alertSpanSignUp.classList.remove("d-none");
    } else {
      alertSpanSignUp.innerHTML = "email should be like test@test.com";
      alertSpanSignUp.classList.remove("d-none");
    }
  } else if (newUser.name.trim() == "") {
    alertSpanSignUp.innerHTML = "please enter a valid user name";
    alertSpanSignUp.classList.remove("d-none");
  } else {
    alertSpanSignUp.innerHTML = "user name should be more than 3 characters";
    alertSpanSignUp.classList.remove("d-none");
  }
}
function signIn() {
  var enteredValue = {
    email: emailLogin.value,
    password: passwordLogin.value,
  };
  var returnedUser = validEmail(enteredValue.email);
  if (returnedUser !== null) {
    console.log("here");
    if (returnedUser.password == enteredValue.password) {
      currentUser = returnedUser;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      location.href = "home.html";
    } else if (enteredValue.password == "") {
      alertSpanLogin.innerHTML = "please enter your password";
      alertSpanLogin.classList.remove("d-none");
    } else {
      alertSpanLogin.innerHTML = "your password is not correct";
      alertSpanLogin.classList.remove("d-none");
    }
  } else if (enteredValue.email.trim() == "") {
    alertSpanLogin.innerHTML = "please enter your email";
    alertSpanLogin.classList.remove("d-none");
  } else {
    alertSpanLogin.innerHTML = "email you entered is not registered";
    alertSpanLogin.classList.remove("d-none");
  }
}
function logout() {
  currentUser = {};
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}
function removeAlertLogin() {
  alertSpanLogin.classList.add("d-none");
}
function removeAlert() {
  alertSpanSignUp.classList.add("d-none");
}
function validEmail(enteredEmail) {
  var checkedEmail = enteredEmail === undefined ? emailSignup.value : enteredEmail;
  for (var i = 0; i < loginData.length; i++) {
    if (loginData[i].email.toLowerCase() == checkedEmail.toLowerCase()) {
      return enteredEmail === undefined ? false : loginData[i];
    }
  }
  return enteredEmail === undefined ? true : null;
}
