/* =====================================================
   VELO Clothing Brand — script.js
   Handles: Products, Cart, Filter, Animations, UI
===================================================== */

// ─── PRODUCT DATA ─────────────────────────────────
const products = [
  {
    id: 1,
    name: "Classic Linen Shirt",
    category: "Men",
    price: 1299,
    originalPrice: 1799,
    badge: "Sale",
    rating: 4.5,
    ratingCount: 128,
    isNew: false,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80"
  },
  {
    id: 2,
    name: "Floral Midi Dress",
    category: "Women",
    price: 2199,
    originalPrice: null,
    badge: "New",
    rating: 4.8,
    ratingCount: 74,
    isNew: true,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80"
  },
  {
    id: 3,
    name: "Oversized Hoodie",
    category: "Streetwear",
    price: 1899,
    originalPrice: 2499,
    badge: "Sale",
    rating: 4.7,
    ratingCount: 209,
    isNew: false,
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80"
  },
  {
    id: 4,
    name: "Woven Leather Bag",
    category: "Accessories",
    price: 3499,
    originalPrice: null,
    badge: "New",
    rating: 4.9,
    ratingCount: 56,
    isNew: true,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80"
  },
  {
    id: 5,
    name: "Slim Chino Pants",
    category: "Men",
    price: 1599,
    originalPrice: null,
    badge: null,
    rating: 4.4,
    ratingCount: 183,
    isNew: false,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6c?w=500&q=80"
  },
  {
    id: 6,
    name: "Crop Knit Sweater",
    category: "Women",
    price: 1749,
    originalPrice: 2299,
    badge: "Sale",
    rating: 4.6,
    ratingCount: 97,
    isNew: false,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80"
  },
  {
    id: 7,
    name: "Cargo Jogger",
    category: "Streetwear",
    price: 1649,
    originalPrice: null,
    badge: "New",
    rating: 4.5,
    ratingCount: 142,
    isNew: true,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&q=80"
  },
  {
    id: 8,
    name: "Silver Chain Necklace",
    category: "Accessories",
    price: 899,
    originalPrice: null,
    badge: null,
    rating: 4.7,
    ratingCount: 88,
    isNew: false,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80"
  },
  {
    id: 9,
    name: "Relaxed Blazer",
    category: "Men",
    price: 3799,
    originalPrice: 4999,
    badge: "Sale",
    rating: 4.8,
    ratingCount: 61,
    isNew: false,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80"
  },
  {
    id: 10,
    name: "High-Waist Jeans",
    category: "Women",
    price: 2099,
    originalPrice: null,
    badge: "New",
    rating: 4.6,
    ratingCount: 154,
    isNew: true,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80"
  },
  {
    id: 11,
    name: "Graphic Tee",
    category: "Streetwear",
    price: 799,
    originalPrice: 999,
    badge: "Sale",
    rating: 4.3,
    ratingCount: 312,
    isNew: false,
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&q=80"
  },
  {
    id: 12,
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: 599,
    originalPrice: null,
    badge: null,
    rating: 4.5,
    ratingCount: 76,
    isNew: false,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
  }
];

// ─── CART STATE ────────────────────────────────────
let cart = [];
let wishlist = new Set();

// ─── RENDER PRODUCTS ──────────────────────────────
function createProductCard(product, delay = 0) {
  const stars = renderStars(product.rating);
  const badgeHTML = product.badge
    ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>`
    : "";
  const originalPriceHTML = product.originalPrice
    ? `<span class="product-original">₹${product.originalPrice.toLocaleString("en-IN")}</span>`
    : "";
  const isWishlisted = wishlist.has(product.id);

  return `
    <div class="product-card" style="animation-delay:${delay}s" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image">
        ${badgeHTML}
        <button class="product-wishlist ${isWishlisted ? "active" : ""}"
          onclick="toggleWishlist(event, ${product.id})" title="Wishlist">
          ${isWishlisted ? "♥" : "♡"}
        </button>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button class="product-add-btn" onclick="addToCart(event, ${product.id})">
          + Add to Cart
        </button>
      </div>
      <div class="product-info">
        <p class="product-cat">${product.category}</p>
        <p class="product-name">${product.name}</p>
        <div class="product-price-row">
          <span class="product-price">₹${product.price.toLocaleString("en-IN")}</span>
          ${originalPriceHTML}
        </div>
        <div class="product-rating">${stars} (${product.ratingCount})</div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function renderProductGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items
    .map((p, i) => createProductCard(p, i * 0.08))
    .join("");
}

// ─── INIT GRIDS ───────────────────────────────────
function initGrids() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  renderProductGrid("newArrivalsGrid", newArrivals);
  renderProductGrid("allProductsGrid", products);
}

// ─── FILTER ───────────────────────────────────────
function filterCategory(cat) {
  // Scroll to all products and set filter
  document.getElementById("all-products").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    setActiveFilter(cat);
    applyFilter(cat);
  }, 400);
}

function setActiveFilter(cat) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === cat);
  });
}

function applyFilter(cat) {
  const filtered = cat === "All" ? products : products.filter(p => p.category === cat);
  renderProductGrid("allProductsGrid", filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveFilter(btn.dataset.filter);
      applyFilter(btn.dataset.filter);
    });
  });
});

// ─── CART ─────────────────────────────────────────
function addToCart(event, productId) {
  event.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`"${product.name}" added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const countEl = document.getElementById("cartCount");
  const cartItemsEl = document.getElementById("cartItems");
  const cartFooterEl = document.getElementById("cartFooter");
  const cartTotalEl = document.getElementById("cartTotal");

  countEl.textContent = count;
  countEl.classList.toggle("visible", count > 0);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    cartFooterEl.style.display = "none";
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">₹${item.price.toLocaleString("en-IN")} × ${item.qty}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>
    `).join("");
    cartFooterEl.style.display = "flex";
    cartTotalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
  }
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  const isOpen = sidebar.classList.contains("open");
  sidebar.classList.toggle("open", !isOpen);
  overlay.classList.toggle("visible", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
}

document.getElementById("cartBtn").addEventListener("click", toggleCart);

// ─── WISHLIST ─────────────────────────────────────
function toggleWishlist(event, productId) {
  event.stopPropagation();
  const btn = event.currentTarget;
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    btn.classList.remove("active");
    btn.textContent = "♡";
    showToast("Removed from wishlist");
  } else {
    wishlist.add(productId);
    btn.classList.add("active");
    btn.textContent = "♥";
    showToast("Added to wishlist");
  }
}

// ─── TOAST ────────────────────────────────────────
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ─── NAVBAR SCROLL ────────────────────────────────
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ─── HAMBURGER MENU ───────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ─── COUNTER ANIMATION ────────────────────────────
function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString("en-IN");
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString("en-IN");
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-num").forEach(el => observer.observe(el));
}

// ─── FADE-IN ON SCROLL ────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-header, .collection-card, .mid-banner-text, .about-content").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ─── NEWSLETTER ───────────────────────────────────
function subscribeNewsletter() {
  const input = document.getElementById("emailInput");
  const msg = document.getElementById("newsletterMsg");
  const email = input.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    msg.style.color = "#e04040";
    return;
  }

  msg.textContent = "You're in! Welcome to the VELO family.";
  msg.style.color = "#c8a96e";
  input.value = "";
}

document.getElementById("emailInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") subscribeNewsletter();
});

// ─── BOOT ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initGrids();
  initCounters();
  initScrollReveal();
  updateCartUI();
});
