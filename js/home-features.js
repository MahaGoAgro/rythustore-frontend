// ── Home Page Dynamic Features (v2 — real data driven) ────────
// Include AFTER icons.js, api.js, auth.js, products.js on the home page.

// ════════════════════════════════════════════════
// 1. PERSONALIZED GREETING
// ════════════════════════════════════════════════
const renderGreeting = () => {
  const el = document.getElementById("greeting-section");
  if (!el) return;

  const user = getUser();
  const name = user ? user.name.split(" ")[0] : "Farmer";
  const hour = new Date().getHours();

  let timeLabel, iconName;
  if (hour < 12) { timeLabel = "Good Morning"; iconName = "sunrise"; }
  else if (hour < 17) { timeLabel = "Good Afternoon"; iconName = "sun"; }
  else { timeLabel = "Good Evening"; iconName = "moon"; }

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;padding:14px 20px;">
      <span style="color:var(--green700)">${icon(iconName, 24)}</span>
      <div style="font-size:15px;font-weight:800;color:var(--green900)">${timeLabel}, ${name}</div>
    </div>
  `;
};

// ════════════════════════════════════════════════
// 2. WEATHER + WEATHER-BASED PRODUCT SUGGESTION
// ════════════════════════════════════════════════

// Fallback city if geolocation is denied, unsupported, or times out
const WEATHER_FALLBACK_CITY = "Ludhiana";

const fetchWeatherData = async (lat, lon, city) => {
  const query = lat && lon ? `lat=${lat}&lon=${lon}` : `city=${city}`;
  return await apiCall(`/weather?${query}`);
};

const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null); // geolocation not supported by this browser
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        resolve(null); // user denied permission or it failed
      },
      { timeout: 6000, maximumAge: 10 * 60 * 1000 } // cache for 10 min
    );
  });
};

const loadWeather = async () => {
  const iconEl    = document.getElementById("weather-icon");
  const tempEl    = document.getElementById("weather-temp-val");
  const cityEl    = document.getElementById("weather-city");
  const humEl     = document.getElementById("humidity-stat");
  const windEl    = document.getElementById("wind-stat");
  const suggestEl = document.getElementById("weather-suggestion");
  const locBtnEl  = document.getElementById("weather-location-btn");

  cityEl.textContent = "Locating you...";

  const coords = await getUserLocation();

  const data = coords
    ? await fetchWeatherData(coords.lat, coords.lon, null)
    : await fetchWeatherData(null, null, WEATHER_FALLBACK_CITY);

  if (!data.success) {
    iconEl.innerHTML = icon("cloud-sun", 32);
    tempEl.textContent = "—";
    cityEl.textContent = "Weather unavailable";
    humEl.innerHTML  = `${icon("droplet", 13)} —`;
    windEl.innerHTML = `${icon("wind", 13)} —`;
    suggestEl.style.display = "none";
    return;
  }

  const iconMap = {
    Clear: "sun", Clouds: "cloud", Rain: "cloud-rain",
    Thunderstorm: "cloud-lightning", Drizzle: "cloud-drizzle", Snow: "cloud-snow"
  };

  iconEl.innerHTML = icon(iconMap[data.condition] || "cloud-sun", 32);
  tempEl.textContent = `${data.temp}°C`;
  cityEl.textContent = data.city;
  humEl.innerHTML  = `${icon("droplet", 13)} ${data.humidity}%`;
  windEl.innerHTML = `${icon("wind", 13)} ${data.wind} km/h`;

  // Show a small "using fallback location" hint if geolocation wasn't available
  if (locBtnEl) {
    if (!coords) {
      locBtnEl.innerHTML = `${icon("map-pin", 11)} Enable location for accurate weather`;
      locBtnEl.style.display = "flex";
      locBtnEl.onclick = () => loadWeather(); // retry — re-prompts permission
    } else {
      locBtnEl.style.display = "none";
    }
  }

  let suggestion;
  if (data.willRainSoon) {
    suggestion = { text: "Rain expected — stock up on seeds before it arrives", category: "SEEDS", iconName: "cloud-rain" };
  } else if (data.temp >= 32) {
    suggestion = { text: "Hot & dry — ideal day to spray pesticides", category: "PESTICIDES", iconName: "sun" };
  } else if (data.humidity >= 70) {
    suggestion = { text: "High humidity raises pest risk — check insecticides", category: "INSECTICIDES", iconName: "bug" };
  } else {
    suggestion = { text: "Good growing conditions — explore organic range", category: "ORGANIC", iconName: "leaf" };
  }

  suggestEl.innerHTML = `
    <a href="pages/products.html?category=${suggestion.category}" style="text-decoration:none">
      <div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);border-radius:10px;padding:9px 14px;margin-top:10px;">
        <span style="color:white">${icon(suggestion.iconName, 15)}</span>
        <span style="font-size:12px;color:white;font-weight:600">${suggestion.text}</span>
        <span style="margin-left:auto;color:white">${icon("arrow-right", 14)}</span>
      </div>
    </a>
  `;
  suggestEl.style.display = "block";
  refreshIcons();
};

// ════════════════════════════════════════════════
// 3. LIVE CROP PRICE TICKER
// ════════════════════════════════════════════════
const CROP_PRICES = [
  { name: "Wheat",  price: 2275, unit: "qtl", change: 1.2 },
  { name: "Onion",  price: 1850, unit: "qtl", change: -2.4 },
  { name: "Tomato", price: 890,  unit: "qtl", change: 3.1 },
  { name: "Maize",  price: 1962, unit: "qtl", change: 0 },
  { name: "Cotton", price: 6850, unit: "qtl", change: 0.8 },
  { name: "Paddy",  price: 2040, unit: "qtl", change: -0.5 },
];

const renderTicker = () => {
  const el = document.getElementById("ticker-track");
  if (!el) return;

  const items = CROP_PRICES.map(c => {
    const arrowIcon = c.change > 0 ? "trending-up" : c.change < 0 ? "trending-down" : "minus";
    const color = c.change > 0 ? "#4ADE80" : c.change < 0 ? "#FCA5A5" : "rgba(255,255,255,0.6)";
    return `
      <span style="display:inline-flex;align-items:center;gap:5px;margin-right:32px;white-space:nowrap;">
        <strong>${c.name}</strong> ₹${c.price.toLocaleString("en-IN")}/${c.unit}
        <span style="color:${color};display:inline-flex;align-items:center;gap:2px;">
          ${icon(arrowIcon, 12)} ${c.change !== 0 ? Math.abs(c.change) + "%" : ""}
        </span>
      </span>
    `;
  }).join("");

  el.innerHTML = items + items;
  refreshIcons();
};

// ════════════════════════════════════════════════
// 4. SEASON-BASED PRODUCTS
// ════════════════════════════════════════════════
const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 10) {
    return { name: "Kharif", range: "Jun – Oct", category: "SEEDS",
      desc: "Sow cotton, rice, maize & soybean now", iconName: "cloud-rain" };
  } else if (month >= 11 || month <= 3) {
    return { name: "Rabi", range: "Nov – Mar", category: "SEEDS",
      desc: "Time to plant wheat, mustard & gram", iconName: "snowflake" };
  } else {
    return { name: "Zaid", range: "Apr – Jun", category: "ORGANIC",
      desc: "Short-season crops thrive now", iconName: "sun" };
  }
};

const renderSeasonBanner = () => {
  const el = document.getElementById("season-banner");
  if (!el) return;

  const season = getCurrentSeason();

  el.innerHTML = `
    <a href="pages/products.html?category=${season.category}" style="text-decoration:none;color:inherit">
      <div class="info-card">
        <span style="color:var(--green700)">${icon(season.iconName, 26)}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:10px;font-weight:700;color:var(--green600);text-transform:uppercase;letter-spacing:0.5px;">
            ${season.name} Season · ${season.range}
          </div>
          <div style="font-size:13px;color:var(--text);margin-top:2px;font-weight:600">${season.desc}</div>
        </div>
        <span style="color:var(--green600)">${icon("chevron-right", 18)}</span>
      </div>
    </a>
  `;
  refreshIcons();
};

// ════════════════════════════════════════════════
// 5. FLASH SALE — real products with admin-set end date
// ════════════════════════════════════════════════
let flashSaleTimers = [];

const renderFlashSale = async () => {
  const section = document.getElementById("flash-sale-section");
  if (!section) return;

  const data = await apiCall("/products?flashSale=true");

  if (!data.success || data.products.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  flashSaleTimers.forEach(t => clearInterval(t));
  flashSaleTimers = [];

  if (data.products.length === 1) {
    renderSingleFlashSale(section, data.products[0]);
  } else {
    renderMultiFlashSale(section, data.products);
  }
};

const renderSingleFlashSale = (section, p) => {
  section.innerHTML = `
    <a href="pages/products.html?category=${p.category}" class="flash-single-card">
      <div class="flash-single-img">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" />` : icon("sprout", 26)}
        ${p.discount > 0 ? `<span class="flash-single-discount">${p.discount}%</span>` : ""}
      </div>
      <div class="flash-single-info">
        <div class="flash-single-label">${icon("zap", 13)} Flash sale</div>
        <div class="flash-single-name">${p.name}</div>
        <div class="flash-single-row">
          <span class="flash-single-price">₹${p.price}</span>
          <span class="flash-single-timer">
            ${icon("clock", 11)} <span class="timer-text" data-ends="${p.flashSaleEndsAt}">—</span>
          </span>
        </div>
      </div>
      <span class="flash-single-arrow">${icon("chevron-right", 16)}</span>
    </a>
  `;
  refreshIcons();
  startFlashTimers(section);
};

const renderMultiFlashSale = (section, products) => {
  section.innerHTML = `
    <div class="flash-sale-wrap">
      <div class="flash-sale-header">
        <div class="flash-sale-title">${icon("zap", 14)} Flash sale</div>
      </div>
      <div class="flash-cards-row">
        ${products.map(p => `
          <a href="pages/products.html?category=${p.category}" class="flash-card">
            <div class="flash-card-img">
              ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" />` : icon("sprout", 22)}
              ${p.discount > 0 ? `<span class="flash-card-discount">${p.discount}%</span>` : ""}
            </div>
            <div class="flash-card-name">${p.name}</div>
            <div class="flash-card-price">₹${p.price}</div>
            <div class="flash-card-timer">
              ${icon("clock", 10)} <span class="timer-text" data-ends="${p.flashSaleEndsAt}">—</span>
            </div>
          </a>
        `).join("")}
      </div>
    </div>
  `;
  refreshIcons();
  startFlashTimers(section);
};

const startFlashTimers = (section) => {
  section.querySelectorAll(".timer-text").forEach(textEl => {
    const endsAt = new Date(textEl.dataset.ends);

    const tick = () => {
      const diff = endsAt - new Date();
      if (diff <= 0) {
        textEl.textContent = "Ended";
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      textEl.textContent = `${h}:${m}:${s}`;
    };

    tick();
    flashSaleTimers.push(setInterval(tick, 1000));
  });
};

// ════════════════════════════════════════════════
// 6. BESTSELLERS — real, admin-marked
// ════════════════════════════════════════════════
const renderBestsellers = async () => {
  const section = document.getElementById("bestseller-section");
  const grid    = document.getElementById("bestseller-grid");
  if (!section || !grid) return;

  const data = await apiCall("/products?bestseller=true");

  if (!data.success || data.products.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  const medals = ["#FFD700", "#C0C0C0", "#CD7F32"];

  grid.innerHTML = data.products.slice(0, 6).map((p, i) => `
    <div class="mini-product-card" onclick="window.location.href='pages/products.html?category=${p.category}'" style="position:relative">
      ${i < 3 ? `<div class="medal-badge" style="background:${medals[i]}">${i + 1}</div>` : ""}
      <div class="mini-product-img">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" />` : icon("sprout", 24)}
      </div>
      <div class="mini-product-name">${p.name}</div>
      <div class="mini-product-price">₹${p.price}</div>
    </div>
  `).join("");
  refreshIcons();
};

// ════════════════════════════════════════════════
// 7. RECENTLY VIEWED PRODUCTS
// ════════════════════════════════════════════════
const trackRecentlyViewed = (product) => {
  let recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
  recent = recent.filter(p => p.id !== product.id);
  recent.unshift({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, category: product.category });
  recent = recent.slice(0, 8);
  localStorage.setItem("recentlyViewed", JSON.stringify(recent));
};

const renderRecentlyViewed = () => {
  const section = document.getElementById("recently-viewed-section");
  const grid    = document.getElementById("recently-viewed-grid");
  if (!section || !grid) return;

  const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

  if (recent.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  grid.innerHTML = recent.map(p => `
    <div class="mini-product-card" onclick="window.location.href='pages/products.html?category=${p.category || ""}'">
      <div class="mini-product-img">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" />` : icon("sprout", 24)}
      </div>
      <div class="mini-product-name">${p.name}</div>
      <div class="mini-product-price">₹${p.price}</div>
    </div>
  `).join("");
  refreshIcons();
};

// ════════════════════════════════════════════════
// 8. AGRICULTURE CALENDAR
// ════════════════════════════════════════════════
const CALENDAR_EVENTS = [
  { month: 5,  day: 15, title: "Kharif sowing begins",         iconName: "sprout" },
  { month: 6,  day: 1,  title: "Monsoon arrives in Punjab",     iconName: "cloud-rain" },
  { month: 7,  day: 10, title: "Fertilizer application window", iconName: "flask-conical" },
  { month: 9,  day: 1,  title: "Pest monitoring season peak",   iconName: "bug" },
  { month: 9,  day: 30, title: "Harvest begins",                 iconName: "wheat" },
  { month: 10, day: 15, title: "Rabi sowing begins",             iconName: "sprout" },
];

const renderCalendar = () => {
  const el = document.getElementById("calendar-section");
  if (!el) return;

  const today = new Date();
  const upcoming = CALENDAR_EVENTS
    .map(e => {
      let eventDate = new Date(today.getFullYear(), e.month - 1, e.day);
      if (eventDate < today) eventDate.setFullYear(eventDate.getFullYear() + 1);
      return { ...e, date: eventDate };
    })
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  el.innerHTML = `
    <div class="info-card-static">
      <div class="info-card-title">${icon("calendar", 17)} Farming Calendar</div>
      ${upcoming.map(e => `
        <div style="display:flex;align-items:center;gap:10px;padding:7px 0;font-size:13px;">
          <span style="color:var(--green600);flex-shrink:0">${icon(e.iconName, 15)}</span>
          <span style="color:var(--text)">${e.title}</span>
          <span style="margin-left:auto;color:var(--muted);font-size:11px;">
            ${e.date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        </div>
      `).join("")}
    </div>
  `;
  refreshIcons();
};

// ════════════════════════════════════════════════
// 9. FARMER TESTIMONIALS
// ════════════════════════════════════════════════
const TESTIMONIALS = [
  { quote: "Using RythuStore seeds increased my yield by 40% this season.", name: "Ramesh Kumar", place: "Punjab" },
  { quote: "Best quality pesticides at the lowest price I have found anywhere.", name: "Suresh Reddy", place: "Telangana" },
  { quote: "Fast delivery and the organic range genuinely improved my soil health.", name: "Lakshmi Devi", place: "Andhra Pradesh" },
];

let testimonialIdx = 0;
let testimonialInterval = null;

const showTestimonial = (idx) => {
  const el = document.getElementById("testimonial-content");
  if (!el) return;
  const t = TESTIMONIALS[idx];
  el.style.opacity = 0;
  setTimeout(() => {
    el.innerHTML = `
      <div style="display:flex;gap:3px;color:#F59E0B;margin-bottom:8px;">★★★★★</div>
      <div style="font-size:13px;color:var(--text);font-style:italic;line-height:1.5;">"${t.quote}"</div>
      <div style="font-size:12px;color:var(--green700);font-weight:700;margin-top:10px;">${t.name}, ${t.place}</div>
    `;
    el.style.opacity = 1;
  }, 200);
};

const renderTestimonials = () => {
  const section = document.getElementById("testimonial-section");
  if (!section) return;

  section.innerHTML = `
    <div class="info-card-static">
      <div class="info-card-title">${icon("users", 17)} Farmer Success Stories</div>
      <div id="testimonial-content" style="transition:opacity 0.2s;"></div>
    </div>
  `;
  refreshIcons();

  showTestimonial(0);
  if (testimonialInterval) clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    testimonialIdx = (testimonialIdx + 1) % TESTIMONIALS.length;
    showTestimonial(testimonialIdx);
  }, 5000);
};

// ════════════════════════════════════════════════
// Initialize everything
// ════════════════════════════════════════════════
const initHomeFeatures = () => {
  renderGreeting();
  loadWeather();
  renderTicker();
  renderSeasonBanner();
  renderFlashSale();
  renderBestsellers();
  renderRecentlyViewed();
  renderCalendar();
  renderTestimonials();
};
