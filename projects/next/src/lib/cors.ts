import { NextResponse } from 'next/server';

const allowedOrigins = [
  'http://localhost:3001', // Frontend dev server
  'http://localhost:3000', // Next.js dev server
  'https://www.tangounion.net', // Production frontend
  'https://tangounion.net', // Production frontend
  // Add your Vercel deployment URL here when deployed
  // Example: 'https://your-project-name.vercel.app',
];

export function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else if (!origin || origin === 'null') {
    // Allow requests with no origin (like mobile apps or curl requests)
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
}

export function handleOptionsRequest(origin: string | null) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

