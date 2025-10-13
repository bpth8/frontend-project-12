import React, { createContext, useContext, useMemo, useState } from 'react';

const AUTH_TOKEN_KEY = 'token';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem(AUTH_TOKEN_KEY);
  const [loggedIn, setLoggedIn] = useState(!!tokenFromStorage);

  const logIn = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setLoggedIn(false);
  };

  const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
  
  const contextValue = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getToken,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};