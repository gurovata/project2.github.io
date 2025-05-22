const timedPopup = document.querySelector('.timed-popup');
const closeBtnPopup = timedPopup.querySelector('.close-btn');
const subscribeBtn = timedPopup.querySelector('.subscribe-btn');

const hasClosedPopup = localStorage.getItem('popupClosed') === 'true';

if (!hasClosedPopup) {
  setTimeout(() => {
    timedPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 30000);
}

closeBtnPopup.addEventListener('click', () => {
  timedPopup.classList.remove('active');
  document.body.style.overflow = '';

  localStorage.setItem('popupClosed', 'true');
});

timedPopup.addEventListener('click', (e) => {
  if (e.target === timedPopup) {
    timedPopup.classList.remove('active');
    document.body.style.overflow = '';
    localStorage.setItem('popupClosed', 'true');
  }
});

subscribeBtn.addEventListener('click', () => {
  timedPopup.classList.remove('active');
  document.body.style.overflow = '';
  localStorage.setItem('popupClosed', 'true');

  alert('Спасибо за подписку!');
});
