// settings.js

// Theme toggle management
let currentTheme = 'light';

function toggleTheme() {
    currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
    document.body.className = currentTheme;
    saveSettings();
}

// Settings management
function saveSettings() {
    localStorage.setItem('theme', currentTheme);
}

function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.className = currentTheme;
    }
}

// Initialize settings on page load
loadSettings();
