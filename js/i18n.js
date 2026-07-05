// ── RythuStore i18n — English & Telugu ────────
// Usage:
//   Add data-i18n="key" to any HTML element
//   Call applyLanguage() after page loads
//   Language stored in localStorage as "lang"

const TRANSLATIONS = {

  en: {
    // Navigation
    "nav.home":          "Home",
    "nav.seeds":         "Seeds",
    "nav.pesticides":    "Pesticides",
    "nav.insecticides":  "Insecticides",
    "nav.organic":       "Organic",

    // Header
    "header.tagline":    "Your Farm. Our Mission.",
    "header.search":     "Search products...",
    "header.login":      "Login",
    "header.logout":     "Logout",
    "header.profile":    "My Profile",
    "header.orders":     "My Orders",
    "header.cart":       "My Cart",
    "header.admin":      "Admin Panel",

    // Home page
    "home.greeting.morning":   "Good morning",
    "home.greeting.afternoon": "Good afternoon",
    "home.greeting.evening":   "Good evening",
    "home.flash_sale":         "Flash Sale",
    "home.bestsellers":        "Bestsellers",
    "home.recently_viewed":    "Recently Viewed",
    "home.calendar":           "Farming Calendar",
    "home.testimonials":       "What Farmers Say",
    "home.weather_unavailable":"Weather unavailable",

    // Products
    "products.title":          "All Products",
    "products.search":         "Search by name, brand or description...",
    "products.all":            "All",
    "products.sort.rating":    "Top Rated",
    "products.sort.newest":    "Newest",
    "products.sort.price_asc": "Price: Low to High",
    "products.sort.price_desc":"Price: High to Low",
    "products.sort.discount":  "Biggest Discount",
    "products.found":          "products found",
    "products.not_found":      "No products found",
    "products.clear_filters":  "Clear all filters",
    "products.add":            "Add",
    "products.out_of_stock":   "Out of Stock",
    "products.price_range":    "Price Range",
    "products.filter":         "Filter",

    // Cart
    "cart.title":              "My Cart",
    "cart.empty":              "Your cart is empty!",
    "cart.browse":             "Browse Products",
    "cart.total":              "Total",
    "cart.checkout":           "Proceed to Checkout",
    "cart.remove":             "Remove",
    "cart.added":              "added to cart!",

    // Checkout
    "checkout.title":          "Checkout",
    "checkout.review":         "Review Cart",
    "checkout.address":        "Delivery Address",
    "checkout.payment":        "Payment",
    "checkout.cod":            "Cash on Delivery",
    "checkout.cod_sub":        "Pay when your order arrives",
    "checkout.online":         "UPI / Card / Net Banking",
    "checkout.online_sub":     "Secure payment via Razorpay",
    "checkout.place_order":    "Place Order",
    "checkout.back":           "Back",
    "checkout.continue":       "Continue",

    // Orders
    "orders.title":            "My Orders",
    "orders.empty":            "No orders yet!",
    "orders.placed":           "Placed",
    "orders.confirmed":        "Confirmed",
    "orders.shipped":          "Shipped",
    "orders.delivered":        "Delivered",
    "orders.cancelled":        "Cancelled",
    "orders.total":            "Total",
    "orders.payment":          "Payment",
    "orders.cod":              "Cash on Delivery",

    // Auth
    "auth.login":              "Login",
    "auth.register":           "Register",
    "auth.email":              "Email Address",
    "auth.password":           "Password",
    "auth.name":               "Full Name",
    "auth.phone":              "Phone Number",
    "auth.forgot":             "Forgot password?",
    "auth.google":             "Continue with Google",
    "auth.login_btn":          "Login to RythuStore",
    "auth.register_btn":       "Create My Account",
    "auth.no_account":         "Don't have an account?",
    "auth.have_account":       "Already have an account?",
    "auth.welcome":            "Welcome Back!",
    "auth.join":               "Join RythuStore",

    // Profile
    "profile.title":           "My Profile",
    "profile.save":            "Save Changes",
    "profile.addresses":       "My Addresses",

    // Address
    "address.add":             "Add New Address",
    "address.label":           "Label (Home/Farm/Office)",
    "address.line1":           "Address Line",
    "address.city":            "City",
    "address.state":           "State",
    "address.pincode":         "Pincode",
    "address.save":            "Save Address",

    // Common
    "common.loading":          "Loading...",
    "common.error":            "Something went wrong!",
    "common.success":          "Success!",
    "common.save":             "Save",
    "common.cancel":           "Cancel",
    "common.delete":           "Delete",
    "common.edit":             "Edit",
    "common.search":           "Search",
    "common.view_store":       "View Store",
    "common.add_new":          "Add New",
  },

  te: {
    // Navigation
    "nav.home":          "హోమ్",
    "nav.seeds":         "విత్తనాలు",
    "nav.pesticides":    "పురుగుమందులు",
    "nav.insecticides":  "కీటకనాశకాలు",
    "nav.organic":       "సేంద్రీయం",

    // Header
    "header.tagline":    "మీ పొలం. మా లక్ష్యం.",
    "header.search":     "ఉత్పత్తులు వెతకండి...",
    "header.login":      "లాగిన్",
    "header.logout":     "లాగ్అవుట్",
    "header.profile":    "నా ప్రొఫైల్",
    "header.orders":     "నా ఆర్డర్లు",
    "header.cart":       "నా కార్ట్",
    "header.admin":      "అడ్మిన్ పానెల్",

    // Home page
    "home.greeting.morning":   "శుభోదయం",
    "home.greeting.afternoon": "శుభ మధ్యాహ్నం",
    "home.greeting.evening":   "శుభ సాయంత్రం",
    "home.flash_sale":         "ఫ్లాష్ సేల్",
    "home.bestsellers":        "బెస్ట్‌సెల్లర్లు",
    "home.recently_viewed":    "ఇటీవల చూసినవి",
    "home.calendar":           "వ్యవసాయ క్యాలెండర్",
    "home.testimonials":       "రైతులు చెప్పేది",
    "home.weather_unavailable":"వాతావరణం అందుబాటులో లేదు",

    // Products
    "products.title":          "అన్ని ఉత్పత్తులు",
    "products.search":         "పేరు, బ్రాండ్ లేదా వివరణ ద్వారా వెతకండి...",
    "products.all":            "అన్నీ",
    "products.sort.rating":    "అత్యుత్తమ రేటెడ్",
    "products.sort.newest":    "కొత్తవి",
    "products.sort.price_asc": "ధర: తక్కువ నుండి ఎక్కువ",
    "products.sort.price_desc":"ధర: ఎక్కువ నుండి తక్కువ",
    "products.sort.discount":  "అత్యధిక తగ్గింపు",
    "products.found":          "ఉత్పత్తులు కనుగొనబడ్డాయి",
    "products.not_found":      "ఉత్పత్తులు కనుగొనబడలేదు",
    "products.clear_filters":  "అన్ని ఫిల్టర్లు తొలగించు",
    "products.add":            "జోడించు",
    "products.out_of_stock":   "స్టాక్ లేదు",
    "products.price_range":    "ధర పరిధి",
    "products.filter":         "ఫిల్టర్",

    // Cart
    "cart.title":              "నా కార్ట్",
    "cart.empty":              "మీ కార్ట్ ఖాళీగా ఉంది!",
    "cart.browse":             "ఉత్పత్తులు చూడండి",
    "cart.total":              "మొత్తం",
    "cart.checkout":           "చెక్అవుట్ చేయండి",
    "cart.remove":             "తొలగించు",
    "cart.added":              "కార్ట్‌కి జోడించబడింది!",

    // Checkout
    "checkout.title":          "చెక్అవుట్",
    "checkout.review":         "కార్ట్ సమీక్షించండి",
    "checkout.address":        "డెలివరీ చిరునామా",
    "checkout.payment":        "చెల్లింపు",
    "checkout.cod":            "డెలివరీ సమయంలో చెల్లింపు",
    "checkout.cod_sub":        "ఆర్డర్ వచ్చినప్పుడు చెల్లించండి",
    "checkout.online":         "UPI / కార్డ్ / నెట్ బ్యాంకింగ్",
    "checkout.online_sub":     "రేజర్‌పే ద్వారా సురక్షిత చెల్లింపు",
    "checkout.place_order":    "ఆర్డర్ చేయండి",
    "checkout.back":           "వెనక్కు",
    "checkout.continue":       "కొనసాగించు",

    // Orders
    "orders.title":            "నా ఆర్డర్లు",
    "orders.empty":            "ఇంకా ఆర్డర్లు లేవు!",
    "orders.placed":           "ఆర్డర్ చేయబడింది",
    "orders.confirmed":        "నిర్ధారించబడింది",
    "orders.shipped":          "పంపబడింది",
    "orders.delivered":        "డెలివరీ అయింది",
    "orders.cancelled":        "రద్దు చేయబడింది",
    "orders.total":            "మొత్తం",
    "orders.payment":          "చెల్లింపు",
    "orders.cod":              "డెలివరీ సమయంలో చెల్లింపు",

    // Auth
    "auth.login":              "లాగిన్",
    "auth.register":           "నమోదు",
    "auth.email":              "ఇమెయిల్ చిరునామా",
    "auth.password":           "పాస్‌వర్డ్",
    "auth.name":               "పూర్తి పేరు",
    "auth.phone":              "ఫోన్ నంబర్",
    "auth.forgot":             "పాస్‌వర్డ్ మర్చిపోయారా?",
    "auth.google":             "గూగుల్‌తో కొనసాగించు",
    "auth.login_btn":          "రైతుస్టోర్‌లో లాగిన్",
    "auth.register_btn":       "నా ఖాతా సృష్టించు",
    "auth.no_account":         "ఖాతా లేదా?",
    "auth.have_account":       "ఇప్పటికే ఖాతా ఉందా?",
    "auth.welcome":            "తిరిగి స్వాగతం!",
    "auth.join":               "రైతుస్టోర్‌లో చేరండి",

    // Profile
    "profile.title":           "నా ప్రొఫైల్",
    "profile.save":            "మార్పులు సేవ్ చేయండి",
    "profile.addresses":       "నా చిరునామాలు",

    // Address
    "address.add":             "కొత్త చిరునామా జోడించు",
    "address.label":           "లేబుల్ (ఇల్లు/పొలం/కార్యాలయం)",
    "address.line1":           "చిరునామా",
    "address.city":            "నగరం",
    "address.state":           "రాష్ట్రం",
    "address.pincode":         "పిన్‌కోడ్",
    "address.save":            "చిరునామా సేవ్ చేయండి",

    // Common
    "common.loading":          "లోడవుతోంది...",
    "common.error":            "ఏదో తప్పు జరిగింది!",
    "common.success":          "విజయవంతం!",
    "common.save":             "సేవ్ చేయండి",
    "common.cancel":           "రద్దు చేయండి",
    "common.delete":           "తొలగించు",
    "common.edit":             "సవరించు",
    "common.search":           "వెతకండి",
    "common.view_store":       "స్టోర్ చూడండి",
    "common.add_new":          "కొత్తది జోడించు",
  }
};

// ── Current language ───────────────────────────
let currentLang = localStorage.getItem("lang") || "en";

// ── Get translation ────────────────────────────
const t = (key) => {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS["en"]?.[key] || key;
};

// ── Apply language to page ─────────────────────
const applyLanguage = () => {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = t(key);

    // Handle placeholders
    if (el.hasAttribute("placeholder")) {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = currentLang === "te" ? "te" : "en";

  // Update toggle button
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = currentLang === "en" ? "తె" : "EN";
    toggleBtn.title       = currentLang === "en" ? "తెలుగులో చదవండి" : "Read in English";
  }
};

// ── Toggle language ────────────────────────────
const toggleLanguage = () => {
  currentLang = currentLang === "en" ? "te" : "en";
  localStorage.setItem("lang", currentLang);
  applyLanguage();
};

// ── Auto-apply on load ─────────────────────────
document.addEventListener("DOMContentLoaded", applyLanguage);
