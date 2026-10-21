-- PostgreSQL / Supabase Schema for BuildMate AI Authentication & Role RBAC
-- Run this in the Supabase SQL Editor if migrating to Supabase cloud.

CREATE TYPE user_role AS ENUM ('client', 'builder', 'supplier', 'admin');
CREATE TYPE account_status AS ENUM ('active', 'pending_verification', 'suspended');

CREATE TABLE IF NOT EXISTS public.users (
  uid TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'client' NOT NULL,
  requested_role user_role,
  status account_status DEFAULT 'active' NOT NULL,
  is_email_verified BOOLEAN DEFAULT FALSE NOT NULL,
  email_verification_token TEXT,
  email_verification_expires TIMESTAMPTZ,
  reset_password_token TEXT,
  reset_password_expires TIMESTAMPTZ,
  phone TEXT,
  company_name TEXT,
  location TEXT DEFAULT 'India',
  experience_years INT,
  license_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Clients/Users can read their own profile
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid()::text = uid);

-- Users can update their own profile (name, phone, company)
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid()::text = uid);

-- Admins can view and manage all profiles
CREATE POLICY "Admins have full access"
  ON public.users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE uid = auth.uid()::text AND role = 'admin'
    )
  );
