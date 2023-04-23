const contentEl = document.querySelector('.content');
const alertMessageEl = document.querySelector('.alertMessage');
const logInFormEl = document.querySelector('.logInForm');
const signUpForm = document.querySelector('.signUpForm');

contentEl.classList.add('d-flex');

// toggle the forms
function signUpToggle(e) {
  e.preventDefault();
  logInFormEl.classList.add('display-none');
  signUpForm.classList.remove('display-none');
}
function signInToggle(e) {
  e.preventDefault();
  signUpForm.classList.add('display-none');
  logInFormEl.classList.remove('display-none');
}

const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      const message = await response.json()
      alertMessageEl.textContent = message.message;
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector('#user-name').value.trim();
  const email = document.querySelector('#email-signUp').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();

  if (user_name && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// event listener
logInFormEl.addEventListener('submit', loginFormHandler);
signUpForm.addEventListener('submit', signupFormHandler);

document
.querySelector('.signUp-toggle')
.addEventListener('click', signUpToggle);
document
.querySelector('.signIn-toggle')
.addEventListener('click', signInToggle);