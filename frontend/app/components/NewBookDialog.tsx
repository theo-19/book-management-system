"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateBookInput, createBookSchema } from "shared/schemas";
import { useCreateBook } from "../hooks/useBookMutations";

export default function NewBookDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const mutation = useCreateBook();
  const isLoading = mutation.status === "pending";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema),
  });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = async (data: CreateBookInput) => {
    await mutation.mutateAsync(data);
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Book</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
