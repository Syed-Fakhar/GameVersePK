// Product listing logic for GameVerse PK

// State variables
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 6;
let activeFilters = {
  categories: [],
  maxPrice: 1000000,
  searchQuery: ""
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof productsData === "undefined") return;

  // Initialize UI controls
  initFilterControls();
  parseURLParams();
  applyFiltersAndSort();

  // Sort change listener
  const sortSelect = document.getElementById("sort-by");
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFiltersAndSort);
  }

  // Load More button listener
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentPage++;
      renderProductsGrid(true);
    });
  }
});

// Parse category or search queries from URL parameters
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  const searchParam = params.get("search");

  if (categoryParam) {
    activeFilters.categories = [categoryParam.toLowerCase()];
    // Check relevant checkbox in UI
    const cb = document.querySelector(`.category-cb[value="${categoryParam.toLowerCase()}"]`);
    if (cb) cb.checked = true;
  }

  if (searchParam) {
    activeFilters.searchQuery = searchParam.toLowerCase();
    // Update global search input if visible
    const searchInput = document.getElementById("header-search-input");
    if (searchInput) searchInput.value = searchParam;
    
    // Also display search query indicator
    const resultsTitle = document.getElementById("results-indicator");
    if (resultsTitle) {
      resultsTitle.textContent = `Search results for "${searchParam}"`;
      resultsTitle.style.display = "block";
    }
  }
}

// Set up event listeners for filters
function initFilterControls() {
  // Category checkboxes
  const categoryCbs = document.querySelectorAll(".category-cb");
  categoryCbs.forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.categories = Array.from(categoryCbs)
        .filter(c => c.checked)
        .map(c => c.value);
      currentPage = 1;
      applyFiltersAndSort();
    });
  });

  // Price range slider
  const priceSlider = document.getElementById("price-slider");
  const priceDisplay = document.getElementById("price-slider-display");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      priceDisplay.textContent = formatPKR(val);
      activeFilters.maxPrice = val;
    });

    priceSlider.addEventListener("change", () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  // Clear filters link/button
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Reset inputs
      categoryCbs.forEach(c => c.checked = false);
      if (priceSlider) {
        priceSlider.value = priceSlider.max;
        priceDisplay.textContent = formatPKR(parseInt(priceSlider.max));
      }
      const searchInput = document.getElementById("header-search-input");
      if (searchInput) searchInput.value = "";
      
      const resultsTitle = document.getElementById("results-indicator");
      if (resultsTitle) resultsTitle.style.display = "none";

      // Reset state
      activeFilters = {
        categories: [],
        maxPrice: priceSlider ? parseInt(priceSlider.max) : 1000000,
        searchQuery: ""
      };
      
      // Update browser URL query without reload
      window.history.pushState({}, document.title, window.location.pathname);
      
      currentPage = 1;
      applyFiltersAndSort();
    });
  }
}

// Core filter and sorting executor
function applyFiltersAndSort() {
  // 1. Filtering
  filteredProducts = productsData.filter(product => {
    // Category check
    const matchesCategory = activeFilters.categories.length === 0 || 
      activeFilters.categories.includes(product.category.toLowerCase());

    // Price check
    const matchesPrice = product.price <= activeFilters.maxPrice;

    // Search check
    const matchesSearch = activeFilters.searchQuery === "" ||
      product.name.toLowerCase().includes(activeFilters.searchQuery) ||
      product.description.toLowerCase().includes(activeFilters.searchQuery);

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // 2. Sorting
  const sortVal = document.getElementById("sort-by")?.value || "bestselling";
  
  if (sortVal === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortVal === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortVal === "newest") {
    // Treat higher IDs or custom arrivals property as newest
    filteredProducts.sort((a, b) => b.id - a.id);
  } else {
    // default: bestselling/featured (higher rating first)
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Update counts
  const countSpan = document.getElementById("total-products-count");
  if (countSpan) countSpan.textContent = filteredProducts.length;

  // Render grid
  renderProductsGrid(false);
}

// HTML Renderer for product list grid
function renderProductsGrid(append = false) {
  const gridContainer = document.getElementById("products-grid-container");
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (!gridContainer) return;

  if (!append) {
    gridContainer.innerHTML = "";
  }

  if (filteredProducts.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-products-found" style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-muted);">
        <i class="fas fa-search-minus" style="font-size: 3rem; margin-bottom: 20px; color: var(--accent-purple);"></i>
        <h3>No Products Found</h3>
        <p style="margin-top: 10px; margin-bottom: 20px;">We couldn't find any products matching your filters.</p>
        <button onclick="document.getElementById('clear-filters').click();" class="btn btn-secondary btn-sm">Reset All Filters</button>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  // Calculate items to show
  const startIndex = append ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredProducts.length);
  const itemsToShow = filteredProducts.slice(startIndex, endIndex);

  // Build product card HTML chunks
  itemsToShow.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Build badges
    let badgesHTML = "";
    if (product.isNewArrival) {
      badgesHTML += `<span class="badge badge-new">New</span>`;
    }
    if (product.isBestSeller) {
      badgesHTML += `<span class="badge badge-bestseller">Best Seller</span>`;
    }

    // Build star rating
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += '<i class="fas fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalf) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
      } else {
        starsHTML += '<i class="far fa-star"></i>';
      }
    }

    card.innerHTML = `
      <div class="product-img-wrapper">
        <div class="product-badges">${badgesHTML}</div>
        <a href="product-details.html?id=${product.id}" class="product-img">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <a href="product-details.html?id=${product.id}" class="product-title-link" title="${product.name}">
          ${product.name}
        </a>
        <div class="product-rating">
          <span class="stars">${starsHTML}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${formatPKR(product.price)}</span>
          <button class="product-add-cart" data-id="${product.id}" title="Add to Cart">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // Bind Add to Cart listeners to new buttons
  const cartBtns = gridContainer.querySelectorAll(".product-add-cart");
  cartBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute("data-id");
      addToCart(pid, 1);
    });
  });

  // Toggle Visibility of "Load More" indicator
  if (loadMoreBtn) {
    if (endIndex < filteredProducts.length) {
      loadMoreBtn.style.display = "inline-flex";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }
}
