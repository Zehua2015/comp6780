// Select the help, scroll-to-top, back-to-main, and more buttons
var helpBtn = document.querySelector(".help-btn");
var scrollToTopBtn = document.querySelector(".scroll-to-top");
var backToMainBtn = document.querySelector(".back-to-main");
var moreBtn = document.querySelector(".more-btn");

// Flag to track if buttons are shown
var buttonsShown = false;

// Add a click event listener to the help button
helpBtn.addEventListener('click', function(event) {
  event.stopPropagation();
  // Toggle the visibility of the scroll-to-top, back-to-main, and more buttons
  if (!buttonsShown) {
    scrollToTopBtn.classList.add("show");
    backToMainBtn.classList.add("show");
    moreBtn.classList.add("show");
    buttonsShown = true;
    updateScrollToTopOpacity();  // update opacity
  } else {
    scrollToTopBtn.classList.remove("show");
    backToMainBtn.classList.remove("show");
    moreBtn.classList.remove("show");
    buttonsShown = false;
    scrollToTopBtn.style.opacity = "0";  // set opacity to 0 when button hiden
  }
});

// Add a click event listener to the scroll-to-top button
scrollToTopBtn.addEventListener('click', function(event) {
  event.stopPropagation();
  scrollToTop();
});

// Add a click event listener to the back-to-main button
backToMainBtn.addEventListener('click', function(event) {
  event.stopPropagation();
  // Go back to the main page
  window.location.href = "index.html";
});

// This function smoothly scrolls the page to the top
function scrollToTop() {
  var currentPosition = document.body.scrollTop || document.documentElement.scrollTop;
  if (currentPosition > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentPosition - currentPosition / 8);
  }
}

// This function updates the opacity of the scroll-to-top button based on the scroll position
function updateScrollToTopOpacity() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.opacity = "1";
  } else {
    scrollToTopBtn.style.opacity = "0.7";
  }
}

// When the page is scrolled, update the opacity of the scroll-to-top button
window.addEventListener('scroll', function() {
  if (buttonsShown) {  // update opacity only button shown
    updateScrollToTopOpacity();
  }
});