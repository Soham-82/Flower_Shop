const bouquets = [
  {
    id: 1,
    name: "Blush Garden",
    category: "romantic",
    price: 58,
    description: "Garden roses, ranunculus, lisianthus, and soft greenery.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Citrus Morning",
    category: "bright",
    price: 46,
    description: "Sunflowers, spray roses, chamomile, and lemon leaf.",
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "White Linen",
    category: "minimal",
    price: 52,
    description: "White tulips, anemones, eucalyptus, and textured wrap.",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Wild Romance",
    category: "romantic",
    price: 68,
    description: "Peonies, roses, waxflower, and trailing seasonal greens.",
    image: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Market Brights",
    category: "bright",
    price: 42,
    description: "A lively florist's choice bunch in warm seasonal colors.",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Greenhouse Calm",
    category: "minimal",
    price: 49,
    description: "Cream blooms, sculptural stems, and aromatic foliage.",
    image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Coral Crush",
    category: "bright",
    price: 55,
    description: "Coral roses, poppies, dahlias, and dancing filler stems.",
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Rose Ceremony",
    category: "romantic",
    price: 74,
    description: "Premium roses with delicate texture for grand gestures.",
    image: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=700&q=85"
  }
];

const productGrid = document.querySelector("#productGrid");
const filters = document.querySelectorAll(".filter");
const cartButton = document.querySelector(".cart-button");
const cartDrawer = document.querySelector(".cart-drawer");
const closeCart = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector(".contact-form");

let activeFilter = "all";
let cart = [];

function formatPrice(value) {
  return `$${value}`;
}

function renderProducts() {
  const visibleBouquets = activeFilter === "all"
    ? bouquets
    : bouquets.filter((bouquet) => bouquet.category === activeFilter);

  productGrid.innerHTML = visibleBouquets.map((bouquet) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${bouquet.image}" alt="${bouquet.name} bouquet">
      </div>
      <div class="product-info">
        <div class="product-top">
          <h3>${bouquet.name}</h3>
          <span class="price">${formatPrice(bouquet.price)}</span>
        </div>
        <p>${bouquet.description}</p>
        <button class="button primary add-to-cart" type="button" data-id="${bouquet.id}">
          Add to bag
        </button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your bag is waiting for fresh flowers.</p>`;
    cartTotal.textContent = "$0";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name} bouquet">
      <div>
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price)}</p>
      </div>
      <button class="remove-item" type="button" aria-label="Remove ${item.name}" data-id="${item.id}">x</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatPrice(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}

filters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    filters.forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    activeFilter = filterButton.dataset.filter;
    renderProducts();
  });
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart");

  if (!button) {
    return;
  }

  const bouquet = bouquets.find((item) => item.id === Number(button.dataset.id));
  cart.push(bouquet);
  renderCart();
  openCart();
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-item");

  if (!removeButton) {
    return;
  }

  const itemIndex = cart.findIndex((item) => item.id === Number(removeButton.dataset.id));

  if (itemIndex >= 0) {
    cart.splice(itemIndex, 1);
    renderCart();
  }
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector("button");
  submitButton.textContent = "Request sent";
  contactForm.reset();

  window.setTimeout(() => {
    submitButton.textContent = "Send request";
  }, 2200);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartDrawer();
  }
});

renderProducts();
renderCart();
