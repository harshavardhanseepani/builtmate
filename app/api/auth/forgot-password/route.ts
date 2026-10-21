import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken, getUserByEmail, initializeDatabase } from "@/lib/db/usersDb";

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const user = getUserByEmail(email);
    // Generic response to prevent user enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists for this email, a password reset link has been generated."
      });
    }

    const { token } = createPasswordResetToken(email);
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const resetUrl = `${origin}/reset-password?token=${token}`;

    // In production with Resend/SendGrid/SMTP: await sendPasswordResetEmail(email, resetUrl);
    // When external email is unconfigured, return resetUrl directly for testing/development.
    return NextResponse.json({
      success: true,
      message: "Password reset instructions generated successfully.",
      resetUrl,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Failed to process password reset request." }, { status: 500 });
  }
}
