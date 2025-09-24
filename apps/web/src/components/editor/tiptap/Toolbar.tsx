'use client';

import { useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import ToolbarGroup from './ToolbarGroup';
import ToolbarButton from './ToolbarButton';

interface ToolbarProps {
  editor: Editor;
}

const languageOptions = [
  { value: '', label: '자동' },
  { value: 'plaintext', label: 'Plain text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'json', label: 'JSON' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'bash', label: 'Bash' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'yaml', label: 'YAML' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'sql', label: 'SQL' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
];

export default function Toolbar({ editor }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const toggle = (command: () => void) => () => command();

  const currentLanguage = (editor?.getAttributes('codeBlock')?.language ??
    '') as string;

  const setLanguage = (lang: string) => {
    const chain = editor.chain().focus();

    if (!editor.isActive('codeBlock')) chain.toggleCodeBlock();
    chain.updateAttributes('codeBlock', { language: lang || null }).run();
  };

  const promptLink = () => {
    const prev = editor?.getAttributes('link').href as string | undefined;
    const url = window.prompt('링크 URL을 입력하세요', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  };

  const getImageSizeFromFile = async (
    file: File,
  ): Promise<{
    width: number;
    height: number;
  } | null> => {
    try {
      const bmp = await createImageBitmap(file);
      const size = { width: bmp.width, height: bmp.height };
      bmp.close?.();
      return size;
    } catch (e) {
      console.error(e);
    }

    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      await new Promise((res, rej) => {
        img.onload = () => res(null);
        img.onerror = rej;
      });
      const size = { width: img.naturalWidth, height: img.naturalHeight };
      URL.revokeObjectURL(url);
      return size;
    } catch {
      return null;
    }
  };

  const getImageSizeFromUrl = async (
    url: string,
  ): Promise<{
    width: number;
    height: number;
  } | null> => {
    try {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = url;
      await new Promise((res, rej) => {
        img.onload = () => res(null);
        img.onerror = rej;
      });
      return { width: img.naturalWidth, height: img.naturalHeight };
    } catch {
      return null;
    }
  };

  const insertImageByUrl = async () => {
    const url = window.prompt('이미지 URL을 입력하세요', 'https://');
    if (!url) return;
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:') throw new Error('invalid');
    } catch {
      alert('올바른 이미지 URL을 입력하세요.');
      return;
    }
    const size = await getImageSizeFromUrl(url);
    const attrs = size ? { width: size.width, height: size.height } : {};
    editor
      .chain()
      .focus()
      .setImage({ src: url, ...attrs })
      .run();
  };

  const onPickFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있어요.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 용량은 10MB 이하만 가능합니다.');
      return;
    }
    try {
      setIsUploading(true);
      const size = await getImageSizeFromFile(file);
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/upload', { method: 'POST', body });
      if (!res.ok) throw new Error('업로드 실패');

      const data = (await res.json()) as { url?: string; error?: string };
      if (!data.url) throw new Error(data.error || '업로드 실패');

      const attrs = size ? { width: size.width, height: size.height } : {};
      editor
        .chain()
        .focus()
        .setImage({ src: data.url, ...attrs })
        .run();
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 중 오류가 발생했어요.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const setAlign = (align: 'left' | 'center' | 'right' | 'justify') => () => {
    const chain = editor.chain().focus();
    if (editor.isActive('image')) {
      chain.updateAttributes('image', { textAlign: align }).run();
    } else {
      chain.setTextAlign(align).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <ToolbarGroup label="블록">
        <ToolbarButton
          active={editor.isActive('paragraph')}
          onClick={toggle(() => editor.chain().focus().setParagraph().run())}
        >
          본문
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          )}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          )}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          )}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 4 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run(),
          )}
        >
          H4
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 5 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run(),
          )}
        >
          H5
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 6 })}
          onClick={toggle(() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run(),
          )}
        >
          H6
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('blockquote')}
          onClick={toggle(() =>
            editor.chain().focus().toggleBlockquote().run(),
          )}
        >
          인용
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('codeBlock')}
          onClick={toggle(() => editor.chain().focus().toggleCodeBlock().run())}
        >
          코드블럭
        </ToolbarButton>
        <select
          aria-label="코드 언어 선택"
          className="rounded border px-2 py-1 text-xs"
          value={currentLanguage}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={!editor.isActive('codeBlock')}
        >
          {languageOptions.map((opt) => (
            <option key={opt.value || 'auto'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ToolbarButton
          onClick={toggle(() =>
            editor.chain().focus().setHorizontalRule().run(),
          )}
        >
          구분선
        </ToolbarButton>
        <ToolbarButton
          onClick={toggle(() => editor.chain().focus().setHardBreak().run())}
        >
          줄바꿈
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup label="이미지">
        <ToolbarButton onClick={insertImageByUrl}>이미지 링크</ToolbarButton>
        <ToolbarButton onClick={onPickFile} disabled={isUploading}>
          {isUploading ? '업로드 중…' : '파일 업로드'}
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup label="인라인">
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={toggle(() => editor.chain().focus().toggleBold().run())}
        >
          굵게
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={toggle(() => editor.chain().focus().toggleItalic().run())}
        >
          기울임
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={toggle(() => editor.chain().focus().toggleUnderline().run())}
        >
          밑줄
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('strike')}
          onClick={toggle(() => editor.chain().focus().toggleStrike().run())}
        >
          취소선
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('code')}
          onClick={toggle(() => editor.chain().focus().toggleCode().run())}
        >
          코드
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('highlight')}
          onClick={toggle(() => editor.chain().focus().toggleHighlight().run())}
        >
          형광펜
        </ToolbarButton>
        <ToolbarButton active={editor.isActive('link')} onClick={promptLink}>
          링크
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.isActive('link')}
          onClick={toggle(() => editor.chain().focus().unsetLink().run())}
        >
          링크 해제
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup label="목록">
        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={toggle(() =>
            editor.chain().focus().toggleBulletList().run(),
          )}
        >
          • 불릿
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={toggle(() =>
            editor.chain().focus().toggleOrderedList().run(),
          )}
        >
          1. 번호
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('taskList')}
          onClick={toggle(() => editor.chain().focus().toggleTaskList().run())}
        >
          ☑ 작업
        </ToolbarButton>
        <ToolbarButton
          disabled={
            !editor.can().chain().focus().sinkListItem('listItem').run()
          }
          onClick={toggle(() =>
            editor.chain().focus().sinkListItem('listItem').run(),
          )}
        >
          들여쓰기
        </ToolbarButton>
        <ToolbarButton
          disabled={
            !editor.can().chain().focus().liftListItem('listItem').run()
          }
          onClick={toggle(() =>
            editor.chain().focus().liftListItem('listItem').run(),
          )}
        >
          내어쓰기
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup label="정렬">
        <ToolbarButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={setAlign('left')}
        >
          좌
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={setAlign('center')}
        >
          중
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={setAlign('right')}
        >
          우
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={setAlign('justify')}
        >
          양쪽
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup label="기타">
        <ToolbarButton
          onClick={toggle(() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run(),
          )}
        >
          서식 제거
        </ToolbarButton>
        <ToolbarButton
          onClick={toggle(() => editor.chain().focus().undo().run())}
        >
          되돌리기
        </ToolbarButton>
        <ToolbarButton
          onClick={toggle(() => editor.chain().focus().redo().run())}
        >
          다시하기
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
}
