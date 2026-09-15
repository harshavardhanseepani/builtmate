// lib/authStore.ts
// In-memory user store — persists for the lifetime of the Node.js process.
// In production replace this with a real database (Supabase, Postgres, MongoDB, etc.)

import bcrypt from 'bcryptjs';

export interface UserRecord {
  uid: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

// Singleton in-memory store
const users: Map<string, UserRecord> = new Map();

function generateUid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function createUser(email: string, password: string, name: string): Promise<UserRecord | null> {
  const existing = getUserByEmail(email);
  if (existing) return null; // already exists

  const passwordHash = await bcrypt.hash(password, 10);
  const uid = generateUid();
  const user: UserRecord = {
    uid,
    email: email.toLowerCase().trim(),
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.set(uid, user);
  return user;
}

export function getUserByEmail(email: string): UserRecord | null {
  const lower = email.toLowerCase().trim();
  for (const u of Array.from(users.values())) {
    if (u.email === lower) return u;
  }
  return null;
}

export function getUserById(uid: string): UserRecord | null {
  return users.get(uid) ?? null;
}

export async function verifyPassword(user: UserRecord, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}
