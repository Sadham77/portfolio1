// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = isOpen ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu'></i>";
  });

  // close menu after clicking a link (mobile)
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
      menuToggle.innerHTML = "<i class='bx bx-menu'></i>";
    });
  });
}

// ===== Highlight current section in nav on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function setActiveLink() {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('current', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== Terminal typing effect =====
const typedLine = document.getElementById('typedLine');
const messages = [
  "console.log('Full Stack Java Developer')",
  "npm run build --prod",
  "git commit -m \"ship it\""
];

function typeLoop(msgIndex = 0) {
  if (!typedLine) return;
  const text = messages[msgIndex % messages.length];
  let i = 0;
  typedLine.textContent = '';

  const typeInterval = setInterval(() => {
    typedLine.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      setTimeout(() => eraseLine(msgIndex), 1600);
    }
  }, 55);
}

function eraseLine(msgIndex) {
  const eraseInterval = setInterval(() => {
    const current = typedLine.textContent;
    if (current.length === 0) {
      clearInterval(eraseInterval);
      typeLoop(msgIndex + 1);
      return;
    }
    typedLine.textContent = current.slice(0, -1);
  }, 25);
}

typeLoop();

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
