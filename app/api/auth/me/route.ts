import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/session";
import { getUserById, sanitizeUser, initializeDatabase } from "@/lib/db/usersDb";

export async function GET(request: NextRequest) {
  try {
    await initializeDatabase();
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = getUserById(session.uid);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error("Me error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
