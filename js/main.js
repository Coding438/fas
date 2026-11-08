// Main UI rendering & interactions

// Mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // Render bestsellers on home
  if (document.getElementById("bestsellers-grid")) {
    renderBestsellers();
  }
});

function createProductCard(product) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return `
    <div class="product-card">
      <div class="card-img-wrap">
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.src='https://placehold.co/600x400/0f766e/ffffff?text=${encodeURIComponent(product.name)}'" />
        </a>
      </div>
      <div class="card-body">
        <div class="flex items-center gap-1 text-amber-400 text-sm mb-1">
          ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
          <span class="text-gray-400 ml-1">(${product.reviews})</span>
        </div>
        <a href="product.html?id=${product.id}">
          <h3 class="product-name">${product.name}</h3>
        </a>
        <div class="flex items-center gap-2 mb-3 flex-wrap">
          <span class="text-primary font-bold text-lg">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="text-gray-400 line-through text-sm">${formatPrice(product.originalPrice)}</span>` : ""}
          ${discount ? `<span class="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">-${discount}%</span>` : ""}
        </div>
        <div class="card-actions">
          <div class="flex gap-2">
            <button onclick="event.preventDefault(); addToCart('${product.id}')" class="btn-primary flex-1 text-sm py-2.5">
              <i class="fas fa-shopping-bag mr-1.5"></i> Add to Cart
            </button>
            <a href="product.html?id=${product.id}" class="btn-outline text-sm py-2.5 px-3" title="View product">
              <i class="fas fa-eye"></i>
            </a>
          </div>
          <button onclick="event.preventDefault(); buyNow('${product.id}')" class="btn-buy w-full text-sm py-2.5">
            <i class="fas fa-bolt mr-1.5"></i> Buy Now
          </button>
        </div>
      </div>
    </div>
  `;
}

function buyNow(productId) {
  addToCart(productId, 1);
  openCart();
}

function renderBestsellers() {
  const grid = document.getElementById("bestsellers-grid");
  if (!grid) return;
  const items = getBestsellers();
  grid.innerHTML = items.map(createProductCard).join("");
}

function renderCollection(collection, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const items = getProductsByCollection(collection);
  grid.innerHTML = items.map(createProductCard).join("");
}

function renderProductDetail(id) {
  const product = getProductById(id);
  const container = document.getElementById("product-detail");
  const breadcrumb = document.getElementById("breadcrumb-name");

  if (!product || !container) {
    if (container) {
      container.innerHTML = `<p class="col-span-2 text-center py-20 text-gray-500">Product not found. <a href="collections.html" class="text-primary underline">Back to collections</a></p>`;
    }
    return;
  }

  document.title = `${product.name} | NutriGlow`;
  if (breadcrumb) breadcrumb.textContent = product.name;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  container.innerHTML = `
    <!-- Image -->
    <div class="relative">
      <div class="bg-white rounded-2xl overflow-hidden border border-teal-50 shadow-sm">
        <img src="${product.image}" alt="${product.name}"
             class="w-full h-[380px] md:h-[460px] object-cover"
             onerror="this.src='https://placehold.co/600x600/0f766e/ffffff?text=${encodeURIComponent(product.name)}'" />
      </div>
      ${product.badge ? `<span class="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">${product.badge}</span>` : ""}
    </div>

    <!-- Info -->
    <div>
      <span class="text-primary font-semibold text-sm uppercase tracking-wide">${product.collection.replace("-", " & ")}</span>
      <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-3">${product.name}</h1>
      
      <div class="flex items-center gap-3 mb-5">
        <div class="flex text-amber-400 text-lg">
          ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}
        </div>
        <span class="text-gray-500 text-sm">${product.rating} (${product.reviews} reviews)</span>
      </div>

      <div class="flex items-center gap-3 mb-6 flex-wrap">
        <span class="text-3xl font-bold text-primary">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `
          <span class="text-xl text-gray-400 line-through">${formatPrice(product.originalPrice)}</span>
          <span class="bg-red-100 text-red-600 text-sm font-semibold px-2.5 py-1 rounded">Save ${discount}%</span>
        ` : ""}
      </div>

      <p class="text-gray-600 leading-relaxed mb-6">${product.description}</p>

      <ul class="space-y-2.5 mb-8">
        ${product.features.map(f => `
          <li class="flex items-center gap-2.5 text-sm">
            <i class="fas fa-check-circle text-primary"></i>
            <span>${f}</span>
          </li>
        `).join("")}
      </ul>

      <div class="flex items-center gap-4 mb-6 flex-wrap">
        <span class="text-sm font-medium text-gray-700">Quantity:</span>
        <div class="flex items-center gap-2">
          <button type="button" id="qty-minus" class="qty-btn">−</button>
          <input type="number" id="product-qty" value="1" min="1" max="${product.stock}"
                 class="w-14 text-center border border-gray-300 rounded-lg py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button type="button" id="qty-plus" class="qty-btn">+</button>
        </div>
        <span class="text-sm text-gray-500">${product.stock} in stock</span>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="product-actions mb-8">
        <button type="button" id="add-to-cart-btn" class="btn-primary">
          <i class="fas fa-shopping-bag mr-2"></i> Add to Cart
        </button>
        <button type="button" id="buy-now-btn" class="btn-buy">
          <i class="fas fa-bolt mr-2"></i> Buy Now
        </button>
      </div>

      <div class="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div class="flex items-center gap-2"><i class="fas fa-truck text-primary w-5"></i> Free shipping over $50</div>
        <div class="flex items-center gap-2"><i class="fas fa-undo text-primary w-5"></i> 30-day returns</div>
        <div class="flex items-center gap-2"><i class="fas fa-shield-alt text-primary w-5"></i> Secure payment</div>
        <div class="flex items-center gap-2"><i class="fas fa-leaf text-primary w-5"></i> 100% Natural</div>
      </div>
    </div>
  `;

  // Quantity controls
  const qtyInput = document.getElementById("product-qty");
  document.getElementById("qty-minus")?.addEventListener("click", () => {
    let v = parseInt(qtyInput.value) || 1;
    if (v > 1) qtyInput.value = v - 1;
  });
  document.getElementById("qty-plus")?.addEventListener("click", () => {
    let v = parseInt(qtyInput.value) || 1;
    if (v < product.stock) qtyInput.value = v + 1;
  });

  // Add to Cart
  document.getElementById("add-to-cart-btn")?.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product.id, qty);
  });

  // Buy Now – add to cart then open cart sidebar
  document.getElementById("buy-now-btn")?.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value) || 1;
    addToCart(product.id, qty);
    openCart();
  });

  // Related products
  const related = getProductsByCollection(product.collection).filter(p => p.id !== product.id);
  const relatedGrid = document.getElementById("related-grid");
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map(createProductCard).join("");
  }
}
