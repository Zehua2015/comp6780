// Wait for the DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  // Select all the dropdown links (the direct child <a> elements of .dropdown elements)
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  // For each selected dropdown link, perform the following actions
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent the default click behavior (navigation)
      e.preventDefault();
    });

    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Prevent the default 'Enter' key behavior
        e.preventDefault();
        // Close all currently open dropdowns
        closeAllDropdowns();
        // Add the 'active' class to the parent element (the dropdown) to show the dropdown
        this.parentNode.classList.add('active');
      }
      // If the pressed key is 'Escape'
      if (e.key === 'Escape') {
        // Remove the 'active' class from the parent element (the dropdown) to hide the dropdown
        this.parentNode.classList.remove('active');
      }
    });

    // Add a mouseover event listener to the parent element (the dropdown)
    link.parentNode.addEventListener('mouseover', function() {
      // Close all currently open dropdowns
      closeAllDropdowns();
      // Add the 'active' class to the current dropdown to show it
      this.classList.add('active');
    });

    link.parentNode.addEventListener('mouseout', function() {
      // Remove the 'active' class from the current dropdown to hide it
      this.classList.remove('active');
    });
  });

  // Function to close all currently open dropdowns
  function closeAllDropdowns() {
    // Select all elements that have both 'dropdown' and 'active' classes
    const activeDropdowns = document.querySelectorAll('.dropdown.active');
    // For each active dropdown
    activeDropdowns.forEach(dropdown => {
      // Remove the 'active' class to hide the dropdown
      dropdown.classList.remove('active');
    });
  }
});