/* ===== HORIZONTAL CODE RAIN CANVAS ===== */
(function() {
  const canvas = document.getElementById('code-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = '{}[]()<>/\\;:=+-*&|!?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%^~`"\'.';
  const charArr = chars.split('');
  const colors = ['#a855f7', '#22d3ee', '#f472b6', '#4ade80', '#818cf8'];

  const fontSize = 13;
  let rows, streams;

  function makeStream(rowIndex) {
    const goRight = Math.random() > 0.5;
    return {
      x: goRight ? Math.random() * -200 : canvas.width + Math.random() * 200,
      y: rowIndex * fontSize * 1.6 + fontSize,
      speed: (0.8 + Math.random() * 1.4) * (goRight ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
      length: Math.floor(6 + Math.random() * 14),
      chars: Array.from({length: 20}, () => charArr[Math.floor(Math.random() * charArr.length)])
    };
  }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    rows = Math.floor(canvas.height / (fontSize * 1.6));
    streams = Array.from({length: rows}, (_, i) => makeStream(i));
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(6, 6, 20, 0.20)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;

    for (let s of streams) {
      const goRight = s.speed > 0;

      for (let j = 0; j < s.length; j++) {
        const offset = goRight ? -j * fontSize * 0.75 : j * fontSize * 0.75;
        const cx = s.x + offset;
        if (cx < -fontSize * 2 || cx > canvas.width + fontSize * 2) continue;

        const ch = s.chars[j % s.chars.length];
        if (j === 0) {
          // bright leading head
          ctx.globalAlpha = 0.95;
          ctx.shadowBlur = 10;
          ctx.shadowColor = s.color;
          ctx.fillStyle = '#ffffff';
        } else {
          // fading coloured trail
          ctx.globalAlpha = Math.max(0.05, 0.7 - j / s.length * 0.75);
          ctx.shadowBlur = 4;
          ctx.shadowColor = s.color;
          ctx.fillStyle = s.color;
        }
        ctx.fillText(ch, cx, s.y);
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // shuffle a random char in the stream
      if (Math.random() > 0.85) {
        const ri = Math.floor(Math.random() * s.chars.length);
        s.chars[ri] = charArr[Math.floor(Math.random() * charArr.length)];
      }

      s.x += s.speed;

      // reset when fully off screen
      if ((s.speed > 0 && s.x - s.length * fontSize * 0.75 > canvas.width + 40) ||
          (s.speed < 0 && s.x + s.length * fontSize * 0.75 < -40)) {
        const row = streams.indexOf(s);
        streams[row] = makeStream(row);
      }
    }
  }

  setInterval(draw, 38);
})();

/* ===== ACTIVE NAV HIGHLIGHT ===== */
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
    link.classList.remove('active');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
})();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Create backdrop element
let backdrop = document.querySelector('.nav-backdrop');
if (!backdrop) {
  backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);
}

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close when clicking on backdrop
backdrop.addEventListener('click', closeMenu);

// Close when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
  }
});

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== HERO BG FALLBACK ===== */
const heroBgImg = document.getElementById('hero-bg-img');
if (heroBgImg) {
  heroBgImg.addEventListener('error', () => {
    heroBgImg.style.display = 'none';
    const overlay = document.querySelector('.hero-overlay');
    if (overlay) {
      overlay.style.background = 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #6c63ff 100%)';
    }
  });
}

/* ===== PROFILE IMAGE FALLBACK ===== */
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const frame = document.querySelector('.about-image-frame');
    if (frame) {
      frame.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
          background:linear-gradient(135deg,#6c63ff,#ff6584);color:white;font-size:5rem;">
          <i class="fas fa-user"></i>
        </div>`;
    }
  });
}

/* ===== PROJECT IMAGE FALLBACK ===== */
document.querySelectorAll('[id^="project1-img"]').forEach(img => {
  img.addEventListener('error', () => {
    const wrapper = img.closest('.project-image');
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="placeholder-img" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
          <span>Project 1</span>
        </div>
        <div class="project-overlay">
          <a href="#" class="btn btn-sm">View Details</a>
        </div>`;
    }
  });
});

/* ===== INTERSECTION OBSERVER — fade-in cards ===== */
const observeItems = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-item');

if ('IntersectionObserver' in window) {
  observeItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  observeItems.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}

/* ===== SKILL BAR ANIMATION ===== */
const skillBars = document.querySelectorAll('.skill-bar-fill');

if (skillBars.length && 'IntersectionObserver' in window) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => barObserver.observe(bar));
}

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-grid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hide');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = '';
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    const data = Object.fromEntries(new FormData(contactForm).entries());

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        contactForm.reset();
        if (successMsg) { successMsg.style.display = 'block'; setTimeout(() => { successMsg.style.display = 'none'; }, 6000); }
      } else {
        if (errorMsg) { errorMsg.style.display = 'block'; setTimeout(() => { errorMsg.style.display = 'none'; }, 5000); }
      }
    } catch (_) {
      if (errorMsg) { errorMsg.style.display = 'block'; setTimeout(() => { errorMsg.style.display = 'none'; }, 5000); }
    }

    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  });
}
