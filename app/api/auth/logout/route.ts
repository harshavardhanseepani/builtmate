import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });
  return clearSessionCookie(response);
}
