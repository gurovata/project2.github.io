const animatedSvg = document.querySelector('.animated-svg');
const animatedPath = document.querySelector('.animated-path');
const circle = animatedSvg.querySelector('circle');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  const rotation = (scrollPosition / windowHeight) * 360;
  animatedSvg.style.transform = `rotate(${rotation}deg)`;

  const hue = (scrollPosition / 10) % 360;
  circle.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
});

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const xRatio = mouseX / windowWidth;
  const yRatio = mouseY / windowHeight;

  const startX = 100;
  const startY = 50 + (yRatio * 20);
  const endX = 150 - (xRatio * 50);
  const endY = 100 + (yRatio * 30);
  
  animatedPath.setAttribute('d', `M ${startX},${startY} A 50,50 0 0,1 ${endX},${endY}`);
  animatedPath.setAttribute('stroke-width', 2 + (xRatio * 3));

  const hue = (mouseX / windowWidth) * 360;
  animatedPath.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
});
