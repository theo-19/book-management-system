"use client";
export const dynamic = "force-dynamic";

import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Container, Typography } from "@mui/material";
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
    { enabled: initialized && !!token, staleTime: Infinity }
  );

  if (!hydrated || !initialized || !token) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading…
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        component="header"
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #EAECF0",
          py: 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: "1.125rem" }}
          >
            BookStore Admin
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Button
              startIcon={<LogoutIcon />}
              onClick={() => {
                logout();
                router.push("/login");
              }}
              sx={{
                textTransform: "none",
                bgcolor: "#F2F4F7",
                color: "#101828",
                "&:hover": { bgcolor: "#E4E7EC" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 3 }}>{children}</Container>
    </Box>
  );
}
