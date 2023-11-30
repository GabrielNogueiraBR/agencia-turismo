import React, { createContext, useContext, useMemo } from "react";

interface AuthContextData {}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface ProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const contextData: AuthContextData = useMemo(() => ({}), []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
