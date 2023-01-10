import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import { QueryClientProvider } from "@tanstack/react-query";

import { Header } from "@/components";
import { queryClient, theme } from "@/lib";
import { router } from "@/providers";

export const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <>
          <Header />
          <RouterProvider router={router} />
        </>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
