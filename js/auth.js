// ── Auth API Calls ─────────────────────────────

// Register new user
const register = async (name, email, phone, password) => {
  const data = await apiCall("/auth/register", "POST", {
    name, email, phone, password
  });
  if (data.success) {
    saveToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Login user
const login = async (email, password) => {
  const data = await apiCall("/auth/login", "POST", {
    email, password
  });
  if (data.success) {
    saveToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Logout user
const logout = () => {
  removeToken();
  localStorage.removeItem("user");
  window.location.href = "../pages/login.html";
};

// Get logged in user
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if logged in
const isLoggedIn = () => {
  return getToken() !== null;
};