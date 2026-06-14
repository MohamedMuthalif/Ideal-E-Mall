// ============================================
// IDEAL E-MALL — Application Logic
// ============================================

'use strict';

/* ============ STATE ============ */
let currentPage = 'home';
let currentProduct = null;
let activeCategory = '';
let searchQuery = '';
let selectedBrand = '';
let selectedAvailability = '';

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initBackToTop();
  renderHomeCategories();
  renderFeaturedProducts();
  initProductsPage();
  initNavSearch();
  showPage('home');
});

/* ============ PAGE NAVIGATION ============ */
function showPage(page, productId) {
  // Hide all pages
  document.querySelectorAll('.page-view').forEach(p => {
    p.classList.remove('active');
  });

  // Update nav links
  document.querySelectorAll('.nav-link[id^="nav-"]').forEach(l => l.classList.remove('active'));

  currentPage = page;

  if (page === 'home') {
    document.getElementById('page-home').classList.add('active');
    const el = document.getElementById('nav-home');
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initScrollReveal, 100);
  } else if (page === 'products') {
    document.getElementById('page-products').classList.add('active');
    const el = document.getElementById('nav-products');
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderProductsGrid();
  } else if (page === 'detail' && productId) {
    document.getElementById('page-detail').classList.add('active');
    loadProductDetail(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ============ NAVBAR ============ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  const toggle = document.getElementById('mobileToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nav = document.getElementById('mobileNav');
      nav.classList.toggle('open');
    });
  }
}

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.remove('open');
}

/* ============ NAV SEARCH ============ */
function initNavSearch() {
  const input = document.getElementById('navSearchInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        searchQuery = input.value.trim();
        activeCategory = '';
        showPage('products');
        document.getElementById('productsSearchInput').value = searchQuery;
        renderProductsGrid();
      }
    });
  }
  const mInput = document.getElementById('mobileSearchInput');
  if (mInput) {
    mInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && mInput.value.trim()) {
        searchQuery = mInput.value.trim();
        activeCategory = '';
        showPage('products');
        closeMobileNav();
        setTimeout(() => {
          document.getElementById('productsSearchInput').value = searchQuery;
          renderProductsGrid();
        }, 100);
      }
    });
  }
}

/* ============ SCROLL REVEAL ============ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.revealed)');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ============ BACK TO TOP ============ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============ HERO 3D TILT ============ */
(function initHeroTilt() {
  const scene = document.getElementById('heroScene');
  if (!scene) return;
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = scene.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    scene.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    scene.style.transform = '';
  });
})();

/* ============ HOME CATEGORIES ============ */
function renderHomeCategories() {
  const grid = document.getElementById('homeCategoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card reveal" onclick="filterByCategory('${cat.id}')" role="button" tabindex="0" aria-label="${cat.name}">
      <span class="category-icon">${cat.icon}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} items</div>
    </div>
  `).join('');
  renderFooterCategories();
  setTimeout(initScrollReveal, 50);
}

function renderFooterCategories() {
  const el = document.getElementById('footerCategories');
  if (!el) return;
  el.innerHTML = CATEGORIES.map(cat => `
    <span class="footer-link" onclick="filterByCategory('${cat.id}')">${cat.name}</span>
  `).join('');
}

function filterByCategory(catId) {
  activeCategory = catId;
  searchQuery = '';
  selectedBrand = '';
  selectedAvailability = '';
  showPage('products');
}

/* ============ FEATURED PRODUCTS ============ */
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  grid.innerHTML = featured.map((p, i) => renderProductCard(p, `reveal-delay-${(i % 4) + 1}`)).join('');
  setTimeout(initScrollReveal, 50);
}

/* ============ PRICE FORMAT ============ */
function formatPrice(price) {
  if (!price) return '';
  return 'Rs. ' + price.toLocaleString('en-LK');
}

/* ============ PRODUCT CARD HTML ============ */
function renderProductCard(product, delayClass = '') {
  const availClass = product.availability === 'In Stock' ? 'avail-in'
    : product.availability === 'Order Basis' ? 'avail-order' : 'avail-out';
  const priceHTML = product.price
    ? `<div class="product-card-price">${formatPrice(product.price)}</div>` : '';
  return `
    <div class="product-card reveal ${delayClass}" onclick="showPage('detail', '${product.id}')" role="button" tabindex="0" aria-label="${product.name}">
      ${product.featured ? '<span class="featured-badge">Featured</span>' : ''}
      <div class="product-card-img">${product.emoji}</div>
      <div class="product-card-body">
        <span class="product-card-brand">${product.brand}</span>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-desc">${product.shortDesc}</div>
        ${priceHTML}
        <span class="product-card-availability ${availClass}">${product.availability}</span>
      </div>
      <div class="product-card-footer">
        <button class="btn btn-primary" onclick="event.stopPropagation(); showPage('detail', '${product.id}')">
          Get More Details
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;
}

/* ============ PRODUCTS PAGE ============ */
function initProductsPage() {
  // Populate category filter
  const catFilter = document.getElementById('categoryFilter');
  if (catFilter) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      catFilter.appendChild(opt);
    });
    catFilter.addEventListener('change', () => {
      activeCategory = catFilter.value;
      renderProductsGrid();
      updateCategoryChips();
    });
  }

  // Populate brand filter
  const brandFilter = document.getElementById('brandFilter');
  if (brandFilter) {
    const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      brandFilter.appendChild(opt);
    });
    brandFilter.addEventListener('change', () => {
      selectedBrand = brandFilter.value;
      renderProductsGrid();
    });
  }

  // Availability filter
  const availFilter = document.getElementById('availabilityFilter');
  if (availFilter) {
    availFilter.addEventListener('change', () => {
      selectedAvailability = availFilter.value;
      renderProductsGrid();
    });
  }

  // Search input
  const searchInput = document.getElementById('productsSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      renderProductsGrid();
    });
  }

  renderCategoryChips();
}

function renderCategoryChips() {
  const chips = document.getElementById('categoryChips');
  if (!chips) return;
  chips.innerHTML = `
    <span class="btn btn-sm ${activeCategory === '' ? 'btn-primary' : 'btn-outline'}" onclick="setCategoryChip('')">All</span>
    ${CATEGORIES.map(cat => `
      <span class="btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}" onclick="setCategoryChip('${cat.id}')">
        ${cat.icon} ${cat.name}
      </span>
    `).join('')}
  `;
}

function updateCategoryChips() {
  renderCategoryChips();
}

function setCategoryChip(catId) {
  activeCategory = catId;
  const catFilter = document.getElementById('categoryFilter');
  if (catFilter) catFilter.value = catId;
  renderCategoryChips();
  renderProductsGrid();
}

function renderProductsGrid() {
  // Sync filter state from DOM
  const catFilter = document.getElementById('categoryFilter');
  const brandFilter = document.getElementById('brandFilter');
  const availFilter = document.getElementById('availabilityFilter');
  const searchInput = document.getElementById('productsSearchInput');

  if (activeCategory && catFilter) catFilter.value = activeCategory;
  if (selectedBrand && brandFilter) brandFilter.value = selectedBrand;
  if (selectedAvailability && availFilter) availFilter.value = selectedAvailability;
  if (searchQuery && searchInput) searchInput.value = searchQuery;

  let filtered = PRODUCTS;

  if (activeCategory) {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  if (selectedBrand) {
    filtered = filtered.filter(p => p.brand === selectedBrand);
  }
  if (selectedAvailability) {
    filtered = filtered.filter(p => p.availability === selectedAvailability);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  const countEl = document.getElementById('productsCount');
  if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;

  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters to find what you are looking for.</p>
        <br>
        <button class="btn btn-outline" onclick="clearFilters()">Clear All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => renderProductCard(p, `reveal-delay-${(i % 4) + 1}`)).join('');
  setTimeout(initScrollReveal, 50);
  updateCategoryChips();
}

function clearFilters() {
  activeCategory = '';
  searchQuery = '';
  selectedBrand = '';
  selectedAvailability = '';
  const catFilter = document.getElementById('categoryFilter');
  const brandFilter = document.getElementById('brandFilter');
  const availFilter = document.getElementById('availabilityFilter');
  const searchInput = document.getElementById('productsSearchInput');
  if (catFilter) catFilter.value = '';
  if (brandFilter) brandFilter.value = '';
  if (availFilter) availFilter.value = '';
  if (searchInput) searchInput.value = '';
  renderProductsGrid();
}

/* ============ PRODUCT DETAIL ============ */
function loadProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) { showPage('products'); return; }
  currentProduct = product;

  // Breadcrumb
  const bName = document.getElementById('detailBreadcrumbName');
  if (bName) bName.textContent = product.name;

  // Main image
  const imgMain = document.getElementById('detailImgMain');
  if (imgMain) imgMain.innerHTML = `<span style="font-size:120px;">${product.emoji}</span>`;

  // Thumbs (simulate multiple views with same emoji at different sizes)
  const thumbs = document.getElementById('detailImgThumbs');
  if (thumbs) {
    const views = [product.emoji, product.emoji, product.emoji];
    thumbs.innerHTML = views.map((e, i) => `
      <div class="product-img-thumb ${i === 0 ? 'active' : ''}" onclick="selectThumb(this, '${e}')">
        <span style="font-size:28px;">${e}</span>
      </div>
    `).join('');
  }

  // Brand
  const brand = document.getElementById('detailBrand');
  if (brand) brand.textContent = product.brand;

  // Name
  const name = document.getElementById('detailName');
  if (name) name.textContent = product.name;

  // Availability
  const avail = document.getElementById('detailAvailability');
  if (avail) {
    const cls = product.availability === 'In Stock' ? 'avail-in'
      : product.availability === 'Order Basis' ? 'avail-order' : 'avail-out';
    avail.innerHTML = `<span class="product-detail-availability ${cls}">${
      product.availability === 'In Stock' ? '● ' : product.availability === 'Order Basis' ? '◐ ' : '○ '
    }${product.availability}</span>`;
  }

  // Price
  const priceEl = document.getElementById("detailPrice");
  if (priceEl) {
    priceEl.textContent = product.price ? formatPrice(product.price) : "";
    priceEl.style.display = product.price ? "block" : "none";
  }

  // Description
  const desc = document.getElementById('detailDesc');
  if (desc) desc.textContent = product.description;

  // Specs
  const specs = document.getElementById('detailSpecs');
  if (specs && product.specs) {
    specs.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <tr>
        <td>${k}</td>
        <td>${v}</td>
      </tr>
    `).join('');
  }

  // Actions
  const actions = document.getElementById('detailActions');
  if (actions) {
    const msg = encodeURIComponent(`Hello, I would like more information about ${product.name}.`);
    actions.innerHTML = `
      <a class="btn btn-primary" href="tel:+94740034125">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.18C.01 1.07.99.01 2.1.01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-.45a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0121.99 16.92z"/></svg>
        Get More Details
      </a>
      <a class="btn btn-whatsapp" href="https://wa.me/94740034125?text=${msg}" target="_blank" rel="noopener">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L0 24l6.335-1.648A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-4.988-1.362l-.357-.212-3.758.977.999-3.658-.233-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
        Ask on WhatsApp
      </a>
    `;
  }

  // Related products (same category, exclude current)
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    relatedGrid.innerHTML = related.length
      ? related.map((p, i) => renderProductCard(p, `reveal-delay-${i + 1}`)).join('')
      : '<p class="muted">No related products found.</p>';
  }

  setTimeout(initScrollReveal, 100);
}

function selectThumb(el, emoji) {
  document.querySelectorAll('.product-img-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('detailImgMain');
  if (main) {
    main.style.transform = 'scale(0.95)';
    setTimeout(() => {
      main.innerHTML = `<span style="font-size:120px;">${emoji}</span>`;
      main.style.transform = '';
    }, 150);
  }
}

/* ============ CONTACT FORM ============ */
function submitForm() {
  const name = document.getElementById('formName').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !phone || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Simulate form submission by opening WhatsApp
  const msg = encodeURIComponent(`Hello, my name is ${name}.\nPhone: ${phone}\n\n${message}`);
  window.open(`https://wa.me/94740034125?text=${msg}`, '_blank');

  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
    document.getElementById('formName').value = '';
    document.getElementById('formPhone').value = '';
    document.getElementById('formMessage').value = '';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
}

/* ============ 3D CARD TILT ON HOVER ============ */
(function init3DTilt() {
  // Applied dynamically to .product-card and .category-card
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const card = e.target.closest('.product-card, .category-card, .review-card, .why-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -4;
    const tiltY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest('.product-card, .category-card, .review-card, .why-card');
    if (card) card.style.transform = '';
  }, true);

  document.addEventListener('mouseout', (e) => {
    const card = e.target;
    if (card.matches('.product-card, .category-card, .review-card, .why-card')) {
      card.style.transform = '';
    }
  });
})();

/* ============ KEYBOARD ACCESSIBILITY ============ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const el = document.activeElement;
    if (el.classList.contains('product-card')) el.click();
    if (el.classList.contains('category-card')) el.click();
  }
});
