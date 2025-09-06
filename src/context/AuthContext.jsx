import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email, avatar, role }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // โหลด token และ user profile เมื่อเปิดเว็บ
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // ดึงข้อมูล user จาก backend
  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Session expired:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // login
  const login = async (token, refreshToken) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setToken(token);

      // ดึงข้อมูล user
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);

      // เช็ค role
      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/"); // ถ้าไม่ใช่ admin ไปหน้าแรก
      }
    } catch (err) {
      console.error("Login failed:", err);
      logout(); // ถ้า login ไม่ผ่าน → ล้างข้อมูล + กลับไปหน้า login
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  // เช็ค role
  const hasRole = (roles) => {
    return user ? roles.includes(user.role) : false;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
