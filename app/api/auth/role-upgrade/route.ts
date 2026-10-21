import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, createSessionToken, setSessionCookie } from "@/lib/session";
import { requestRoleUpgrade, getUserById, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "You must be logged in to request a role upgrade." }, { status: 401 });
    }

    const { targetRole, companyName, licenseNumber, phone } = await request.json();
    if (!targetRole || (targetRole !== 'builder' && targetRole !== 'supplier')) {
      return NextResponse.json({ error: "Target role must be 'builder' or 'supplier'." }, { status: 400 });
    }

    const result = requestRoleUpgrade(session.uid, targetRole, { companyName, licenseNumber, phone });
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to submit upgrade request." }, { status: 400 });
    }

    const updatedUser = getUserById(session.uid);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const safeUser = sanitizeUser(updatedUser);
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
      message: `Your application to upgrade to ${targetRole} has been submitted for verification!`,
      user: safeUser,
    });

    return setSessionCookie(response, token);
  } catch (err) {
    console.error("Role upgrade request error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
