import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage safely
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user"); // remove corrupted data
      }
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Signup function
  const signup = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { email, password });
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook so all files can call `useAuth()`
export const useAuth = () => {
  return useContext(AuthContext);
};
