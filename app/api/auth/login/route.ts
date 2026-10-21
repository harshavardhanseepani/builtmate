import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";
import { createSessionToken, setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password. Please verify your credentials." }, { status: 401 });
    }

    const valid = await verifyPassword(user, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password. Please verify your credentials." }, { status: 401 });
    }

    if (user.status === 'suspended') {
      return NextResponse.json({ error: "This account has been deactivated. Please contact support." }, { status: 403 });
    }

    const safeUser = sanitizeUser(user);
    const token = createSessionToken({
      uid: safeUser.uid,
      email: safeUser.email,
      name: safeUser.name,
      role: safeUser.role,
      status: safeUser.status,
      isEmailVerified: safeUser.isEmailVerified,
      companyName: safeUser.companyName,
    });

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}!`,
    });

    return setSessionCookie(response, token);
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during login." }, { status: 500 });
  }
}
