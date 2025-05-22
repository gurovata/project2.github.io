const header = document.querySelector('.header');
let isHeaderFixed = false;
let secondScreenTop = 0;

function calculateSecondScreenPosition() {
  const firstSection = document.querySelector('section');
  secondScreenTop = firstSection.offsetTop + firstSection.offsetHeight;
}

window.addEventListener('load', calculateSecondScreenPosition);
window.addEventListener('resize', calculateSecondScreenPosition);

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  if (scrollPosition >= secondScreenTop && !isHeaderFixed) {
    header.classList.add('fixed');
    isHeaderFixed = true;

    document.body.style.paddingTop = `${header.offsetHeight}px`;
  } 

  else if (scrollPosition < secondScreenTop && isHeaderFixed) {
    header.classList.remove('fixed');
    isHeaderFixed = false;

    document.body.style.paddingTop = '0';
  }
});
