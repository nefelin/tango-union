import { NextRequest, NextResponse } from 'next/server';
import { logoutUser, getCurrentUser } from '@/lib/auth-service';
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
    const user = getCurrentUser(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    await logoutUser(user.email);

    return NextResponse.json({ success: true }, { status: 200, headers });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}

