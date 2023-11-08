import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function getDetaFromToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accesstoken");
  const token = accessToken.value;

  // decode token
  const secretKey = process.env.TOKEN_SECRET;
  console.log({ secretKey });
  const decoded = jwt.verify(token, secretKey);
  console.log({ decoded });
  const data = { email: decoded.email, id: decoded.userId };
  return data;
}
