import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from the API' });
}

export async function POST() {
  return NextResponse.json({ message: 'Post created' });
}

// 필요한 다른 HTTP 메서드들..

