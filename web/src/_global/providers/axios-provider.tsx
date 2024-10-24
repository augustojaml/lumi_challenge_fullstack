// src/providers/AxiosProvider.tsx
import { frontApi } from "@global/api";
import { useAuthStore } from "@global/useStores/useAuth";
import { AxiosInstance } from "axios";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

// Create a context to hold the Axios instance
const AxiosContext = createContext<AxiosInstance | null>(null);

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const { signOut } = useAuthStore((store) => store);

  // Add a response interceptor
  useEffect(() => {
    const responseInterceptor = frontApi.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          console.log("Error Response:", error.response?.status);
          signOut();
        }
      },
    );

    return () => {
      frontApi.interceptors.response.eject(responseInterceptor);
    };
  }, [frontApi]);

  return (
    <AxiosContext.Provider value={frontApi}>{children}</AxiosContext.Provider>
  );
};

// Custom hook to use Axios
export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
