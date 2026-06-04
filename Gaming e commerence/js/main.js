// Global JavaScript logic for GameVerse PK

document.addEventListener("DOMContentLoaded", () => {
  initCart();
  initMobileMenu();
  initSearch();
  initNewsletter();
});

// Cart Utility Functions
function getCart() {
  const cart = localStorage.getItem("gv_cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("gv_cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === parseInt(productId));

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += parseInt(qty);
  } else {
    // Retrieve product details from global productsData array
    const product = typeof productsData !== "undefined" 
      ? productsData.find(p => p.id === parseInt(productId)) 
      : null;

    if (product) {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: parseInt(qty)
      });
    }
  }

  saveCart(cart);
  showToast("Product added to cart!");
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cart-count");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    
    // Animate badge
    if (totalItems > 0) {
      badge.classList.add("pulse-badge");
      setTimeout(() => badge.classList.remove("pulse-badge"), 500);
    }
  }
}

function initCart() {
  updateCartBadge();
}

// Custom Toast Notification
function showToast(message) {
  // Check if container exists, else create it
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-check-circle toast-icon"></i>
      <span>${message}</span>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animations
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Mobile Menu Handler
function initMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
}

// Global Search Redirection
function initSearch() {
  const searchForm = document.getElementById("header-search-form");
  const searchInput = document.getElementById("header-search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

// Newsletter Simulation
function initNewsletter() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value) {
        showToast("Subscribed successfully! Welcome to GameVerse.");
        emailInput.value = "";
      }
    });
  }
}

// Utility to Format Currency in PKR
function formatPKR(amount) {
  return "PKR " + amount.toLocaleString("en-PK");
}
