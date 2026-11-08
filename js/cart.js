// Cart Management with LocalStorage
let cart = JSON.parse(localStorage.getItem("nutriglow_cart")) || [];

function saveCart() {
  localStorage.setItem("nutriglow_cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }
  saveCart();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateQty(productId, newQty) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (newQty <= 0) {
    removeFromCart(productId);
  } else {
    item.qty = newQty;
    saveCart();
  }
}

function clearCart() {
  cart = [];
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Update badge
  const countEls = document.querySelectorAll("#cart-count");
  countEls.forEach(el => {
    el.textContent = getCartCount();
  });

  // Update cart sidebar items
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-gray-400">
        <i class="fas fa-shopping-bag text-4xl mb-4"></i>
        <p>Your cart is empty</p>
      </div>`;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="flex gap-4 items-center">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover" />
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm truncate">${item.name}</h4>
          <p class="text-primary font-semibold text-sm">${formatPrice(item.price)}</p>
          <div class="flex items-center gap-2 mt-1">
            <button onclick="updateQty('${item.id}', ${item.qty - 1})" class="qty-btn text-sm">−</button>
            <span class="text-sm font-medium w-6 text-center">${item.qty}</span>
            <button onclick="updateQty('${item.id}', ${item.qty + 1})" class="qty-btn text-sm">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${item.id}')" class="text-gray-400 hover:text-red-500 p-1">
          <i class="fas fa-trash-alt text-sm"></i>
        </button>
      </div>
    `).join("");
  }

  if (totalEl) {
    totalEl.textContent = formatPrice(getCartTotal());
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Cart sidebar toggle
function openCart() {
  document.getElementById("cart-sidebar")?.classList.add("open");
  document.getElementById("cart-overlay")?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-sidebar")?.classList.remove("open");
  document.getElementById("cart-overlay")?.classList.add("hidden");
  document.body.style.overflow = "";
}

// Init cart UI on load
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  document.getElementById("cart-btn")?.addEventListener("click", openCart);
  document.getElementById("close-cart")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);
  document.getElementById("clear-cart")?.addEventListener("click", () => {
    clearCart();
    showToast("Cart cleared");
  });
  document.getElementById("checkout-btn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }
    alert("Thank you for your order!\n\nThis is a demo store. In a real project this would redirect to a payment gateway.\n\nOrder total: " + formatPrice(getCartTotal()));
    clearCart();
    closeCart();
  });
});
