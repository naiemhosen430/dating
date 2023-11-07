"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function provider({ session, children }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
