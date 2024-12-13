"use client";

import React from "react";
import { useSession } from "next-auth/react";
import LoginButton from "././LoginButton";
import LogoutButton from "././LogoutButton";

const AuthButtons: React.FC = () => {
  const { data: session, status } = useSession();

  // Uncomment this if you want to show a loading state while the session is being fetched
  // if (status === "loading") {
  //   return <div className="text-center">Loading...</div>; // Loading state with Tailwind
  // }

  return (
    <div className="relative w-full">
      <div className="absolute right-0 flex justify-end p-2 space-x-4">
        {session ? (
          <>
          <div className="text-sm text-gray-700 flex flex-col space-y-2">
          <div className="flex items-center justify-end text-gray-400 font-semibold" style={{ letterSpacing: '1.5px' }}>
          <p>{session.user?.email}</p>
        </div>
        <div className="flex items-center justify-end text-gray-400 font-semibold" style={{ letterSpacing: '1.5px' }}>
          <p>{session.user?.name}</p>
        </div>
      </div>
            <LogoutButton/>
          </>
        ) : (
          <LoginButton/>
        )}
      </div>
    </div>
  );
};

export default AuthButtons;
