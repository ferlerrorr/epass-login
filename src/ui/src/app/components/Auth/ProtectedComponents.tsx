"use client";

import React, { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";  // Import usePathname

const ProtectedComponent = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname using usePathname()

  useEffect(() => {
    if (status === "loading") return; // Wait for session status to be determined


    if (!session) {
      router.push("/"); // Redirect to login page
    } else if (pathname === "/") {
      // If the user is logged in and on the home page, redirect to dashboard
      router.push("/admin");
    }
  }, [session, status, pathname, router]);

  // Show a loading state while checking session status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>; // Render the protected content if session is valid
};

export default ProtectedComponent;
