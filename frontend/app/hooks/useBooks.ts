import { useQuery } from "@tanstack/react-query";
import { BooksList } from "shared/schemas";
import api from "../utils/api";

interface UseBooksParams {
  page?: number;
  limit?: number;
  q?: string;
}

export function useBooks({ page = 1, limit = 10, q = "" }: UseBooksParams) {
  return useQuery({
    queryKey: ["books", { page, limit, q }],
    queryFn: async () => {
      const res = await api.get<BooksList>("/books", {
        params: { page, limit, q },
      });
      return res.data;
    },
  });
}
