import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AdminUser } from '../types';
import { 
  loginAdmin, 
  registerAdmin, 
  fetchCurrentAdmin, 
  logoutAdmin, 
  getStoredAdminToken 
} from '../lib/api';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; name: string; password: string; role?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    const token = getStoredAdminToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const current = await fetchCurrentAdmin();
      if (current) {
        setUser({
          id: current.id,
          email: current.email,
          name: current.name,
          role: current.role as AdminUser['role'],
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await loginAdmin(credentials);
    setUser({
      id: res.user.id,
      email: res.user.email,
      name: res.user.name,
      role: res.user.role as AdminUser['role'],
    });
  };

  const register = async (data: { email: string; name: string; password: string; role?: string }) => {
    const res = await registerAdmin(data);
    setUser({
      id: res.user.id,
      email: res.user.email,
      name: res.user.name,
      role: res.user.role as AdminUser['role'],
    });
  };

  const logout = async () => {
    await logoutAdmin();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
