// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // stop watching once visible
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ── MOBILE NAV HAMBURGER ──
const hamburger = document.getElementById('nav-hamburger');
const drawer = document.getElementById('nav-drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}


// ── CUSTOM HALF-MOON CURSOR ──
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
  const moon  = document.getElementById('cursor-moon');
  const trail = document.getElementById('cursor-trail');
  let mx = -100, my = -100;
  let tx = -100, ty = -100;
  let isHover = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.querySelectorAll('a, button, .project-card, .skill-pill').forEach(el => {
    el.addEventListener('mouseenter', () => { isHover = true; });
    el.addEventListener('mouseleave', () => { isHover = false; });
  });

  (function animateCursor() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;

    const angle = Math.atan2(my - ty, mx - tx) * (180 / Math.PI) + 90;
    const scale = isHover ? 1.4 : 1;

    moon.style.left  = mx + 'px';
    moon.style.top   = my + 'px';
    moon.style.transform = `translate(-50%,-50%) rotate(${angle}deg) scale(${scale})`;

    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    trail.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;

    requestAnimationFrame(animateCursor);
  })();
}