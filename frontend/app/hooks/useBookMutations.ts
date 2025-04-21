import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Book, CreateBookInput } from "shared/schemas";
import api from "../utils/api";

export function useCreateBook() {
  const qc = useQueryClient();
  return useMutation<Book, Error, CreateBookInput>(
    (data: CreateBookInput) =>
      api.post<Book>("/books", data).then((r) => r.data),
    { onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }) }
  );
}

export function useUpdateBook(id: string) {
  const qc = useQueryClient();
  return useMutation<Book, Error, Partial<CreateBookInput>>(
    (data: Partial<CreateBookInput>) =>
      api.patch<Book>(`/books/${id}`, data).then((r) => r.data),
    { onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }) }
  );
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => api.get<Book>(`/books/${id}`).then((r) => r.data),
  });
}
