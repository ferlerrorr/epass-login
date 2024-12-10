"use client";

import React from "react";
import { useSession } from "next-auth/react"; // To get the session state
import LoginButton from "./components/LoginButton"; // Adjust the path if necessary
import LogoutButton from "./components/LogoutButton"; // Adjust the path if necessary

export default function Home() {
  const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>; 
  // }

}
