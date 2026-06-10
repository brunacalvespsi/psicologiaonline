/* ===========================
   SCROLL-TRIGGERED REVEALS
   =========================== */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ===========================
   NAV SCROLL STATE
   =========================== */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ===========================
   DEPOIMENTOS SLIDER
   =========================== */
const track = document.getElementById('depoTrack');
const dotsContainer = document.getElementById('depoDots');
const prevBtn = document.getElementById('depoPrev');
const nextBtn = document.getElementById('depoNext');

const cards = track ? track.querySelectorAll('.depo-card') : [];
let current = 0;

function getVisible() {
  return 1;
}

function getTotal() {
  const visible = getVisible();
  return Math.ceil(cards.length / visible);
}

function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  const total = getTotal();
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function goTo(index) {
  const total = getTotal();
  current = Math.max(0, Math.min(index, total - 1));

  const cardWidth = track.parentElement.offsetWidth;
   const offset = current * cardWidth;

  track.style.transform = `translateX(-${offset}px)`;

  document.querySelectorAll('.depo-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

if (track && cards.length > 0) {
  buildDots();

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    current = 0;
    buildDots();
    goTo(0);
  });

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
    }
  });
}

/* ===========================
   SMOOTH ANCHOR SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = nav ? nav.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===========================
   CONTACT FORM
   =========================== */
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Simulate async send (replace with actual endpoint)
    setTimeout(() => {
      btn.textContent = '✓ Mensagem enviada!';
      btn.style.background = '#5C3D2E';
      form.reset();

       const nome = document.getElementById('nome').value;
       const email = document.getElementById('email').value;
       const mensagem = document.getElementById('mensagem').value;
       const texto = `Olá Bruna!
       Nome: ${nome}
       Email: ${email}
       O que me trouxe aqui:
       ${mensagem}`;
       
       setTimeout(() => {
          window.open(
             `https://wa.me/5527992670223?text=${encodeURIComponent(texto)}`,
             '_blank'
          );
       }, 2000);
       
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 4000);
    }, 1400);
  });

  // Input focus effects
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('focus', () => {
      input.closest('.form-field').style.setProperty('--field-active', '1');
    });
    input.addEventListener('blur', () => {
      input.closest('.form-field').style.removeProperty('--field-active');
    });
  });
}

/* ===========================
   PARALLAX SUBTLE ON HERO BG TEXT
   =========================== */
const heroBgText = document.querySelector('.hero__bg-text');

if (heroBgText) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.25;
    heroBgText.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}

/* ===========================
   STAGGER PAIN CARDS ON ENTER
   =========================== */
const painCards = document.querySelectorAll('.pain__card');

const painObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        painCards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
        painObserver.disconnect();
      }
    });
  },
  { threshold: 0.1 }
);

if (painCards.length) {
  painCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s';
  });
  painObserver.observe(document.querySelector('.pain'));
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  const texto =
`Olá Bruna!

Nome: ${nome}
Email: ${email}

O que me trouxe aqui:
${mensagem}`;

  window.open(
    `https://wa.me/5527992670223?text=${encodeURIComponent(texto)}`,
    '_blank'
  );
});
