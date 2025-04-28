import { Metadata } from "next";
import BooksClient from "../components/BooksTable";

export const metadata: Metadata = {
  title: "Admin • Book Management",
};
export const revalidate = false;

type Book = { id: string; title: string; author: string; description: string };

export default async function AdminBooksPage() {
  const res = await fetch("http://localhost:3001/books?page=1&limit=10");
  const { data: initialBooks, total: initialTotal } = (await res.json()) as {
    data: Book[];
    total: number;
  };

  return (
    <BooksClient initialBooks={initialBooks} initialTotal={initialTotal} />
  );
}
