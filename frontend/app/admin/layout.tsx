"use client";
export const dynamic = "force-dynamic";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { token, logout, initialized } = useAuth();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (initialized && !token) router.push("/login");
  }, [initialized, token, router]);

  const { data: user } = useQuery(
    ["profile"],
    () => api.get("/users/profile").then((r) => r.data),
    { enabled: true }
  );
  if (!hydrated) return null;

  if (!initialized || !token) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading…
      </Typography>
    );
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email} ({user?.role})
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  );
}
