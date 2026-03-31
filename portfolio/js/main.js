/* ===== CODE RAIN CANVAS ===== */
(function() {
  const canvas = document.getElementById('code-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = '{}[]()<>/\\;:=+-*&|!?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%^~`"\'.const let var function return import export class if else for while async await';
  const charArr = chars.split('');

  const colors = ['#a855f7', '#22d3ee', '#f472b6', '#4ade80', '#818cf8', '#fb923c'];

  let cols, drops, speeds, colorIdx, fontSize;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    fontSize = 14;
    cols = Math.floor(canvas.width / (fontSize * 0.7));
    drops = Array(cols).fill(0).map(() => Math.random() * -canvas.height / fontSize);
    speeds = Array(cols).fill(0).map(() => 0.3 + Math.random() * 0.7);
    colorIdx = Array(cols).fill(0).map(() => Math.floor(Math.random() * colors.length));
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(6, 6, 20, 0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      const ch = charArr[Math.floor(Math.random() * charArr.length)];
      const x = i * fontSize * 0.7;
      const y = drops[i] * fontSize;

      // Leading character — bright
      ctx.shadowBlur = 8;
      ctx.shadowColor = colors[colorIdx[i]];
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.9;
      ctx.font = `${fontSize}px monospace`;
      ctx.fillText(ch, x, y);

      // Trail character — coloured and faded
      ctx.shadowBlur = 4;
      ctx.fillStyle = colors[colorIdx[i]];
      ctx.globalAlpha = 0.35;
      const trailCh = charArr[Math.floor(Math.random() * charArr.length)];
      ctx.fillText(trailCh, x, y - fontSize * 1.5);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      drops[i] += speeds[i];

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.random() * -20;
        colorIdx[i] = Math.floor(Math.random() * colors.length);
      }
    }
  }

  setInterval(draw, 42);
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

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
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
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 4000);
      }
    }, 1000);
  });
}
