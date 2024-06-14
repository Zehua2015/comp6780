let currentIndex = 0; // Initialize the current index

function openModal(element) {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = element.children[0].src;
  captionText.innerHTML = element.children[0].alt;
  document.body.classList.add('modal-open');

  // Set currentIndex to the index of the clicked gallery item
  currentIndex = Array.from(document.getElementsByClassName('gallery-item')).indexOf(element);
  displayImage(currentIndex);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeyDown);

  // Enable "focus" option for the close, prev, next button
  document.querySelector('.close').tabIndex = 0;
  // console.log("enabled");
  document.querySelector('.prev').tabIndex = 0;
  document.querySelector('.next').tabIndex = 0;
}
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
  function closeModal() {
    // console.log("closed");
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleKeyDown);
  
    // Disable "focus" option
    document.querySelector('.close').tabIndex = -1;
    document.querySelector('.prev').tabIndex = -1;
    document.querySelector('.next').tabIndex = -1;
  }
  
  function changeImage(step) {
    // Calculate new index
    currentIndex += step;
    const items = document.getElementsByClassName('gallery-item');
    if (currentIndex >= items.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = items.length - 1;
    }
    displayImage(currentIndex);
  }
  
  function displayImage(index) {
    const items = document.getElementsByClassName('gallery-item');
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    modalImg.src = items[index].getElementsByTagName('img')[0].src;
    captionText.innerHTML = items[index].getElementsByTagName('img')[0].alt;
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      changeImage(-1);
    } else if (event.key === 'ArrowRight') {
      changeImage(1);
    } else if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      
      const focusableElements = [
        document.querySelector('.close'),
        document.querySelector('.prev'),
        document.querySelector('.next')
      ];
      
      let currentIndex = focusableElements.findIndex(el => el === document.activeElement);
      
      if (event.shiftKey) {
        // If Shift+Tab pressed, move focus to the previous element
        currentIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
      } else {
        // If Tab pressed, move focus to the next element
        currentIndex = (currentIndex + 1) % focusableElements.length;
      }
      
      focusableElements[currentIndex].focus();
    }
  }