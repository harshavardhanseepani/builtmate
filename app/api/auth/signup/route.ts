import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/authStore";
import { createSessionToken, setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    const user = await createUser(email, password, name);
    if (!user) {
      return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
    }
    const token = createSessionToken({ uid: user.uid, email: user.email, name: user.name });
    const response = NextResponse.json({ success: true, user: { uid: user.uid, email: user.email, name: user.name } });
    return setSessionCookie(response, token);
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
