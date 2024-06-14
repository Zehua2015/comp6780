// Add an event listener for the gallery 'click' event
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
const galleryButton = document.getElementById('galleryButton');
galleryButton.addEventListener('click', function() {
    // This function will be called when the button is clicked
    window.location.href = 'gallery.html';
  });
});

let activeInfo = null;  // track the current activated info session
let hoverInfo = false;  // track whether mouse hover above the info session.

document.querySelectorAll('.img-box').forEach(box => { // For each img-box
    const info = document.getElementById(box.getAttribute('data-info'));

    box.addEventListener('mouseenter', () => { // when mouse hover above the img-box
        // If there are other info session activated, disactivate it
        if (activeInfo && activeInfo !== info) {
            activeInfo.style.padding = '0px';
            activeInfo.style.height = '0';
            activeInfo.style.opacity = '0';
        }
        // Otherwise, show current info session
        const scrollHeight = info.scrollHeight;
        info.style.padding = '20px';
        info.style.height = scrollHeight + 'px';
        info.style.opacity = '1';
        activeInfo = info;  // update current info flag
    });

    box.addEventListener('mouseleave', () => { 
        // set timeout to detect if mouse hover above info session
        setTimeout(() => {
            if (activeInfo === info && hoverInfo != true) {
                info.style.padding = '0px';
                info.style.height = '0';
                info.style.opacity = '0';
                activeInfo = null;  // clear current info flag
            }
        }, 50);
    });

    info.addEventListener('mouseenter', () => { // if mouse hover above info session
        activeInfo = info;
        hoverInfo = true;
    });

    info.addEventListener('mouseleave', () => { // hide info if mouse leave current info session
        info.style.padding = '0px';
        info.style.height = '0';
        info.style.opacity = '0';
        activeInfo = null;  // clear current info flag
        hoverInfo = false;
    });
});