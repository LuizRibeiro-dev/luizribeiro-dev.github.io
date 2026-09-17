// ==========================================================================
// Portfolio — Scroll Effects, Lightbox & Interactions
// Funciona na home e nas páginas de estudo de caso. Sem dependências externas.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* Ano no footer */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Progress bar de leitura */
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    const updateProgressBar = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
  }

  /* Navbar ganha fundo ao rolar */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
  }

  /* Botão voltar ao topo */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', updateBackToTop);
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateBackToTop();
  }

  /* Reveal on scroll */
  const aosElements = document.querySelectorAll('[data-aos]');
  if (aosElements.length) {
    const aosObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-aos-delay') || 0;
          setTimeout(() => el.classList.add('aos-in'), Number(delay));
          aosObserver.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    aosElements.forEach((el) => aosObserver.observe(el));
  }

  /* Link ativo no menu (só na home) */
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('main .section, .hero');
  if (navLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* Smooth scroll para âncoras da própria página */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- LIGHTBOX para screenshots ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryFrames = document.querySelectorAll('.gallery-frame');

  if (lightbox && lightboxImg && galleryFrames.length) {
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // limpa depois da transição para não piscar na próxima abertura
      setTimeout(() => { if (!lightbox.classList.contains('open')) lightboxImg.src = ''; }, 200);
    };

    galleryFrames.forEach((frame) => {
      frame.addEventListener('click', () => {
        const img = frame.querySelector('.gallery-img');
        if (img) openLightbox(img.src, img.alt);
      });
    });

    lightbox.addEventListener('click', closeLightbox);
    if (lightboxClose) {
      lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }
    // evita fechar ao clicar na própria imagem
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

});
