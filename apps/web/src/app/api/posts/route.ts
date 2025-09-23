import { NextResponse } from 'next/server';
import { getListPosts } from '@/lib/data';
import { parseBoundedInt } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag') || undefined;

  // limit: 1~50, offset: 0~10000 사이로 제한하여 과도한 페이지네이션/스캔 방지
  const limit = parseBoundedInt(searchParams.get('limit'), 10, 1, 50);
  const offset = parseBoundedInt(searchParams.get('offset'), 0, 0, 10000);

  const result = await getListPosts({ tag, limit, offset });
  return NextResponse.json(result);
}
