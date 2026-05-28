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


// ── MUSIC PLAYER ──
const songs = [
  { src: 'https://raw.githubusercontent.com/adityakaithwas1/portfolio-asset/main/zoltrak.mp3', title: 'Zoltrak', artist: 'EvanCall' },
  { src: 'https://raw.githubusercontent.com/adityakaithwas1/portfolio-asset/main/suzume.mp3', title: 'Suzume', artist: 'RADWIMPS' },
];

let currentIndex = 0;

const audio        = document.getElementById('player');
const btnPlay      = document.getElementById('btn-play');
const btnPrev      = document.getElementById('btn-prev');
const btnNext      = document.getElementById('btn-next');
const iconPlay     = document.getElementById('icon-play');
const iconPause    = document.getElementById('icon-pause');
const progressFill = document.getElementById('progress-fill');
const progressBar  = document.getElementById('progress-bar');
const timeCurrent  = document.getElementById('time-current');
const timeTotal    = document.getElementById('time-total');
const musicTitle   = document.querySelector('.music-title');
const musicArtist  = document.querySelector('.music-artist');

if (audio) {
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const loadSong = (index) => {
    const song = songs[index];
    audio.src = song.src;
    musicTitle.textContent  = song.title;
    musicArtist.textContent = song.artist;
    progressFill.style.width = '0%';
    timeCurrent.textContent  = '0:00';
    timeTotal.textContent    = '0:00';
    iconPlay.style.display   = 'block';
    iconPause.style.display  = 'none';
  };

  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display  = 'none';
      iconPause.style.display = 'block';
    } else {
      audio.pause();
      iconPlay.style.display  = 'block';
      iconPause.style.display = 'none';
    }
  });

  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    iconPlay.style.display  = 'none';
    iconPause.style.display = 'block';
  });

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    iconPlay.style.display  = 'none';
    iconPause.style.display = 'block';
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    timeCurrent.textContent  = fmt(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = fmt(audio.duration);
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    iconPlay.style.display  = 'none';
    iconPause.style.display = 'block';
  });
}