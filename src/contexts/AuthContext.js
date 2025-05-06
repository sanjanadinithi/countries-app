import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  // In a real application, these would connect to a backend
  const login = (email, password) => {
    // For demo purposes, we'll simulate a successful login with any credentials
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if this is an existing user from our mock database
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        
        if (user && user.password === password) {
          // Simple auth without encryption in this demo
          setCurrentUser({ email, name: user.name });
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500); // simulate network delay
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
          reject(new Error('User already exists'));
          return;
        }
        
        // Create new user
        const newUser = { name, email, password };
        users.push(newUser);
        
        // Save to local storage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto-login after registration
        setCurrentUser({ email, name });
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}