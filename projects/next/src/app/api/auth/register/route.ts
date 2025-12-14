import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth-service';
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
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers });
    }

    const tokens = await registerUser({ email, password, firstName, lastName });

    return NextResponse.json(tokens, { status: 200, headers });
  } catch (error: any) {
    if (error.message === 'Email Address Taken') {
      return NextResponse.json({ error: error.message }, { status: 400, headers });
    }

    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}

