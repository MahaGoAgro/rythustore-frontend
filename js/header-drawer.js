// ── Shared Header + Drawer Menu ────────────────
// Include this AFTER api.js, auth.js, and icons.js on every page.
// Also requires the Lucide CDN script tag before this file:
//   <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
//
// Call renderHeader() and renderDrawer() once the DOM is ready.

// ── Inject the header HTML into #header-root ────
const renderHeader = (logoLinkPrefix = "") => {
  const root = document.getElementById("header-root");
  if (!root) return;

  root.innerHTML = `
    <header class="header">
      <a href="${logoLinkPrefix}index.html" class="logo">
        <img src="${logoLinkPrefix}images/logo.png" alt="RythuStore" class="logo-img" />
        <div>
          <div class="logo-text">Rythu<span>Store</span></div>
          <div class="logo-sub">Your Farm. Our Mission.</div>
        </div>
      </a>
      <div class="header-right">
        <a href="${logoLinkPrefix}pages/cart.html" class="header-icon">
          ${icon("shopping-cart", 22)}
          <span class="cart-count" id="cart-count" style="display:none">0</span>
        </a>
        <button class="header-icon menu-btn" id="menu-btn" aria-label="Menu">
          ${icon("menu", 20)}
        </button>
      </div>
    </header>
  `;

  document.getElementById("menu-btn").onclick = () => openDrawer();
  refreshIcons();
};

// ── Inject the drawer HTML into #drawer-root ────
const renderDrawer = (logoLinkPrefix = "") => {
  const root = document.getElementById("drawer-root");
  if (!root) return;

  root.innerHTML = `
    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <div class="drawer" id="drawer">
      <div class="drawer-header">
        <div class="drawer-top">
          <div class="drawer-brand">Rythu<span>Store</span></div>
          <button class="drawer-close" id="drawer-close">${icon("x", 16)}</button>
        </div>
        <div class="drawer-user">
          <div class="drawer-avatar">${icon("user", 22)}</div>
          <div>
            <div class="drawer-name" id="drawer-name">Guest User</div>
            <div class="drawer-email" id="drawer-email">Not signed in</div>
          </div>
        </div>
      </div>

      <div class="drawer-menu">
        <a href="${logoLinkPrefix}pages/profile.html" class="drawer-item">
          <span class="drawer-icon">${icon("user", 18)}</span>
          <div>
            <div class="drawer-item-label">My Profile</div>
            <div class="drawer-item-sub">View & edit your details</div>
          </div>
          <span class="drawer-arrow">${icon("chevron-right", 16)}</span>
        </a>
        <a href="${logoLinkPrefix}pages/orders.html" class="drawer-item">
          <span class="drawer-icon">${icon("package", 18)}</span>
          <div>
            <div class="drawer-item-label">My Orders</div>
            <div class="drawer-item-sub">Track & manage orders</div>
          </div>
          <span class="drawer-arrow">${icon("chevron-right", 16)}</span>
        </a>
        <a href="${logoLinkPrefix}pages/cart.html" class="drawer-item">
          <span class="drawer-icon">${icon("shopping-cart", 18)}</span>
          <div>
            <div class="drawer-item-label">My Cart</div>
            <div class="drawer-item-sub" id="drawer-cart-sub">View cart</div>
          </div>
          <span class="drawer-arrow">${icon("chevron-right", 16)}</span>
        </a>
        <a href="${logoLinkPrefix}pages/addresses.html" class="drawer-item">
          <span class="drawer-icon">${icon("map-pin", 18)}</span>
          <div>
            <div class="drawer-item-label">Addresses</div>
            <div class="drawer-item-sub">Saved delivery locations</div>
          </div>
          <span class="drawer-arrow">${icon("chevron-right", 16)}</span>
        </a>
      </div>

      <div class="drawer-footer">
        <button class="btn btn-primary" id="drawer-auth-btn"></button>
      </div>
    </div>
  `;

  document.getElementById("drawer-close").onclick    = closeDrawer;
  document.getElementById("drawer-backdrop").onclick = closeDrawer;

  updateDrawerUser(logoLinkPrefix);
  refreshIcons();
};

const openDrawer  = () => {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("drawer-backdrop").classList.add("open");
};

const closeDrawer = () => {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("drawer-backdrop").classList.remove("open");
};

const updateDrawerUser = (logoLinkPrefix = "") => {
  const user    = getUser();
  const nameEl  = document.getElementById("drawer-name");
  const emailEl = document.getElementById("drawer-email");
  const btn     = document.getElementById("drawer-auth-btn");

  if (user) {
    nameEl.textContent  = user.name;
    emailEl.textContent = user.email;
    btn.innerHTML       = `${icon("log-out", 16)} Sign Out`;
    btn.className       = "btn btn-outline";
    btn.onclick = () => {
      if (confirm("Sign out of RythuStore?")) logout();
    };
  } else {
    nameEl.textContent  = "Guest User";
    emailEl.textContent = "Not signed in";
    btn.innerHTML       = `${icon("log-in", 16)} Sign In / Register`;
    btn.className       = "btn btn-primary";
    btn.onclick = () => {
      window.location.href = `${logoLinkPrefix}pages/login.html`;
    };
  }

  refreshIcons();
};
