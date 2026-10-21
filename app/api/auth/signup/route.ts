import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";
import { createSessionToken, setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { email, password, name, role = "client", companyName, phone, licenseNumber, location } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // Role validation: public users can NEVER register as admin
    const validRoles = ["client", "builder", "supplier"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role selected. Public accounts cannot register as Administrator." }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email address already exists. Please log in instead." }, { status: 409 });
    }

    const result = await createUser({
      email,
      password,
      name,
      role,
      phone,
      companyName,
      licenseNumber,
      location,
    });

    if (result.error || !result.user) {
      return NextResponse.json({ error: result.error || "Failed to create account." }, { status: 400 });
    }

    const safeUser = sanitizeUser(result.user);
    const token = createSessionToken({
      uid: safeUser.uid,
      email: safeUser.email,
      name: safeUser.name,
      role: safeUser.role,
      status: safeUser.status,
      isEmailVerified: safeUser.isEmailVerified,
      companyName: safeUser.companyName,
    });

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const verificationUrl = `${origin}/verify-email?token=${result.verificationToken}`;

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: safeUser.status === 'pending_verification'
        ? "Account created successfully! As a professional " + safeUser.role + ", your credentials are submitted for verification."
        : "Account created successfully! Welcome to BuildMate.",
      verificationUrl,
    });

    return setSessionCookie(response, token);
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during signup." }, { status: 500 });
  }
}
