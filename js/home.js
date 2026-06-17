'use strict';

// ── KOKO price helpers ──
function calcKokoPrice(price) {
  return Math.ceil(price * 1.10 / 50) * 50;
}
function kokoInstalment(price) {
  return Math.ceil(calcKokoPrice(price) / 3);
}

// ── Navbar scroll + back-to-top ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── Mobile menu toggle ──
document.getElementById('mobileToggle').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});
document.querySelectorAll('#mobileNav .nav-link').forEach(link =>
  link.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open'))
);

// ── Back to top ──
document.getElementById('backToTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ── Scroll reveal ──
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal:not(.revealed)');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => obs.observe(el));
}
initScrollReveal();

// ── Product card helpers ──
const bgColors = ['bg-orange', 'bg-teal', 'bg-violet', 'bg-gold', 'bg-green', 'bg-rose', 'bg-blue'];
function getBgColor(i) { return bgColors[i % bgColors.length]; }
function getMainImage(p) { return (p.images && p.images[0]) ? p.images[0] : null; }

function availBadge(avail) {
  if (avail === 'In Stock')    return `<span class="product-card-availability avail-in">● In Stock</span>`;
  if (avail === 'Order Basis') return `<span class="product-card-availability avail-order">● Order Basis</span>`;
  return `<span class="product-card-availability avail-out">● Out of Stock</span>`;
}

// ── Render featured products (4 max) ──
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  let products = PRODUCTS.filter(p => p.featured).slice(0, 4);
  if (!products.length) products = PRODUCTS.slice(0, 4);

  grid.innerHTML = products.map((p, i) => {
    const img = getMainImage(p);
    const kokoAmt = p.price ? kokoInstalment(p.price) : 0;
    return `
    <div class="product-card" onclick="window.location.href='products.html?product=${p.id}'">
      ${p.featured ? '<div class="featured-badge">Featured</div>' : ''}
      <div class="product-card-img ${getBgColor(i)}">
        ${img ? `<img src="${img}" alt="${p.name}" loading="lazy" />` : (p.emoji || '📦')}
      </div>
      <div class="product-card-body">
        <div class="product-card-brand">${p.brand}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-desc">${p.shortDesc}</div>
        ${p.price ? `
        <div class="koko-price-block">
          <div class="product-card-price">Rs. ${p.price.toLocaleString('en-LK')}</div>
          <span class="koko-badge">💳 KOKO: Rs. ${kokoAmt.toLocaleString('en-LK')} × 3</span>
        </div>` : ''}
        ${availBadge(p.availability)}
      </div>
      <div class="product-card-footer">
        <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;"
          onclick="event.stopPropagation();window.location.href='products.html?product=${p.id}'">
          View Details
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');
}
renderFeatured();

// ── Mobile Carousel: Reviews ──
function goReviewSlide(idx) {
  const grid = document.getElementById('reviewsGrid');
  const dots = document.querySelectorAll('#reviewsDots .carousel-dot');
  if (!grid) return;
  const cards = grid.querySelectorAll('.review-card');
  if (window.innerWidth <= 768 && cards[idx]) {
    grid.scrollTo({ left: cards[idx].offsetLeft - grid.offsetLeft, behavior: 'smooth' });
  }
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ── Mobile Carousel: Why Choose Us ──
function goWhySlide(idx) {
  const grid = document.getElementById('whyGrid');
  const dots = document.querySelectorAll('#whyDots .carousel-dot');
  if (!grid) return;
  const cards = grid.querySelectorAll('.why-card');
  if (window.innerWidth <= 768 && cards[idx]) {
    grid.scrollTo({ left: cards[idx].offsetLeft - grid.offsetLeft, behavior: 'smooth' });
  }
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ── Sync carousel dots on scroll ──
function initCarouselScrollSync(gridId, dotsId, cardSelector) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const dots = document.querySelectorAll(`#${dotsId} .carousel-dot`);
  if (!dots.length) return;
  grid.addEventListener('scroll', () => {
    if (window.innerWidth > 768) return;
    const cards = grid.querySelectorAll(cardSelector);
    let closest = 0, minDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - grid.getBoundingClientRect().left);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }, { passive: true });
}
initCarouselScrollSync('reviewsGrid', 'reviewsDots', '.review-card');
initCarouselScrollSync('whyGrid', 'whyDots', '.why-card');
