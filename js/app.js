let productsData = [];

// ================= LOAD PRODUCTS =================
fetch("../products.json")
  .then(res => res.json())
  .then(data => {
    productsData = data;
    renderProducts("all");
  })
  .catch(err => console.error("Failed to load products.json:", err));

const container = document.getElementById("products");
const filterButtons = document.querySelectorAll(".filter-btn");

// ================= FILTER BUTTONS =================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    renderProducts(category);
  });
});

// ================= TILT EFFECT =================
function addTiltEffect(card) {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `
      translateY(-10px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "translateY(0) rotateX(0) rotateY(0) scale(1)";
  });
}

// ================= ADD TO CART =================
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,                     // ✅ stable ID
      name: product.name,
      price: Number(product.price),       // ✅ force number
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= RENDER PRODUCTS =================
function renderProducts(category) {
  container.innerHTML = "";

  const filtered =
    category === "all"
      ? productsData
      : productsData.filter(p => p.category === category);

  filtered.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="content">
        <h3 class="product-name">${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <button class="add-cart">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    `;

    container.appendChild(card);

    // Tilt effect
    addTiltEffect(card);

    // Add to cart button
    const addBtn = card.querySelector(".add-cart");
    addBtn.addEventListener("click", () => {
      addToCart(product);

      addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      addBtn.disabled = true;

      setTimeout(() => {
        addBtn.innerHTML =
          '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
        addBtn.disabled = false;
      }, 1500);
    });
  });
}