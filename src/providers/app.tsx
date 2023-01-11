import React from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material";

import { QueryClientProvider } from "@tanstack/react-query";

import { store } from "@/app";
import { queryClient, theme } from "@/lib";

export interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};
