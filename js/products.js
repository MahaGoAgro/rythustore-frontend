// ── Products API Calls ─────────────────────────

const getProducts = async () => {
  return await apiCall("/products");
};

const getProductsByCategory = async (category) => {
  return await apiCall(`/products?category=${category}`);
};

const searchProducts = async (search) => {
  return await apiCall(`/products?search=${search}`);
};

const getProduct = async (id) => {
  return await apiCall(`/products/${id}`);
};

const addProduct = async (product) => {
  return await apiCall("/products", "POST", product);
};

const updateProduct = async (id, product) => {
  return await apiCall(`/products/${id}`, "PUT", product);
};

const deleteProduct = async (id) => {
  return await apiCall(`/products/${id}`, "DELETE");
};

// ── Quantity state per product ─────────────────
// Tracks selected quantity for each product card
// before the user clicks "Add"
const productQty = {};

const getQty = (productId) => productQty[productId] || 1;

const setQty = (productId, delta) => {
  const current = getQty(productId);
  const newQty  = Math.max(1, Math.min(99, current + delta));
  productQty[productId] = newQty;

  const qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) qtyEl.textContent = newQty;
};

// ── Render Product Card ────────────────────────
const renderProductCard = (product) => {

  const imageHTML = product.imageUrl
    ? `<img src="${product.imageUrl}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<span style="color:var(--text-secondary)">${icon("sprout", 48)}</span>`;

  const badgeHTML = product.badge
    ? `<span class="badge">${product.badge}</span>`
    : "";

  const discountHTML = product.discount > 0
    ? `<span style="background:#FEF9C3;color:#A16207;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;">${product.discount}% OFF</span>`
    : "";

  const originalPriceHTML = product.originalPrice && product.originalPrice > product.price
    ? `<div style="text-decoration:line-through;color:#94A3B8;font-size:11px;line-height:1;">₹${product.originalPrice}</div>`
    : "";

  const stars = "★".repeat(Math.floor(product.rating)) +
                (product.rating % 1 >= 0.5 ? "½" : "") +
                "☆".repeat(5 - Math.ceil(product.rating));

  return `
    <div class="product-card" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}' onclick="goToProduct('${product.id}')">

      <div class="product-image">
        ${imageHTML}
        ${badgeHTML}
      </div>

      <div class="product-info">
        <div class="product-brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.desc}</div>

        <div class="product-rating">
          <span style="color:#F59E0B">${stars}</span>
          <span style="color:#94A3B8;font-size:11px;">${product.rating} (${product.reviews})</span>
        </div>

        <div class="product-footer">
          <div>
            ${originalPriceHTML}
            <div style="display:flex;align-items:center;gap:5px;margin-top:2px;">
              <span class="product-price">
                ₹${product.price}
                <span style="font-size:10px;color:#94A3B8;font-weight:400;">/${product.unit}</span>
              </span>
              ${discountHTML}
            </div>
          </div>

          <!-- Quantity selector + Add button -->
          <div style="display:flex;align-items:center;gap:5px;">
            <div class="qty-selector">
              <button
                class="qty-btn"
                onclick="event.stopPropagation(); setQty('${product.id}', -1)">
                −
              </button>
              <span class="qty-value" id="qty-${product.id}">1</span>
              <button
                class="qty-btn"
                onclick="event.stopPropagation(); setQty('${product.id}', 1)">
                +
              </button>
            </div>
            <button
              class="btn-add-cart"
              onclick="event.stopPropagation(); handleAddToCartClick(this)">
              Add
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
};

// ── Add to cart with selected quantity ─────────
const handleAddToCartClick = (btn) => {
  const card    = btn.closest(".product-card");
  const product = JSON.parse(card.dataset.product.replace(/&#39;/g, "'"));
  const qty     = getQty(product.id);
  addToCart(product.id, product.name, product, qty);
};

// ── Navigate to product detail page ───────────
const goToProduct = (id) => {
  const isRoot = !window.location.pathname.includes("/pages/");
  window.location.href = isRoot
    ? `pages/product.html?id=${id}`
    : `product.html?id=${id}`;
};
