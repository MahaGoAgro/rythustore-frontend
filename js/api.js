// ── Base API Configuration ─────────────────────
const BASE_URL = "https://rythustore-backend-production.up.railway.app/api";

// ── Get token from storage ─────────────────────
const getToken = () => localStorage.getItem("token");

// ── Save token after login ─────────────────────
const saveToken = (token) => localStorage.setItem("token", token);

// ── Remove token on logout ─────────────────────
const removeToken = () => localStorage.removeItem("token");

// ── Base fetch function ────────────────────────
const apiCall = async (endpoint, method = "GET", body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add token if exists
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: "Network error!" };
  }
};