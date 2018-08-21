var Siema = require('./siema.min')

new Siema({
  selector: '.slideshow',
  duration: 1000,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: false,
  multipleDrag: false,
  threshold: 20,
  loop: true,
  rtl: false,
  // onInit: () => {},
  onChange: () => {},
});

/*var $status = $('.pagingInfo');
var $slickElement = $('.your-class');


$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + ' of ' + slick.slideCount);
});

$slickElement.slick({
    // slide: 'img',
    draggable: false,
    autoplay: true,
    appendArrows: $('.hero__nav'),
    prevArrow: $('.js-hero-prev'),
    nextArrow: $('.js-hero-next'),
    dots: false,
    speed: 700,
    fade: true,
    variableWidth: true,
    cssEase: 'linear'
});*/
