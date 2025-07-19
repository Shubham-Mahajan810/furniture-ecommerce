let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(button) {
  const productDiv = button.closest(".hero-product");

  const id = parseInt(productDiv.dataset.id);
  const name = productDiv.dataset.name;
  const price = parseInt(productDiv.dataset.price);
  const image = productDiv.dataset.image;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function displayCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");

  if (!cartItemsDiv || !totalPriceSpan) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80" />
        <p>${item.name} - ₹${item.price} x ${item.qty}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  totalPriceSpan.textContent = total;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
