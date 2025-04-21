"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
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
import { useBook, useUpdateBook } from "../hooks/useBookMutations";

export default function EditBookDialog({
  open,
  onClose,
  bookId,
}: {
  open: boolean;
  onClose: () => void;
  bookId: string;
}) {
  const router = useRouter();
  const { data: book, isLoading: loadingBook } = useBook(bookId);
  const mutation = useUpdateBook(bookId);
  const isSaving = mutation.status === "loading";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookInput>({
    resolver: zodResolver(createBookSchema),
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        description: book.description,
      });
    }
  }, [book, reset]);

  const onSubmit = async (data: CreateBookInput) => {
    await mutation.mutateAsync(data);
    onClose();
    router.refresh();
  };

  if (loadingBook) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Book</DialogTitle>
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
          <Button onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSaving}>
            {isSaving ? "Updating…" : "Update"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
