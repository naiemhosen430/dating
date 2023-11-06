import { NextRequest } from "next/server";

export async function POST(NextRequest) {
  const data = await NextRequest.json();
  return Response.json({
    Message: data,
  });
}
