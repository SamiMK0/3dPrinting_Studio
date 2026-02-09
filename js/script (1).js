// script.js

// Cart array to store selected products
let cart = [];

// Function to add product to cart
function addToCart(name, price, quantity) {
  // Convert price and quantity to numbers
  price = parseFloat(price);
  quantity = parseInt(quantity);

  // Check if product already in cart
  const existingIndex = cart.findIndex(item => item.name === name);
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
}

// Update WhatsApp message
function sendCartToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hi! I want to purchase the following products:\n\n";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${item.name} - Qty: ${item.quantity} - Price: $${item.price} - Total: $${itemTotal.toFixed(2)}\n`;
  });

  message += `\nGrand Total: $${total.toFixed(2)}`;

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);

  // Replace with your WhatsApp number
  const phoneNumber = "1234567890";

  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}

// Event listeners for all "Add to Cart" buttons
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const name = productCard.dataset.name;
    const price = productCard.dataset.price;
    const quantity = productCard.querySelector(".quantity").value;

    addToCart(name, price, quantity);

    // Optional: Give visual feedback
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1000);
  });
});

// Event listener for "Send All to WhatsApp" button
document.getElementById("send-cart").addEventListener("click", sendCartToWhatsApp);
