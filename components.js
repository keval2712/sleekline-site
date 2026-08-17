/* =========================================
   SLEEKLINE — Shared Components JS
   IMAC-Inspired Theme
   ========================================= */

// ── SVG Icon Helpers ──
const SVG = {
  arrow: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="currentColor"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor"/><circle cx="4" cy="4" r="2" fill="currentColor"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="currentColor"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#191816"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="18"/><path d="M16 8h4l3 3v10h-7V8z"/><line x1="5" y1="8" x2="5" y2="8.01"/><line x1="9" y1="8" x2="9" y2="8.01"/><line x1="5" y1="12" x2="5" y2="12.01"/><line x1="9" y1="12" x2="9" y2="12.01"/></svg>`,
  tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  droplets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
  wind: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 001.69 1.05L7 19c3-3 7.93-6 14-6v3l4-4-4-4v3z"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 105.93 19.07 10 10 0 0019.07 4.93z"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
};

// ── Nav HTML ──
const NAV_HTML = `
<div id="page-preloader" aria-hidden="true">
  <img src="logo.png" alt="Sleekline" class="preloader-logo" />
  <div class="preloader-bar"><div class="preloader-fill"></div></div>
</div>

<nav class="navbar" id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" id="nav-logo-link">
        <img src="logo.png" alt="Sleekline" class="nav-logo-img" onerror="if(this.src!=='logo.svg'){this.src='logo.svg';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}" />
        <div class="nav-logo-fallback" style="display:none;">
          <div class="logo-icon">S</div>
          <span>Sleek<span style="color:var(--clr-accent)">line</span></span>
        </div>
      </a>

      <ul class="nav-links">
        <li><a href="index.html"          class="nav-link" data-page="home">Home</a></li>
        <li><a href="about.html"          class="nav-link" data-page="about">About</a></li>
        <li><a href="products.html"       class="nav-link" data-page="products">Products</a></li>
        <li><a href="applications.html"   class="nav-link" data-page="applications">Applications</a></li>
        <li><a href="projects.html"       class="nav-link" data-page="projects">Projects</a></li>
        <li><a href="gallery.html"        class="nav-link" data-page="gallery">Gallery</a></li>
        <li><a href="resources.html"      class="nav-link" data-page="resources">Resources</a></li>
        <li><a href="catalogue.html"      class="nav-link" data-page="catalogue">Catalogue</a></li>
        <li><a href="contact.html"        class="nav-link" data-page="contact">Contact</a></li>
      </ul>

      <div class="nav-actions">
        <a href="tel:+919265246156" class="nav-phone">
          ${SVG.phone}
          +91 92652 46156
        </a>
        <a href="contact.html" class="btn btn-primary nav-cta" id="nav-quote-btn">
          Request a Quote
          ${SVG.arrow}
        </a>
      </div>

      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<nav class="nav-mobile" id="nav-mobile">
  <a href="index.html"        class="mobile-link" data-page="home">Home</a>
  <a href="about.html"        class="mobile-link" data-page="about">About Us</a>
  <a href="products.html"     class="mobile-link" data-page="products">Products</a>
  <a href="applications.html" class="mobile-link" data-page="applications">Applications</a>
  <a href="projects.html"     class="mobile-link" data-page="projects">Projects</a>
  <a href="gallery.html"      class="mobile-link" data-page="gallery">Gallery</a>
  <a href="resources.html"    class="mobile-link" data-page="resources">Resources</a>
  <a href="catalogue.html"    class="mobile-link" data-page="catalogue">Catalogue</a>
  <a href="contact.html"      class="mobile-link" data-page="contact">Contact</a>
  <a href="contact.html" class="btn btn-primary mobile-cta">Request a Quote &nbsp;${SVG.arrow}</a>
</nav>`;

// ── Footer HTML ──
const FOOTER_HTML = `
<!-- Floating Action Buttons -->
<div class="fab-wrap" id="fab-wrap">
  <a href="https://wa.me/919265246156?text=Hello%20Sleekline%2C%20I%20am%20interested%20in%20your%20ceiling%20solutions."
     target="_blank" rel="noopener noreferrer"
     class="fab-btn fab-whatsapp" title="WhatsApp Us" id="fab-whatsapp">
    ${SVG.whatsapp}
  </a>
  <a href="tel:+919265246156" class="fab-btn fab-phone" title="Call Us" id="fab-call">
    ${SVG.phone}
  </a>
</div>

<!-- Footer CTA Band -->
<div class="footer-cta-band">
  <div class="container">
    <div class="footer-cta-inner">
      <h2>Let's Build.</h2>
      <div class="footer-cta-actions">
        <a href="contact.html" class="btn btn-outline-light" id="footer-quote-btn">
          Request a Quote ${SVG.arrow}
        </a>
        <a href="tel:+919265246156" class="btn btn-outline-light" id="footer-call-btn">
          ${SVG.phone} +91 92652 46156
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Main Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">

      <!-- Brand -->
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="logo.png" alt="Sleekline" class="footer-logo-img"
               onerror="if(this.src!=='logo.svg'){this.src='logo.svg';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}" />
          <div class="footer-logo-fallback" style="display:none;">
            <div class="logo-icon">S</div>
            <span>Sleek<span style="color:var(--clr-accent)">line</span></span>
          </div>
        </div>
        <p class="footer-desc">
          Premium architectural metal ceiling systems and exterior solutions. ISO 9001:2013 certified. Serving India's leading architects and developers across 15+ cities.
        </p>
        <div class="footer-socials">
          <a href="#" class="social-btn" title="Facebook" id="footer-fb">${SVG.facebook}</a>
          <a href="#" class="social-btn" title="Instagram" id="footer-ig">${SVG.instagram}</a>
          <a href="#" class="social-btn" title="LinkedIn" id="footer-li">${SVG.linkedin}</a>
          <a href="#" class="social-btn" title="YouTube" id="footer-yt">${SVG.youtube}</a>
        </div>
      </div>

      <!-- Products -->
      <div class="footer-col">
        <h4>Products</h4>
        <ul class="footer-links">
          <li><a href="products.html" class="footer-link">Linear Ceiling – C Series</a></li>
          <li><a href="products.html" class="footer-link">Linear Ceiling – R Series</a></li>
          <li><a href="products.html" class="footer-link">U Shaped Baffle Ceiling</a></li>
          <li><a href="products.html" class="footer-link">Linear 150 F</a></li>
          <li><a href="products.html" class="footer-link">Open Cell Ceiling</a></li>
          <li><a href="products.html" class="footer-link">Tile Ceiling</a></li>
          <li><a href="products.html" class="footer-link">Exterior Louvers &amp; Cladding</a></li>
          <li><a href="products.html" class="footer-link">Sun Louvers ${SVG.arrow}</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-links">
          <li><a href="about.html"        class="footer-link">About Us</a></li>
          <li><a href="applications.html" class="footer-link">Applications</a></li>
          <li><a href="projects.html"     class="footer-link">Projects</a></li>
          <li><a href="gallery.html"      class="footer-link">Gallery</a></li>
          <li><a href="resources.html"    class="footer-link">Resources</a></li>
          <li><a href="catalogue.html"    class="footer-link">Product Catalogue</a></li>
          <li><a href="faq.html"          class="footer-link">FAQs</a></li>
          <li><a href="contact.html"      class="footer-link">Contact Us</a></li>
        </ul>
      </div>

      <!-- Get in Touch -->
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <div class="footer-contact-item">
          <span class="fc-icon">${SVG.location}</span>
          <div class="fc-text">
            A2-424, Celebration City Center,<br>
            Gala Gymkhana Rd, South Bopal,<br>
            Ahmedabad, Gujarat 380058
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">${SVG.phone}</span>
          <div class="fc-text">
            <a href="tel:+919265246156">+91 92652 46156</a><br>
            <a href="tel:+918238814293">+91 82388 14293</a>
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">${SVG.mail}</span>
          <div class="fc-text">
            <a href="mailto:sleekline7@gmail.com">sleekline7@gmail.com</a>
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">${SVG.clock}</span>
          <div class="fc-text">Monday – Sunday<br>9:00 AM – 6:30 PM</div>
        </div>
      </div>

    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Sleekline. All rights reserved. &nbsp;·&nbsp;
        <a href="#" style="color:var(--clr-dark-muted); transition:color 0.15s;" onmouseover="this.style.color='var(--clr-accent)'" onmouseout="this.style.color='var(--clr-dark-muted)'">Privacy Policy</a> &nbsp;·&nbsp;
        <a href="#" style="color:var(--clr-dark-muted); transition:color 0.15s;" onmouseover="this.style.color='var(--clr-accent)'" onmouseout="this.style.color='var(--clr-dark-muted)'">Terms &amp; Conditions</a>
      </p>
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

  // Preloader
  const preloader = document.getElementById('page-preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  });
  // Fallback — force hide after 1.5s even if load event already fired
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 1500);

  // Set active nav link
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === currentPage) {
      el.classList.add('active');
    }
  });

  // ── Sticky navbar ──
  const navbar = document.getElementById('navbar');
  const isHeroPage = currentPage === 'home';

  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('scrolled', scrolled);
    // On non-hero pages, always show white
    if (!isHeroPage) {
      navbar.classList.add('on-light');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu toggle ──
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.mobile-link, .mobile-cta').forEach(el => {
    el.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ── FAQ accordion ──
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

  // ── Counter animation ──
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

  // ── Fab scroll show ──
  const fabWrap = document.getElementById('fab-wrap');
  if (fabWrap) {
    const fabScroll = () => {
      fabWrap.style.opacity = window.scrollY > 200 ? '1' : '0';
      fabWrap.style.pointerEvents = window.scrollY > 200 ? 'all' : 'none';
    };
    fabWrap.style.opacity = '0';
    fabWrap.style.transition = 'opacity 0.3s ease';
    window.addEventListener('scroll', fabScroll, { passive: true });
    fabScroll();
  }
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur = 1800;
  const step = 16;
  let current = 0;
  const increment = target / (dur / step);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, step);
}
