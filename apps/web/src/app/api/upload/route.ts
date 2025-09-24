import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sanitizeFilename } from '@/lib/utils';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import { authOptions } from '@/lib/auth';

type Counter = { count: number; resetAt: number };

// 간단 레이트리밋: IP 기준 10회 / 분
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipCounters: Map<string, Counter> = new Map();

function getClientIp(req: Request): string {
  try {
    const xfwd = req.headers.get('x-forwarded-for');
    if (xfwd) return xfwd.split(',')[0].trim();
    const real = req.headers.get('x-real-ip');
    if (real) return real.trim();
  } catch (e) {
    console.error(e);
  }
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const c = ipCounters.get(ip);
  if (!c || c.resetAt < now) {
    ipCounters.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (c.count >= RATE_LIMIT_MAX) return true;
  c.count += 1;
  return false;
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // 인증 확인 (로그인 사용자만 허용)
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    // 레이트리밋 확인
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'too_many_requests' }, { status: 429 });
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File))
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 },
      );

    if (!file.type?.startsWith('image/'))
      return NextResponse.json(
        { error: '이미지 파일만 업로드할 수 있어요.' },
        { status: 400 },
      );

    // 10MB 제한
    if (file.size > 10 * 1024 * 1024)
      return NextResponse.json(
        { error: '이미지 용량은 10MB 이하만 가능합니다.' },
        { status: 400 },
      );

    const admin = await getSupabaseAdminClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET;

    if (!admin || !bucket)
      return NextResponse.json(
        { error: 'Supabase 설정이 없습니다.' },
        { status: 500 },
      );

    const extFromName =
      file.name && file.name.includes('.')
        ? `.${file.name.split('.').pop()!.toLowerCase()}`
        : '';
    const contentExt = (file.type.split('/')[1] || '').toLowerCase();
    const ext = extFromName || (contentExt ? `.${contentExt}` : '.png');
    const base =
      sanitizeFilename((file.name || 'image').replace(/\.[^.]+$/, '')) ||
      'image';
    const folder = new Date().toISOString().slice(0, 10).replace(/-/g, '/'); // yyyy/mm/dd
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${base}${ext}`;
    const objectPath = `editor/${folder}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();

    // 매직넘버 검사 (PNG/JPEG/GIF/WebP/AVIF만 허용)
    const head = new Uint8Array(arrayBuffer.slice(0, 32));
    const isPng =
      head[0] === 0x89 &&
      head[1] === 0x50 &&
      head[2] === 0x4e &&
      head[3] === 0x47 &&
      head[4] === 0x0d &&
      head[5] === 0x0a &&
      head[6] === 0x1a &&
      head[7] === 0x0a;
    const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
    const isGif =
      head[0] === 0x47 &&
      head[1] === 0x49 &&
      head[2] === 0x46 &&
      head[3] === 0x38 &&
      (head[4] === 0x37 || head[4] === 0x39) &&
      head[5] === 0x61; // GIF87a/GIF89a
    const isRiff =
      head[0] === 0x52 &&
      head[1] === 0x49 &&
      head[2] === 0x46 &&
      head[3] === 0x46; // RIFF
    const isWebP =
      isRiff &&
      head[8] === 0x57 &&
      head[9] === 0x45 &&
      head[10] === 0x42 &&
      head[11] === 0x50; // WEBP
    const isAvif =
      head[4] === 0x66 &&
      head[5] === 0x74 &&
      head[6] === 0x79 &&
      head[7] === 0x70 &&
      head[8] === 0x61 &&
      head[9] === 0x76 &&
      head[10] === 0x69 &&
      head[11] === 0x66; // ftypavif
    const allowed = isPng || isJpeg || isGif || isWebP || isAvif;
    if (!allowed) {
      return NextResponse.json(
        { error: 'unsupported_image_type' },
        { status: 400 },
      );
    }

    const { error: uploadError } = await admin.storage
      .from(bucket)
      .upload(objectPath, new Uint8Array(arrayBuffer), {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ error: '업로드 실패' }, { status: 500 });
    }

    const { data } = admin.storage.from(bucket).getPublicUrl(objectPath);
    const publicUrl = data.publicUrl;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: '업로드 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
