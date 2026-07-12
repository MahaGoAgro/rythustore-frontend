// ── Cart API Calls ─────────────────────────────

const getCart = async () => {
  return await apiCall("/cart");
};

// Add to cart — requires login, accepts quantity
const addToCart = async (productId, productName, productData = null, quantity = 1, variantId = null, variantSize = null) => {
  if (!isLoggedIn()) {
    showNotification("Please login to add items to cart!", "error", "log-in");
    setTimeout(() => {
      window.location.href = window.location.pathname.includes("/pages/")
        ? "login.html"
        : "pages/login.html";
    }, 1200);
    return;
  }

  if (productData && typeof trackRecentlyViewed === "function") {
    trackRecentlyViewed(productData);
  }

  const data = await apiCall("/cart/add", "POST", {
    productId,
    quantity: Math.max(1, Math.min(99, quantity)),
    variantId:   variantId   || undefined,   // ← add this
    variantSize: variantSize || undefined,   // ← add this
  });

  if (data.success) {
    const sizeLabel = variantSize ? ` (${variantSize})` : "";
    showNotification(
      `${productName}${sizeLabel} × ${quantity} added to cart!`,
      "success",
      "check-circle"
    );
    updateCartCount();
  } else {
    showNotification(data.message, "error", "x-circle");
  }

  return data;
};

const updateCartItem = async (id, quantity) => {
  return await apiCall(`/cart/${id}`, "PUT", { quantity });
};

const removeFromCart = async (id) => {
  return await apiCall(`/cart/${id}`, "DELETE");
};

const clearCart = async () => {
  return await apiCall("/cart", "DELETE");
};

const updateCartCount = async () => {
  if (!isLoggedIn()) return;
  const data = await getCart();
  if (data.success) {
    const countEl = document.getElementById("cart-count");
    if (countEl) {
      countEl.textContent  = data.count;
      countEl.style.display = data.count > 0 ? "flex" : "none";
    }
  }
};

const showNotification = (message, type = "success", iconName = null) => {
  const existing = document.getElementById("notification");
  if (existing) existing.remove();

  const defaultIcon = type === "error" ? "x-circle" : "check-circle";
  const useIcon     = iconName || defaultIcon;

  const notification    = document.createElement("div");
  notification.id        = "notification";
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:6px;">
      ${icon(useIcon, 16)} ${message}
    </span>
  `;

  document.body.appendChild(notification);
  refreshIcons();
  setTimeout(() => notification.remove(), 3000);
};

const renderCartItem = (item) => {
  const imageHTML = item.product.imageUrl
    ? `<img src="${item.product.imageUrl}" alt="${item.product.name}"/>`
    : `<span style="color:var(--green600)">${icon("sprout", 28)}</span>`;

  return `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-emoji">${imageHTML}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-brand">${item.product.brand}</div>
        <div class="cart-item-price">₹${item.product.price}/${item.product.unit}</div>
      </div>
      <div class="cart-item-actions">
        <button onclick="changeQty('${item.id}', ${item.quantity - 1})">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty('${item.id}', ${item.quantity + 1})">+</button>
      </div>
      <div class="cart-item-total">₹${(item.product.price * item.quantity).toFixed(2)}</div>
      <button class="cart-item-remove" onclick="removeItem('${item.id}')">
        ${icon("trash-2", 16)}
      </button>
    </div>
  `;
};
