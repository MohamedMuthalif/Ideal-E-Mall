// ============================================
// IDEAL E-MALL — Cart Logic
// ============================================
'use strict';

const WHATSAPP_NUMBER = '94740034125';

// ── KOKO Pricing Algorithm ──
// KOKO instalment plans add processing/interest overhead.
// We calculate the KOKO "effective" price using a tiered markup:
//   - Base service fee: 6%  (KOKO platform fee)
//   - Instalment interest: 4% (avg spread over 3 instalments)
//   - Total markup: ~10% of product price, rounded to nearest 50
function calcKokoPrice(price) {
  const KOKO_MARKUP_RATE = 0.10;     // 10% total effective cost
  const raw = price * (1 + KOKO_MARKUP_RATE);
  return Math.ceil(raw / 50) * 50;  // round up to nearest Rs. 50
}

function kokoInstalment(price) {
  const total = calcKokoPrice(price);
  return Math.ceil(total / 3);       // 3 equal instalments
}

// ── Cart State (persisted in sessionStorage) ──
function loadCart() {
  try { return JSON.parse(sessionStorage.getItem('idealCart') || '[]'); }
  catch { return []; }
}
function saveCart(cart) {
  sessionStorage.setItem('idealCart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = loadCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = loadCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showCartToast(product.name);
}

function removeFromCart(productId) {
  const cart = loadCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQty(productId, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCartPage();
}

function setQty(productId, val) {
  const qty = parseInt(val, 10);
  if (isNaN(qty) || qty < 1) return;
  const cart = loadCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.qty = qty; saveCart(cart); renderCartPage(); }
}

function clearCart() {
  saveCart([]);
  renderCartPage();
}

// ── Toast notification ──
function showCartToast(name) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>🛒</span> <strong>${name}</strong> added to cart`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── WhatsApp Quotation Builder ──
function sendQuotation() {
  const cart = loadCart();
  if (!cart.length) return;

  const items = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return null;
    const lineTotal = p.price * item.qty;
    return { p, qty: item.qty, lineTotal };
  }).filter(Boolean);

  const grandTotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const kokoTotal  = items.reduce((s, i) => s + calcKokoPrice(i.p.price) * i.qty, 0);

  const lines = [
    '🛒 *IDEAL E-MALL — QUOTATION REQUEST*',
    '─────────────────────────────',
    ...items.map((it, idx) =>
      `${idx + 1}. *${it.p.name}*\n   Brand: ${it.p.brand}\n   Price: Rs. ${it.p.price.toLocaleString('en-LK')} × ${it.qty} = Rs. ${it.lineTotal.toLocaleString('en-LK')}`
    ),
    '─────────────────────────────',
    `💰 *Total: Rs. ${grandTotal.toLocaleString('en-LK')}*`,
    `💳 *KOKO (3 instalments): Rs. ${Math.ceil(kokoTotal / 3).toLocaleString('en-LK')} × 3*`,
    '',
    'Please confirm availability and delivery details. Thank you!'
  ];

  const msg = encodeURIComponent(lines.join('\n'));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

// ── Cart Page Renderer ──
function renderCartPage() {
  const container = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  if (!container) return;

  const cart = loadCart();
  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products from our <a href="products.html">product catalogue</a>.</p>
      </div>`;
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }

  if (summaryEl) summaryEl.style.display = 'block';

  let subtotal = 0;
  const rows = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    const line = p.price * item.qty;
    subtotal += line;
    const img = p.images?.[0];
    return `
    <div class="cart-row" id="cart-row-${p.id}">
      <div class="cart-row-img">
        ${img ? `<img src="${img}" alt="${p.name}" />` : '<span class="cart-row-emoji">📦</span>'}
      </div>
      <div class="cart-row-info">
        <div class="cart-row-brand">${p.brand}</div>
        <div class="cart-row-name">${p.name}</div>
        <div class="cart-row-price">Rs. ${p.price.toLocaleString('en-LK')}</div>
      </div>
      <div class="cart-row-qty">
        <button class="qty-btn" onclick="updateQty('${p.id}',-1)" aria-label="Decrease">−</button>
        <input class="qty-input" type="number" min="1" value="${item.qty}"
               onchange="setQty('${p.id}',this.value)" aria-label="Quantity" />
        <button class="qty-btn" onclick="updateQty('${p.id}',1)" aria-label="Increase">+</button>
      </div>
      <div class="cart-row-total">Rs. ${line.toLocaleString('en-LK')}</div>
      <button class="cart-row-remove" onclick="removeFromCart('${p.id}');renderCartPage();" aria-label="Remove">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>`;
  }).join('');

  container.innerHTML = rows;

  // Summary
  const kokoTotal = cart.reduce((s, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return p ? s + calcKokoPrice(p.price) * item.qty : s;
  }, 0);

  const sumHTML = `
    <div class="cart-summary-row"><span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)</span><strong>Rs. ${subtotal.toLocaleString('en-LK')}</strong></div>
    <div class="cart-summary-row muted"><span>Delivery</span><span>Calculated on order</span></div>
    <div class="cart-summary-divider"></div>
    <div class="cart-summary-row total-row"><span>Total</span><strong>Rs. ${subtotal.toLocaleString('en-LK')}</strong></div>
    <div class="koko-summary-block">
      <div class="koko-summary-label">💳 Pay with KOKO in 3 instalments</div>
      <div class="koko-summary-amount">Rs. ${Math.ceil(kokoTotal/3).toLocaleString('en-LK')} <span>× 3</span></div>
      <div class="koko-summary-note">KOKO total: Rs. ${kokoTotal.toLocaleString('en-LK')} (includes ~10% processing fee)</div>
    </div>
    <button class="btn btn-whatsapp btn-full" onclick="sendQuotation()">
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L0 24l6.335-1.648A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-4.988-1.362l-.357-.212-3.758.977.999-3.658-.233-.376A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
      Send Quotation via WhatsApp
    </button>
    <button class="btn btn-outline-dark btn-full" onclick="if(confirm('Clear your cart?'))clearCart();" style="margin-top:10px;">
      Clear Cart
    </button>`;

  document.getElementById('cartSummaryContent').innerHTML = sumHTML;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', updateCartBadge);
