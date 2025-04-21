"use client";

import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import createEmotionCache from "./lib/createEmotionCache";

const cache = createEmotionCache();
const queryClient = new QueryClient();
const theme = createTheme({ palette: { mode: "light" } });

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
