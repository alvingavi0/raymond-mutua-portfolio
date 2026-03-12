// script.js
// Handles mobile navigation toggle, smooth scrolling, and lightbox functionality

// open/close mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('nav ul');
navToggle.addEventListener('click', () => {
  navUl.classList.toggle('show');
});

// close menu when a nav link is clicked (mobile)
navUl.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navUl.classList.remove('show');
  }
});

// gallery lightbox
const galleryPhotos = document.querySelectorAll('.gallery .photo img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

galleryPhotos.forEach(photo => {
  photo.addEventListener('click', () => {
    lightbox.innerHTML = '';
    const img = document.createElement('img');
    img.src = photo.src;
    lightbox.appendChild(img);
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// fade in sections on scroll
const faders = document.querySelectorAll('.fade-in');
const options = {threshold: 0.1};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// theme toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    icon.classList.replace('fa-moon','fa-sun');
  } else {
    document.body.classList.remove('light');
    icon.classList.replace('fa-sun','fa-moon');
  }
  localStorage.setItem('theme', theme);
}

// initialize
let saved = localStorage.getItem('theme');
if (saved === 'light' || saved === 'dark') {
  setTheme(saved);
} else {
  // default to dark
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const current = document.body.classList.contains('light') ? 'light' : 'dark';
  setTheme(current === 'light' ? 'dark' : 'light');
});

// skill card flip handling
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  const btn = card.querySelector('.learn-btn');
  const backBtn = card.querySelector('.back-btn');
  btn.addEventListener('click', () => {
    card.classList.add('flipped');
  });
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      card.classList.remove('flipped');
    });
  }
});
