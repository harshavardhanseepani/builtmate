import { NextRequest, NextResponse } from "next/server";
import { resetPasswordWithToken, initializeDatabase } from "@/lib/db/usersDb";

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const result = await resetPasswordWithToken(token, newPassword);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Password reset failed." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Your password has been successfully reset. You can now log in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }
}
