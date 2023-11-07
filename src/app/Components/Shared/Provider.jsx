"use client";
import React from "react";

export default function Provider() {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
