// Toggle menu for mobile view
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Show user menu when clicking on the user icon
document.getElementById('userIcon').addEventListener('click', function() {
    // Here you can add functionality to show user settings or profile options
    alert('User menu clicked!');
});
