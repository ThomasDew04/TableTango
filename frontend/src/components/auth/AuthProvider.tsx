import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../interfaces';
import useUsers from '../../api/users';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    updateUserData: (field: string, value: string) => void;
  }

  const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}, 
    updateUserData: () => {},
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
    const { update } = useUsers();
      
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

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
    }, []);
      
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

    const updateUserData = async (field: string, value: string) => {
      try {
        if (!user) throw new Error('User not found');
        const updatedUser = { ...user, [field]: value };
        await update(updatedUser);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error: any) {
        console.error('Error updating user data:', error.message);
      }
    }


    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUserData }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
