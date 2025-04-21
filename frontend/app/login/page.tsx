"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
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
      // redirect to /admin
      window.location.href = "/admin";
    } catch (err) {
      alert(`${err}:Invalid credentials`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
