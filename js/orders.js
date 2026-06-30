// ── Orders API Calls ───────────────────────────

// Get my all orders
const getOrders = async () => {
  return await apiCall("/orders");
};

// Get single order
const getOrder = async (id) => {
  return await apiCall(`/orders/${id}`);
};

// Place order
const placeOrder = async (address) => {
  return await apiCall("/orders", "POST", { address });
};

// Get status color
const getStatusColor = (status) => {
  const colors = {
    PLACED:    "#3B82F6",
    CONFIRMED: "#8B5CF6",
    SHIPPED:   "#F59E0B",
    DELIVERED: "#22C55E",
    CANCELLED: "#EF4444",
  };
  return colors[status] || "#64748B";
};

// Get status icon name
const getStatusIcon = (status) => {
  const icons = {
    PLACED:    "clipboard-list",
    CONFIRMED: "check-circle",
    SHIPPED:   "truck",
    DELIVERED: "party-popper",
    CANCELLED: "x-circle",
  };
  return icons[status] || "package";
};

// Render order card HTML
const renderOrderCard = (order) => {
  return `
    <div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">Order #${order.id.slice(0, 8).toUpperCase()}</div>
          <div class="order-date">
            ${new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </div>
        </div>
        <div class="order-status" style="background:${getStatusColor(order.status)}">
          <span style="display:inline-flex;align-items:center;gap:4px;">
            ${icon(getStatusIcon(order.status), 12)} ${order.status}
          </span>
        </div>
      </div>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              ${item.product.imageUrl
                ? `<img src="${item.product.imageUrl}" style="width:18px;height:18px;border-radius:4px;object-fit:cover" />`
                : icon("sprout", 16)
              }
              ${item.product.name}
            </span>
            <span>x${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join("")}
      </div>
      <div class="order-footer">
        <div class="order-address">
          <span style="display:inline-flex;align-items:center;gap:4px;">
            ${icon("map-pin", 13)} ${order.address}
          </span>
        </div>
        <div class="order-total">Total: ₹${order.totalAmount.toFixed(2)}</div>
      </div>
    </div>
  `;
};
