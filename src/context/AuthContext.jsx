import { createContext, useContext, useEffect, useState } from "react";
import { login, onUserStateChange, logout } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // 콜백의 의미 생각해보기.
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
