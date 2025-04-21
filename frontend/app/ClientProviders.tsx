"use client";

import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import createEmotionCache from "./lib/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
const theme = createTheme({ palette: { mode: "light" } });

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={clientSideEmotionCache}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
