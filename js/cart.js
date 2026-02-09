const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    subtotalEl.textContent = "$0";
    totalEl.textContent = "$0";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
          <div class="qty">
            <button class="qty-btn minus">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn plus">+</button>
          </div>
        </div>
        <button class="remove">✕</button>
      </div>
    `;
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// ✅ FIXED EVENT HANDLING
cartItemsContainer.addEventListener("click", e => {
  const itemEl = e.target.closest(".cart-item");
  if (!itemEl) return;

  const id = Number(itemEl.dataset.id); // 🔥 FIX
  const product = cart.find(p => p.id === id);
  if (!product) return;

  if (e.target.classList.contains("plus")) {
    product.quantity++;
  }

  if (e.target.classList.contains("minus") && product.quantity > 1) {
    product.quantity--;
  }

  if (e.target.classList.contains("remove")) {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

renderCart();