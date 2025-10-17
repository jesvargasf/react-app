import { createContext, useState, useContext, useEffect } from 'react';
import { DEFAULT_USERS } from '../data/products';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Cargar usuarios del localStorage
    const savedUsers = localStorage.getItem('huertohogar_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('huertohogar_users', JSON.stringify(DEFAULT_USERS));
      setUsers(DEFAULT_USERS);
    }

    // Cargar usuario actual
    const savedUser = localStorage.getItem('huertohogar_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const user = users.find(
      u => u.email === email && u.password === password && u.active
    );

    if (user) {
      user.lastLogin = new Date().toISOString();
      const updatedUsers = users.map(u => u.id === user.id ? user : u);
      setUsers(updatedUsers);
      localStorage.setItem('huertohogar_users', JSON.stringify(updatedUsers));
      localStorage.setItem('huertohogar_current_user', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Credenciales incorrectas' };
  };

  const register = (userData) => {
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: nextId,
      ...userData,
      role: 'cliente',
      active: true,
      created: new Date().toISOString(),
      lastLogin: null
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('huertohogar_users', JSON.stringify(updatedUsers));

    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('huertohogar_current_user');
    setCurrentUser(null);
  };

  const hasAdminAccess = () => {
    return currentUser && (currentUser.role === 'admin' || currentUser.role === 'vendedor');
  };

  const value = {
    currentUser,
    users,
    login,
    register,
    logout,
    hasAdminAccess,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
