// Shopping Cart logic for GameVerse PK

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  initCheckout();
});

// Render the entire shopping cart page state
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTableBody = document.getElementById("cart-table-body");
  const emptyCartState = document.getElementById("empty-cart-state");
  const cartWrapper = document.querySelector(".cart-page-wrapper");
  
  if (!cartItemsContainer && !cartTableBody) return;

  const cart = getCart();

  // If cart is empty, show empty state
  if (cart.length === 0) {
    if (emptyCartState) emptyCartState.style.display = "block";
    if (cartWrapper) cartWrapper.style.display = "none";
    return;
  }

  // Else, hide empty state and show cart grid
  if (emptyCartState) emptyCartState.style.display = "none";
  if (cartWrapper) cartWrapper.style.display = "grid";

  // Build table lines
  if (cartTableBody) {
    cartTableBody.innerHTML = "";

    cart.forEach(item => {
      const row = document.createElement("tr");
      row.setAttribute("data-product-id", item.id);
      
      const itemSubtotal = item.price * item.quantity;

      row.innerHTML = `
        <td>
          <div class="cart-product-cell">
            <div class="cart-product-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div>
              <a href="product-details.html?id=${item.id}" class="cart-product-name">${item.name}</a>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; text-transform: uppercase;">
                ${item.category}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div class="cart-price-cell">${formatPKR(item.price)}</div>
        </td>
        <td>
          <div class="quantity-selector">
            <div class="qty-btn qty-minus" data-id="${item.id}"><i class="fas fa-minus"></i></div>
            <input type="number" class="qty-input" data-id="${item.id}" value="${item.quantity}" min="1" max="99">
            <div class="qty-btn qty-plus" data-id="${item.id}"><i class="fas fa-plus"></i></div>
          </div>
        </td>
        <td>
          <div class="cart-subtotal-cell" id="subtotal-${item.id}">${formatPKR(itemSubtotal)}</div>
        </td>
        <td style="text-align: right;">
          <div class="cart-remove-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></div>
        </td>
      `;

      cartTableBody.appendChild(row);
    });

    bindCartEvents();
  }

  // Update overall cart sums
  updateCartTotals();
}

// Bind interactions on table lines (quantity inputs, +/- triggers, delete buttons)
function bindCartEvents() {
  // Minus button click
  document.querySelectorAll(".qty-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      adjustQuantity(id, -1);
    });
  });

  // Plus button click
  document.querySelectorAll(".qty-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      adjustQuantity(id, 1);
    });
  });

  // Direct numeric input change
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const id = input.getAttribute("data-id");
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 99) val = 99;
      e.target.value = val;
      setQuantity(id, val);
    });
  });

  // Remove item button click
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeItemFromCart(id);
    });
  });
}

// Adjust quantity by delta (+1 / -1)
function adjustQuantity(productId, delta) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === parseInt(productId));

  if (index > -1) {
    let newQty = cart[index].quantity + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > 99) newQty = 99;
    
    cart[index].quantity = newQty;
    saveCart(cart);
    
    // Update individual input value in DOM directly to keep focus/state clean
    const input = document.querySelector(`.qty-input[data-id="${productId}"]`);
    if (input) input.value = newQty;

    // Update subtotal in row
    const subtotalText = document.getElementById(`subtotal-${productId}`);
    if (subtotalText) {
      subtotalText.textContent = formatPKR(cart[index].price * newQty);
    }

    updateCartTotals();
  }
}

// Directly set specific quantity
function setQuantity(productId, qty) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === parseInt(productId));

  if (index > -1) {
    cart[index].quantity = parseInt(qty);
    saveCart(cart);
    
    // Update subtotal in row
    const subtotalText = document.getElementById(`subtotal-${productId}`);
    if (subtotalText) {
      subtotalText.textContent = formatPKR(cart[index].price * qty);
    }

    updateCartTotals();
  }
}

// Remove single product row
function removeItemFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart(cart);
  
  // Slide out animation in DOM before rebuilding
  const row = document.querySelector(`tr[data-product-id="${productId}"]`);
  if (row) {
    row.style.opacity = "0";
    row.style.transform = "translateX(-20px)";
    row.style.transition = "all 0.3s ease";
    setTimeout(() => {
      renderCart();
    }, 300);
  } else {
    renderCart();
  }
}

// Recalculate summary panel totals and shipping rates
function updateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Shipping rule: flat 800 PKR, but free above 50,000 PKR
  const shippingThreshold = 50000;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 800;
  
  const grandTotal = subtotal + shippingCost;

  // DOM elements
  const subtotalText = document.getElementById("summary-subtotal");
  const shippingText = document.getElementById("summary-shipping");
  const totalText = document.getElementById("summary-total");
  const bannerMessage = document.getElementById("shipping-banner-message");

  if (subtotalText) subtotalText.textContent = formatPKR(subtotal);
  if (shippingText) {
    shippingText.textContent = shippingCost === 0 ? "FREE" : formatPKR(shippingCost);
  }
  if (totalText) totalText.textContent = formatPKR(grandTotal);

  if (bannerMessage) {
    if (subtotal >= shippingThreshold) {
      bannerMessage.innerHTML = `<span style="color: #2ecc71;"><i class="fas fa-shipping-fast"></i> You qualify for FREE shipping!</span>`;
    } else {
      const remaining = shippingThreshold - subtotal;
      bannerMessage.innerHTML = `<span>Add <strong>${formatPKR(remaining)}</strong> more to unlock <strong>FREE Shipping</strong>!</span>`;
    }
  }
}

// Checkout simulation modal logic
function initCheckout() {
  const checkoutBtn = document.getElementById("checkout-proceed-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeModal = document.getElementById("close-checkout-modal");
  const checkoutForm = document.getElementById("checkout-form");
  const thankYouState = document.getElementById("checkout-thank-you");
  const stepCheckout = document.getElementById("step-checkout-indicator");
  const stepComplete = document.getElementById("step-complete-indicator");

  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener("click", () => {
      checkoutModal.classList.add("show");
      if (stepCheckout) stepCheckout.classList.add("active");
    });
  }

  if (closeModal && checkoutModal) {
    closeModal.addEventListener("click", () => {
      checkoutModal.classList.remove("show");
      if (stepCheckout) stepCheckout.classList.remove("active");
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show summary of order in thank you state
      const orderId = "GV" + Math.floor(100000 + Math.random() * 900000);
      const customerName = document.getElementById("checkout-name").value;

      const orderIdSpan = document.getElementById("order-id-display");
      const customerNameSpan = document.getElementById("customer-name-display");

      if (orderIdSpan) orderIdSpan.textContent = orderId;
      if (customerNameSpan) customerNameSpan.textContent = customerName;

      // Swap form view with Success view in modal
      checkoutForm.style.display = "none";
      if (thankYouState) thankYouState.style.display = "block";

      // Update Progressive Steps
      if (stepCheckout) {
        stepCheckout.classList.remove("active");
        stepCheckout.classList.add("completed");
      }
      if (stepComplete) {
        stepComplete.classList.add("active");
      }

      // Clear Cart state
      localStorage.removeItem("gv_cart");
      updateCartBadge();

      // Refresh background cart page beneath modal
      const cartTableBody = document.getElementById("cart-table-body");
      const emptyCartState = document.getElementById("empty-cart-state");
      const cartWrapper = document.querySelector(".cart-page-wrapper");

      // Set up click handler on final confirmation close
      const finishBtn = document.getElementById("finish-order-btn");
      if (finishBtn) {
        finishBtn.addEventListener("click", () => {
          checkoutModal.classList.remove("show");
          setTimeout(() => {
            // Re-render empty cart
            if (emptyCartState) emptyCartState.style.display = "block";
            if (cartWrapper) cartWrapper.style.display = "none";
            
            // Reset progressive steps
            if (stepCheckout) stepCheckout.classList.remove("active", "completed");
            if (stepComplete) stepComplete.classList.remove("active");
          }, 300);
        });
      }
    });
  }
}
