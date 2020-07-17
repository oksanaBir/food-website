const getLittleSlider = () => document.querySelector('.littleSlider .sliderWrapper');
const getSlides = () => [...document.querySelectorAll('.bigSlider .slide')];
const getLittleSlides = () => [...document.querySelectorAll('.littleSlider .slide')];
const getBigSlidesCount = () => getSlides().length;

let active = 0;

const getNextSlideNumber = () => {
  const count = getBigSlidesCount();
  return active >= count - 1 ? 0 : active + 1;
}

const getPrevSlideNumber = () => {
  const count = getBigSlidesCount();
  return active === 0 ? count - 1 : active - 1;
}

let bigSliderTimeout = 0;
const resetBigSliderTimeout = () => {
  clearTimeout(bigSliderTimeout);
  bigSliderTimeout = setTimeout(openNextSlide, 1000 * 6);
}

const openNextSlide = () => {
  resetBigSliderTimeout();

  const slides = getSlides();
  slides.map((slide) => {
    slide.style.zIndex = 0;
  });
  slides[active].style.zIndex = 5;
  const nextSlide = slides[getNextSlideNumber()];
  nextSlide.style.zIndex = 10;
  nextSlide.style.transition = 'none';
  nextSlide.style.left = '-100%';
  setTimeout(() => {
    nextSlide.style.transition = 'left 0.3s';
    nextSlide.style.left = '0%';
  }, 100);
  active = getNextSlideNumber();
}

const openPrevSlide = () => {
  resetBigSliderTimeout();

  const slides = getSlides();
  slides.map((slide) => {
    slide.style.zIndex = 0;
  });
  slides[active].style.zIndex = 5;
  const prevSlide = slides[getPrevSlideNumber()];
  prevSlide.style.zIndex = 10;
  prevSlide.style.transition = 'none';
  prevSlide.style.left = '100%';
  setTimeout(() => {
    prevSlide.style.transition = 'left 0.3s';
    prevSlide.style.left = '0%';
  }, 100);
  active = getPrevSlideNumber();
}

const littleSliderParams = {
  i: 4,
  minOrder: -1,
  maxOrder: 1,
  blockButtons: false,
}

const moveLeftLittleSlider = () => {
  if(littleSliderParams.blockButtons) {
    return false;
  }

  littleSliderParams.blockButtons = true;
  const littleSlider = getLittleSlider();
  const littleSlides = getLittleSlides();
  littleSlides[littleSliderParams.i].style.order = littleSliderParams.minOrder;
  littleSlider.style.transition = 'none';
  littleSlider.style.left = -356 + 'px';
  setTimeout(() => {
    littleSlider.style.left = 0 + 'px';
    littleSlider.style.transition = 'left 0.15s';
    littleSliderParams.blockButtons = false;
  }, 200);
  littleSliderParams.i = littleSliderParams.i === 0
    ? (littleSlides.length - 1)
    : --littleSliderParams.i;
    littleSliderParams.minOrder--;
}

const moveRightLittleSlider = () => {
  if(littleSliderParams.blockButtons) {
    return false;
  }

  littleSliderParams.blockButtons = true;
  const littleSlider = getLittleSlider();
  const littleSlides = getLittleSlides();
  littleSlider.style.transition = 'left 0.15s';
  littleSlider.style.left = -356 + 'px';    
  setTimeout(() => {
    littleSlides[littleSliderParams.i].style.order = littleSliderParams.maxOrder;
    littleSlider.style.transition = 'none';    
    littleSlider.style.left = 0 + 'px';
    littleSliderParams.blockButtons = false;
  }, 200);
  littleSliderParams.i = littleSliderParams.i === (littleSlides.length - 1)
    ? 0
    : ++littleSliderParams.i;
    littleSliderParams.maxOrder++;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bigControlLeftButton').onclick = openPrevSlide;
  document.getElementById('bigControlRightButton').onclick = openNextSlide;
  document.getElementById('littleControlLeftButton').onclick = moveLeftLittleSlider;
  document.getElementById('littleControlRightButton').onclick = moveRightLittleSlider;

  resetBigSliderTimeout();
});
