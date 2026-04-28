/* =========================================
   SLEEKLINE — Shared Components JS
   ========================================= */

// ── Nav HTML ──
const NAV_HTML = `
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" id="nav-logo-link">
        <img src="logo.png" alt="Sleekline" class="nav-logo-img" onerror="if(this.src!=='logo.svg'){this.src='logo.svg';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}"/>
        <div class="nav-logo-fallback" style="display:none;align-items:center;gap:0.75rem;">
          <div class="logo-icon">S</div>
          <span>Sleek<span class="accent">line</span></span>
        </div>
      </a>
      <ul class="nav-links">
        <li><a href="index.html"   class="nav-link" data-page="home">Home</a></li>
        <li><a href="about.html"   class="nav-link" data-page="about">About</a></li>
        <li><a href="services.html" class="nav-link" data-page="services">Services</a></li>
        <li><a href="products.html" class="nav-link" data-page="products">Products</a></li>
        <li><a href="applications.html" class="nav-link" data-page="applications">Applications</a></li>
        <li><a href="faq.html"     class="nav-link" data-page="faq">FAQs</a></li>
        <li><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
      </ul>
      <a href="contact.html" class="btn btn-primary nav-cta" id="nav-quote-btn">Request a Quote</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<nav class="nav-mobile" id="nav-mobile">
  <a href="index.html"        class="mobile-link" data-page="home">Home</a>
  <a href="about.html"        class="mobile-link" data-page="about">About Us</a>
  <a href="services.html"     class="mobile-link" data-page="services">Services</a>
  <a href="products.html"     class="mobile-link" data-page="products">Products</a>
  <a href="applications.html" class="mobile-link" data-page="applications">Applications</a>
  <a href="faq.html"          class="mobile-link" data-page="faq">FAQs</a>
  <a href="contact.html"      class="mobile-link" data-page="contact">Contact</a>
  <a href="contact.html" class="btn btn-primary mobile-cta">Request a Quote</a>
</nav>`;

// ── Footer HTML ──
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="logo.png" alt="Sleekline" class="footer-logo-img" onerror="if(this.src!=='logo.svg'){this.src='logo.svg';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}"/>
          <div class="footer-logo-fallback" style="display:none;align-items:center;gap:0.75rem;">
            <div class="logo-icon">S</div>
            <span>Sleek<span style='color:var(--clr-accent)'>line</span></span>
          </div>
        </div>
        <p class="footer-desc">
          Premium architectural metal products. Engineered for performance, designed for aesthetics. Serving India's leading architects and developers.
        </p>
        <div class="footer-socials">
          <a href="#" class="social-btn" title="Facebook">&#x1D56B;</a>
          <a href="#" class="social-btn" title="Instagram">&#x1F4F7;</a>
          <a href="#" class="social-btn" title="LinkedIn">in</a>
          <a href="#" class="social-btn" title="YouTube">&#x25B6;</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html"        class="footer-link">Home</a></li>
          <li><a href="about.html"        class="footer-link">About Us</a></li>
          <li><a href="services.html"     class="footer-link">Services</a></li>
          <li><a href="products.html"     class="footer-link">Products</a></li>
          <li><a href="applications.html" class="footer-link">Applications</a></li>
          <li><a href="faq.html"          class="footer-link">FAQs</a></li>
          <li><a href="contact.html"      class="footer-link">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Our Products</h4>
        <ul class="footer-links">
          <li><a href="products.html" class="footer-link">Linear Ceiling – C Series</a></li>
          <li><a href="products.html" class="footer-link">U Shaped Baffle Ceiling</a></li>
          <li><a href="products.html" class="footer-link">Exterior Louvers &amp; Cladding</a></li>
          <li><a href="products.html" class="footer-link">Linear Ceiling – R Series</a></li>
          <li><a href="products.html" class="footer-link">Sun Louvers</a></li>
          <li><a href="products.html" class="footer-link">Linear 150 F</a></li>
          <li><a href="products.html" class="footer-link">Open Cell Ceiling</a></li>
          <li><a href="products.html" class="footer-link">Tile Ceiling (Lay-in &amp; Clip-in)</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <span class="fc-icon">📍</span>
          <div class="fc-text">
            A2-424, Celebration City Center,<br>
            Gala Gymkhana Rd, South Bopal,<br>
            Ahmedabad, Gujarat 380058
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">📞</span>
          <div class="fc-text">
            <a href="tel:+919265246156">+91 92652 46156</a><br>
            <a href="tel:+918238814293">+91 82388 14293</a>
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">✉️</span>
          <div class="fc-text">
            <a href="mailto:sleekline7@gmail.com">sleekline7@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Sleekline. All Rights Reserved.</p>
      <div class="footer-iso">
        <span class="iso-badge">ISO 9001:2013</span>
        Certified Quality Management System
      </div>
    </div>
  </div>
</footer>`;

// ── Init Function ──
function initSleekline(currentPage) {
  // Inject nav & footer
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Set active nav link
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === currentPage) {
      el.classList.add('active');
    }
  });

  // Sticky navbar
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile on link click
  mobileNav.querySelectorAll('.mobile-link, .mobile-cta').forEach(el => {
    el.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur = 2000;
  const step = 16;
  let current = 0;
  const increment = target / (dur / step);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, step);
}
