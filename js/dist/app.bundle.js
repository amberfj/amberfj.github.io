(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{}]},{},[1]);
