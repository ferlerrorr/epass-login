"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

// Define the type for the props
interface LogoutButtonProps {
  className?: string; // Optional className prop for custom styling
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { data: session } = useSession(); // Get session data to extract user info

  const handleLogoutClick = async () => {
    try {
      await signOut({ callbackUrl: "/" }); // Redirect to home page or any URL after logout
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  // Function to get only the first two initials of the user's name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .slice(0, 2) // Get only the first two parts of the name
      .map(part => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <button
      onClick={handleLogoutClick}
      className={`inline-flex items-center justify-center w-10 h-10 p-2 text-xl text-white bg-blue-500 hover:bg-red-400 rounded-full transition-transform duration-200 ease-in-out focus:outline-none ${className}`}>
      {session?.user ? getInitials(session.user.name || "") : "NA"}
    </button>
  );
};

export default LogoutButton;
