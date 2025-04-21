"use client";

import dynamic from "next/dynamic";

const BooksTable = dynamic(() => import("../components/BooksTable"), {
  ssr: false,
});

export default function AdminBooksPage() {
  return <BooksTable />;
}
