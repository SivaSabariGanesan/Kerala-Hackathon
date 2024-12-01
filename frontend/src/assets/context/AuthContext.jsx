import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const dummyUsers = [
  { username: 'seller1', password: 'password1', name: 'John Doe' },
  { username: 'seller2', password: 'password2', name: 'Jane Smith' },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const user = dummyUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser({ username: user.username, name: user.name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
