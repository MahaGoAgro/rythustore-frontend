// ── Shared Icon Helper (Lucide icons via CDN) ─────────────
// Include this AFTER the lucide script tag on every page:
//   <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
//   <script src="../js/icons.js"></script>
//
// Usage in HTML: <i data-lucide="shopping-cart"></i>
// Usage in JS strings: icon("shopping-cart", 18)
//
// Call refreshIcons() after injecting any new HTML containing
// data-lucide attributes (lucide only scans the DOM once on load
// otherwise).

const icon = (name, size = 18, extraClass = "") => {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" class="${extraClass}"></i>`;
};

const refreshIcons = () => {
  if (window.lucide) {
    lucide.createIcons();
  }
};
