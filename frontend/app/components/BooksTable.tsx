"use client";
export const dynamic = "force-dynamic";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import api from "../utils/api";
import EditBookDialog from "./EditBookDialog";
import NewBookDialog from "./NewBookDialog";

export default function BooksTable() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const { data, isLoading, refetch } = useBooks({ page, limit: 10, q });

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (deletingId) {
      await api.delete(`/books/${deletingId}`);
      setDeletingId(null);
      refetch();
    }
  };

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
        <Button
          variant="contained"
          onClick={() => {
            setPage(1);
            refetch();
          }}
        >
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
          {data?.data.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                {book.description.length > 50
                  ? `${book.description.slice(0, 50)}…`
                  : book.description}
              </TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => setEditingId(book.id)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => setDeletingId(book.id)}
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
          count={Math.ceil((data?.total || 0) / 10)}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
      </Box>

      <NewBookDialog
        open={adding}
        onClose={() => {
          setAdding(false);
          refetch();
        }}
      />
      {editingId && (
        <EditBookDialog
          open={Boolean(editingId)}
          bookId={editingId!}
          onClose={() => {
            setEditingId(null);
            refetch();
          }}
        />
      )}

      <Dialog open={Boolean(deletingId)} onClose={() => setDeletingId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletingId(null)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
