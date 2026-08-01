import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user ?? data);
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
  localStorage.removeItem("token");
  setUser(null);
}

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        loading,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
