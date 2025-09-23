'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { TiptapEditor } from '@/components/editor/TiptapEditor';
import TagSelector from '@/components/editor/TagSelector';
import { Label } from '@/components/ui/label';

interface InitialValues {
  title?: string;
  tags?: string[] | string;
  description?: string;
  content?: string;
}

interface PostEditorFormProps {
  id?: number | string;
  initialValues?: InitialValues;
  submitLabel?: string;
  isShowPublishToggle?: boolean;
  onAction: (formData: FormData) => Promise<void>;
}

export function PostEditorForm({
  id,
  initialValues,
  submitLabel = '저장',
  isShowPublishToggle = true,
  onAction,
}: PostEditorFormProps) {
  const { pending } = useFormStatus();

  const [html, setHtml] = useState<string>(initialValues?.content ?? '');

  const initialTags: string[] = Array.isArray(initialValues?.tags)
    ? initialValues?.tags
    : (initialValues?.tags?.split(/[,\s]+/).filter(Boolean) ?? []);

  return (
    <form action={onAction} className="space-y-6">
      {id !== undefined && <input type="hidden" name="id" value={id} />}
      <div className="space-y-2">
        <Label title="제목" htmlFor="title" required>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="포스트 제목"
            defaultValue={initialValues?.title ?? ''}
            className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          />
        </Label>
      </div>
      <div className="space-y-2">
        <Label title="태그" required>
          <TagSelector initialTags={initialTags} />
        </Label>
        <p className="text-muted-foreground mt-1 text-xs">
          등록된 태그를 검색해 선택하세요.
        </p>
      </div>
      <div className="space-y-2">
        <Label title="요약" htmlFor="description">
          <input
            id="description"
            name="description"
            type="text"
            placeholder="리스트에 보일 간단한 설명 (미입력 시 본문에서 자동 생성)"
            defaultValue={initialValues?.description ?? ''}
            className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          />
        </Label>
      </div>
      <div className="space-y-2">
        <Label title="컨텐츠" htmlFor="content" required>
          <TiptapEditor
            initialHTML={initialValues?.content}
            onChange={setHtml}
          />
          <input type="hidden" id="content" name="content" value={html} />
        </Label>
      </div>
      {isShowPublishToggle && (
        <div className="flex items-center gap-2">
          <input
            id="publish"
            name="publish"
            type="checkbox"
            className="size-4"
          />
          <label htmlFor="publish" className="text-sm">
            저장과 동시에 발행하기
          </label>
        </div>
      )}
      <div className="pt-2">
        <Button type="submit" className="cursor-pointer" disabled={pending}>
          {pending ? '저장 중…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
