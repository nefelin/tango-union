import { NextRequest, NextResponse } from 'next/server';
import { refreshTokens } from '@/lib/auth-service';
import { corsHeaders, handleOptionsRequest } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Refresh token required' }, { status: 401, headers });
    }

    const refreshToken = authHeader.substring(7);
    const tokens = await refreshTokens(refreshToken);

    return NextResponse.json(tokens, { status: 200, headers });
  } catch (error: any) {
    if (error.message === 'Invalid refresh token') {
      return NextResponse.json({ error: error.message }, { status: 401, headers });
    }

    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}

