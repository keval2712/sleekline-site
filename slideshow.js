/* =========================================
   SLEEKLINE — Centralized Image Management & Slideshow System
   ========================================= */

// ── Product Image Registry ──
// Each product maps to its folder and the count of available images.
// The system uses sequential numbering: 1.jpeg, 2.jpeg, ...
const PRODUCT_IMAGES = {
  'linear-c-series': {
    name: 'Linear Ceiling – C Series',
    folder: 'images/linear-c-series',
    count: 9,
    ext: 'jpeg',
    tag: 'Signature',
    material: 'Galvanized Steel / Aluminum'
  },
  'u-shaped-baffle': {
    name: 'U Shaped Baffle Ceiling',
    folder: 'images/u-shaped-baffle',
    count: 6,
    ext: 'jpeg',
    tag: 'Popular',
    material: 'Aluminum'
  },
  'exterior-louvers': {
    name: 'Exterior Louvers & Cladding',
    folder: 'images/exterior-louvers',
    count: 8,
    ext: 'jpeg',
    tag: 'Designer',
    material: 'Aluminum'
  },
  'linear-r-series': {
    name: 'Linear Ceiling – R Series',
    folder: 'images/linear-r-series',
    count: 0,
    ext: 'jpeg',
    tag: 'Premium',
    material: 'Aluminum / GI Steel'
  },
  'sun-louvers': {
    name: 'Sun Louvers',
    folder: 'images/sun-louvers',
    count: 0,
    ext: 'jpeg',
    tag: 'Energy',
    material: 'Aluminum'
  },
  'linear-150f': {
    name: 'Linear 150 F',
    folder: 'images/linear-150f',
    count: 0,
    ext: 'jpeg',
    tag: 'Wide Panel',
    material: 'Galvanized Steel / Aluminum'
  },
  'open-cell': {
    name: 'Open Cell Ceiling',
    folder: 'images/open-cell',
    count: 5,
    ext: 'jpeg',
    tag: 'Modular',
    material: 'Aluminum'
  },
  'tile-ceiling': {
    name: 'Tile Ceiling (Lay-in & Clip-in)',
    folder: 'images/tile-ceiling',
    count: 0,
    ext: 'jpeg',
    tag: 'Versatile',
    material: 'Galvanized Steel / Aluminum'
  }
};

// ── Helper: Get image URL array for a product ──
function getProductImages(productKey) {
  const product = PRODUCT_IMAGES[productKey];
  if (!product || product.count === 0) return [];
  const imgs = [];
  for (let i = 1; i <= product.count; i++) {
    imgs.push(`${product.folder}/${i}.${product.ext}`);
  }
  return imgs;
}

// ── Helper: Get combined hero images from all products ──
function getHeroImages() {
  const all = [];
  Object.keys(PRODUCT_IMAGES).forEach(key => {
    const imgs = getProductImages(key);
    imgs.forEach(img => all.push({ src: img, label: PRODUCT_IMAGES[key].name }));
  });
  // Shuffle for variety
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

// ── Slider Class ──
class SleekSlider {
  constructor(container, images, options = {}) {
    this.container = container;
    this.images = images;
    this.options = Object.assign({
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      showArrows: true,
      showDots: true,
      fade: true,
      showLabel: false,
      touchThreshold: 50  // minimum px drag to trigger slide change
    }, options);
    this.current = 0;
    this.timer = null;
    this.isHovered = false;
    this._touchStartX = 0;
    this._touchStartY = 0;
    this._touchDeltaX = 0;
    this._isDragging = false;
    if (images.length > 0) this.init();
  }

  init() {
    this.container.classList.add('slk-slider');
    this.buildSlides();
    if (this.options.showArrows && this.images.length > 1) this.buildArrows();
    if (this.options.showDots && this.images.length > 1) this.buildDots();
    this.showSlide(0);
    if (this.options.autoplay && this.images.length > 1) this.startAutoplay();
    if (this.options.pauseOnHover) this.bindHover();
    if (this.images.length > 1) this.bindTouch();
  }

  buildSlides() {
    this.track = document.createElement('div');
    this.track.className = 'slk-track';
    this.slideEls = this.images.map((imgData, i) => {
      const slide = document.createElement('div');
      slide.className = 'slk-slide';
      const img = document.createElement('img');
      const src = typeof imgData === 'string' ? imgData : imgData.src;
      const label = typeof imgData === 'object' ? imgData.label : null;
      img.src = src;
      img.alt = label || 'Sleekline Product';
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.draggable = false;
      img.onerror = () => { slide.style.display = 'none'; };
      slide.appendChild(img);
      if (label && this.options.showLabel) {
        const lbl = document.createElement('div');
        lbl.className = 'slk-label';
        lbl.textContent = label;
        slide.appendChild(lbl);
      }
      this.track.appendChild(slide);
      return slide;
    });
    this.container.appendChild(this.track);
  }

  buildArrows() {
    const prev = document.createElement('button');
    prev.className = 'slk-arrow slk-prev';
    prev.setAttribute('aria-label', 'Previous slide');
    prev.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
    prev.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
    const next = document.createElement('button');
    next.className = 'slk-arrow slk-next';
    next.setAttribute('aria-label', 'Next slide');
    next.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
    next.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
    this.container.appendChild(prev);
    this.container.appendChild(next);
  }

  buildDots() {
    const dots = document.createElement('div');
    dots.className = 'slk-dots';
    this.dotEls = this.images.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slk-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      dots.appendChild(dot);
      return dot;
    });
    this.container.appendChild(dots);
  }

  showSlide(index) {
    this.slideEls.forEach((s, i) => s.classList.toggle('active', i === index));
    if (this.dotEls) this.dotEls.forEach((d, i) => d.classList.toggle('active', i === index));
    this.current = index;
  }

  next() {
    this.goTo((this.current + 1) % this.images.length);
  }

  prev() {
    this.goTo((this.current - 1 + this.images.length) % this.images.length);
  }

  goTo(index) {
    this.showSlide(index);
    if (this.options.autoplay) {
      clearInterval(this.timer);
      if (!this.isHovered) this.startAutoplay();
    }
  }

  startAutoplay() {
    this.timer = setInterval(() => {
      if (!this.isHovered) this.next();
    }, this.options.interval);
  }

  bindHover() {
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      clearInterval(this.timer);
    });
    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      if (this.options.autoplay) this.startAutoplay();
    });
  }

  // ── Touch / Swipe Support ──
  bindTouch() {
    const el = this.container;

    el.addEventListener('touchstart', (e) => {
      this._touchStartX = e.touches[0].clientX;
      this._touchStartY = e.touches[0].clientY;
      this._touchDeltaX = 0;
      this._isDragging = true;
      // Pause autoplay during touch
      clearInterval(this.timer);
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      if (!this._isDragging) return;
      const dx = e.touches[0].clientX - this._touchStartX;
      const dy = e.touches[0].clientY - this._touchStartY;
      this._touchDeltaX = dx;
      // If horizontal movement dominates, prevent page scroll
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        e.preventDefault();
      }
    }, { passive: false });

    el.addEventListener('touchend', () => {
      if (!this._isDragging) return;
      this._isDragging = false;
      const dx = this._touchDeltaX;
      const threshold = this.options.touchThreshold;
      if (dx < -threshold) {
        this.next();
      } else if (dx > threshold) {
        this.prev();
      }
      // Resume autoplay
      if (this.options.autoplay) this.startAutoplay();
    }, { passive: true });

    el.addEventListener('touchcancel', () => {
      this._isDragging = false;
      if (this.options.autoplay) this.startAutoplay();
    }, { passive: true });
  }

  destroy() {
    clearInterval(this.timer);
  }
}

// ── Hero Slider Builder ──
// Builds the full-featured hero slider with mixed product images
function buildHeroSlider(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  const images = getHeroImages();
  if (images.length === 0) return null;
  container.innerHTML = '';
  return new SleekSlider(container, images, Object.assign({
    autoplay: true,
    interval: 6000,
    showLabel: true,
    showDots: true,
    showArrows: true,
    pauseOnHover: true
  }, options));
}

// ── Product Card Slider Builder ──
// Creates a slider inside a product card visual area
function buildProductSlider(containerId, productKey, options = {}) {
  const container = typeof containerId === 'string'
    ? document.getElementById(containerId)
    : containerId;
  if (!container) return null;
  const images = getProductImages(productKey);
  if (images.length === 0) {
    // No images — keep existing SVG placeholder, do nothing
    return null;
  }
  container.innerHTML = '';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  return new SleekSlider(container, images, Object.assign({
    autoplay: true,
    interval: 4000,
    showLabel: false,
    showDots: images.length > 1,
    showArrows: images.length > 1,
    pauseOnHover: true
  }, options));
}

// ── Index Page: Product Preview Sliders ──
// Creates slider sections for the products preview area on index.html
function buildIndexProductSliders(containerId) {
  const section = document.getElementById(containerId);
  if (!section) return;
  // Find all product-visual elements that have a data-product attribute
  section.querySelectorAll('[data-product-slider]').forEach(el => {
    const key = el.getAttribute('data-product-slider');
    buildProductSlider(el, key, { interval: 4000 });
  });
}

// ── Auto Init on DOM Ready ──
// Pages just need to call the appropriate init functions
window.SleekSlider = SleekSlider;
window.SleekImages = {
  PRODUCT_IMAGES,
  getProductImages,
  getHeroImages,
  buildHeroSlider,
  buildProductSlider,
  buildIndexProductSliders
};
