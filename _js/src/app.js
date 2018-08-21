
var slideshow = document.querySelector('.slideshow');
var nextButton = document.querySelector('.next-slide');
var prevButton = document.querySelector('.prev-slide');
var info = document.querySelector('.paging-info');

var delay = 5000;

if (slideshow != undefined) {
  var slides = [].slice.call(document.querySelectorAll('.slideshow > *'));
  var currentIndex = 0;

  var timeout;

  function setSlide(newIndex) {
    // hide current slide
    slides[currentIndex].classList.remove('visible');
    // make sure index is positive and within length of the array
    currentIndex = ((newIndex % slides.length) + slides.length) % slides.length;
    // show new slide
    slides[currentIndex].classList.add('visible');
    // update info
    if(info != undefined) info.textContent = currentIndex + " of " + slides.length;
    // set new timeout
    clearTimeout(timeout)
    timeout = setTimeout(nextSlide, delay)
  }

  function nextSlide() { setSlide(currentIndex + 1) }
  function prevSlide() { setSlide(currentIndex - 1) }

  if(nextButton != undefined) nextButton.addEventListener('click', nextSlide);
  if(nextButton != undefined) prevButton.addEventListener('click', prevSlide);

  setSlide(0);
}