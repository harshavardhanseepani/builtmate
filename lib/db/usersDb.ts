import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type UserRole = 'client' | 'builder' | 'supplier' | 'admin';
export type AccountStatus = 'active' | 'pending_verification' | 'suspended';

export interface UserRecord {
  uid: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  requestedRole?: UserRole;
  status: AccountStatus;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: string | null;
  phone?: string;
  companyName?: string;
  location?: string;
  experienceYears?: number;
  licenseNumber?: string;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readUsers(): UserRecord[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    const users: UserRecord[] = JSON.parse(raw);
    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.error('Error reading users database:', err);
    return [];
  }
}

function writeUsers(users: UserRecord[]): boolean {
  ensureDataDir();
  const tempFile = path.join(DATA_DIR, `users.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`);
  try {
    fs.writeFileSync(tempFile, JSON.stringify(users, null, 2), 'utf8');
    fs.renameSync(tempFile, USERS_FILE);
    return true;
  } catch (err) {
    console.error('Error writing users database:', err);
    try {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    } catch {}
    return false;
  }
}

function generateUid(): string {
  return 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export async function initializeDatabase() {
  const users = readUsers();
  const adminExists = users.some(u => u.role === 'admin');
  if (!adminExists) {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@builtmate.ai').toLowerCase().trim();
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@BuiltMate2026';
    const adminHash = await bcrypt.hash(adminPass, 10);
    const adminUser: UserRecord = {
      uid: 'usr_admin_master',
      email: adminEmail,
      name: 'BuildMate Administrator',
      passwordHash: adminHash,
      role: 'admin',
      status: 'active',
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(adminUser);
    writeUsers(users);
  }
}

export function sanitizeUser(user: UserRecord) {
  const { passwordHash, resetPasswordToken, resetPasswordExpires, emailVerificationToken, emailVerificationExpires, ...safe } = user;
  return safe;
}

export function getUserByEmail(email: string): UserRecord | null {
  if (!email) return null;
  const lower = email.toLowerCase().trim();
  const users = readUsers();
  return users.find(u => u.email === lower) ?? null;
}

export function getUserById(uid: string): UserRecord | null {
  if (!uid) return null;
  const users = readUsers();
  return users.find(u => u.uid === uid) ?? null;
}

export async function createUser(params: {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'builder' | 'supplier';
  phone?: string;
  companyName?: string;
  licenseNumber?: string;
  location?: string;
}): Promise<{ user: UserRecord | null; error?: string; verificationToken?: string }> {
  const lower = params.email.toLowerCase().trim();
  const users = readUsers();

  if (users.some(u => u.email === lower)) {
    return { user: null, error: 'An account with this email address already exists.' };
  }

  if ((params.role as string) === 'admin') {
    return { user: null, error: 'Administrative accounts cannot be registered publicly.' };
  }

  const passwordHash = await bcrypt.hash(params.password, 10);
  const uid = generateUid();
  const now = new Date().toISOString();
  const verificationToken = generateToken();
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const initialStatus: AccountStatus = (params.role === 'builder' || params.role === 'supplier')
    ? 'pending_verification'
    : 'active';

  const newUser: UserRecord = {
    uid,
    email: lower,
    name: params.name.trim(),
    passwordHash,
    role: params.role,
    requestedRole: params.role,
    status: initialStatus,
    isEmailVerified: false,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: verificationExpires,
    phone: params.phone?.trim() || undefined,
    companyName: params.companyName?.trim() || undefined,
    licenseNumber: params.licenseNumber?.trim() || undefined,
    location: params.location?.trim() || 'India',
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);
  writeUsers(users);
  return { user: newUser, verificationToken };
}

export async function verifyPassword(user: UserRecord, password: string): Promise<boolean> {
  if (!user.passwordHash) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export function createPasswordResetToken(email: string): { token: string | null; error?: string } {
  const lower = email.toLowerCase().trim();
  const users = readUsers();
  const user = users.find(u => u.email === lower);
  if (!user) {
    return { token: null, error: 'User not found' };
  }

  const token = generateToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  user.updatedAt = new Date().toISOString();

  writeUsers(users);
  return { token };
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!token || !newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }
  const users = readUsers();
  const now = new Date().toISOString();
  const user = users.find(u => u.resetPasswordToken === token && u.resetPasswordExpires && u.resetPasswordExpires > now);

  if (!user) {
    return { success: false, error: 'Password reset link is invalid or has expired.' };
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  user.updatedAt = now;

  writeUsers(users);
  return { success: true };
}

export function verifyEmailWithToken(token: string): { success: boolean; user?: UserRecord; error?: string } {
  if (!token) return { success: false, error: 'Invalid verification token.' };
  const users = readUsers();
  const now = new Date().toISOString();
  const user = users.find(u => u.emailVerificationToken === token && u.emailVerificationExpires && u.emailVerificationExpires > now);

  if (!user) {
    return { success: false, error: 'Email verification link is invalid or has expired.' };
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  user.updatedAt = now;

  writeUsers(users);
  return { success: true, user };
}

export function createEmailVerificationToken(email: string): { token: string | null; error?: string } {
  const lower = email.toLowerCase().trim();
  const users = readUsers();
  const user = users.find(u => u.email === lower);
  if (!user) return { token: null, error: 'User not found' };

  const token = generateToken();
  user.emailVerificationToken = token;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  user.updatedAt = new Date().toISOString();

  writeUsers(users);
  return { token };
}

export function requestRoleUpgrade(uid: string, targetRole: 'builder' | 'supplier', details?: { companyName?: string; licenseNumber?: string; phone?: string }): { success: boolean; error?: string } {
  const users = readUsers();
  const user = users.find(u => u.uid === uid);
  if (!user) return { success: false, error: 'User not found' };

  user.requestedRole = targetRole;
  user.status = 'pending_verification';
  if (details?.companyName) user.companyName = details.companyName;
  if (details?.licenseNumber) user.licenseNumber = details.licenseNumber;
  if (details?.phone) user.phone = details.phone;
  user.updatedAt = new Date().toISOString();

  writeUsers(users);
  return { success: true };
}

export function listPendingApprovals(): UserRecord[] {
  const users = readUsers();
  return users.filter(u => u.status === 'pending_verification' && (u.role === 'builder' || u.role === 'supplier' || u.requestedRole));
}

export function listAllUsers(): UserRecord[] {
  return readUsers();
}

export function approveUserRole(uid: string, approve: boolean, newRole?: UserRole): { success: boolean; user?: UserRecord; error?: string } {
  const users = readUsers();
  const user = users.find(u => u.uid === uid);
  if (!user) return { success: false, error: 'User not found' };

  if (approve) {
    user.role = newRole || user.requestedRole || user.role;
    user.status = 'active';
  } else {
    user.status = 'suspended';
  }
  user.updatedAt = new Date().toISOString();

  writeUsers(users);
  return { success: true, user };
}
