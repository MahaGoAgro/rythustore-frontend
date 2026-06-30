// ── Products API Calls ─────────────────────────

// Get all products
const getProducts = async () => {
  return await apiCall("/products");
};

// Get products by category
const getProductsByCategory = async (category) => {
  return await apiCall(`/products?category=${category}`);
};

// Search products
const searchProducts = async (search) => {
  return await apiCall(`/products?search=${search}`);
};

// Get single product
const getProduct = async (id) => {
  return await apiCall(`/products/${id}`);
};

// Add new product (admin)
const addProduct = async (product) => {
  return await apiCall("/products", "POST", product);
};

// Update product (admin)
const updateProduct = async (id, product) => {
  return await apiCall(`/products/${id}`, "PUT", product);
};

// Delete product (admin)
const deleteProduct = async (id) => {
  return await apiCall(`/products/${id}`, "DELETE");
};

// ── Render Product Card ────────────────────────
const renderProductCard = (product) => {

  // ── Image or fallback icon ───────────────────
  const imageHTML = product.imageUrl
    ? `<img src="${product.imageUrl}" alt="${product.name}"
           style="width:100%;height:100%;object-fit:cover;" />`
    : `<span style="color:var(--green600)">${icon("sprout", 48)}</span>`;

  // ── Badge ────────────────────────────────────
  const badgeHTML = product.badge
    ? `<span class="badge">${product.badge}</span>`
    : "";

  // ── Discount badge ───────────────────────────
  const discountHTML = product.discount > 0
    ? `<span style="
          background:#FEF9C3;
          color:#A16207;
          font-size:11px;
          font-weight:700;
          padding:2px 8px;
          border-radius:20px;
        ">${product.discount}% OFF</span>`
    : "";

  // ── Original price (crossed out) ─────────────
  const originalPriceHTML = product.originalPrice && product.originalPrice > product.price
    ? `<div style="
          text-decoration:line-through;
          color:#94A3B8;
          font-size:12px;
          font-weight:400;
          line-height:1;
        ">₹${product.originalPrice}</div>`
    : "";

  // ── Star rating ───────────────────────────────
  const stars = "★".repeat(Math.floor(product.rating)) +
                (product.rating % 1 >= 0.5 ? "½" : "") +
                "☆".repeat(5 - Math.ceil(product.rating));

  return `
    <div class="product-card" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>

      <!-- Image -->
      <div class="product-image">
        ${imageHTML}
        ${badgeHTML}
      </div>

      <!-- Info -->
      <div class="product-info">
        <div class="product-brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.desc}</div>

        <!-- Rating -->
        <div class="product-rating">
          <span style="color:#F59E0B">${stars}</span>
          <span style="color:#94A3B8;font-size:12px;">
            ${product.rating} (${product.reviews} reviews)
          </span>
        </div>

        <!-- Price row -->
        <div class="product-footer">
          <div>
            ${originalPriceHTML}
            <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
              <span class="product-price">
                ₹${product.price}
                <span style="font-size:12px;color:#94A3B8;font-weight:400;">
                  /${product.unit}
                </span>
              </span>
              ${discountHTML}
            </div>
          </div>

          <!-- Add to cart -->
          <button
            class="btn-add-cart"
            onclick="handleAddToCartClick(this)">
            ${icon("plus", 14)} Cart
          </button>
        </div>

      </div>
    </div>
  `;
};

// ── Helper: reads product data from the card and calls addToCart ──
const handleAddToCartClick = (btn) => {
  const card = btn.closest(".product-card");
  const product = JSON.parse(card.dataset.product.replace(/&#39;/g, "'"));
  addToCart(product.id, product.name, product);
};
