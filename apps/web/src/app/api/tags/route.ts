import { NextResponse } from 'next/server';
import { getTags } from '@/lib/data';

export async function GET() {
  const result = await getTags();
  return NextResponse.json(result);
}
