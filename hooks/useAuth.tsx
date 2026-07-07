"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, fetchAuthSession, signIn, signOut, confirmSignIn, AuthUser, SignInInput, ConfirmSignInInput } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import '@/lib/aws-config';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  handleSignIn: (input: SignInInput) => Promise<any>;
  handleConfirmSignIn: (input: ConfirmSignInInput) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  logout: async () => {},
  handleSignIn: async () => {},
  handleConfirmSignIn: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      setUser(currentUser);
      setToken(session.tokens?.accessToken?.toString() || null);
    } catch (error) {
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setToken(null);
      window.location.href = "/login"; // Force a full navigation and reload for logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = async (input: SignInInput) => {
    setIsLoading(true);
    try {
      const response = await signIn(input);
      if (response.nextStep?.signInStep === 'DONE') {
        await checkUser();
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignIn = async (input: ConfirmSignInInput) => {
    setIsLoading(true);
    try {
      const response = await confirmSignIn(input);
      if (response.nextStep?.signInStep === 'DONE') {
        await checkUser();
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          setToken(null);
          break;
        case 'tokenRefresh':
          checkUser();
          break;
        case 'tokenRefresh_failure':
          setUser(null);
          setToken(null);
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, logout: handleLogout, handleSignIn, handleConfirmSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
