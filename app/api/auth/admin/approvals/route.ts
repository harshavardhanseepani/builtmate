import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/session";
import { listPendingApprovals, approveUserRole, listAllUsers, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();
    const session = getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const pending = listPendingApprovals().map(sanitizeUser);
    const all = listAllUsers().map(sanitizeUser);

    return NextResponse.json({
      success: true,
      pending,
      totalUsers: all.length,
      users: all,
    });
  } catch (err) {
    console.error("Admin approvals fetch error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const session = getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const { targetUid, approve, newRole } = await request.json();
    if (!targetUid || typeof approve !== "boolean") {
      return NextResponse.json({ error: "Target user ID and approve decision (boolean) are required." }, { status: 400 });
    }

    const result = approveUserRole(targetUid, approve, newRole);
    if (!result.success || !result.user) {
      return NextResponse.json({ error: result.error || "Failed to update user." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: approve ? "User role and account successfully approved and verified." : "User application rejected/suspended.",
      user: sanitizeUser(result.user),
    });
  } catch (err) {
    console.error("Admin approval decision error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
