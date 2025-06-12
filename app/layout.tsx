import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "./components/ToggleTheme";
import { ThemeProvider } from "./context/Theme";
import { UserProvider } from "./context/User";
import AuthGuard from "./context/Auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          <UserProvider>
            <AuthGuard>
              {/* <ThemeToggle></ThemeToggle> */}
              {children}
            </AuthGuard>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
