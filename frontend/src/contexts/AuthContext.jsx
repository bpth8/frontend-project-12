import React, { createContext, useContext, useMemo, useState } from 'react';

const AUTH_TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem(AUTH_TOKEN_KEY);
  const usernameFromStorage = localStorage.getItem(USERNAME_KEY);
  const [loggedIn, setLoggedIn] = useState(!!tokenFromStorage);
  const [username, setUsername] = useState(usernameFromStorage || null);

  const logIn = (token, user) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, user);
    setLoggedIn(true);
    setUsername(user);
  };

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setLoggedIn(false);
  };

  const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
  
  const contextValue = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getToken,
    username
  }), [loggedIn, username]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};