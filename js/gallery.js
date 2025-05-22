const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPopup = document.querySelector('.gallery-popup');
const popupImage = document.querySelector('.popup-image');
const closeBtnGallery = galleryPopup.querySelector('.close-btn');
const prevBtn = galleryPopup.querySelector('.prev-btn');
const nextBtn = galleryPopup.querySelector('.next-btn');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    const imgSrc = item.querySelector('img').src;
    popupImage.src = imgSrc;
    popupImage.alt = item.querySelector('img').alt;
    galleryPopup.classList.add('active');
    updateNavButtons();
    document.body.style.overflow = 'hidden';
  });
});

closeBtnGallery.addEventListener('click', () => {
  galleryPopup.classList.remove('active');
  document.body.style.overflow = '';
});

galleryPopup.addEventListener('click', (e) => {
  if (e.target === galleryPopup) {
    galleryPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < galleryItems.length - 1) {
    currentIndex++;
    updateImage();
  }
});

function updateImage() {
  const imgSrc = galleryItems[currentIndex].querySelector('img').src;
  const imgAlt = galleryItems[currentIndex].querySelector('img').alt;
  
  const newImg = new Image();
  newImg.src = imgSrc;
  
  newImg.onload = () => {
    popupImage.src = imgSrc;
    popupImage.alt = imgAlt;
    updateNavButtons();
  };
}

function updateNavButtons() {
  prevBtn.classList.toggle('hidden', currentIndex === 0);
  nextBtn.classList.toggle('hidden', currentIndex === galleryItems.length - 1);
}

document.addEventListener('keydown', (e) => {
  if (!galleryPopup.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateImage();
  } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
    currentIndex++;
    updateImage();
  } else if (e.key === 'Escape') {
    galleryPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
});
