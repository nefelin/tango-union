import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth-service';
import { corsHeaders, handleOptionsRequest } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400, headers });
    }

    const tokens = await loginUser(email, password);

    return NextResponse.json(tokens, { status: 200, headers });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return NextResponse.json({ error: error.message }, { status: 401, headers });
    }

    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}

