(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

window.addEventListener('load', function() {
  function $(selector) { return document.querySelector(selector) }
  function $$(selector) { return [].slice.call(document.querySelectorAll(selector)) }

  var slideshow = $('.slideshow');
  var nextButton = $('.next-slide');
  var prevButton = $('.prev-slide');
  var info = $('.paging-info');

  var defaultDuration = 5000;

  if (slideshow != undefined) {
    var slides = $$('.slideshow > *');
    var currentIndex = 0;

    var maxHeight = slides.reduce(function(height, el) { return Math.max(height, el.offsetHeight) }, 0);
    slideshow.style.height = maxHeight + 'px';

    console.log(maxHeight);

    var timeout;

    function setSlide(newIndex) {    
      // hide current slide
      slides[currentIndex].classList.remove('visible');
      // make sure index is positive and within length of the array
      currentIndex = ((newIndex % slides.length) + slides.length) % slides.length;
      // show new slide
      slides[currentIndex].classList.add('visible');
      // update info
      if(info != undefined) info.textContent = (currentIndex + 1) + " of " + slides.length;
      // set new timeout
      var duration = Number(slides[currentIndex].dataset.duration) || defaultDuration;

      clearTimeout(timeout)
      timeout = setTimeout(function() {
        // only activate next slide if slideshow is not being hovered, otherwise reset timeout
        if ($('.slideshow:hover') == null) {
          nextSlide();
        } else {
          setSlide(currentIndex);
        }
      }, duration)
    }

    function nextSlide() { setSlide(currentIndex + 1) }
    function prevSlide() { setSlide(currentIndex - 1) }

    if(nextButton != undefined) nextButton.addEventListener('click', nextSlide);
    if(nextButton != undefined) prevButton.addEventListener('click', prevSlide);

    slideshow.addEventListener('click', nextSlide);

    setSlide(0);
  }
})

},{}]},{},[1]);
