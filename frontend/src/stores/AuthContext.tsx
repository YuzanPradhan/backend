import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, User } from "../types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const getUserFromToken = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      return {
        employee_id: decoded.id,
        email: decoded.email,
        role: { role_name: decoded.role },
        name: decoded.name || decoded.email.split('@')[0],
      };
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check for existing session
    const token = Cookies.get("auth_token");
    const userDetail = Cookies.get("user_detail");
    if (token && userDetail) {
      const parseUser: User = JSON.parse(userDetail);
      setUser(parseUser);
    } else {
      setUser(null);
    }
    
    
  }, []);

  const login = async (user: User, token: string) => {
    Cookies.set("auth_token", token, { secure: true, sameSite: "strict" });
    Cookies.set("user_details", token, { secure: true, sameSite: "strict" });
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user_details");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
