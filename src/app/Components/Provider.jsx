"use client";
import { SessionProvider } from "next-auth/react";

export default function provider({ childres, session }) {
  return <SessionProvider session={session}>{childres}</SessionProvider>;
}
