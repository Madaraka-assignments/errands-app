'use server';

import { loginSchema, registerSchema } from '@/form-schemas/auth';
import { createSession } from '@/lib/session-manager';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';


const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function registerUser(data: RegisterRequest) {
  const validatedData = registerSchema.parse(data);
  
  const response = await fetch(`${appBaseUrl}/api/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  const result: RegisterResponse = await response.json();
  
  return result;
}


export async function loginUser(data: LoginRequest) {
  const validatedData = loginSchema.parse(data);
  console.log('validatedData', validatedData);
  const response = await fetch(`${appBaseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  const result: LoginResponse = await response.json();
  return result;
}