import { NextResponse } from 'next/server';
import { listPosts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag') || undefined;
  const limit = Number(searchParams.get('limit') || '10');
  const offset = Number(searchParams.get('offset') || '0');

  const result = await listPosts({ tag, limit, offset });
  return NextResponse.json(result);
}
