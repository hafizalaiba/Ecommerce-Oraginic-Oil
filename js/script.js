document.querySelectorAll(".preview-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const name = card.dataset.name;
    const price = card.dataset.price;
    const img = card.dataset.img;
    const category = card.dataset.category || "Exclusive_Bundle";
    const tags = card.dataset.tags;

    // Open new page with query params
    const url = `preview.html
?name=${encodeURIComponent(name)}
&price=${price}
&img=${encodeURIComponent(img)}
&category=${encodeURIComponent(category)}
&tags=${encodeURIComponent(tags)}`;
    window.location.href = url;
  });
});
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const cartActions = document.getElementById("cart-actions");
// Open / close cart
if (cartBtn && cartSidebar) {
  cartBtn.onclick = () => cartSidebar.classList.add("active");
  closeCart.onclick = () => cartSidebar.classList.remove("active");
}
cart = JSON.parse(localStorage.getItem("cart")) || [];
window.addEventListener("DOMContentLoaded", () => {
  updateCartUI(); 
});
// Add to cart
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const product = {
      id: Date.now(), 
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      img: card.dataset.img,
      qty: 1,
    };
    cart.push(product); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartUI(); 
    cartSidebar.classList.add("active"); 
  });
});
function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}">
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
          </div>
          <span class="remove" data-id="${item.id}">&times;</span>
        </div>
      `;
  });

  cartTotal.innerText = `Total: $${total.toFixed(2)}`;
  cartCount.innerText = cart.length;

  cartActions.style.display = cart.length > 0 ? "flex" : "none";
  // remove item
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.onclick = () => {
      cart = cart.filter((i) => i.id != btn.dataset.id);
      localStorage.setItem("cart", JSON.stringify(cart)); 
      updateCartUI();
    };
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  function updateCartNav() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((acc, item) => acc + Number(item.qty || 0), 0);
    cartCount.textContent = totalQty;
  }
  updateCartNav();
});
//  checkout
const checkoutBtn = document.getElementById("checkout");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout functionality not implemented yet.");
  });
}
// image scroll hero side
const overlayBox = document.querySelector(".overlay-box");
if (overlayBox) {
  window.addEventListener("scroll", () => {
    overlayBox.style.top = window.scrollY * 0.5 + "px";
  });
}
function toggleAccordion(element) {
  const item = element.parentElement;
  const icon = element.querySelector(".icon");

  if (item.classList.contains("active")) {
    item.classList.remove("active");
    icon.textContent = "+";
  } else {
    item.classList.add("active");
    icon.textContent = "×";
  }
}
// dropdown
const dropdown = document.querySelector(".dropdown");
const dropdownMenu = dropdown?.querySelector(".dropdown-menu");

if (dropdown && dropdownMenu) {
  dropdown.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdownMenu.style.display = "none";
    }
  });
}

// blog page Js
const checkbox = document.getElementById("saveCheck");
const postBtn = document.getElementById("postBtn");

if (checkbox && postBtn) {
  checkbox.addEventListener("change", () => {
    postBtn.disabled = !checkbox.checked;
    postBtn.classList.toggle("active", checkbox.checked);
  });
}

// Backend-ready submit
const commentForm = document.getElementById("commentForm");
if (commentForm) {
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Comment ready to be sent to backend!");
  });
}

// Search bar
window.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearch = document.getElementById("close-search");
  const searchInput = document.getElementById("search-input");

  if (!searchBtn || !searchOverlay) return; 

  searchBtn.addEventListener("click", () => {
    searchOverlay.style.display = "flex";
    searchInput.focus();
  });

  closeSearch.addEventListener("click", () => {
    searchOverlay.style.display = "none";
    searchInput.value = "";
  });
});
// Toggle password visibility
function togglePassword(id, icon) {
  const pass = document.getElementById(id);
  if (pass.type === "password") {
    pass.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    pass.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
// Create Account link click
const createAccountLink = document.getElementById("createAccountLink");
if (createAccountLink) {
  createAccountLink.addEventListener("click", function (e) {
    e.preventDefault();
    showRegistration();
  });
}

// Forms
// registration & login using localStorage
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Show registration/login forms
function showRegistration() {
  const loginDiv = document.querySelector(".login");
  const registerDiv = document.querySelector(".register");
  if (loginDiv && registerDiv) {
    loginDiv.classList.remove("active");
    registerDiv.classList.add("active");
  }
}

function showLogin() {
  const loginDiv = document.querySelector(".login");
  const registerDiv = document.querySelector(".register");
  if (loginDiv && registerDiv) {
    registerDiv.classList.remove("active");
    loginDiv.classList.add("active");
  }
}

// Registration
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const pass = this.querySelector("#regPassword")?.value || "";

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ name, email, pass })
    );

    alert("Registration successful! Now you can login.");
    this.reset();
    showLogin();
  });
}

// Login
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const pass = this.querySelector("#loginPassword")?.value || "";
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (user && user.email === email && user.pass === pass) {
      alert("Login successful! Welcome " + user.name);
      this.reset();
      window.location.href = "index.html";
    } else {
      alert("You are not registered! Click OK to register.");
      showRegistration();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll(".dropdown > a").forEach((link) => {
    const dropdownMenu = link.nextElementSibling;
    if (dropdownMenu) {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownMenu.classList.toggle("active");
        }
      });
    }
  });
});
