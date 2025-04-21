// frontend/src/app/layout.tsx
import { ReactNode } from "react";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "Book Catalog",
  description: "Public catalog and admin dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* This is a client boundary */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
