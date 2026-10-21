import { NextRequest, NextResponse } from "next/server";
import { verifyEmailWithToken, createEmailVerificationToken, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";
import { getSessionFromRequest, createSessionToken, setSessionCookie } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const result = verifyEmailWithToken(token);
    if (!result.success || !result.user) {
      return NextResponse.json({ error: result.error || "Verification link is invalid or expired." }, { status: 400 });
    }

    const safeUser = sanitizeUser(result.user);
    const sessionToken = createSessionToken({
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
      message: "Email verified successfully! Thank you for confirming your email.",
    });

    return setSessionCookie(response, sessionToken);
  } catch (err) {
    console.error("Verify email error:", err);
    return NextResponse.json({ error: "Failed to verify email." }, { status: 500 });
  }
}

// POST endpoint to request a fresh verification link
export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "You must be logged in to request verification." }, { status: 401 });
    }

    const { token, error } = createEmailVerificationToken(session.email);
    if (error || !token) {
      return NextResponse.json({ error: error || "Failed to generate token." }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const verificationUrl = `${origin}/verify-email?token=${token}`;

    return NextResponse.json({
      success: true,
      message: "Verification link generated.",
      verificationUrl,
    });
  } catch (err) {
    console.error("Resend verification error:", err);
    return NextResponse.json({ error: "Failed to send verification." }, { status: 500 });
  }
}
