"use client";

import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../utils/api";
import EditBookDialog from "./EditBookDialog";
import NewBookDialog from "./NewBookDialog";

type Book = { id: string; title: string; author: string; description: string };

export default function BooksClient({
  initialBooks,
  initialTotal,
}: {
  initialBooks: Book[];
  initialTotal: number;
}) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: books = initialBooks, isLoading } = useQuery(
    ["books", page, q],
    () =>
      api
        .get(`/books?page=${page}&limit=10&q=${encodeURIComponent(q)}`)
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

  const addBook = useMutation(
    (newBook: Omit<Book, "id">) => api.post("/books", newBook),
    {
      onSuccess: () => queryClient.invalidateQueries(["books"]),
    }
  );
  const updateBook = useMutation(
    ({ id, data }: { id: string; data: Partial<Book> }) =>
      api.patch(`/books/${id}`, data),
    { onSuccess: () => queryClient.invalidateQueries(["books"]) }
  );
  const deleteBook = useMutation((id: string) => api.delete(`/books/${id}`), {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={2} display="flex" gap={2}>
        <TextField
          label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button variant="contained" onClick={() => setPage(1)}>
          Search
        </Button>
        <Button variant="outlined" onClick={() => setAdding(true)}>
          Add Book
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>
                {b.description.length > 50
                  ? `${b.description.slice(0, 50)}…`
                  : b.description}
              </TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => setEditingId(b.id)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => deleteBook.mutate(b.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(initialTotal / 10)}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
      </Box>

      <NewBookDialog
        open={adding}
        onClose={() => setAdding(false)}
        onSave={(data) => addBook.mutate(data)}
      />
      {editingId && (
        <EditBookDialog
          open
          bookId={editingId}
          onClose={() => setEditingId(null)}
          onSave={(data) => updateBook.mutate({ id: editingId, data })}
        />
      )}
    </Box>
  );
}
