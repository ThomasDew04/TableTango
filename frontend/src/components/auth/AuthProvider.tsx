import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../interfaces';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

  const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}, 
});

type Props = {
    children: React.ReactNode;
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props ) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
      () => !!localStorage.getItem('isAuthenticated')
    );

    const navigate = useNavigate();
    const location = useLocation();
      
    useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }, [isAuthenticated]); 
    // Only re-run this effect when isAuthenticated changes
      
    useEffect(() => {
    if (
        !isAuthenticated &&
        location.pathname !== '/register' &&
        location.pathname !== '/restaurants'
    ) {
        navigate('/login');
    }
    }, [isAuthenticated, location.pathname]); 
    // Only re-run this effect when isAuthenticated, navigate, or location.pathname changes
      
    const login = (userData: User) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Update isAuthenticated in localStorage
      navigate('/account');
    };
    
    const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
