const feedbackBtns = document.querySelectorAll('.feedback-btn');
const feedbackPopup = document.querySelector('.feedback-popup');
const closeBtn = feedbackPopup.querySelector('.close-btn');
const feedbackForm = document.getElementById('feedback-form');
const submitBtn = feedbackForm.querySelector('.submit-btn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const messageError = document.getElementById('message-error');

nameInput.addEventListener('input', () => validateName());
emailInput.addEventListener('input', () => validateEmail());
phoneInput.addEventListener('input', () => validatePhone());
messageInput.addEventListener('input', () => validateMessage());

feedbackBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    feedbackPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', () => {
  feedbackPopup.classList.remove('active');
  document.body.style.overflow = '';
});

feedbackPopup.addEventListener('click', (e) => {
  if (e.target === feedbackPopup) {
    feedbackPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
});

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  resetErrors();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
    submitForm();
  }
});

function validateName() {
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
  if (!nameRegex.test(nameInput.value.trim())) {
    showError(nameInput, nameError, 'Имя должно содержать только буквы русского или английского алфавита');
    return false;
  }
  clearError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Введите корректный email адрес');
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}

function validatePhone() {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
    showError(phoneInput, phoneError, 'Введите корректный номер телефона (10-15 цифр)');
    return false;
  }
  clearError(phoneInput, phoneError);
  return true;
}

function validateMessage() {
  if (messageInput.value.trim() === '') {
    showError(messageInput, messageError, 'Пожалуйста, введите сообщение');
    return false;
  }
  clearError(messageInput, messageError);
  return true;
}

function showError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove('error');
  errorElement.textContent = '';
}

function resetErrors() {
  const inputs = [nameInput, emailInput, phoneInput, messageInput];
  const errors = [nameError, emailError, phoneError, messageError];
  
  inputs.forEach(input => input.classList.remove('error'));
  errors.forEach(error => error.textContent = '');
}

function submitForm() {
  submitBtn.textContent = 'Отправляем...';
  submitBtn.classList.add('sending');
  submitBtn.disabled = true;

  const formData = new FormData(feedbackForm);

  const endpoint = 'https://jsonplaceholder.typicode.com/posts';
  
  fetch(endpoint, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    submitBtn.textContent = 'Успешно отправлено';
    submitBtn.classList.remove('sending');
    submitBtn.classList.add('success');

    setTimeout(() => {
      feedbackForm.reset();
      submitBtn.textContent = 'Отправить';
      submitBtn.classList.remove('success');
      submitBtn.disabled = false;
      feedbackPopup.classList.remove('active');
      document.body.style.overflow = '';
    }, 2000);
  })
  .catch(error => {
    submitBtn.textContent = 'Ошибка отправки';
    submitBtn.classList.remove('sending');
    submitBtn.classList.add('error');

    setTimeout(() => {
      submitBtn.textContent = 'Отправить';
      submitBtn.classList.remove('error');
      submitBtn.disabled = false;
    }, 2000);
  });
}
