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

  return (
    <div className="flex flex-wrap gap-2">
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
          onClick={toggle(() =>
            editor.chain().focus().setTextAlign('left').run(),
          )}
        >
          좌
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={toggle(() =>
            editor.chain().focus().setTextAlign('center').run(),
          )}
        >
          중
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={toggle(() =>
            editor.chain().focus().setTextAlign('right').run(),
          )}
        >
          우
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={toggle(() =>
            editor.chain().focus().setTextAlign('justify').run(),
          )}
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
