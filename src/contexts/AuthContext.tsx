
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (username: string, password: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  // Mock login function - in a real app, this would call an API
  const login = async (username: string, password: string, otp: string): Promise<boolean> => {
    // Simple mock validation
    if (username && password && otp === '123456') {
      setIsAuthenticated(true);
      setUsername(username);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or OTP. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
