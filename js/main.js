
window.addEventListener('load', function() {
	// Utility functions
	function $(selector) { return document.querySelector(selector) }
	function $$(selector) { return [].slice.call(document.querySelectorAll(selector)) }
	function mod(n, m) { return ((n % m) + m) % m }

	// Retrieve important elements from DOM
	var slideshow = $('.slideshow');
	var nextButton = $('.next-slide');
	var prevButton = $('.prev-slide');
	var pagingInfo = $('.paging-info');

	if (slideshow != undefined) {
		var slides = $$('.slideshow > *');
		var currentIndex = 0;

		// If image(s) are smaller than default slideshow height, shrink slideshow to fit
		var maxHeight = slides.reduce(function(height, el) { return Math.max(height, el.offsetHeight) }, 0);
		slideshow.style.height = maxHeight + 'px';

		var timeout, duration, defaultDuration = 5000;;

		function setSlide(newIndex) {    
			slides[currentIndex].classList.remove('visible'); 	// Hide current slide
			currentIndex = mod(newIndex, slides.length); 				// Update slide index
			slides[currentIndex].classList.add('visible'); 			// Show new slide
			
			// Update slide counter
			if(pagingInfo != undefined) {
				pagingInfo.textContent = (currentIndex + 1) + " of " + slides.length; 
			}

			// Clear old timer and set new one
			clearTimeout(timeout);
			
			duration = Number(slides[currentIndex].dataset.duration) || defaultDuration; // Get duration for next timer
			timeout  = setTimeout(function() {
				if ($('.slideshow:hover') == null) { 	// Only activate next slide if slideshow is not being hovered
					nextSlide();
				} else { 															// Otherwise, reset timer
					setSlide(currentIndex);
				}
			}, duration);
		}

		function nextSlide() { setSlide(currentIndex + 1) } // Increment slide
		function prevSlide() { setSlide(currentIndex - 1) } // Decrement slide

		// Apply callbacks to slideshow control buttons
		if(nextButton != undefined) nextButton.addEventListener('click', nextSlide);
		if(nextButton != undefined) prevButton.addEventListener('click', prevSlide);

		slideshow.addEventListener('click', nextSlide);

		setSlide(0);
	}
})
