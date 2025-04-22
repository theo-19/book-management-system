"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "shared/schemas";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      window.location.href = "/admin";
    } catch (err) {
      alert(`Invalid credentials , ${err}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          p: 4,
          textAlign: "center",
        }}
      >
        <Box mb={2}>
          <PersonOutlineIcon
            sx={{
              fontSize: 48,
              color: "#667085",
            }}
          />
        </Box>

        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 3 }}>
          Sign in to your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email address"
            placeholder="name@example.com"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                bgcolor: "#FFFFFF",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                bgcolor: "#FFFFFF",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              textTransform: "none",
              bgcolor: "#111827",
              "&:hover": { bgcolor: "#000000" },
            }}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
