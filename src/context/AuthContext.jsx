import { userService } from "@/apiServices";
import { setLogoutHandler } from "@/apiServices/apiService";
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
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        fetchUserProfile(storedToken); // fetch ถ้าไม่มี user ใน localStorage
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // ✅ inject logout เข้าสู่ axios service
    setLogoutHandler(logout);
  }, []);

  // ดึงข้อมูล user จาก backend
  const fetchUserProfile = async (token) => {
    try {
      const res = await userService.GET_ME_PROFILE({
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      logout(); // token หมดอายุ
    } finally {
      setLoading(false);
    }
  };

  // login
  const login = async (token, refreshToken, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    setToken(token);
    setUser(userData);

    navigate(userData?.role === "admin" ? "/admin" : "/");
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
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
