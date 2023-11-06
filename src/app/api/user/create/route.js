import { dbconnect } from "@/utils/mongo";
import { NextRequest } from "next/server";

export async function POST(NextRequest) {
  dbconnect();
  const data = await NextRequest.json();
  return Response.json({
    Message: data,
  });
}
