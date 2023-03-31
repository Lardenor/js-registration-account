class User {
  constructor(firstName, lastName, date, email, password, confirm_password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }

  register() {
    console.log(this);
    if (localStorage.getItem(this.email)) {
      emailError.classList.remove("hidden");
      document.getElementById("email").style.borderColor = "red";
      emailError.textContent = "Користувач з такою електронною адресою вже існує";
      return;
    }
    localStorage.setItem(this.email, JSON.stringify(this));

  }
}

const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");

const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const dateError = document.querySelector("#dateError");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const date = document.getElementById("date").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm_password = document
    .getElementById("confirm_password")
    .value.trim();

  const nameRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ' ]+$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Перевірка поля Ім'я
  if (firstName === "") {
    firstNameError.classList.remove("hidden");
    document.getElementById("firstName").style.borderColor = "red";
    firstNameError.textContent = "Поле є обовязковим";
    return;
  } else if (firstName.length < 2) {
    firstNameError.classList.remove("hidden");
    document.getElementById("firstName").style.borderColor = "red";
    firstNameError.textContent = "Поле має містити мінімум дві літери";
    return;
  } else if (!nameRegex.test(firstName)) {
    firstNameError.classList.remove("hidden");
    document.getElementById("firstName").style.borderColor = "red";
    firstNameError.textContent =
      "Поле повинно містити тільки літери кирилиці та/або апостроф";
    return;
  } else {
    firstNameError.classList.add("hidden");
    document.getElementById("firstName").style.borderColor = "";
  }

  // Перевірка поля Прізвище
  if (lastName === "") {
    lastNameError.classList.remove("hidden");
    document.getElementById("lastName").style.borderColor = "red";
    lastNameError.textContent = "Поле є обовязковим";
    return;
  } else if (lastName.length < 2) {
    lastNameError.classList.remove("hidden");
    document.getElementById("lastName").style.borderColor = "red";
    lastNameError.textContent = "Поле має містити мінімум дві літери";
    return;
  } else if (!nameRegex.test(lastName)) {
    lastNameError.classList.remove("hidden");
    document.getElementById("lastName").style.borderColor = "red";
    lastNameError.textContent =
      "Поле повинно містити тільки літери кирилиці та/або апостроф";
    return;
  } else {
    lastNameError.classList.add("hidden");
    document.getElementById("lastName").style.borderColor = "";
  }

  // Перевірка поля Дата народження
  if (date === "") {
    dateError.classList.remove("hidden");
    document.getElementById("date").style.borderColor = "red";
    dateError.textContent = "Поле є обовязковим";
    return;
  } else {
    dateError.classList.add("hidden");
    document.getElementById("date").style.borderColor = "";
  }

  // Перевірка поля Email
  if (email === "") {
    emailError.classList.remove("hidden");
    document.getElementById("email").style.borderColor = "red";
    emailError.textContent = "Поле є обовязковим";
    return;
  } else if (!emailRegex.test(email)) {
    emailError.classList.remove("hidden");
    document.getElementById("email").style.borderColor = "red";
    emailError.textContent = "Поле повинно містити коректний email адресу";
    return;
  }else {
    emailError.classList.add("hidden");
    document.getElementById("email").style.borderColor = "";
  }

  // Перевірка поля Пароль
  if (password === "") {
    passwordError.classList.remove("hidden");
    document.getElementById("password").style.borderColor = "red";
    passwordError.textContent = "Поле є обовязковим";
    return;
  } else if (password.length < 6) {
    passwordError.classList.remove("hidden");
    document.getElementById("password").style.borderColor = "red";
    passwordError.textContent = "Пароль має містити мінімум 6 символів";
    return;
  } else {
    passwordError.classList.add("hidden");
    document.getElementById("password").style.borderColor = "";
  }

  // Перевірка поля Підтвердження паролю
  if (confirm_password === "") {
    confirmPasswordError.classList.remove("hidden");
    document.getElementById("confirm_password").style.borderColor = "red";
    confirmPasswordError.textContent = "Поле є обовязковим";
    return;
  } else if (confirm_password !== password) {
    confirmPasswordError.classList.remove("hidden");
    document.getElementById("confirm_password").style.borderColor = "red";
    confirmPasswordError.textContent = "Паролі не співпадають";
    return;
  } else {
    confirmPasswordError.classList.add("hidden");
    document.getElementById("confirm_password").style.borderColor = "";
  }

  const user = new User(
    firstName,
    lastName,
    date,
    email,
    password,
    confirm_password
  );
  user.register();
});

const register_btn = document.getElementById("register_btn");
register_btn.addEventListener(
  "click",
  (showRegister = () => {
    loginForm.style.display = "none";
    registrationForm.style.display = "block";
  })
);
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPassword = document.getElementById("loginPassword").value.trim();
  const userData = localStorage.getItem(loginEmail);
  //
  const container = document.querySelector(".container");
  //Робота з вікном аккаунту нижче

  if (userData) {
    const user = JSON.parse(userData);
    if (user.password === loginPassword) {
      loginForm.style.display = "none";
      userInfo(loginEmail);
      container.style.display = "block";
       //! Видалення користувача
      const clearButton = document.getElementById("clear-storage");
      clearButton.addEventListener("click", function () {
        localStorage.removeItem(loginEmail);
              loginForm.style.display = "block";
      container.style.display = "none";

      });
      //! Видалення користувача
      // *
      const logout=document.getElementById('logout')
      logout.addEventListener("click",function(){
                   loginForm.style.display = "block";
      container.style.display = "none";
      })
      // *
    } else {
      alert("Шось не то");
    }
  } else {
    alert("Користувача не знайдено");
  }
});
const toLogin = document.getElementById("toLogin");
toLogin.addEventListener(
  "click",
  (showLogin = () => {
    loginForm.style.display = "block";
    registrationForm.style.display = "none";
  })
);

function userInfo(loginEmail) {
  const userData = localStorage.getItem(loginEmail);
  const userDataParse = JSON.parse(userData);
  const nameInfo = userDataParse.firstName;
  const lastNameInfo = userDataParse.lastName;
  const dataInfo = userDataParse.date;
  const emailInfo = userDataParse.email;

  document.querySelector(".user_name").innerHTML = `<span class="span">Ім'я користувача:</span><span>${nameInfo}</span>`;
  document.querySelector(".user_lastname").innerHTML = `<span class="span">Прізвище'я користувача:</span><span>${lastNameInfo}</span>`;
  document.querySelector(".user_date").innerHTML = `<span class="span">Дата народження'я користувача:</span><span>${dataInfo}</span>`;
  document.querySelector(".user_email").innerHTML = `<span class="span">Email користувача:</span><span></span>${emailInfo}`;
}
