"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
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
  const isLoading = mutation.isLoading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookInput>({ resolver: zodResolver(createBookSchema) });

  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  const onSubmit = async (data: CreateBookInput) => {
    await mutation.mutateAsync(data);
    onClose();
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ p: "16px 24px", bgcolor: "#FFFFFF" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#101828",
          }}
        >
          Add New Book
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#667085",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ p: "16px 24px", bgcolor: "#FFFFFF" }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "48px",
              },
            }}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="dense"
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "48px",
              },
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                minHeight: "112px",
                alignItems: "flex-start",
                pt: "10px",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: "16px 24px", bgcolor: "#FFFFFF" }}>
          <Button
            onClick={onClose}
            disabled={isLoading}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              color: "#667085",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              bgcolor: "#101828",
              "&:hover": { bgcolor: "#000000" },
            }}
          >
            {isLoading ? "Saving…" : "Add Book"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
