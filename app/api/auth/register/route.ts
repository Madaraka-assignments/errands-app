import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session-manager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = {
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: `+254${+body.phone_number}`,
      email: body.email,
      password: body.password,
    };

    const response = await fetch(`${process.env.API_BASE_URL}/accounts/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Registration failed';

      if (data) {
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === 'object') {
          errorMessage = Object.entries(data)
            .map(([key, value]) => {
              if (Array.isArray(value)) return `${key}: ${value.join(', ')}`;
              if (typeof value === 'object') return `${key}: ${JSON.stringify(value)}`;
              return `${key}: ${value}`;
            })
            .join(' | ');
        }
      }

      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    await createSession(data.access, data.refresh, data.user);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
