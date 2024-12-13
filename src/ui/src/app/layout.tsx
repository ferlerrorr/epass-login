"use client";

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AuthButtons from "./components//Auth/AuthButtons"; 
import { usePathname } from "next/navigation";
// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;

}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the entire app in the SessionProvider for session management */}
        <SessionProvider>
          {/* Only render AuthButtons if not on the search page */}
          {pathname !== "/search" && (
            <div className="flex justify-center gap-4">
              <AuthButtons /> {/* Login/Logout buttons for authenticated pages */}
            </div>
          )}
          {children} {/* Render the rest of the page */}
        </SessionProvider>
      </body>
    </html>
  );
}
