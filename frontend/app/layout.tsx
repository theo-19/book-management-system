// frontend/src/app/layout.tsx  (Server Component)
import ClientProviders from "./ClientProviders";
import "./globals.css";
import ThemeRegistry from "./lib/ThemeRegistry";

export const metadata = {
  title: "Book Management System",
  description: "…",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <ClientProviders>{children}</ClientProviders>
        </ThemeRegistry>
      </body>
    </html>
  );
}
