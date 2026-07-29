/* ===================== THEME TOGGLE (Midnight / Daybreak) ===================== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

function applyTheme(theme) {
  if (theme === 'daybreak') {
    root.setAttribute('data-theme', 'daybreak');
    themeLabel.textContent = 'Daybreak';
  } else {
    root.removeAttribute('data-theme');
    themeLabel.textContent = 'Midnight';
  }
  localStorage.setItem('sg-theme', theme);
}

const savedTheme = localStorage.getItem('sg-theme') || 'midnight';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = localStorage.getItem('sg-theme') || 'midnight';
  applyTheme(current === 'midnight' ? 'daybreak' : 'midnight');
});

/* ===================== CUSTOM THREAD CURSOR ===================== */
const threadDot = document.getElementById('threadDot');
let dotX = 0, dotY = 0, mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateDot() {
  dotX += (mouseX - dotX) * 0.25;
  dotY += (mouseY - dotY) * 0.25;
  threadDot.style.left = dotX + 'px';
  threadDot.style.top = dotY + 'px';
  requestAnimationFrame(animateDot);
}
animateDot();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    threadDot.style.width = '20px';
    threadDot.style.height = '20px';
  });
  el.addEventListener('mouseleave', () => {
    threadDot.style.width = '8px';
    threadDot.style.height = '8px';
  });
});

/* ===================== SCROLL PROGRESS THREAD ===================== */
const threadProgress = document.getElementById('threadProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  threadProgress.style.width = pct + '%';
});

/* ===================== NAV: ACTIVE LINK ON SCROLL ===================== */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentId = 'home';
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) {
      currentId = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

/* ===================== MOBILE NAV ===================== */
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('open'));
});

/* ===================== HERO TYPEWRITER ===================== */
const roles = [
  'Full-Stack Developer',
  'Competitive Programmer',
  'CS Undergrad @ HBTU',
  'Design Domain Head @ AutoRob'
];
const roleTextEl = document.getElementById('roleText');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    charIdx++;
    roleTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIdx--;
    roleTextEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

/* ===================== REVEAL ON SCROLL ===================== */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

/* ===================== COPY TO CLIPBOARD ===================== */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(val).then(() => {
      const original = btn.textContent;
      btn.textContent = 'copied!';
      setTimeout(() => { btn.textContent = original; }, 1500);
    });
  });
});
