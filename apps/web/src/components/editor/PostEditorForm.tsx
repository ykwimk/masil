'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { TiptapEditor } from '@/components/editor/TiptapEditor';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="cursor-pointer" disabled={pending}>
      {pending ? '저장 중…' : label}
    </Button>
  );
}

export function PostEditorForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [html, setHtml] = useState<string>('');

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="포스트 제목"
          className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="tags" className="block text-sm font-medium">
          태그(쉼표 또는 공백으로 구분)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="ex) 그로스, 데이터, 브랜딩, 스타트업"
          className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          요약(선택)
        </label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="리스트에 보일 간단한 설명 (미입력 시 본문에서 자동 생성)"
          className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          컨텐츠
        </label>
        <TiptapEditor onChange={setHtml} />
        <input type="hidden" id="content" name="content" value={html} />
      </div>
      <div className="flex items-center gap-2">
        <input id="publish" name="publish" type="checkbox" className="size-4" />
        <label htmlFor="publish" className="text-sm">
          저장과 동시에 발행하기
        </label>
      </div>
      <div className="pt-2">
        <SubmitButton label="저장" />
      </div>
    </form>
  );
}
