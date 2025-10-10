'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import TagsSelector from '@/components/editor/tags/TagsSelector';
import { Label } from '@/components/ui/label';
import { TiptapEditor } from '@/components/editor/tiptap/TiptapEditor';
import { Spinner } from '@/components/ui/spinner';

interface InitialValues {
  title?: string;
  tags?: string[] | string;
  description?: string;
  content?: string;
  cardImageUrl?: string;
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
  const [cardImage, setCardImage] = useState<string>(
    initialValues?.cardImageUrl ?? '',
  );
  const [isUploadingCardImage, setIsUploadingCardImage] =
    useState<boolean>(false);

  const cardImageInputRef = useRef<HTMLInputElement | null>(null);

  const initialTags: string[] = Array.isArray(initialValues?.tags)
    ? initialValues?.tags
    : (initialValues?.tags?.split(/[,\s]+/).filter(Boolean) ?? []);

  const handleCardImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type?.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있어요.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 용량은 10MB 이하만 가능합니다.');
      return;
    }

    try {
      setIsUploadingCardImage(true);
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body });
      if (!res.ok) throw new Error('upload_failed');

      const data = (await res.json()) as { url?: string; error?: string };
      if (!data.url) throw new Error(data.error || 'upload_failed');

      setCardImage(data.url);
    } catch (e) {
      console.error(e);
      alert('이미지 업로드 중 오류가 발생했어요.');
    } finally {
      setIsUploadingCardImage(false);
      if (cardImageInputRef.current) cardImageInputRef.current.value = '';
    }
  };

  return (
    <form action={onAction} className="space-y-6">
      {id !== undefined && <input type="hidden" name="id" value={id} />}
      <input type="hidden" name="cardImageUrl" value={cardImage} />
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
        <Label title="카드 이미지" htmlFor="cardImageUrlInput">
          <input
            ref={cardImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCardImageUpload}
          />
          <div className="space-y-3">
            <div className="mx-auto w-full max-w-sm sm:mx-0">
              {cardImage ? (
                <div
                  className="bg-muted aspect-[4/3] overflow-hidden rounded-md border"
                  style={{
                    backgroundImage: `url("${encodeURI(cardImage)}")`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                  role="img"
                  aria-label="카드 이미지 미리보기"
                />
              ) : (
                <div className="bg-muted/30 text-muted-foreground flex aspect-[4/3] items-center justify-center rounded-md border border-dashed text-xs">
                  카드에 노출할 이미지를 업로드하거나 URL을 입력해 주세요.
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer whitespace-nowrap"
                onClick={() => cardImageInputRef.current?.click()}
                disabled={pending || isUploadingCardImage}
              >
                {isUploadingCardImage ? (
                  <span className="inline-flex items-center gap-1 text-sm">
                    <Spinner size={16} />
                    업로드 중…
                  </span>
                ) : (
                  '이미지 업로드'
                )}
              </Button>
              {cardImage && (
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setCardImage('')}
                  disabled={pending || isUploadingCardImage}
                >
                  제거
                </Button>
              )}
            </div>
          </div>
        </Label>
      </div>
      <div className="space-y-2">
        <Label title="태그" required>
          <TagsSelector initialTags={initialTags} />
        </Label>
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
