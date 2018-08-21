window.$ = window.jQuery = require('jquery');
global.Popper = require('popper.js');
var bootstrap = require('bootstrap');
var magnificPopup = require('magnific-popup');
var matchHeight = require('jquery-match-height');
var slick = require('slick-carousel');

$('.browser-address-slider').slick({
  arrows: false,
  infinite: true,
  speed: 300,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 3000,
  asNavFor: '.browser-content-slider'
});

$('.browser-content-slider').slick({
  arrows: false,
  infinite: true,
  speed: 300,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 3000,
  asNavFor: '.browser-address-slider'
});

$('.browser-left-arrow').click(function(){
  $('.browser-content-slider').slick('slickPrev');
})

$('.browser-right-arrow').click(function(){
  $('.browser-content-slider').slick('slickNext');
})

$(".container" ).hover(
  function() {
    $( this ).addClass( "hover" );
  }, function() {
    $( this ).removeClass( "hover" );
  }
);

$('.home-testimonials').slick({
  arrows: false,
  infinite: true,
  speed: 300,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 3000
});

$('.dropdown-chevron-mobile').on('click', function(e) {

  e.preventDefault();

  // Toggles the arrow class on itself.
  $(this).toggleClass('open');

  // Get the parent list item and its id.
  var parent = $(e.target).parent('li');
  parent.children('ul').toggleClass('open');

});

/* Back to top */
$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
    $('.back-to-top').fadeIn();
  } else {
    $('.back-to-top').fadeOut();
  }
});

$('.back-to-top').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 600);
  return false;
});

/* Match height */
$('.pricing-card-features').matchHeight();
$('.panel').matchHeight();

/* Magnific Popup */
$('.image-link').magnificPopup({
  type:'image',
  gallery: {
    enabled: true
  }
});

/*slick*/
// $('.your-class').slick({
//   autoplay: true,
//   // cssEase: fade;
// });
var $status = $('.pagingInfo');
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
});
