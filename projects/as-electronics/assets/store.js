const CART_KEY = "as-electronics-cart";

// Portfolio copy: the real shop posts orders and messages to an email service; here they stay in the browser.
function demoSend() {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(slug, qty) {
  const cart = readCart();
  cart[slug] = (cart[slug] || 0) + (qty || 1);
  writeCart(cart);
}

function setCartQty(slug, qty) {
  const cart = readCart();
  if (qty <= 0) {
    delete cart[slug];
  } else {
    cart[slug] = qty;
  }
  writeCart(cart);
}

function removeFromCart(slug) {
  const cart = readCart();
  delete cart[slug];
  writeCart(cart);
}

function clearCart() {
  writeCart({});
}

function cartItemCount() {
  const cart = readCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartTotal() {
  const cart = readCart();
  return Object.entries(cart).reduce((sum, [key, qty]) => {
    const item = getCartItem(key);
    return item ? sum + item.price * qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = String(cartItemCount());
}

function formatEuro(amount) {
  return "€" + amount.toFixed(0);
}

function estimatedDeliveryText() {
  const locale = getLang() === "sq" ? "sq-AL" : "en-GB";
  const fmt = (d) => d.toLocaleDateString(locale, { day: "numeric", month: "long" });
  const start = new Date();
  start.setDate(start.getDate() + 2);
  const end = new Date();
  end.setDate(end.getDate() + 4);
  return t("delivery_estimate_msg").replace("{start}", fmt(start)).replace("{end}", fmt(end));
}

// --- Shared page chrome (nav toggle, year, cart badge, language, translations) ---
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = getLang();
  applyStaticTranslations();
  updateCartBadge();

  document.body.insertAdjacentHTML("beforeend", `<a class="demo-back" href="../../index.html#work">← ${t("demo_back")}</a>`);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const siteHeader = document.querySelector(".site-header");
  const updateHeaderHeightVar = () => {
    if (siteHeader) document.documentElement.style.setProperty("--header-height", siteHeader.offsetHeight + "px");
  };
  updateHeaderHeightVar();
  window.addEventListener("resize", updateHeaderHeightVar);

  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      updateHeaderHeightVar();
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
      if (isOpen) {
        const headerSearch = document.getElementById("header-search");
        const searchToggle = document.getElementById("search-toggle");
        if (headerSearch && headerSearch.classList.contains("open")) {
          headerSearch.classList.remove("open");
          if (searchToggle) searchToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");
  if (navDropdownToggle) {
    const navItemDropdown = navDropdownToggle.closest(".nav-item-dropdown");
    navDropdownToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = navItemDropdown.classList.toggle("open");
      navDropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        if (!mainNav.classList.contains("open")) {
          navItemDropdown.classList.remove("open");
          navDropdownToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => { window.location.href = "checkout.html"; });
  }

  const navCategoriesMenu = document.getElementById("nav-categories-menu");
  if (navCategoriesMenu && typeof CATEGORIES !== "undefined") {
    navCategoriesMenu.innerHTML = CATEGORIES.map((cat) => `
      <a href="products.html?cat=${cat.slug}">${localizedCategoryName(cat)}</a>
    `).join("");
  }

  const headerSearch = document.getElementById("header-search");
  if (headerSearch) {
    const params = new URLSearchParams(window.location.search);
    const currentQuery = params.get("q");
    if (currentQuery) headerSearch.querySelector("input[name=q]").value = currentQuery;

    headerSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = headerSearch.querySelector("input[name=q]").value.trim();
      const url = new URL("products.html", window.location.href);
      if (query) url.searchParams.set("q", query);
      window.location.href = url.toString();
    });
  }

  const searchToggle = document.getElementById("search-toggle");
  if (searchToggle && headerSearch) {
    searchToggle.addEventListener("click", () => {
      const isOpen = headerSearch.classList.toggle("open");
      searchToggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        headerSearch.querySelector("input[name=q]").focus();
        const navToggleBtn = document.getElementById("nav-toggle");
        const mainNavEl = document.getElementById("main-nav");
        if (mainNavEl && mainNavEl.classList.contains("open")) {
          mainNavEl.classList.remove("open");
          if (navToggleBtn) {
            navToggleBtn.classList.remove("open");
            navToggleBtn.setAttribute("aria-expanded", "false");
          }
          document.body.classList.remove("nav-open");
        }
      }
    });
  }

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    const currentLang = getLang();
    langToggle.textContent = currentLang === "sq" ? "SHQ" : "EN";
    langToggle.addEventListener("click", () => setLang(currentLang === "sq" ? "en" : "sq"));
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const statusEl = document.getElementById("form-status");
      const submitBtn = contactForm.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      statusEl.textContent = t("checkout_submitting") || "Submitting…";

      try {
        const result = await demoSend(); // portfolio copy: the message never leaves the browser

        if (result.success) {
          statusEl.textContent = t("contact_success");
          contactForm.reset();
        } else {
          statusEl.textContent = t("checkout_error") || "Something went wrong. Please try again.";
        }
      } catch (err) {
        statusEl.textContent = t("checkout_error") || "Something went wrong. Please try again.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});

// --- Product card rendering (used by index.html and products.html) ---
function thumbStyle(product) {
  return product.image ? ` style="background-image:url('${product.image}');background-color:#fff"` : "";
}

function priceHtml(product) {
  if (product.originalPrice) {
    return `<span class="price">${formatEuro(product.price)} <span class="price-original">${formatEuro(product.originalPrice)}</span></span>`;
  }
  return `<span class="price">${formatEuro(product.price)}</span>`;
}

function discountPercent(product) {
  if (!product.originalPrice) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

function discountBadgeHtml(product) {
  const pct = discountPercent(product);
  return pct > 0 ? `<span class="discount-badge">-${pct}%</span>` : "";
}

function productCardHtml(product) {
  return `
    <article class="product-card">
      <a href="product.html?slug=${product.slug}" class="product-thumb-link">
        <div class="product-thumb"${thumbStyle(product)}>${product.image ? "" : product.icon}</div>
        ${discountBadgeHtml(product)}
        ${product.condition ? `<span class="condition-badge">${localizedCondition(product)}</span>` : ""}
      </a>
      <a href="product.html?slug=${product.slug}" class="product-title-link"><h3>${localizedName(product)}</h3></a>
      <p class="product-desc">${localizedDesc(product)}</p>
      <div class="product-footer">
        ${priceHtml(product)}
        ${product.variants
          ? `<a href="product.html?slug=${product.slug}" class="btn btn-small">${t("choose_options")}</a>`
          : `<button class="btn btn-small add-btn" data-slug="${product.slug}" type="button">${t("add_to_cart")}</button>`}
      </div>
    </article>
  `;
}

function specsTableHtml(product) {
  if (!product.specs || product.specs.length === 0) return "";
  const lang = getLang();
  return product.specs.map((row) => `
    <tr>
      <th>${row["label_" + lang] || row.label}</th>
      <td>${row["value_" + lang] || row.value}</td>
    </tr>
  `).join("");
}

function wireAddButtons(container) {
  container.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.slug, 1);
      const original = button.textContent;
      button.textContent = t("added_check");
      setTimeout(() => { button.textContent = original; }, 1000);
    });
  });
}
