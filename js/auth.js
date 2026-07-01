// ── Auth API Calls ─────────────────────────────

// Register new user
const register = async (name, email, phone, password) => {
  return await apiCall("/auth/register", "POST", { name, email, phone, password });
};

// Login user
const login = async (email, password) => {
  const data = await apiCall("/auth/login", "POST", { email, password });
  if (data.success) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(data.user));
  }
  return data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = window.location.pathname.includes("/pages/")
    ? "../index.html"
    : "index.html";
};

// Get current logged-in user from localStorage
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Check if user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};