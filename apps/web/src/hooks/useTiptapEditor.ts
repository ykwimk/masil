'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import kotlin from 'highlight.js/lib/languages/kotlin';
import swift from 'highlight.js/lib/languages/swift';
import ResizableImage from '@/components/editor/tiptap/extensions/ResizableImage';

interface UseTiptapEditorProps {
  initialHTML?: string;
  onChange?: (html: string) => void;
}

export function useTiptapEditor({
  initialHTML,
  onChange,
}: UseTiptapEditorProps) {
  const lowlight = createLowlight();

  lowlight.register('javascript', javascript);
  lowlight.register('js', javascript);
  lowlight.register('typescript', typescript);
  lowlight.register('ts', typescript);
  lowlight.register('json', json);
  lowlight.register('xml', xml);
  lowlight.register('html', xml);
  lowlight.register('css', css);
  lowlight.register('scss', scss);
  lowlight.register('bash', bash);
  lowlight.register('sh', bash);
  lowlight.register('shell', bash);
  lowlight.register('markdown', markdown);
  lowlight.register('md', markdown);
  lowlight.register('yaml', yaml);
  lowlight.register('yml', yaml);
  lowlight.register('python', python);
  lowlight.register('py', python);
  lowlight.register('java', java);
  lowlight.register('go', go);
  lowlight.register('golang', go);
  lowlight.register('rust', rust);
  lowlight.register('rs', rust);
  lowlight.register('ruby', ruby);
  lowlight.register('rb', ruby);
  lowlight.register('php', php);
  lowlight.register('sql', sql);
  lowlight.register('c', c);
  lowlight.register('cpp', cpp);
  lowlight.register('c++', cpp);
  lowlight.register('csharp', csharp);
  lowlight.register('cs', csharp);
  lowlight.register('kotlin', kotlin);
  lowlight.register('kt', kotlin);
  lowlight.register('swift', swift);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      ResizableImage.configure({
        HTMLAttributes: {
          loading: 'lazy',
          decoding: 'async',
        },
      }),
      Underline,
      Highlight,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: { rel: 'nofollow noopener noreferrer' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      TaskList,
      TaskItem,
      Placeholder.configure({
        placeholder: '내용을 입력하세요…',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose-custom min-h-[280px] w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary',
      },
    },
    immediatelyRender: false,
    content: initialHTML ?? '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return editor;
}
