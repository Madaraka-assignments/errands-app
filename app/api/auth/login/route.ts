import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session-manager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('body', body);

    const response = await fetch(`${process.env.API_BASE_URL}/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = 'Login failed';

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

    await createSession(data.access, data.refresh);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
