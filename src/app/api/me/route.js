import getDetaFromToken from "@/helper/getDetaFromToken";
import User from "@/models/userModel";

import { dbconnect } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  await dbconnect();
  try {
    const data = getDetaFromToken();
    const result = await User.findOne({ email: data.email });
    return NextResponse.json(
      { statusCode: 200, message: "success", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
