import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function getDetaFromToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accesstoken");
  const token = accessToken.value;

  // decode token
  const secretKey = process.env.TOKEN_SECRET;
  const decoded = jwt.verify(token, secretKey);
  const data = { email: decoded.email, id: decoded.userId };
  return data;
}
