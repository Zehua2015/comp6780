let userPrefersDarkMode = false;  // default: light mode

document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  userPrefersDarkMode = !userPrefersDarkMode;  // Update preference
});

// Loded preference
document.addEventListener('DOMContentLoaded', () => {
  if (userPrefersDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    setupEventListeners();
  }
});