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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
