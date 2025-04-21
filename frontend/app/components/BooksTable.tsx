"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../utils/api";
import EditBookDialog from "./EditBookDialog";
import NewBookDialog from "./NewBookDialog";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

interface BooksTableProps {
  initialBooks: Book[];
  initialTotal: number;
}

export default function BooksTable({ initialBooks }: BooksTableProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1) Query: seed with initialBooks, infinite stale, no auto refetch
  const { data: books = initialBooks, isLoading } = useQuery(
    ["books", q],
    () =>
      api
        .get<{
          data: Book[];
          total: number;
        }>(`/books?limit=10&q=${encodeURIComponent(q)}`)
        .then((r) => r.data.data),
    {
      initialData: initialBooks,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // 2) Mutations: invalidate ['books', q] so it refetches once
  const addBook = useMutation(
    (newBook: Omit<Book, "id">) => api.post("/books", newBook),
    { onSuccess: () => queryClient.invalidateQueries(["books", q]) }
  );
  const updateBook = useMutation(
    ({ id, data }: { id: string; data: Partial<Book> }) =>
      api.patch(`/books/${id}`, data),
    { onSuccess: () => queryClient.invalidateQueries(["books", q]) }
  );
  const deleteBook = useMutation((id: string) => api.delete(`/books/${id}`), {
    onSuccess: () => queryClient.invalidateQueries(["books", q]),
  });

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteBook.mutateAsync(deletingId);
    setDeletingId(null);
  };

  return (
    <Box>
      {/* TOOLBAR */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          mt: 2,
          borderRadius: "8px",
          bgcolor: "#ffffff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <TextField
          placeholder="Search books..."
          size="small"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") queryClient.invalidateQueries(["books", q]);
          }}
          sx={{
            width: 300,
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              height: 40,
              paddingLeft: theme.spacing(1),
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9ca3af" }} />
              </InputAdornment>
            ),
            sx: {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAdding(true)}
          sx={{
            textTransform: "none",
            backgroundColor: "#111827",
            "&:hover": { backgroundColor: "#1f2937" },
          }}
        >
          Add New Book
        </Button>
      </Paper>

      {/* TABLE */}
      <Box mt={2}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                <TableRow>
                  {["Title", "Author", "Description", "Actions"].map(
                    (header) => (
                      <TableCell key={header} sx={{ fontWeight: 600 }}>
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id} hover>
                    <TableCell sx={{ py: 2 }}>{book.title}</TableCell>
                    <TableCell sx={{ py: 2 }}>{book.author}</TableCell>
                    <TableCell sx={{ py: 2, color: "#6b7280" }}>
                      {book.description.length > 50
                        ? `${book.description.slice(0, 50)}…`
                        : book.description}
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2 }}>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#f3f4f6",
                          marginRight: 1,
                          "&:hover": { backgroundColor: "#e5e7eb" },
                        }}
                        onClick={() => setEditingId(book.id)}
                      >
                        <EditIcon fontSize="small" sx={{ color: "#111827" }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#f3f4f6",
                          "&:hover": { backgroundColor: "#e5e7eb" },
                        }}
                        onClick={() => setDeletingId(book.id)}
                      >
                        <DeleteIcon
                          fontSize="small"
                          sx={{ color: "#dc2626" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* DIALOGS */}
      <NewBookDialog
        open={adding}
        onClose={() => {
          setAdding(false);
        }}
        // @ts-expect-error: Type inference issue with api.post return type
        onSave={(data) => addBook.mutate(data)}
      />

      {editingId && (
        <EditBookDialog
          open
          bookId={editingId}
          onClose={() => {
            setEditingId(null);
          }}
          // @ts-expect-error: Type inference issue with api.post return type
          onSave={(data) => updateBook.mutate({ id: editingId, data })}
        />
      )}

      <Dialog open={Boolean(deletingId)} onClose={() => setDeletingId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
