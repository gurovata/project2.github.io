const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const graduationDate = new Date('June 30, 2028 00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = graduationDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');

  if (distance < 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';

    const countdownSection = document.getElementById('countdown');
    const container = countdownSection.querySelector('.container');
    const heading = container.querySelector('h2');
    heading.textContent = 'Поздравляем с получением диплома МФТИ!';
  }
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);
